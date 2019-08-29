---
keywords: Create a MIDI Sequence
summary:  A short example how to programatically generate MIDI sequences.
author:   Christoph Hart
modified: 29.08.2019
---

This snippet shows you how to programatically create a MIDI sequency that can be played in a [Midi Player](/hise-modules/midi-processors/list/midiplayer)

The API is pretty low-level, so the first thing that we add is a helper function that writes a proper note (including note-on and off).
The arguments are pretty self-explanatory, the only thing to note is that the timing values are expressed as fraction of a quarter beat.

```javascript
function addNote(list, channel, number, velocity, position, length)
{
    var m = Engine.createMessageHolder();
    m.setType(m.NoteOn);
    m.setNoteNumber(number);
    m.setVelocity(velocity);
    m.setChannel(channel);
    m.setTimestamp(Engine.getSamplesForQuarterBeats(position));
    
    var o = Engine.createMessageHolder();
    o.setType(o.NoteOff);
    o.setNoteNumber(number);
    o.setChannel(channel);
    o.setTimestamp(Engine.getSamplesForQuarterBeats(position + length));
    
    list.push(m);
    list.push(o);
}
```

Using this function, we can create a simple array that contains all notes like this:

```javascript
// This will hold our note sequence.
var l = [];

// Add a bunch of notes
addNote(l, 1, 60, 127, 0, 1);
addNote(l, 1, 63, 127, 1, 0.5);
addNote(l, 1, 65, 127, 1.5, 0.2);
addNote(l, 1, 67, 127, 2, 0.5);
addNote(l, 1, 72, 127, 3, 1);
```

Now the rest is similar to what we've seen in the [API Documentation](/hise-modules/midi-processors/list/midiplayer#the-midi-processing-workflow):

```javascript  
// Get a reference to the MIDI player.
const var MIDIPlayer1 = Synth.getMidiPlayer("MIDI Player1");

// If the MIDI player doesn't have any content loaded, we
// need to create a empty sequence first
if(MIDIPlayer1.isEmpty())
{
    // Create one bar with 4/4 time signature
    MIDIPlayer1.create(4, 4, 1);
}

// Now we just pass the list to the MIDI player and let it create
// a proper MIDI sequence from it.
MIDIPlayer1.flushMessageList(l);
```