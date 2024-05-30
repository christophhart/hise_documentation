---
keywords: sampleandhold
summary:  a sample and hold node for naive downsampling of the signal
author:   Christoph Hart
modified: 04.07.2022
parameters:
  - Position: The position in the stereo field from full left to full right.
---
  
The `fx.sampleandhold` node samples the input signal at intervals determined by the Counter parameter. Setting the Counter to 4 samples the input every 4 samples and holds the value until the next sample. A Counter of 1 samples the input on every sample, effectively disabling the hold function. The Counter parameter is set using an integer value."

Sample and hold (S&H) blocks are commonly used in audio processing to create certain effects:

- Glitch effects: By rapidly sampling and holding small sections of audio, a sample and hold block can create stuttering or glitching effects.
- Lo-fi effects: By sampling the audio at a lower rate and then holding the sample for a longer period of time, a sample and hold block can create a lo-fi, degraded sound similar to that of an old cassette tape.
- Noise reduction: In some cases, a sample and hold block can be used to reduce noise in a signal by sampling and holding the signal at a low rate and smoothing out any fluctuations.

