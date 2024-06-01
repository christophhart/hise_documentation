---
keywords: math
summary:  math operator nodes that perform a math function on the audio signal
author:   Christoph Hart
modified: 24.06.2019
---

The nodes in this category will perform a math operation on the signal. Most signal processing functions can be boiled down to simple math operations:

- changing the volume is a multiplication of the signal
- multiplying with `-1` is changing the phase of the signal by 180°.
- adding a constant to the signal is creating a DC offset

Most of the nodes have a single parameter called **Value** which will act as scalar operand of the respective math function. Note that with some nodes, this **Value** parameter does not have any function at all (eg. with the [clear](/scriptnode/list/math/clear) node), but it's still added to the node for code organisational purposes.

