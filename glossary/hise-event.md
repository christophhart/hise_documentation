---
keywords: HISE Event
summary:  What you need to know about HISE events
author: Christoph Hart

---



[HISE Event](/cpp_api/hise/classhise_1_1_hise_event) in the C++ API.


### Artificial Events

First of all we need to distinguish between real and artificial events - I am sure you know this already, but at some fictional point in the future somebody else might read this :):

**Real Events** are actual MIDI events coming into HISE either from your MIDI keyboard, the sequencer (or the onboard virtual keyboard).
**Artificial Events** are created by scripts.

1. ONLY ONE ACTIVE "REAL" NOTE ON EVENT PER NOTE NUMBER
There is only one real note on event active at the same time in a valid scenario. If you hold the sustain pedal and repeat the note, the note offs will still invalidate the note ons (=delete them from the queue), but the voices won't be killed until the pedal release. The only case where you have multiple note ons is when you have overlapping notes in the sequencer (or you start the sampler playback in the middle of a note). In this case the second note on and note off will be ignored before they slip into HISE at all.

2. MULTIPLE ARTIFICIAL EVENTS
You can have multiple artificial events (events which are created by a script). You can create artificial events in every sound generator, so there are many cases where two artificial note on events with the same note number need to be stored. The only robust way to handle artificial note ons is by adressing them via event ID, which will be provided when you create a note on artificially.

3. NEVER KILL REAL EVENTS
You must never try to kill real events artificially (I added a safe check that throws a script error if you try to do this). This eliminates a big chunk of weird edge cases.

Why is this important? As soon as you call `Synth.addNoteOffFromEventId()` with a real event ID, it will invalidate the note on event (=delete them from the queue). At the time the real event comes in, it would be ignored and the note off callback will never be called for this event because calling Synth.addNoteOffFromEventId() won't trigger a callback in the same script for safety reasons.
The solution is pretty easy: As soon as you are tinkering with artificial notes, use the new `Message.makeArtificial()` in the onNoteOn and onNoteOff callback. It will create an artificial copy of the current event (with a new event ID in case of a note on and a matching event ID in case of a note off) and swap the message (so that other script processors will also get the new event). This makes the event types consistent and removes the issues described above (since the original message will be untouched, it still triggers the onNoteOff callback.

#### Implementation
So internally, real events are stored in a simple array and adressed via note number (this yields the lowest overhead). Artificial events are stored in a array of fixed-sized stacks (currently 16) and also adressed via note number. This slightly increases the overhead for the scripting call `Synth.noteOffFromEventId()` because it has to do more searching, but allows multiple artificial notes with the same note number being active at the same time.

With this system it should be possible to write pretty robust and encapsulated MIDI scripts. However it might break older scripts (I had to change the Legato Retrigger Script for example).
