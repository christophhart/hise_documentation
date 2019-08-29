This is the first step of three when you want to process the content of a MIDI Player.  
It creates an array of [`MessageHolder`](/scripting/scripting-api/messageholder) objects which 
can be used to transform the MIDI data.

The event ID of the events will be created consecutively and the events are sorted chronologically. 
You can find the matching note-off event to a note-on event using something like this:

```javascript
inline function getNoteOff(list, noteOn)
{
    for(e in list)
    {
        if(e.isNoteOff() && e.getEventId() == noteOn.getEventId())
            return e;
    }
}
```

The timestamp will be using the current samplerate and host BPM tempo to convert the relative 
MIDI timing to absolute sample positions. Be careful to never change the order of a note-on / note-off pair, otherwise the results will be very weird.

> There are a few new helper functions in the `Engine` class to help you converting between the domains (search for `QuarterBeats`)

Also make sure to call [`flushMessageList()`](/scripting/scripting-api/midiplayer#flushmessagelist) after finishing the processing to apply the changes.