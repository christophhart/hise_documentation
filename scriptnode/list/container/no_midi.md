---
keywords: no_midi
summary:  prevents child nodes from processing MIDI messages
author:   Christoph Hart
modified: 18.07.2023
---
  
There are a few nodes that will automatically process MIDI message to change their parameters:

- the [Oscillator](/scriptnode/list/core/oscillator) node will change the root frequency to match the MIDI note
- envelope nodes will set their gate parameter to on / off to match the key press state

If you want to process MIDI messages, you usually need to put these nodes into a [container.midichain](/scriptnode/list/container/midichain) node which will split up the incoming audio buffer for each midi message and do a sample accurate processing of the MIDI input. However in some contexts (eg. a polyphonic synthesiser), the MIDI processing is enabled **by default** so the only chance to disable the MIDI processing in these setups is to put the nodes into this container. 

> One of the most important use cases of this is to prevent an oscillator that you want to use as LFO to be set to the audio frequency whenever a note is played.