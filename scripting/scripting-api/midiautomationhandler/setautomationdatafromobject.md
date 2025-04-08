This can be used to modify the list of MIDI assignments programmatically. It expects an array of JSON objects with the exact format as described in the method above and will replace all MIDI assignments with this data and send an update message to the [MidiLearnPanel](/ui-components/floating-tiles/plugin/midilearnpanel) and any attached [callback](/scripting/scripting-api/midiautomationhandler#setupdatecallback).


```javascript
function modifySecondController()
{
	// grab the existing list
	var list = mh.getAutomationDataObject();
	
	// set the second range start to 50%
	list[1].Start = 0.5;
	
	// send the list back to the automation handler.
	mh.setAutomationDataObject(list);
}
```
