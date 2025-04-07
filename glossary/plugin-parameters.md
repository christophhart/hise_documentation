---
keywords: Plugin Parameters
summary:  all about plugin parameter handling
author:   Christoph Hart
modified: 06.04.2025
---
  
## Introduction

Plugin parameters are a important connection point between your plugin and the host application (DAW). A plugin parameter is visible to the host and can be automated and recorded in the DAW as well as controlled by hardware controllers.

> Note that the value type of plugin parameters is a single number, so any control that requires more complex data cannot be connected to a plugin parameter.

You can assume that the majority of users of your plugin will interface through it through the plugin parameter system so to ensure a smooth user experience it's important to take care of that part of the plugin interface.

### Threading considerations

Plugin parameter change callbacks in HISE can be triggered from **multiple threads**, depending on how the host sends automation data. This includes:
- The **audio thread** (for sample-accurate automation),
- The **message thread** (for UI interaction),
- Or even **dedicated host automation threads** (eg. in Protools).

Therefore, it’s critical that your parameter handling logic is **thread-safe** and avoids operations that could block or allocate memory. If you are writing scripting code that can end up in a function called by a plugin parameter change, always treat it as if it would be running in the audio thread.

The handling of plugin parameters has been rewritten in HISE 4.5.0 and includes some tools for easier debugging & management during the development process.

## Types of Plugin Parameters in HISE

There are three different systems in HISE that can be used to create plugin parameters depending on your projects structure. Let's take a look at them individually and then make a matrix of best use cases for each of the three concepts. They are listed in ascending order of "dynamicallyness" so the more flexibility you need in the design of the plugin parameters the further down the list you have to go in order to find the suitable concept.

### 1. UI Components

Most HISE developers only know and use this type of plugin parameter. [UI components](/ui-components/plugin-components) can be marked as plugin parameters so they appear in the host’s automation list. There are different UI component properties that tell the host whether a specific UI component should be a plugin parameter:

| ID | Description |
| == | ====== |
| `isPluginParameter` | A simple bool flag that sets up the UI component to be treated as plugin parameter. |
| `pluginParameterGroup` | A String that will be used to group multiple parameters together. This is only supported by some hosts (eg. Cubase). |
| `pluginParameterName` | A String that will be shown on the host interface. |
| `isMetaParameter` | A bool flag that needs to be set when this UI element changes other UI elements that are plugin parameters themselves. Note that if you forget to set this flag properly for a plugin parameter, it will fail some validation procedures (eg. `auval`) so make sure this value aligns with what this parameter is doing. |

If you want to use plugin parameter group names you will have to define them before with [UserPresetHandler.setPluginParameterGroupNames()](/scripting/scripting-api/userpresethandler#setpluginparametergroupnames), then they are available in the dropdown list of the property editor.

> Note that the order of how plugin parameters are defined and registered at the host are the same as they appear in the component list (with UI elements that don't have the `isPluginParameter` flag enabled being excluded from the plugin parameter list). Changing the order of plugin parameters might mess up existing DAW presets so take that into account when shipping updates that add more UI controls.

In addition to these properties, there are a few other properties that will affect how the plugin parameters are displayed: To the host, all values will be stored and recalled using a normalised range from 0...1 but in order to show the "real" values in the host automation lanes, these properties will be used to convert the input value to the scaled value of the UI control.

- `min` / `max` / `stepSize` / `middlePosition` / `suffix` / `mode`

> Note that you will never have to perform this conversion process yourself as all callbacks in HISE will use the range to convert the incoming normalized value to the actual value.

Keep in mind that the `saveInPreset` property is not related to the plugin parameter handling at all, but you should always only register persistent UI components which have the `saveInPreset` flag enabled as a plugin parameter because you cannot rely on the host of recalling plugin parameters correctly (eg. when loading user presets).

#### Minimal Setup:

```javascript
const myKnob = Content.addKnob("Gain", 0, 0);

// automatically set the range and suffix to a mixer dB preset
myKnob.set("mode", "Decibel");

// Tell HISE to use this as a plugin parameter
myKnob.set("isPluginParameter", true);

// The parameter can have a different name than the control ID
myKnob.set("pluginParameterName", "Volume");;
```

This is how it will look in the plugin parameter simulator (and later in the host if you would export that example):

![](/images/custom/pluginparameter/scriptExample.PNG)

### Custom Automation Slots

For more advanced use cases, you can define **custom plugin parameters** that are not directly tied to UI components. Instead they are introduced as separate data model which different UI components (or other script logic) can register to.

The main use case for this is if you have a user interface with a few controls that are being reassigned to different targets (eg. if you're developing a multitrack drum plugin that should be able to control certain parameters of a selected track).

In order to use this system, you will need to define:

1. A custom preset model (because you will have to somehow store the data values of the custom automation slots and there is no "inbuilt" way of achieving this in HISE). 
2. A list of automation slots that are created at initialisation.

Note that the preset model and the custom automation slot definition (as well as the targets of the slots) are a static model and need to be defined in the `onInit` callback. However the UI components / the custom scripts can be reassigned dynamically (which is the exact point of this entire concept).

#### Example:

Let's consider a simple setup that benefits from this system: 

- We have two samplers with three mic channels.
- We want to create a mixer page that allows you to change the mic levels of one of the two samplers depending on which you "select" on your UI.
- In the DAW host we want to show all six gain parameters as plugin parameters. 

> We can of course just create six knobs, register them all as plugin parameters and then just hide the ones we don't have selected, but this solution does not scale well so if you have eg. 16 channels and 12 controlled parameters this becomes a logistic nightmare and might become a performance bottleneck.

We can use this custom automation parameter system to dynamically reassign the UI controls to whatever sampler we want to control. This would be the graph of how the setup:

![](/images/custom/pluginparameter/customgraph.svg)

Now let's take a look at the scripting code required to set this up. It's a bit more verbose than the other examples so we break it down into individual parts. First lets setup the preset data model with the custom loading & saving callback. There are a few helper functions that we can use to minimize the boiler plate code, but this is the minimal example for getting up and running:

```javascript
// Create a user preset handler - the entry point for most of the example
const var uph = Engine.createUserPresetHandler();

// Define a function that will be executed when a preset is saved
inline function onPresetSave(presetName)
{
	// Create a JSON object from saveInPreset components
	// as well as the custom automation slots
	local obj = {
		saveInPreset: uph.createObjectForSaveInPresetComponents(),
		custom: uph.createObjectForAutomationValues()
	};
	
	return obj;
}

// Define a function that will be executed when the preset is loaded
inline function onPresetLoad(obj)
{
	// Restore the values of all saveInPreset components
	uph.updateSaveInPresetComponents(obj.saveInPreset);
	
	// Restore the automation values
	uph.updateAutomationValues(obj.custom, AsyncNotification, false);

	// we also need to call that to restore components that are connected to a module state
	// (eg. a EQ floating tile)
	uph.updateConnectedComponentsFromModuleState();
}

// setup the user preset system to use the custom callbacks defined above
uph.setUseCustomUserPresetModel(onPresetLoad, onPresetSave, false);
```

Alright now that the preset model is switched to a custom one we can define the automation slots we want to use. The function requires a list of JSON objects which we will create automatically using some basic JS object manipulation.

```javascript
const var MIC_NAMES = ["Close", "Mid", "Far"];

// The base object for a single slot
const var baseObject = {
	"ID": "MIC $",
	"min": -100.0, 
	"max": 0.0,
	"middlePosition": -12.0,
	"stepSize": 0.01,
	"mode": "Decibel",
	"allowMidiAutomation": false,
	"allowHostAutomation": true,
	"connections": [{
	  "processorId": "Simple Gain$",
	  "parameterId": "Gain"
	}]
};

const var automationData = [];
automationData.reserve(6);

for(i = 0; i < 6; i++)
{
	// clone the base object, then replace all the place holder with advanced
	// index calculations
	var x = baseObject.clone();
	var idx = parseInt(i / 3) + 1;
	x.ID = x.ID.replace("$", idx);
	x.ID = x.ID.replace("MIC", MIC_NAMES[i % 3]);
	x.connections[0].processorId = x.connections[0].processorId.replace("$", (i+1));
	automationData.push(x);
}

// Confirm that our loop worked fine and the data looks good
Console.print(trace(automationData));

// Pass on the JSON object to the user preset handler
uph.setCustomAutomation(automationData);
```

Let's take at various elements in HISE to confirm what we're doing: First let's look at the CustomAutomation floating tile that shows a list of all custom slots:

![](/images/custom/pluginparameter/customSlots.PNG)

Great stuff. Now the plugin parameter simulator:

![](/images/custom/pluginparameter/customParameters.PNG)

Perfect. If we wiggle the knobs here we can already change the module parameters directly (which you can confirm by opening one of the simple gain module interfaces and then change the values on the plugin parameter simulator). This is the key idea of this concept: by decoupling the plugin parameters from the scripted user interface into a separate data model we can now connect / disconnect the UI sliders as we wish. In order to do so, we'll add three knobs and a button that toggles between the "pages":

```javascript
const var SLIDERS = [Content.addKnob("Knob1", 0, 0),
                     Content.addKnob("Knob2", 128, 0),
                     Content.addKnob("Knob3", 256, 0)];
             
for(s in SLIDERS)
	s.set("mode", "Decibel");

// Now we add a page button that toggles the connections             
const var pageButton = Content.addButton("Page", 0, 50);
pageButton.set("saveInPreset", false);

inline function onPage(component, value)
{
	for(i = 0; i < 3; i++)
	{
		// update the automation connection
		// note that this will also update the current value
		SLIDERS[i].set("automationID", MIC_NAMES[i] + (value ? " 2" : " 1"));
		
		// optional: show the current connection as text
		SLIDERS[i].set("text", SLIDERS[i].get("automationID"));
	}
}

pageButton.setControlCallback(onPage);
```

### 3. Dynamic Plugin Parameter Slots (Macro Controls)

There is a practical limit of how many plugin parameters you should expose to the host. It obviously depends on your projects architecture but if you use more than ~100 plugin parameters, things get a bit sluggish as it's up to the host to handle that and some do it rather poorly which results in huge DAW project file sizes, longer loading times and other annoyances.

One option to mitigate this and still be able to offer the user the ability to control any parameter on your UI through a plugin parameter is by using the macro control system of HISE as a way of assigning dynamic plugin parameters. 

> Note that if you use this, you cannot use the macros as global modulation source anymore, so it's either one of these concepts for any given project.

If you do so, it will register all macro controls as plugin parameters which you then can connect / disconnect through the context menu of each UI element (or programmatically through the [Macrohandler](/scripting/scripting-api/macrohandler) object.

Setting up the macro controls requires two things:

1. Define the HISE preprocessor macro `HISE_MACROS_ARE_PLUGIN_PARAMETERS=1` in your extra definitions to tell HISE to enable this feature.
2. Optionally adjust the number of macro controls to the number of dynamic slots you want to use using `HISE_NUM_MACROS=XXX` in your extra definitions
3. Call [Engine.setFrontendMacros()](/scripting/scripting-api/engine#setfrontendmacros) to enable the macros in the context menu.
 
> Note that with HISE 4.5.0 these properties will be dynamically pulled from your ExtraDefinitions so that you don't have to recompile HISE anymore to see how it will look in your compiled plugin.

Once you've setup your project with these steps you can add / remove controls to be assigned as plugin parameter with the context menu. Note that by default, the macro control system allows you to connect one macro control to multiple connections. If you don't want to use that and maintain a 1:1 connection between a UI component and its parameter slot, you can use [MacroHandler.setExclusiveMode()](/scripting/scripting-api/macrohandler#setexclusivemode) and it will always make sure that any macro control has only a single connection.

### Combining Plugin Parameter Types

If you're making a plugin in HISE you are not limited to use only one of the plugin parameter types mentioned above, in fact you can combine all three of them. There are just a few things to keep in mind:

- The order of how the plugin parameters are registered in the host is always **Macros -> Custom Slots -> Script Controls** (so in descending order of "dynamicallyness"). Keep this in mind when changing the plugin parameter setup between updates as this might introduce some issues with existing DAW projects. If you need to change this logic, you can use [this API method](/scripting/scripting-api/userpresethandler#setpluginparametersortfunction) to supply a custom sorting function to retain backwards compatibility or override the default sorting for aesthetic reasons.
- While you can combine them, the ID of each plugin parameter must still be unique. You cannot use a UI component as a plugin parameter named "Volume" and a custom automation slot with the same name.

## Gestures

The communication between HISE and the host through plugin parameters also supports the concepts of parameter gestures that always follow this order:

1. start of the gesture
2. a number of value changes
3. end of the gesture

> Note that some (but not all hosts) also support this message when using hardware controllers.

HISE will automatically send begin and change parameter gesture messages for inbuilt controls: if you start dragging a slider it will send a parameter change gesture and if you release the mouse button it will send a end gesture message (same with the button). However if you're creating a custom control, you will be responsible for sending the message yourself (eg. in a Panel's mouse callback). For this you can use the [UserPresetHandler.sendParameterGesture()](/scripting/scripting-api/userpresethandler#sendparametergesture) function.

> The plugin parameter floating tile also shows the parameter gestures: any control with an active gesture is being highlighted in the beautiful mustard colour that we all love so you can quickly check the functionality.

You can also attach a callback to react on parameter change gestures sent by the host (and HISE itself). [UserPresetHandler.setParameterGestureCallback()](/scripting/scripting-api/userpresethandler#setparametergesturecallback). Note that for both functions the plugin parameters are in fact divided into subgroups depending on their type (script control, custom automation or macro control).

```javascript
const var CUSTOM = 0;
const var MACRO = 1;
const var SCRIPT = 2;

const var uph = Engine.createUserPresetHandler();

inline function onGesture(type, index, on)
{
	if(type == CUSTOM && index == 13) // 14th slot of custom automation
	{
		Panel1.set("itemColour", on ? Colours.red : Colours.blue);
		Panel1.repaint();
	}
	if(type == MACRO && index = 7) // 8th macro control
	{
		
	}
	if(type == SCRIPT && index == 124) // 125th script control
}

uph.setParameterGestureCallback();

Panel1.setMouseCallback(function(event)
{			
	if(event.clicked && !event.drag && !event.rightClick)
	{
		this.data.down = true;
		
		uph.sendParameterGesture(CUSTOM, 13, true);
		uph.sendParameterGesture(CUSTOM, 14, true);
		
		// note that we could also call this function directly
		// for a similar logic, but funneling it through the parameter
		// gesture system like above improves the integration with the host
		// onGesture(CUSTOM, 13, true);
	}
	
	if(event.mouseUp && !event.rightClick && this.data.down)
	{
		uph.sendParameterGesture(CUSTOM, 13, false);
		uph.sendParameterGesture(CUSTOM, 14, false);
		this.data.down = false;
	}
};
```

## Tools in HISE for Plugin Parameter Management

There are a few tools in HISE which allow you to debug & test the plugin parameter system:

- a floating tile for simulating [plugin parameters](/ui-components/floating-tiles/hise/pluginparametersimulator), accessible from the interface.
- a floating tile that lists all [custom automation slots](/ui-components/floating-tiles/hise/automationdatabrowser)
- multiple [sanity checks](/working-with-hise/menu-reference/export#validate-plugin-parameters) that will check your plugin parameter setup for various errors

