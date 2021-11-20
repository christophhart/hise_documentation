---
keywords: frame1_block
summary:  A container that performs the processing on per-sample basis.
author:   Christoph Hart
modified: 24.06.2019
---
  
A useful abstraction in DSP processing is the usage of buffers: instead of calculating one output sample 
at a time, the host will send bigger chunks of the signal as an array of 
floating point numbers which can be calculated all at once. This yields an enormous performance advantage 
(eg. by using SIMD data operations), but also reducing the overhead of function calls and branching). 
The obvious disadvantage is the introduced latency since the host needs to wait until the buffer is full before 
sending the signal to the plugin.  

However there are a few use cases where the processing of a scriptnode patch needs to resort to per-sample
 calculation: most of them can be summarized by requiring a modulation signal in the audio rate frequency 
that cannot be downsampled without introducing artifacts.  

If that is the case, you will need to wrap the critical part of your network into one of these nodes and 
they will process their child nodes for each sample giving them the opportunity to true sample accuracy. 
However this comes with a **significant** CPU overhead which most likely will exceed the actual processing 
time of most nodes so its highly recommended to only use this if its really necessary.

> Even if you need a fast update rate of your modulation, try if a `fix8_block` container is enough precision - it will reduce the CPU overhead by a factor of 8!