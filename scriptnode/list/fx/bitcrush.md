---
keywords: bitcrush
summary: A bitcrusher effect node for adding digital distortion.
author: Christoph Hart
modified: 30.05.2024
parameters: 
  - BitDepth: Controls the bit depth reduction. Lower bit depths produce more pronounced distortion.
  - Mode: Selects the mode of operation for the bitcrusher.
---

The `bitcrush` node is an audio effect that applies bit reduction to the incoming audio signal, resulting in digital distortion. This effect is commonly used to create lo-fi, gritty sounds characteristic of early digital audio. By snapping the input signal towards a stepped curve, some quantization noise is added, which creates the characteristic "crushed" sound.

The `bitcrush` node supports multiple voices, making it suitable for polyphonic applications. Each voice can have its bit depth controlled independently.

### Modes

There are two available modes that the bit crusher can operate that have subtle differences: **DC Offset** and **Bipolar**. This screenshot shows the difference in the ramp using two oscilloscopes:

![](/images/custom/scriptnode/bitcrush_modes.png)

The difference comes down to how the quantisation is calculated: With the **DC Offset** mode, it rounds up the values using the `ceil` operator and in the Bipolar mode it rounds the values using the `floor` operator. This yields two differences:

1. In the **DC offset** mode, there is no silence (you can see in the graph that it jumps from a negative value to a positive value). Hence the name: it always introduces a DC offset.
2. In the **Bipolar** mode, it rounds the signal towards the smaller number, so that quiet signals will be rounded to silence. This removes the DC offset (which is a bit annoying to deal with), however, the output itself is a bit quieter and the total number of steps is one smaller than with the **DC Offset** mode.

In most cases you might want to use the **Bipolar** mode.