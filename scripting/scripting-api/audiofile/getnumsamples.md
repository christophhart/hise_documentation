The `getNumSamples` method returns the total number of samples in the audio file. This is an integer value representing the length of the audio file in terms of the number of discrete audio samples it contains. It is useful for understanding the size of the audio data and for performing operations that depend on the total sample count.

**Related Methods:**

- [AudioFile.getSampleRate](/scripting/scripting-api/audiofile#getsamplerate): Retrieves the sample rate of the audio file, which is the number of samples per second.

```javascript
// Assume 'audioFile' is a valid AudioFile object

// Retrieve the total number of samples in the audio file
const var numSamples = audioFile.getNumSamples();

// Retrieve the sample rate of the audio file
const var sampleRate = audioFile.getSampleRate();

// Calculate the duration of the audio file in seconds
const var durationInSeconds = numSamples / sampleRate;

// Print the total number of samples and the duration to the console
Console.print("Total number of samples: " + numSamples);
Console.print("Sample rate: " + sampleRate + " Hz");
Console.print("Duration of the audio file: " + durationInSeconds + " seconds");

// Further usage: Check if the audio file is longer than a specific duration
const var thresholdDuration = 60; // 60 seconds
if (durationInSeconds > thresholdDuration)
{
    Console.print("The audio file is longer than " + thresholdDuration + " seconds.");
}
else
{
    Console.print("The audio file is not longer than " + thresholdDuration + " seconds.");
}
```