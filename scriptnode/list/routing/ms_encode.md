---
keywords: ms_encode
summary:  Encodes a L-R signal to M-S
author:   Christoph Hart
modified: 04.07.2022
---

The `routing.ms_encode` node is used in audio processing to encode a stereo audio signal into a mid-side (MS) stereo signal, allowing manipulation of the stereo image, width, and balance. 

To use the `routing.ms_encode` node, you would typically place it in a processing chain with the stereo input you want to encode, and then use a `container.multi` node to split the signal into its mid and side components. You can then process the components separately and recombine them using a `routing.ms_decode` node placed later in the chain.