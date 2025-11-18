This will set the resynthesis options of the wavetable synthesiser based on the provided JSON object.

| Property | Type | Description |
| --- | - | -------- |
| PhaseMode | String | One of three modes that define how to process the phase information (see below). |
| MipMapSize | int | the amount of semitones that is used for the mip map (default is 12=1 octave). The wavetable will be internally recalculated and band limited based on this setting. If you are mainly working with organic material, you could increase this a bit to save memory. |
| CycleMultiplier | int | the amount of cycles that is used to calculate a single wavetable. Increasing this value will "smooth" the spectrum, but you'll loose a bit of high frequency material. If you are using Loris this setting will not have any effect. |
| UseTransientMode | bool | If enabled, this will turn off the cycle multiplier for the first 4 cycles to allow a non-smoothed resynthesis of the transient of the sample. This preserves the high frequency content of the transient and might be useful for some sounds. |
| NumCycles | int | the number of cycles to create. If this is `-1`, then it will create as much cycles as the provided audio material contains, but you can set this to a fixed size. |
| ForceResynthesis | bool | This is more of a debugging property and it forces the resynthesis algorithm to always process the incoming audio material - if you load in wave files that already have a power of two cycle length, then it will skip the entire process and directly create the wavetables. With this property you can deactivate this to enforce a resynthesis every time. |
| UseLoris | bool | If enabled (and HISE / your plugin is compiled with `HISE_INCLUDE_LORIS`), then you can use the Loris library for resynthesis which offers a much better sound quality for organic material. Note that the Loris library is GPL licensed, so you cannot include this in a proprietary plugin without the explicit consent of the authors of this library! |
| ReverseOrder | bool | If enabled, it will reverse the order of the cycles of each wavetable which allows you to apply some modulation tricks that are not possible with the default order. |

### PhaseMode

The `PhaseMode` property defines how the resynthesis should cope with the phase information and has three options:

- `ZeroPhase` will ignore any phase information and treat every harmonic as sine wave starting at the zero position.
- `StaticPhase` will calculate the phase information of the very first cycle and then apply this to every cycle in the wavetable. This preserves the stereo field of the wavetable as well as the appearance of the waveform but removes all phase changes which can cause some pitch wobbling if the table index is automated
- `DynamicPhase` preserves the phase information of every cycle which is the best option for very organic material. It might sound a bit weird with some samples, so only use it if `StaticPhase` doesn't suit your material.

> Note that calling will not cause a resynthesis of the currently loaded wavetable. If you want to do this, follow up this call with a call to [resynthesise()](/scripting/scripting-api/wavetablecontroller#resynthesise).
