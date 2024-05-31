---
keywords: global_mod
summary:  A node that receives the modulation signal from a HISE global modulator
author:   Christoph Hart
modified: 31.05.2024
parameters:
  Index: the index of the modulator. This is the index in the list of all global modulators (aka the position in the Global Modulator Chain). You can use this parameter to control which global modulator you want to receive.
---
  
There are many ways to funnel an external (modulation) signal into a scriptnode network and one of them is using this node in order to pick up the signal created by one of the global modulators.

> If you use this node you will not be able to compile your network to a hardcoded FX.
