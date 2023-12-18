If you're doing any kind of time-manipulation in your MIDI processing, you might end up with a scenario where a note on message is scheduled after its respective note-off message (and with respective note-off message I'm talking about the note-on message with the same event ID). There are usually two reasons for this: either because you're calling [`Synth.addNoteOn()`](/scripting/scripting-api/synth#addnoteon) with a positive timestamp or [`Message.delayEvent()`](/scripting/scripting-api/message#delayevent) with an existing event.

The default behaviour of HISE until now was that it was simply your problem to deal with that and if you've created a note-on in the future, the only way to prevent it from creating a stuck note is to make sure that the note-off has a timestamp bigger than the note-on.

That's where this method comes in handy. Just call this once in your `onInit` script of the script that does the processing and it will magically solve this problem with two safe checks:

1. If a note-off message is about to be processed, it will look in the event queue of scheduled events if there is a note-on message with the same ID but a bigger timestamp and then cancel this event.
2. If you call any of the API methods that create an artificial note-off, it will also check the queue for future note-on events and perform the same check.

The first check solves hanging notes from `Message.delayEvent()` and the latter will solve all issues with artificial note pairs having the wrong timestamp order.

> Important: this is a per-sound generator setting, so calling it in your Interface script will not affect the MIDI processing of the child sound generator that actually does the MIDI manipulation!


