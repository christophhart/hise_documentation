The `setDisplayCallback` method sets a callback function that is executed whenever the playback position changes within the audio file. This can be useful for updating UI elements or performing other actions in response to changes in the playback position. The method takes one parameter, `displayFunction`, which is the function to be called. The function will have its `this` object assigned to the audio file and needs to have a single parameter that will provide the playback position as sample index.

**Related Methods:**

- [AudioFile.getCurrentlyDisplayedIndex](/scripting/scripting-api/audiofile#getcurrentlydisplayedindex): Retrieves the current sample position within the audio file.
- [AudioFile.getNumSamples](/scripting/scripting-api/audiofile#getnumsamples): Retrieves the total number of samples in the audio file.

**Example Usage:**

```javascript
// Grab a reference to a looper that is loaded with a sound 
// (we need it to actually play the sample for this example)
const var AudioLoopPlayer1 = Synth.getAudioSampleProcessor("Audio Loop Player1");

// Grab a reference to the loop audio file slot
const var audioFile = AudioLoopPlayer1.getAudioFile(0);

// register a function to be called whenever the playback position changes
audioFile.setDisplayCallback(function(displayValue)
{
	// Print the normalised position using the sample length
	Console.print(displayValue / this.getNumSamples());
});
```