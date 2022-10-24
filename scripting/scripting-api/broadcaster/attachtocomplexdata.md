If you want the broadcaster to be notified whenever an event occurs with a complex data type (SliderPacks, Tables or AudioFiles), you can use this method to attach the broadcaster to one or more data objects.

> In order to attach a broadcaster to a complex data object using this method, it needs to have exactly 3 arguments defined in its `args` metadata property.

The first arguments `dataTypeAndEvent` is a String that describes the event type and datatype you want to listen to. The syntax for the string is `DataType.EventType` with the following options for the `DataType` part:

- `SliderPack`
- `Table`
- `AudioFile`

and the following options for the `EventType` part:

- `Display`: changes to the "displayed index": the ruler in the table / playback position in the audio file / the last active slider in the slider pack
- `Content`: changes to the content: adding / removing table points, editing slider values, loading new audio files / changing the playback range

The `moduleIds` argument is either a String or an Array of Strings with the processor IDs that are holding the data types.  
The `dataIndexes` argument is either an integer index (zero based) or an array of zero based integers for each data type.

> This means that the amount of data types that you attach the broadcaster to is defined by   `NumberOfModules * NumberOfIndexes`.

`optionalMetadata` is a metadata object used by the broadcaster map.

```javascript
// You need three arguments 
const var bc = Engine.createBroadcaster({
	"id": "Complex Data Listener",
	"colour": -1,
	"args": ["processorId", "dataIndex", "value"]
});

bc.attachToComplexData("Table.Display", 
					   ["LFO Modulator1", "LFO Modulator2"], 
					   0, 
					   "Connect to 2 LFO table rulers");

bc.attachToComplexData("SliderPack.Content",
					   "Arpeggiator1",
					   [0, 1, 2],
					   "Connect to changes for every slider pack of an arp");
	   
bc.attachToComplexData("Table.Content",
					   ["Table Envelope1", "Table Envelope2"],
					   [0, 1],
					   "Connect to table edits for every table 
					   (attack & release) for two table envelopes");
```

Once you've attached a broadcaster to a complex data object, it will call the registered listeners once the event happens. The three arguments will contain these values:

- `processor`: the processor ID as a string that holds the complex data object that caused the event
- `index`: the index within the processor (!= the registered index!) of the object that caused the event
- `value`: depending on the event type, either the display value as normalised double number (0...1) or a string representation of the data (eg. Base64 representation of the table data).