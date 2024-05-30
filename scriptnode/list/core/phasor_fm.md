---
keywords: phasor_fm
summary: A ramp oscillator with frequency modulation (FM) from the input signal.
author: Christoph Hart
modified: 30.05.2024
parameters:
  - Gate: Controls whether the oscillator is active (1) or inactive (0). When inactive, the oscillator's output is muted.
  - Frequency: Sets the base frequency of the oscillator in Hz. (range: 20.0 to 20000.0 Hz, default: 220.0 Hz)
  - FreqRatio: Multiplies the base frequency, useful for harmonic adjustments. (range: 1.0 to 16.0, default: 1.0)
  - Phase: Sets the starting phase of the ramp waveform. A value of 0.0 starts the waveform at the beginning, while 1.0 starts it at the end. The range is from 0.0 to 1.0, with a default of 0.0.
---

The `phasor_fm` node extends the [`core.phasor`](/scriptnode/list/core/phasor) functionality by adding frequency modulation (FM) capabilities. It generates a ramp signal that can be modulated by the existing audio signal, allowing for complex and dynamic waveform generation.

### Difference Between `phasor` and `phasor_fm`

The `phasor` node generates a simple ramp waveform and adds this waveform to the existing audio signal. The `phasor_fm` node uses the existing audio signal to modulate the frequency of its ramp waveform, allowing for more complex and evolving modulation effects.




