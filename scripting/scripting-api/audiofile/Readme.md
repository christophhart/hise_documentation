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

All the examples in this documentation require a audio file slot that is loaded with an actual audio file to operate on. The easiest way of getting there is to just load the example assets of the snippet browser (once you have downloaded them):

```javascript
// Load the example assets
FileSystem.loadExampleAssets();

// Grab whatever asset is first
const var firstAsset = Engine.loadAudioFilesIntoPool()[0];
Console.print(firstAsset); // {PROJECT_FOLDER}breakbeat_44k.wav

// Create a audio file slot
const var audioFile = Engine.createAndRegisterAudioFile(0);

// load the first asset
audioFile.loadFile(firstAsset);

// paste in all other code examples now...
```