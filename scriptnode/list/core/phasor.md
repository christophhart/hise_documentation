---
keywords: phasor
summary: An oscillator that creates a naive ramp signal from 0 to 1.
author: Christoph Hart
modified: 30.05.2024
parameters:
  - Gate: Controls whether the oscillator is active (1) or inactive (0). When inactive, the oscillator's output is muted.
  - Frequency: Sets the frequency of the oscillator in Hz. (range: 20.0 to 20000.0 Hz, default: 220.0 Hz)
  - FreqRatio: A multiplier applied to the base frequency, allowing for easy creation of harmonic frequencies. The range is from 1.0 to 16.0, with a default of 1.0.
  - Phase: Sets the starting phase of the ramp waveform. A value of 0.0 starts the waveform at the beginning, while 1.0 starts it at the end. The range is from 0.0 to 1.0, with a default of 0.0.
---

The `phasor` node generates a ramp signal that progresses linearly from 0 to 1, cycling at a user-specified frequency. This signal is added to the existing audio signal and can be used as a modulation source or basic audio waveform.

> Please note that the `phasor` node does not include any anti-aliasing algorithms and is rather suitable as a starting point for further synthesis (table lookup, waveshaping, etc). If you intend to use the raw output of an oscillator, consider using the `core.oscillator` class, which provides inbuilt PolyBLEP aliasing.
