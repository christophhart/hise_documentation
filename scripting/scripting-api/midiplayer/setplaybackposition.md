Similar to [`AudioSampleProcessor.setFile()`](/scripting/scripting-api/audiosampleprocessor#setfile), this will load a file into the MIDI player.

It uses the standard HISE syntax for [file references](/working-with-hise/project-management#project-folder-wildcard). The other arguments let you choose

- whether you want to clear the existing sequences or add this to the end of the list of "loaded" sequences. You can switch between multiple sequences on the fly (even during playback), so if you want to use this feature, you need to add multiple sequences by setting this flag to `true`.
- whether you want to set the newly loaded sequence to be played back or keep the current sequence in the playback slot.

