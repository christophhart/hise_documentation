---
keywords: Event Data Modulator
summary:  Creates a constant modulation value based on the event data written through the global routing manager.
author:   Christoph Hart
modified: 21.05.2024
parameters: 
- SlotIndex: the index of the data slot from 0 to 16
- DefaultValue: the value that should be used when the event data hasn't been written yet
---
  
The Event Data Modulator is a simple helper tool that allows you to pickup the custom data value written to one of the additional data slots using either the scripting API call [GlobalRoutingManager.setEventData()](/scripting/scripting-api/globalroutingmanager#seteventdata) or the [routing.event_data_writer](/scriptnode/list/routing/event_data_writer) node.

It is a voice start modulator, which means that it will fetch the value once when the voice is started. For a time-varying polyphonic value, take a look at the Event Data Envelope.

> Take a look at the series of examples in the snippet browser called `Custom Event Data ...` for an introduction use case of this concept.
