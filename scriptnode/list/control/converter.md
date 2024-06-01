---
keywords: converter
summary:  Converts an input value using one of various predefined domain converters
author:   Christoph Hart
modified: 04.07.2022
parameters:
  - Value: The input value to be converted
---
  
The control.converter node allows you to convert an input value from one form to another using a predefined domain converter. This can be useful for situations where you need to manipulate data in a specific way or format it for a specific purpose.

In order to use it, just connect the Value parameter to the modulation source and the modulation output of this node to the target parameter. Then you can select one of these modes for the appropriate conversion

| Mode | Description |
|--| ------ |
| Ms2Freq | Converts from milliseconds to frequency (Hz)|
| Freq2Ms | Converts from frequency (Hz) to milliseconds                                |
| Ms2Samples | Converts from milliseconds to samples |
| Samples2Ms | Converts from samples to milliseconds|
| Ms2BPM | Converts from milliseconds to beats per minute (BPM)|
| Pitch2St | Converts from pitch (Hz) to semitones (st)|
| St2Pitch | Converts from semitones (st) to pitch (Hz)|
| Pitch2Cent | Converts from pitch (Hz) to cents|
| Cent2Pitch | Converts from cents to pitch (Hz)|
| Midi2Freq | Converts from MIDI note number to frequency (Hz)|
| Gain2dB | Converts from gain (amplification) to decibels (dB)|
| dB2Gain | Converts from decibels (dB) to gain (amplification)|

> Note that both the input and output connections are unscaled (= they ignore the source / target range and send whatever value comes out of the conversion).