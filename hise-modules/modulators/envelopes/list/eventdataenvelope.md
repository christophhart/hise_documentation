---
keywords: EventData Envelope
summary:  An envelope modulator for time-varying event data slots
author:   Christoph Hart
modified: 22.05.2024
parameters:
- SlotIndex: The data slot that should be used to read the value
- DefaultValue: The value that should be used when there is no data written to the respective slot
- SmoothingTime: The smoothing that will be applied to the envelope signal
---
    
This envelope modulator will pick up the data written to the event data and create a time-varying modulation signal. This is one of the two options of reading a polyphonic, time-varying signal (the other one is the [routing.event_data_reader](/scriptnode/list/routing/event_data_reader) node in a scriptnode network).

> The resolution of this modulation signal is limited to the buffer size so depending on your projects requirements, you might want to limit the maximum buffer size using [Engine.setMaximumBlockSize()](/scripting/scripting-api/engine#setmaximumblocksize)

If you only need a constant modulation value per event, then use the [Event Data Modulator](/hise-modules/modulators/voice-start-modulators/list/eventdatamodulator) instead. 
  
> Take a look at the series of examples in the snippet browser called `Custom Event Data ...` for an introduction use case of this concept.
