---
keywords: ramp
summary:  A ramp signal generator that produces a ramp waveform, which can be used as a modulation source in audio effects.
author:   Christoph Hart
modified: 30.05.2024
parameters:
- PeriodTime: The duration of one complete cycle of the ramp signal in milliseconds (range: 0.1 to 1000.0 ms, default: 100.0 ms).
- LoopStart: The point in the ramp cycle (normalized between 0.0 and 1.0) at which the signal will restart (default: 0.0). By adjusting this parameter, you can create non-linear ramp cycles that jump back to an earlier point in the ramp before completing a full cycle. The default value is 0.0.
- Gate: Controls the activation of the ramp generator. When the gate is set to 1, the ramp signal is active and progresses according to the period time. When set to 0, the ramp generator is disabled, and the output remains static. The default value is 1.
---

The `ramp` node generates a ramp signal that can be used as a modulation source for other audio processing nodes. This node is polyphonic, allowing it to handle multiple voices simultaneously. The ramp signal progresses linearly from 0 to 1 over a specified period and then loops back to the start. This behavior makes it useful for creating periodic modulation effects.

The ramp signal resets based on the `LoopStart` parameter, allowing for the creation of custom loop points within the ramp cycle. The `Gate` parameter provides a simple way to enable or disable the ramp signal, making it easy to control modulation dynamically.

> Be aware that the ramp generator is both a modulation source as an audio generation node - it adds the generated ramp signal to the audio signal so you can use a waveshaper in the signal flow to create different modulation signals.