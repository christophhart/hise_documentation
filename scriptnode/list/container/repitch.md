---
keywords: container.repitch
summary:  Processes the internal processing chain with a different sample rate
author:   Christoph Hart
modified: 03.01.2024
parameters:
- RepitchFactor: The internal pitch ratio.
- Interpolation: the interpolation algorithm used for the resampling
---
  
This container node will resample the audio signal and process its child nodes using a different sample rate. There are various use cases for this functionality:

- "change" the frequency response of static nodes (eg. convolution reverbs or neural networks). By resampling the audio you can effectively interpret the signal as having another pitch so if you can't change the frequency response of the node, this will simulate a different response. You can try this by adding a highly resonant svf filter and then process some noise through it.
- change the time response of delay based effects.
- introduce artificial resampling artifacts. There are three interpolation types available: Cubic, Linear and None so if you want to create some nasty digital distortion, pick None.

The pitch factor will determine how the signal is being resampled internally. A factor `> 1.0` will upsample the internal signal so it will be processed as if it would have a **lower frequency** and a factor `< 1.0` will do the opposite. The pitch factor is limited to a range of an octave, but if you need more, you can stack them in each other.