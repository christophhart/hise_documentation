---
keywords: Scripting in HISE
summary:  An introduction to scripting in HISE.
index: 01
---


### Create Script References

One crucial scripting paradigm in **HISE** is that you have to create a **script reference** to [Modules](../reference/modules.html) and [UIComponents](../reference/uicomponents.html) before you can manipulate them. The best place for this is the `onInit`-Tab.

After you have referenced the elements you can access their attributes/parameters and properties and change these values according to your script logic.  

#### Module References

The best way to create a script reference to a Module is to take a built-in shortcut. When you **right-click** on the header-bar of a Module in the Main-Workspace, a little context menu will pop up with the option: **create script reference**. This will copy a `const var` script variable definition of the Module to your clipboard. You can now directly paste this reference to your `onInit`-script and compile the script with [**F5**]. Take notice that the Module is identified by its **Processor ID** and that the new script variable adopts this naming.

Let's try this out with a newly created SineWaveGenerator Module:

``` js
// A script reference to a SineWaveGenerator Module 
const var SineWaveGenerator1 = Synth.getChildSynth("Sine Wave Generator1");
```

Now that we have created a reference to the Module we can access all its methods and attributes/parameters directly via script. Start to type `SineW...` in the `onInit`-script and hit `Escape`. Select the full variable-name `SineWaveGenerator1` with ↓ and `Enter` or clicking. When you now append a `.`(dot) and hit `Escape` again you'll see a list of all available methods and attributes of the Module.

Let's try out the `getAttribute()` and `setAttribute()` method to get a grip of the attributes/parameters of the Module. 
``` js
// Get and print the current SaturationAmount
Console.print("Saturation Amount: " + SineWaveGenerator1.getAttribute(SineWaveGenerator1.SaturationAmount));

// Set the SaturationAmount of the SineWaveGenerator to 17%
SineWaveGenerator1.setAttribute(SineWaveGenerator1.SaturationAmount, 0.17);
```

In this way you can access all the attributes/parameters of every Module. See a list with all attributes for each Module in the [Modules](modules.html) chapter. 



#### UIComponent References

Referencing UIComponents works the same way as with Modules. Select a created UIComponent in the Interface Designer in **edit mode** or in the **Component List** and **right-click** on it. Select **create script reference for selection** and paste the code in your `onInit` script.  

Now you can directly `set()` and `get()` the properties of the component in your script, which will show up in the **Property Editor** as "Overwritten by script". 


``` js
// A script reference to a Slider UIComponent
const var Knob1 = Content.getComponent("Knob1");

// set and get a UIComponents property
Knob1.set("text", "Saturation");
Console.print("text property: " + Knob1.get("text"));
```

The `getValue()` method will return the current "value" of the UIComponent. It depends on the kind of component which value it returns. Have a look at the [UIComponent](components.html) section for more details.
value-range for sliders, 0/1 for button, array-indexes for each ComboBox entry, array for SliderPack, and 0-127 range for Table1.

``` js
// Returns the current value of the UIComponent
Console.print(Knob1.getValue());
```


### Create Custom-onControl-Callback for Selection

This shortcut provides a convenient way to create a function wrapper for a single UIComponent that also automatically registers this function as a Custom Callback. This allows you to access the values of the component that are dynamically changed by the user. 

You can copy the Custom Callback definition to the clipboard with a **right-click** on the UIComponent in the Interface Designer and selecting **create custom callback for selection**. Afterwards you can copy the definition in the `onInit`-callback and use it straight away. 

You can see that the shortcut inserts the `ID` of the component in the callback name (on`...`Control). Another argument for not changing the `ID` of a component later on.  

``` js
// A custom onControl Callback
inline function onKnob1Control(component, value)
{
    SineWaveGenerator1.setAttribute(SineWaveGenerator1.SaturationAmount, value);
};

Content.getComponent("Knob1").setControlCallback(onKnob1Control);

```

`component` refers to the UIComponent object and the `value` to the getValue() method with the current values of the component.


