This will register the broadcaster to be notified whenever a sample map is changed. There are three event types that can be selected. A broadcaster that is supposed to be attached to sample maps needs 3 arguments and will fire callbacks with these arguments:

- `eventType` - the event type string (see below)
- `samplerId` - the ID of the sampler that caused the event
- `data` - a event-specific data argument (see below)

```javascript
const var b = Engine.createBroadcaster({
	id: "sampleListener",
	args: ["eventType", "samplerId", "data"]
});

b.attachToSampleMap("Sampler1", "SampleMapChanged", "");

b.addListener("", "funky", function(eventType, samplerId, data)
{
	Console.print(data);
});
```

> Note that using a broadcaster for listening to sample map changes is the best practice going forward and replaces the usage of the [ScriptPanel.setLoadingCallback()](/scripting/scripting-api/scriptpanel#setloadingcallback) function for this task.

These are the different event types:

| Type | Description | data argument |
| ---- | --- | --- |
| `SampleMapLoaded` | Whenever a sample map is loaded (or cleared). | the reference string as it goes into [Sampler.loadSampleMap()](/scripting/scripting-api/sampler#loadsamplemap) |
| `SamplesAddedOrRemoved` | Whenever a sample was added to (or removed from) the current samplemap | the current number of samples. |
| `SampleChanged` | Whenever a sample property has changed | A JSON object with the sample information (see below). |

The `eventTypes` argument will expect either the `Type` string or an array with multiple type strings from the table above with all event types that the broadcaster should listen to. 

The `samplerIds` argument should be either a String of the sampler ID (or an array of strings for every sampler)  that you want to listen to.

### Sample changes

If you want to listen to sample property changes (like changing the sample start or the low velocity), the values that you should pass into the `eventTypes` argument is not the `"SamplesChanged"` string, but one of the constants of the [Sampler](/scripting/scripting-api/sampler) API object.

In this mode, the `data` argument will be a JSON object with these properties:

- a `sound` property that holds a reference to a [Sample](/scripting/scripting-api/sample) object.
- an `id` property that holds the magic number of the property (query this against the Sampler constants).
- a `value` property that will contain the value of the property change.

```javascript
b.attachToSampleMap("Sampler1", [ Sampler.LoKey, Sampler.HiKey ], "");

b.addListener("", "funky", function(eventType, samplerId, data)
{
	if(data.id == Sampler.LoKey)
	{
		Console.print("Changed low key to " + data.value);
	}
	if(data.id == Sampler.HiKey)
	{
		Console.print("Changed high key to " + data.value);
	}
});
```
