---
keywords: Sound Generators
summary:  A HISE module that takes MIDI input and creates audio output.
icon:     /images/icon_speaker
---

A sound generator is a HISE module that takes incoming MIDI data to generate audio signals.

## Signal Path

The sound generator renders polyphonic voices using the following graph:

![SoundGenerators2](/images/custom/soundgenerators2.svg:1200px) 

## Common parameters

| `#` | ID | Description |
| - | --- | ----------- |
| 0 | `Gain` | The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges |
| 1 | `Balance` | The stereo balance of the synth. The range is `-100...100` |
| 2 | `VoiceLimit` | The number of voices that this synth can play. |
| 3 | `KillFadeTime` | If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms |

## Chains 
| `#` | Icon | ID | Description |
| - | - | --- | ----------- |
| 0 | ![MIDI](/images/icon_midi:32px) | MIDI | Every MIDI message that is received by the sound generator will be processed by this chain. If you ignore the message here, it won't be passed to child modules |
| 1 | ![Gain](/images/icon_gain:32px) | Gain | The volume modulation of this sound generator. The modulation range 0...1 will be used as gain value |
| 2 | ![Pitch](/images/icon_pitch:32px) | Pitch | The pitch modulation of this sound generator. The modulation range 0...1 will be converted to pitch values according to the BiPolar parameter |
| 3 | ![FX](/images/icon_fx:32px) | FX | the effect chain of this module |

