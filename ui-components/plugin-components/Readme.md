---
keywords: Plugin Components
summary:  All UI elements that can be added to a plugin made with HISE
author:   Christoph Hart
---


### List of common properties

| Property | Type | Default Value | Description |
| ------ | ---- | ----- | --------------- |
| `text` | String | the ID of the control | The name or text that is being displayed.How this text is exactly shown(or if it's used at all) depends on the control type. |
| `enabled`| Boolean | true | If the control should react on mouse events.Child components will inherit this property. |
| `visible` | Boolean | true | If the control is displayed or hidden.Child components will inherit this property. |
| `tooltip` | String | Empty | A informative text that will popup if you hover over the control. |
| `useUndoManager` | Boolean | false | If enabled, value changes can be undone with the scripting calls [`Engine.undo()`](/scripting/scripting-api/engine#undo) |
| `macroControl` | Number(1 - 8) | -1 | Connect this control to a macro control slot. |
| `linkedTo` | String | Empty | This property can be used to link certain controls to another control (the value must be the ID of the other control. In this case it will simply mirror the other one and can be used to duplicate controls on different pages. |
| `saveInPreset` | Boolean | Depends on the type | If true, this control will be saved in a user preset as well as restored on recompilation.If false, controls will not be stored in the preset and their control callback will not be fired after compilation.This is a very important property and you definitely need to know when to use it. |
| `isPluginParameter` | Boolean | false | If enabled, it exposes this control to a DAW for host automation. |
| `pluginParameterName` | String | Empty | If this control is a plugin parameter, it will use this name for displaying in the host. |
| `isMetaParameter` | Boolean | false | If this control is a plugin parameter and causes other parameters to change their values (eg. a sync button that changes the values of the delay time knob), you'll have to set this to true in order to be fully standard compliant (Logic is known to cause issues when this isn't handled properly). |
| `processorId` | Module ID | Empty | The module that is controlled by this control. |
| `parameterId` | Parameter ID | Empty | the parameter ID of the module specified above that should be controlled.Use these two properties in order to hook up the control to a single parameter using the exact same range you specified below.As soon as you need something more complex, you need to use the scripting callbacks for it. |
| `defaultValue` | Number | 0.0 | The default value for the control (if available). This value will be used at initialisation and if you load a user preset that has no stored value for this particular control (which happens if you add a control and try to load a user preset built with an older version). Sliders / Knobs will also use this as double click value. |
| `x`, `y`, `width`, `height` | Number | Various | The absolute pixel position / size of the control.You can use the sliders to change them relatively or just input a number into the text field to set all selected controls to the same value. |
| `bgColour`, `itemColour`, `itemColour2`, `textColour` | String or hex number | Various | the colours for the given control.How these colours are used differs between the control types, but in most cases, `bgColour` is the background colour and `textColour` is used for rendering the text, otherwise it would be a bit weird. |
