---
keywords: send
summary:  Send the signal to a target
author:   Christoph Hart
modified: 06.08.2021
---
  
This node creates a copy of the signal and sends it to one or more [targets](/scriptnode/list/routing/receive). There are two use cases for this node:

1. Dynamic signal chains using AUX effects
2. Feedback loops for certain DSP effects (eg. filter delay)

Be aware that the processing specifications (buffer size, channel amount and samplerate) have to be the same for connected send and receive nodes.