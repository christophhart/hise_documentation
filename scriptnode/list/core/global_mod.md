---
keywords: global_mod
summary:  A node that receives the modulation signal from a HISE global modulator
author:   Christoph Hart
modified: 31.05.2024
parameters:
  Index: the index of the modulator. This is the index in the list of all global modulators (aka the position in the Global Modulator Chain). You can use this parameter to control which global modulator you want to receive.
  Value: The "base" value. Ideally you would connect this to a root parameter which controls the parameter before the modulation signal is applied.
  ProcessSignal: whether you want to inject the modulation signal into the audio stream. If you want to further process this before applying the modulation somewhere this might be useful, but by default it's deactivated and it expects you to to connect the modulation output to a once-per-buffer update.
  Mode: This can be used to control whether the modulation should be applied using the Scale or Unipolar / Bipolar mode.;
  Intensity: Controls the intensity of how much the global modulation signal is applied to the output.
---
  
There are many ways to funnel an external (modulation) signal into a scriptnode network and one of them is using this node in order to pick up the signal created by one of the global modulators.

Depending on your project architecture, it might make more sense to use a [extra_mod](/scriptnode/list/core/extra_mod) node instead of this node and then add global modulators or matrix modulators to the extra modulation chain, but if you want to "hardwire" a single global modulation connection to a target within your DSP network, this might come in handy.

> Note that before HISE 5.0 this note was not compileable, but that has changed now and it will properly connect to global modulators in a compiled C++ node now.