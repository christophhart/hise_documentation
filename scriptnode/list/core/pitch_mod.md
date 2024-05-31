---
keywords: pitch_mod
summary:  Sends the polyphonic pitch modulation of the Scriptnode Synthesiser to the DSP network
author:   Christoph Hart
modified: 31.05.2024
---
  
This node will receive the modulation signal of the pitch modulation chain of the Scriptnode Synthesiser. You can use it to allow HISE modulators control the pitch (just like with any other hardcoded HISE sound generator).

It will create a normalised signal and the best way to apply this is to modulate any **FreqRatio** parameter like shown in the screenshot above.

> You can right click on the parameter range editor and select a predefined range preset called **Freq Ratio Detune Coarse** which will map the 0...1 exactly to the -12 + 12 semitone range of the other HISE sound generators.
