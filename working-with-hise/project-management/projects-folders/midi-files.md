---
keywords: MidiFiles
author:   Christoph Hart
summary:  Explains the MidiFiles Folder
index:    08
---


HISE has a generic [Midi Player](/hise-modules/midi-processors/list/midiplayer) module that allows playback of any arbitrary MIDI sequence. The data source for this module are standard MIDI files from this directory. These files are being loaded on startup, so if you add new MIDI loops, you might have to restart HISE or reload the pool to see the new file.

Be aware that the MIDI files are read-only - any modification that you will do to MIDI sequences will only affect the local copy and not being written back into the pooled versions - the only way to get the modified versions into the outside world is dragging them into a DAW.