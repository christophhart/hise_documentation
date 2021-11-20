---
keywords: midichain
summary:  A container that enables MIDI processing for its children.
author:   Christoph Hart
modified: 06.08.2021
---
  
A scriptnode graph will process incoming MIDI messages depending on the context where it's being used: 
The default behaviour for an effect is no processing. However if some of your nodes need to react on incoming MIDI messages, you need to wrap them into one of these.

> Be aware that all other processing contexts (synthesiser, envelope, time variant modulator) will automatically forward the MIDI messages to any node.

In addition to just receiving the MIDI events, this chain will also split up the incoming signal into chunks depending on the MIDI input. So if for example a MIDI message with the timestamp 200 is received alongside a 512 sample buffer, it will process the input in this order:

1. Process the first 200 samples
2. Process the MIDI message
3. Process the last 312 samples

This allows a sample accurate modulation if you need to create a modulation signal from the MIDI input.