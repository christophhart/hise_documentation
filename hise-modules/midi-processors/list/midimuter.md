---
keywords: MidiMuter
summary: Mutes incoming messages.
parameters:
- ignoreButton: If this is true, then all incoming note on messages (and controller events) will be ignored. If this parameter is activated when notes are being played, it will let the "open" note-off messages pass in order to avoid stuck notes.
- fixStuckNotes: this is a deprecated parameter (it forces ignoring of all events), but you shouldn't need it anymore.
---

This module can be used to mute a sound generator on MIDI level. The advantage over just bypassing the sound generator is that it won't affect ringing notes so it's a preferable solution in applications where you want to dynamically enable and disable sound generators.

If **IgnoreAllEvents** is true, no new notes are being played (however the note-off messages of active notes will get forwarded to avoid stuck notes).


