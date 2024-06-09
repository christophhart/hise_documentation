The `getContent` method retrieves the current audio data from the audio file and returns it as an array of channels. Each channel is represented as a [Buffer](/scripting/scripting-api/buffer) object, which is a special float array type in HISE. This method is useful for accessing and manipulating the raw audio data for processing or analysis.

```javascript
// Assume 'audioFile' is a valid AudioFile object

// Retrieve the current audio content
var audioContent = audioFile.getContent();

// Print the number of channels in the audio file
Console.print("Number of channels: " + audioContent.length);

// Iterate over each channel
for (var i = 0; i < audioContent.length; i++)
{
    var channel = audioContent[i];
    
    // Print the first 10 samples of each channel for inspection
    Console.print("Channel " + (i + 1) + " first 10 samples:");
    for (var j = 0; j < 10; j++)
    {
        Console.print(channel[j]);
    }
}

// Example of processing: Normalize the first channel
var firstChannel = audioContent[0];
var numSamples = firstChannel.length;
var maxSample = 0.0;

// Find the maximum sample value
for (var i = 0; i < numSamples; i++)
{
    if (Math.abs(firstChannel[i]) > maxSample)
    {
        maxSample = Math.abs(firstChannel[i]);
    }
}

// Normalize the first channel
if (maxSample > 0)
{
    for (var i = 0; i < numSamples; i++)
    {
        firstChannel[i] /= maxSample;
    }
    Console.print("First channel has been normalized.");
}
else
{
    Console.print("No need to normalize, max sample is zero.");
}
```