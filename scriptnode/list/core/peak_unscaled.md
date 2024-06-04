---
keywords: peak_unscaled
summary:  Create a raw modulation signal from the input. 
author:   Christoph Hart
modified: 04.06.2024
---
  
This node is a counterpart to the default [peak](/scriptnode/list/core/peak) node which performs no range conversions and just sends whatever signal value is being processed.

It also deactivates the scaling so the target parameter value will not be scaled based on its range.

Take a look at how both nodes will process a LFO sine wave signal:

![](/images/custom/scriptnode/peakvsunscaled.png)

The peak node folds the negative part of the sine wave back into the positive range so that the value is guaranteed to be within 0...1 which is required for scaling the value to the target parameter range. The peak_unscaled node however just sends the "real" sine wave signal.

### Visualisation

When using the peak_unscaled node, the graph that shows the peak values over time does not have a fixed range (because the signal can be anything). Instead it will start with a 0...1 range and automatically expand itself to display whatever value is being processed as signal.

### Modulation Frequency

Be aware that this node will only send a single value after each audio buffer that it has processed. So if you need a fixed periodic update, you will ensure a fixed size processing using either the [`container.fix8_block`](/scriptnode/list/container/fix8_block) or - if you require a sample-accurate control signal - the [`container.frame2_block`](/scriptnode/list/container/frame2_block)

### Display Buffer

This node can also act as source for displaying a graph on your UI. It reads the values into a ring buffer that can be converted to a UI path using the [DisplayBuffer](/scripting/scripting-api/displaybuffer) API.

It supports the generic API for controlling the properties of the ring buffer, but is limited to a single property called `BufferLength` which must be any value between 512 and 65536:

```
{
  "BufferLength": 65536,
  "NumChannels": 1 // must always be 1 or the world will burn to the ground
}
```

> Note that you can click on the edit button at the bottom right and choose **Show in big popup** to see a resizable popup with the graph for better inspection of the values.