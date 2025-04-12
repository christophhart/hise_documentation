---
keywords: jcompressor
summary:  A wrapper around a standard compressor algorithm from the JUCE codebase
author:   Christoph Hart
modified: 30.05.2024
parameters:
- Treshold: Sets the threshold in dB of the compressor.
- Ratio: Sets the ratio of the compressor (must be higher or equal to 1).
- Attack: Sets the attack time in milliseconds of the compressor.
- Release: Sets the release time in milliseconds of the compressor.
---
  
This node wraps the [compressor](https://docs.juce.com/master/classdsp_1_1Compressor.html) class from the JUCE codebase and provides a very simple and lightweight compressor algorithm. It probably won't hold up as a dedicated effect (like most of the FX algorithms in HISE) but can be used for quickly changing the dynamics of a signal.

The modulation output will send the gain reduction as a signal that can be used to visualize the compressors behaviour on your UI.