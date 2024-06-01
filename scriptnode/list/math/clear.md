---
keywords: clear
summary:  Silences the output of the signal
author:   Christoph Hart
modified: 01.06.2024
parameters:
  - Value: Unused (stub from the other math operators being created with the same base node)
---
  
This node will clear the signal so that it will not be passed on to the next nodes (or further processing down the signal chain). This is extremely useful if you're creating some kind of control signal, which must not end up in the actual audio path.

> Also during development, it might be a good idea to have a clear node at the end of the processing chain and disable it once you actually want to hear something.

