---
keywords: event_data_reader
summary:  Read the additional event data in a DSP network
author:   Christoph Hart
modified: 21.05.2024
parameters:
- SlotIndex: The data slot index that should be read
- Static: Whether to read the value once at the note on message processing or for every buffer
---
  
This node lets you create a modulation signal out of the additional data that is stored per event. Just pick a slot index and it will read the values from the data storage depending on the event that was processed last.

> In order for this to work, this node needs to be put in a MIDI processing context and the global routing manager has to be initialised externally.

The node operates in two different modes depending on its **Static** parameter:

1. If **Static** is off, then it will continuously read out the event data of the last event ID that was processed for each buffer and send out a modulation signal whenever this changes. This works polyphonically, so if you play multiple voices, it will correctly read out the values of the ID that started each respective voice.
2. If **Static** is enabled, then it will only send a (single) modulation value to its targets when the event is processed and there was a value written to the matching event ID and slot index.

So basically it replicates the behaviour of the EventData Voice Start Modulator (Static == On) and the EventData Envelope (Static == Off).

This node can be compiled within a DLL network as it does not depend on dynamic connections.

> Take a look at the series of examples in the snippet browser called `Custom Event Data ...` for an introduction use case of this concept.
