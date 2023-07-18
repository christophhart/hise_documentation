---
keywords: selector
summary:  dynamically route input channels to output channels
author:   Christoph Hart
modified: 18.07.2023
parameters:
 - ChannelIndex: The first source or target channel index that is used for the routing
 - NumChannels: How many channels you want to route. This must be less than the number of available channels
 - SelectOutput: If `true`, it will route the first `NumChannels` input channels to the output channels using the `ChannelIndex` as offset. If `false`, it will route `NumChannels` input channels at the offset `ChannelIndex` to the first `NumChannels` output channels.
 - ClearOtherChannels: If `true`, it will clear all other channels that are not routed, otherwise it will just add it to the existing signal.
---
  
This node allows you to create dynamic routing configurations - for static routing setups the [routing.matrix](/scriptnode/list/routing/matrix) node might be a better match. You can either route an arbitrary amount of input channels to the first output channels or the first X input channels to any output channel.

The graph of the connections will show exactly what's going on:

| Graph | Description |
| --- | ---- |
| ![](/images/scriptnode/selector3_1.png) | Route the third input channel to the first output channel. |
| ![](/images/scriptnode/selector12_34.png) | Route the first input pair to output channel 3/4. |
| ![](/images/scriptnode/selector1_2.png) | Copy the left channel to the right channel. |




