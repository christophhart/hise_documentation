---
keywords: hise_mod
summary:  A glue node between the HISE modulation system and scriptnode
author:   Christoph Hart
parameters: 
- Index: The modulation source you want to use (Pitch, Extra1, Extra2)
modified: 01.09.2019
---
  
This node can be used to fetch the modulation data of a Scriptnode Synthesiser and control parameters in scriptnode with the signal.

There are three chains available:

- the pitch modulation
- two additional modulation chains (**Extra 1** and **Extra 2**)

### Pitch Modulation

Any pitch modulator you add in HISE will not affect the pitch in a scriptnode network by default (unlike the Gain Modulation and FX). If you want to process pitch modulators, add this node and connect it to the respective parameter:

- for the [`core.oscillator`](/scriptnode/list/core/oscillator) node, use the **FreqMultiplier** parameter (make sure to set the `OpType` of the connection to `Multiply` if you've set another value than 1

> Be aware that you can't scale this signal - it contains the original pitch modulation and will be forwarded to any node that processes pitch information

### Extra Modulation

If you want to control other parameters with a modulation chain, you can use one of the two Extra Chains provided in the Scriptnode Synthesiser. 
The procedure is a little bit similar to the [Global Modulator System](/hise-modules/sound-generators/list/globalmodulatorcontainer) in HISE in the sense that 
you can add multiple of these nodes to different targets, however it yields the bonus that it also supports Envelope Modulators (the reason is that the voice management system is deeply coupled to the envelopes so it's impossible to "detach" them).

> The signal will be normalised to 0...1 and you can use the range scaling, different operators and even SNEX expressions to modify the value send to the target.

### Performance Considerations

By default, the modulation value will be sent once per block to keep the CPU usage down (it is deactivated in the single sample processing mode because it would be very ineffective).  
However, if you want to increase the resolution, try the [`container.fix32_block`](/scriptnode/list/container/fix32_block), which will divide the incoming signal
into chunks of 32 samples (which is only 4x below the "native HISE modulation resolution").