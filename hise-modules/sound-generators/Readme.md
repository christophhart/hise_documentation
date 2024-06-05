---
keywords: Sound Generators
summary:  A HISE module that takes MIDI input and creates audio output.
icon:     /images/icon_speaker
---

A sound generator is an audio module that takes incoming MIDI data and generate audio signals.

## Signal Path

The sound generator renders polyphonic voices using the following graph:

![SoundGenerators2](/images/custom/soundgenerators2.svg:1200px) 

It starts with the MIDI processing which takes the incoming MIDI messages and starts / stops the voices. 
The next step is the rendering of all monophonic pitch modulators: this signal will be merged with the polyphonic pitch modulation signal, but only needs to be calculated once.  

Now we iterate over each active voice and render its output - actually it will calculate the polyphonic pitch modulation first, then render the voice output using the pitch modulation data and apply the polyphonic gain modulation plus the polyphonic effects for each voice.

At the end, the monophonic gain modulation will be applied to the voices, then the monophonic effects will be processed on the entire output. The output then will be **added** to the existing signal (so that you can stack up multiple sound generators).

## Multichannel Routing

There are multiple use cases in the instrument design where you would want to have a multichannel routing:

- multimic samples
- AUX sends
- parallel FX processing

A sound generator in HISE can process multiple channels (if applicable, a sine wave generator doesn't need to calculate the signal for every channel obviously).

![RoutingMatrix](/images/custom/routing_matrix.png) 

You can access the Routing Matrix with clicking on the little "volume-display-icon" next to the SoundGenerators name.

You can change the channel amount by right-clicking in the Routing Matrix popup or by creating a "typed Routing Matrix Script Reference". (by right-click on the Audio Modules top-bar) and set the number of channels via script:

```javascript
const var MasterChain = Synth.getRoutingMatrix("Master Chain");
MasterChain.setNumChannels(8);
```

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

