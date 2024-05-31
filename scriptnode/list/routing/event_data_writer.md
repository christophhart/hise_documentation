---
keywords: event_data_writer
summary:  Please enter a brief description.
author:   Christoph Hart
modified: 21.05.2024
parameters:
- SlotIndex: the data slot (from 0 to 16) where you want to write the value
- Value: the value to write
---
  
This node can be used to write additional data to any event - so basically the scriptnode version of the API method [GlobalRoutingManager.setEventData()](/scripting/scripting-api/globalroutingmanager#seteventdata).

Just connect the **Value** knob to any source (either another macro parameter or a modulation signal) and it will store that value into the given slot for the last event that was processed by the node. 

> In order for this to work, this node needs to be put in a MIDI processing context and the global routing manager has to be initialised externally.

The node remembers the last event that was processed and will subsequently write new values to the respective data slot for the given event. This can be a dynamic modulation signal and depending on what target you are using, you can implement a messaging system for polyphonic, event based value changes. It respects a polyphonic context, so that it will write the data to the event that started the voice.

Be aware that the value is written once per buffer. If you need a high-resolution update rate for this across different sound generators, you might want to set a minimum fix buffer size for the entire module graph with [Engine.setMaximumBlockSize()](/scripting/scripting-api/engine#setmaximumblocksize)

> Take a look at the series of examples in the snippet browser called `Custom Event Data ...` for an introduction use case of this concept.
