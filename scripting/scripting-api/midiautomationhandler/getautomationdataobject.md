This method returns an array with JSON objects for every MIDI control assignment that is present. The JSON object will have these properties:

| Property | Type | Description |
| -- | - | ------- |
| `Controller` | int | the CC number (zero based) of the MIDI assignment. |
| `Channel` | int | the MIDI channel of the MIDI assignment (see below). This is one-based(!) and a omni connection that applies to all MIDI channels should have the value `-1`. |
| `Processor` | String | the ID of the module that connects to the MIDI control. This is most likely your Interface. |
| `Attribute` | String | the ID (not the index!) of the attribute that the MIDI assignment is supposed to control. |
| `MacroIndex` | int | if the control is mapped to a macro control, this will contain the index. |
| `Start` | double | the current start of the mapped range as it was set in the MidiLearnPanel. By default this is equal to the `FullStart` property. |
| `End` | double | the current end of the mapped range as it was set in the MidiLearnPanel. By default this is equal to the `FullEnd` property. |
| 'Inverted' | bool | whether the MIDI assignment should invert the value range (basically what the Invert button does on the MidiLearnPanel). Note that this does not affect the `Start` and `End` properties and it's still expected that `Start < End`. |
| `FullStart` | double | the lower limit of the range that can be set (in the MidiLearnPanel this would be the min value of the range sliders). |
| `FullEnd` | double | the upper limit of the range that can be set (in the MidiLearnPanel this would be the min value of the range sliders). |
| `Skew` | double | the logarithmic skew of the range that can be used for changing the gamma curve of the MIDI assignment. |
| `Interval` | double | the step size of the MIDI assignments. For discrete controls this can be `1.0`. |
| `Converter` | String | a spurious Base64 string that will contain the encoded text to value converter so that it displays the values correctly. |

### Note about the Channel property

Starting with HISE 4.5.0 there is the ability of filtering MIDI CC messages by MIDI channel, so that you can eg. assign the modwheel of the MIDI channel 2 to another control than the modwheel of the MIDI channel 1. 

By default this is deactivated (so in our example any modwheel message from any channel would control an assigned UI element). If you don't see the `Channel` property in the JSON object, you have to enable the support for different MIDI channels by adding `HISE_USE_MIDI_CHANNELS_FOR_AUTOMATION=1` to your [Extra Definitions field](/working-with-hise/settings/project#extra-definitions-windows) (you don't have to recompile HISE for it to be applied though).

### Data Example

Here's one JSON object in its full glory:

```javascript
[{
  "Controller": 1,
  "Channel": 0,
  "Processor": "Interface",
  "MacroIndex": -1,
  "Start": 0.0,
  "End": 1.0,
  "FullStart": 0.0,
  "FullEnd": 1.0,
  "Skew": 1.0,
  "Interval": 0.01,
  "Converter": "37.nT6K8CBGgC..VEFa0U1Pu4lckIGckIG.ADPXiQWZ1UF.ADf...",
  "Attribute": "Knob1",
  "Inverted": false
}]
```
