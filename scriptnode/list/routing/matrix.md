---
keywords: matrix
summary:  Applies a channel matrix to the input
author:   Christoph Hart
modified: 04.07.2022
---

The `routing.matrix` node is a node that allows you to specify the channel routing between different audio signals in a DSP network. It allows you to specify the number of input and output channels, and provides a matrix for connecting the input channels to the output channels.

By using the `routing.matrix` node, you can control how audio signals are routed between different processing stages in your network. For example, you could use the `routing.matrix` node to route a mono input signal to multiple output channels, or to route multiple input signals to a single output channel.

The matrix will automatically detect the number of input and output channels, and you can use it to connect the input channels to the output channels. Simply click on the cells in the matrix to add or remove connections between the input and output channels.

Additionally, you can use the shift click to add send connections, which allows you to create additional connections from the input to the output channels. This can be useful when you want to route the same input signal to multiple output channels.
