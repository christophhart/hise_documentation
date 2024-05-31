---
keywords: oscillator
summary: A polyphonic tone generator with multiple waveforms.
author: Christoph Hart
modified: 30.05.2024
parameters: 
  - Mode: Selects the waveform type.
  - Frequency: Sets the frequency of the oscillator in Hertz (Hz).
  - PitchMultiplier:  Adjusts the frequency of the oscillator by a multiplier. This parameter allows for harmonically related frequencies or other musical intervals by multiplying the base frequency.
  - Gate: Controls the gate state of the oscillator. When the gate is on (value 1.0), the oscillator is active and produces sound. When the gate is off (value 0.0), the
  - Phase:  Sets the starting phase of the waveform. The phase value ranges from 0.0 to 1.0, representing a full cycle of the waveform.
  - Gain: Adjusts the output gain of the oscillator. This parameter controls the amplitude of the generated waveform, ranging from 0.0 (silent) to 1.0 (full volume).
---

The `oscillator` node is a versatile polyphonic tone generator that produces various waveforms. It is suitable for a wide range of audio synthesis applications, from creating basic tones to complex sound design. The node supports multiple voices, making it suitable for polyphonic synthesis.

There are 5 waveforms that can be generated with this node:

- Sine
- Triangle
- Saw
- Square
- Noise

> The waveforms with a rich harmonic spectrum (triangle, saw and square) are using the PolyBLEP antialiasing algorithm to reduce aliasing artifacts. However this means they are not "mathematically" correct so for LFO purposes you might want to look at more naive tone generators like the [ramp](/scriptnode/list/core/ramp).

When inserted in a MIDI processing context, the oscillator responds to MIDI events (note on and note off messages), to control its gate state and frequency. If you want to ignore the frequency calculated by the MIDI input, you might have to put it in a [no_midi](/scriptnode/list/container/no_midi) container.