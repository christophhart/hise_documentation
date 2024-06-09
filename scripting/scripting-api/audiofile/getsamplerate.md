The `getSampleRate` method returns the sample rate of the audio file. The sample rate is the number of samples per second and is typically measured in Hertz (Hz). This value is crucial for accurately interpreting the timing and pitch of the audio data.

**Difference between `AudioFile.getSampleRate` and `Engine.getSampleRate`:**

- `AudioFile.getSampleRate` returns the sample rate of the specific audio file that is currently loaded. This sample rate is determined by how the audio file was recorded or converted and can vary between different audio files.
- [`Engine.getSampleRate()`](/scripting/scripting-api/engine#getsamplerate) returns the sample rate of the audio engine that is specified by the audio driver (or the DAW that the plugin is running in).

**Related Methods:**

- [AudioFile.getNumSamples](/scripting/scripting-api/audiofile#getnumsamples): Retrieves the total number of samples in the audio file.

```javascript
// Assume 'audioFile' is a valid AudioFile object

// Retrieve the sample rate of the audio file
var fileSampleRate = audioFile.getSampleRate();
Console.print("Audio file sample rate: " + fileSampleRate + " Hz");

// Retrieve the sample rate of the audio engine
var engineSampleRate = Engine.getSampleRate();
Console.print("Audio engine sample rate: " + engineSampleRate + " Hz");

// This would be the playback speed that is required to play back
// the file in the original speed (most things in HISE that play 
// back samples will do this for you).
var playbackRatio = fileSampleRate / engineSampleRate;
```