---
keywords: logic_op
summary:  Perfom a logic operation on two input signals
author:   Christoph Hart
modified: 03.07.2022
parameters:
- Left: the left input
- Right: the right input
- Operator: the mode that this logic op operates in
---
  
This node allows you to perform a logic operation by turning each input signal into a bool value (by checking whether it's bigger than the mid point of the input). Depending on the logic mode, it will then send out either 0 or 1.

The logic modes itself should be pretty self-explanatory for everyone that is older than 12 years.

> Be aware that the modulation signal is triggered by changes in both left or right input - however there is an internal "uninitialised" state so at the first execution (after a reset() call) it will wait until both inputs have received a signal until sending out the logic result.