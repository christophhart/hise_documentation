This method allows to define automation parameters that can be attached / detached to UI elements dynamically. If you use this mode, all MIDI CC automation and macro assignments will operate on the automation data model instead of the actual UI element (so assigning a MIDI CC to a UI element via drop down or learn mode will connect the automation data with the source).

This is useful when you're using an UI element that can be assigned to multiple targets dynamically. In order to use it, just call this method with a JSON object that describes all automatable parameters. Then use the `automationID` property of a UI element to assign the control to one of the automation targets. This can be done dynamically.

> Be aware that this function only works in combination with a custom user preset model, so you need to call `UserPresetHandler.setUseCustomDataModel()` before using this method.

The JSON object you need to pass in here must be an array of objects where each array element describes one automation parameter. The automation object can / must have these properties:

| Property | Type | Default | Description |
| --- | - | - | ------- |
| `ID` | String | - | a unique identifier for the automation parameter |
| `min` | double | 0.0 |the minimum value |
| `max` | double | 1.0 | the maximum value |
| `middlePosition` | double | mid | the middle position |
| `stepSize` | double | 0.0 | the step size |
| `allowMidiAutomation` | bool | `true` | whether this parameter can be automated using MIDI CC messages |
| `allowHostAutomation` | bool | `true` | whether this parameter can be automated using host automation (plugin parameters) |
| `connections` | Array | `[]` | A list of parameter targets that are changed when the parameter is changed. Each element of this array must be a object with a `processorId` and `parameterId` property (just like the default UI element connections). |

Example object:

```javascript
const var automationObject = 
[
{
	"ID": "First Parameter",
	"min": 0.5, 
	"max": 2.0,
	"middlePosition": 1.0,
	"stepSize": 0.0,
	"allowMidiAutomation": true,
	"allowHostAutomation": false,
	"connections": [
	  {
	  	"processorId": "SimpleGain1",
	  	"parameterId": "Gain"
	  },
	  {
	  	"processorId": "SimpleGain2",
	  	"parameterId": "Gain"
	  },
	]
}
]
```

The `connections` property is not the only way to add logic to a automation parameter, you can alse use [Userpresethandler.attachAutomationCallback()](/scripting/scripting-api/userpresethandler#attachautomationcallback) in order to add a scripted callback (this is equivalent to `ScriptComponent.setControlCallback()` vs. using the `processorId` / `parameterId` connections).
