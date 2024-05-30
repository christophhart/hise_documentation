---
keywords: receive
summary:  Receives the signal from a `routing.send` node
author:   Christoph Hart
modified: 04.07.2022
parameters:
  - Feedback: The gain factor of the feedback signal
---

This node receives an audio signal that has been sent from a `routing.send` node. It is used to create dynamic signal chains and feedback loops.

To use the node, it must be connected to the corresponding send node in the network. The processing specifications, including buffer size, channel amount, and sample rate, must be the same for both nodes.

Once connected and properly configured, the `receive` node will receive and process the audio signal that has been sent from the send node. This allows for greater flexibility and customization in the audio processing chain, allowing for the creation of complex and dynamic audio effects.

It is important to note that the `routing.receive` node can only receive signals from a single `routing.send` node. If multiple `routing.send` nodes are used in the audio processing chain, a separate `routing.receive` node must be used for each `routing.send` node.

The **Feedback** parameter controls the amount of received signal added to the input, creating dynamic audio effects like delay or echo. It ranges from 0 (no feedback) to 1 (maximum feedback). When set to a value greater than 0, a portion of the received signal is added to the input before further processing. 

> It is important to use caution when using the feedback parameter, as excessive feedback can result in audio distortion or other unwanted effects. It is recommended to start with a low feedback value and gradually increase it until the desired effect is achieved.