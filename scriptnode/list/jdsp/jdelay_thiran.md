---
keywords: jdelay_thiran
summary:  A interpolating delay line using the Thiran interpolation
author:   Christoph Hart
modified: 30.05.2024
parameters: 
- Limit: the maximum delay time (in milliseconds) that this effect can use. This will resize the delay buffers and will impact the memory usage of this node.
- DelayTime: the delay time (in milliseconds). This can be a non-integer value will use the interpolation algorithm specified by the node type for calculating the values between samples.
---
  
This is an interpolating delay line that uses a specific interpolation algorithm to smooth the sample position for non-integer delay values. It can be used to implement delay based modulation effects (chorus / flanger, etc).

Be aware that by default there is no smoothing applied to the delay time so if you want to control the delay time with a knob, either use a [smoothed_parameter](/scriptnode/list/control/smoothed_parameter) node between the Value parameter and the source or use the [fix_delay](/scriptnode/list/core/fix_delay) node that automatically applies smoothing.

> Note that whenever you want to use this for modulating delay effects, you will need to put this node (and the modulation source) into a [frame2_block](/scriptnode/list/container/frame2_block) container, otherwise the modulation updates will be dependant on the block size of the processing context.

### Interpolation algorithm

If you want to use different interpolation algorithms you can use one of the other variants of this node. The algorithms differ in sound quality and CPU performance so just pick the one that you prefer for your DSP network.

- [jdelay](/scriptnode/list/jdsp/jdelay) for the basic linear interpolation (LERP) algorithm.
- [jdelay_thiran](/scriptnode/list/jdsp/jdelay_thiran) for the [Thiran](https://docs.juce.com/master/structdsp_1_1DelayLineInterpolationTypes_1_1Thiran.html) algorithm
- [jdelay_cubic](/scriptnode/list/jdsp/jdelay_cubic) for the [cubic Langrange](https://docs.juce.com/master/structdsp_1_1DelayLineInterpolationTypes_1_1Lagrange3rd.html) interpolator.