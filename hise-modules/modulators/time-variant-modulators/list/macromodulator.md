---
keywords: Macro Modulator
summary:  A Modulator that uses the value of a macro control as modulation signal.
author:   Christoph Hart
weight:   70
modified: 18.03.2019
parameters:
- MacroIndex: the index of the macro control that is used by this module. If you're using the module UI, just select one in the drop down box, but if you're manually setting this parameter be aware that it starts with 1.
- SmoothTime: smoothes the parameter changes (just like with the Control Modulator). 
- UseTable:   you can enable a Table to process the incoming macro value to add extra control over the range.
- MacroValue: this just holds the current value so you can grab it if you want to display it in some kind.
---
  
The Macro Modulator is another way of using the [Macro Control System](/glossary/macrocontrols). It is useful if:

1. you want to smooth the changes of the macro value in order to remove zipper noises
2. you want to change the range with a table

The way you use it is remarkably similar to a [GlobalTimeVariantModulator](/hise-modules/modulators/time-variant-modulators/list/globaltimevariantmodulator), but instead of the global modulation value, it will fetch the "global macro value".