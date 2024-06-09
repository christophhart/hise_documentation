The `setRange` method sets a new sample range for the audio file. This range is defined by the `min` and `max` sample positions, effectively selecting a subset of the audio data. This method provides a scripting option for changing the sample range, which can also be done interactively by dragging the sample area in the [Audio Waveform](/ui-components/plugin-components/audio-waveform).

**Example Usage:**

```javascript
// Paste in the code to load the asset from above...

// clear the audio file (so that it loads the full file again
// when you recompile)
audioFile.loadFile("");

// load the first asset (again)
audioFile.loadFile(firstAsset);

// Define the new sample range
var minSample = 1000;
var maxSample = 5000;

// Grab the full sample data
var fullSample = audioFile.getContent();

Console.print(fullSample[0].length); // 830117

// Set the new sample range using the setRange method
audioFile.setRange(minSample, maxSample);

// Now the getContent() method will only return the slice
// from 1000 to 5000
var slice = audioFile.getContent();

Console.print(slice[0].length); // 4000
```