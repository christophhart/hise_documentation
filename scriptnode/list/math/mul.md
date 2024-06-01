---
keywords: mul
summary:  Multiplies the signal
author:   Christoph Hart
modified: 01.06.2024
---
  
The Multiplication Node multiplies the incoming audio signal by a specified scalar value, allowing control over the amplitude.

The **Value** parameter determines the mulitplication factor (aka gain factor). If you want to control this parameter as decibel, you will need to use a [converter](/scriptnode/list/control/converter) node with the `db2Gain` mode.
