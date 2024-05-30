Using this method, you can attach more data to any event and fetch it later down the processing line. It doesn't directly attach the data to the event (as the size of the event is optimized down to the last bit without any overhead) but use a separate data model that allows the storage of up to 16 double precision numbers for each event.

Once you've written the data it can be retrieved by one of the following targets:

- the API call [getEventData()](/scripting/scripting-api/globalroutingmanager#geteventdata)
- the [EventData Modulator ](/hise-modules/modulators/voice-start-modulators/list/eventdatamodulator) 
- the [routing.event_data_reader](/scriptnode/list/routing/event_data_reader) node

> Take a look at the series of examples in the snippet browser called `Custom Event Data ...` for an introduction use case of this concept.