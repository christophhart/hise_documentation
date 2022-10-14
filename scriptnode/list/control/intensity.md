---
keywords: intensity
summary:  Apply the infamous HISE Gain modulation logic to a modulation signal
author:   Christoph Hart
modified: 03.07.2022
parameters:
- Value: The input value (supposed to be connected to the original source)
- Intensity: how much the input value should affect the output value using the formula
---
  
The gain modulation in HISE is affected by the intensity controlled for each modulator.

You can emulate this functionality with this node so that the intensity controls how much it should be "taken off" the full value. The actual formula for the calculation is:

```
output = (1.0 - intensity) + intensity * input
```
