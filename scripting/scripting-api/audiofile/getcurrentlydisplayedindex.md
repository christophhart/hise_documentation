The `getCurrentlyDisplayedIndex` method retrieves the current sample position within the audio file. This position is represented as an integer ranging from 0 to the total number of samples in the file (`numSamples`). It is useful for tracking the playback or editing position within the audio file.

> Note that for a live update of the playback position it might be more efficient to register a broadcaster to the complex data event using the `AudioFile.DisplayIndex` mode

**Related Methods:**

- [AudioFile.getNumSamples](/scripting/scripting-api/audiofile#getnumsamples): Retrieves the total number of samples in the audio file.

**Example Usage:**

```javascript
// Assume 'audioFile' is a valid AudioFile object

// Retrieve the current sample position
var currentPosition = audioFile.getCurrentlyDisplayedIndex();

// Retrieve the total number of samples in the audio file
var totalSamples = audioFile.getNumSamples();

// Calculate the normalized position (between 0.0 and 1.0)
var normalizedPosition = currentPosition / totalSamples;

const var slider = Content.getComponent("Knob1");

// Set the slider value based on the normalized position
slider.setValue(normalizedPosition);

// Print the current sample position and normalized slider value to the console
Console.print("Current sample position: " + currentPosition);
Console.print("Normalized slider value: " + normalizedPosition);
```