HISE has a few predefined value domains that can be used for parsing & displaying "prettified" Strings. This involves suffixes, number of decimal points or even a string of a predefined list like tempo values.

You most likely will interact with the different value modes through the `mode` property of a ScriptSlider, but in order to programmatically parse a string back to a numeric value (eg. in the callback of [Content.showModalTextInput()](/scripting/scripting-api/content#showmodaltextinput)), you can use this function to convert a string back to its numeric value. The function expects two arguments, the first is the value string and the second argument is one of the available mode names:

| Mode | Description | Example |
| --- | ----- | --- |
| `"Frequency"` | A Hz value for a frequency. Values above 1000Hz are abbreviated. | `240Hz, 2.5kHz` |
| `"Time"` | A value for a duration in milliseconds or seconds. Values above 1 second will be converted to the millisecond value. | `10ms, 3.2s` |
| `"TempoSync"` | A tempo name that represents a musical time factor. Will return the index in the tempo list as used by the slider mode `TempoSync`. | `1/4, 1/32T` |
| `"Pan"` | A value that describes a position in the stereo field. The suffix is either L, R or C and the value range is -100 to 100. | `-50L, C, 87R` |
| `"NormalizedPercentage"` | A normalised value between 0.0 and 1.0. It will be represented as percentage from 0% to 100%. | `75%` |
| `"Decibel"` | A value in the decibel domain with a single decimal point and the `dB` suffix | `-50dB, 0dB, -inf` |
| `"Semitones"` | A discrete value for a pitch relation | `-3st, 0st` |

There is also the inverse function [Engine.getTextForValue()](/scripting/scripting-api/engine#gettextforvalue) which returns a prettified display string for a given number.