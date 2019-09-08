---
keywords: Macro Control System
summary:  Control multiple parameters with one macro control
author:   Christoph Hart
modified: 08.09.2019
weight:   90
icon:     /images/icon_macro-controls
---
  
The macro control system is a handy and convenient way to create up to 8 controls that change multiple parameters of different modules.

It is inspired (read: stolen) by the way Ableton Live handles macro parameters in an Audio Effect Rack and might be an easier alternative to writing scripting callbacks for controlling multiple parameters.

> if you're running HISE as plugin, you'll notice that the macro controls are published to the DAW as plugin parameters by default.

## Creating macro controls

There are 8 macro control slots available so in order to use them click on the 

![](/images/icon_macro-controls:32px)

icon in the main topbar of HISE. It will open up the [MacroControls](/ui-components/floating-tiles/hise/macrocontrols) in a popup that looks like this:

![macro_control_panel](/images/custom/macro_control_panel.png)

You can use the 8 knobs to change the macro controls, however there's nothing mapped yet, so they are disabled.  
In order to assign macro controls, you just need to click on the edit icon next to the name (eg. **Macro 1**). 
The green outline around the macro indicates that now it is in edit mode so you can change the name by double clicking on it and connect controls to it: as soon as you touch and change a control, it will be deactivated and assigned to this macro control which is indicated like this:

![macro_controlled_parameter](/images/custom/macro_controlled_parameter.png) 

> You can remove a connection quickly by right-clicking on an assigned control and choose "**Remove Macro Control**".

## Editing macro connections

Each macro control can have an arbitrary amount of connections to module parameters. You can modify and remove these connections in the Macro Edit Table which will automatically show up in the right panel as soon as you're entering the edit mode for a macro control.

![macro_control_table](/images/custom/macro_control_table.png) 

It is a table with a row for each connection that you've made for that particular macro control. It shows these columns:

| Processor | Parameter | Inverted | Min | Max |
| ==== | === | === | === | === |
| The ID of the module | the ID of the parameter | inverts the range | the min value (when the macro control is all to the left) | the max value (when the macro control is all to the right) |

If you want to delete a connection click on a row and press **Delete**. If you want to clear all collections at once, right click on the macro control knob and choose **Clear Macro Control**.

## Advanced connections

Controlling parameters directly is not the only way that the macro control system can be used: 

- the [Macro Modulator](/hise-modules/modulators/time-variant-modulators/list/macromodulator) which grabs the macro control value and turns it into a time-variant modulation signal 
- the `core.macro` node which allows to use a macro control in order to modulate things inside a scriptnode network (not yet implemented, will be added shortly). 

The reason why you would want to use one of those is that they might result in a better sound when modulating the value, because they allow smoothing of the parameter.  

## Using macro controls

Now that we have connected the macro control to its targets we can take a look at how to control the macro control itself.

Basically there are three ways of doing this:

1. Hardwire a MIDI CC to a macro control
2. Assign a control on your scripted interface
3. Use the scripting API directly

### MIDI Control

You can hardwire a certain CC to control a macro control. The procedure is similar to mapping controls on your compiled project to a MIDI control: 

1. Right click on the knob and select **MIDI Learn**.
2. Move the controller once. 

From then on the macro control will be controlled by the MIDI CC until you remove it by right clicking on the knob and selecting **Remove MIDI CC**.

> In this case the MIDI message will be consumed by the macro control and not be passed on to the rest of HISE

### Assign a UI control

Every UI control has the `macroControl` property which tells the system to control the connected macro with it. So if you want to control a macro control with a knob, just set its `macroControl` property to the index you want.

> Be aware that this will "disconnect" it from anything else: it will not control the parameter assigned by the `processorId` and `parameterId` and the scripting callback will not be fired anymore.

Now if you do this, be aware that the range of the macro control is `0 - 127`. So whatever control you use, it has to use that value range, or you will not be able to control the full range of the macro control.

### Set the macro value using the Scripting API

If you want to have precise control when and what value you want to send to the macro control (or use a UI component which hasn't the correct range), you can use the scripting call [`Synth.setMacroControl`](/scripting/scripting-api/synth#setmacrocontrol) to directly send the value to the given macro control.

