---
keywords: Audiofile
summary:  Please enter a brief description.
author:   Christoph Hart
modified: 09.06.2024
---
  
The Audiofile object is a data slot for loading sample files - not to be confused with the [File](/scripting/scripting-api/file) object which represents an actual file on your disk.

### Creating an Audiofile object

It is one of the 5 complex data types and can be created using 

- [Engine.createAndRegisterAudioFile()](/scripting/scripting-api/engine#createandregisteraudiofile) - creates a new slot that can hold an audio file
- [AudioSampleProcessor.getAudioFile()](/scripting/scripting-api/audiosampleprocessor#getaudiofile) - returns a reference to an audio file slot of another module
- [ScriptAudioWaveform.registerAtParent()](/scripting/scripting-api/scriptaudiowaveform#registeratparent) - registers the content of a UI waveform display at the script processor and returns the reference to the content as AudioFile object

You can also attach a broadcaster to a data slot to get notified about event changes. [Broadcaster.attachToComplexData()](/scripting/scripting-api/broadcaster#attachtocomplexdata)
