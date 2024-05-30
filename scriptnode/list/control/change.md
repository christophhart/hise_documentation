---
keywords: change
summary:  Filters out repetitions of a signal
author:   Christoph Hart
modified: 07.04.2024
parameters:
  - Value: The input value to be filtered
---
  

The `control.change` node only sends a modulation signal when the input signal has changed. This can be useful for filtering out repetitions or eliminating unnecessary processing of unchanged values.

For example, if you have a control signal that is repeatedly sending the same value (eg. from a `core.peak` node), you can use the `control.change` node to only send a modulation signal when the value actually changes. This can help reduce unnecessary processing and improve the performance of your DSP network

