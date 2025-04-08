This can be used to attach a function (or [Broadcaster](/scripting/scripting-api/broadcaster)) to be notified whenever the MIDI assignments change). The events that cause this call back are:

- adding / removing connections through the context menu selection
- when MIDI learn is active and a suitable MIDI message was received
- removing connections with the [MidiLearnPanel](/ui-components/floating-tiles/plugin/midilearnpanel).
- calling [MidiAutomationHandler.setAutomationDataFromObject()](/scripting/scripting-api/midiautomationhandler#setautomationdatafromobject)
- loading user presets (this includes the initial preset)

> Note that changing the properties of a connection (eg. the range) in the MIDI learn panel does not send an update message.

Whenever one of these events is happening, it will **asynchronously** call this function. It expects a callable object with a single parameter which contains the JS array with JSON objects exactly as returned by [MidiAutomationHandler.getAutomationDataObject()](/scripting/scripting-api/midiautomationhandler#getautomationdataobject).

```javascript
const var mh = Engine.createMidiAutomationHandler();

mh.setUpdateCallback(function(obj)
{
	Console.print(trace(obj));
});
```

> Never call [MidiAutomationHandler.setAutomationDataFromObject()](/scripting/scripting-api/midiautomationhandler#setautomationdatafromobject) inside this function or it will cause an endless loop of callbacks! Note that trying to outsmart this rule by using a simple recursion protection would not work as the update message is asynchronous.

```javascript
const var mh = Engine.createMidiAutomationHandler();

// This freezes your computer.
mh.setUpdateCallback(function(obj)
{
	obj[0].Start = 0.5;
	mh.setAutomationDataFromObject(obj);
});

var recursion = false;

// Good idea and extra points for using scoped statements,
// but this freezes your computer too because the update message
// will be called asynchronously...
mh.setUpdateCallback(function(obj)
{
	if(!recursion)
	{
		.set(recursion, true);
		
		obj[0].Start = 0.5;
		mh.setAutomationDataFromObject(obj);
	}
});
```