---
keywords: Convolution Reverb
summary:  A fast convolution reverb
parameters: 
- DryGain: the gain value for the unprocessed signal (in dB).
- WetGain: the gain value for the convoluted signal (in dB).
- Latency: the latency between input and output.
- ImpulseLength: (deprecated, use the sample range instead).
- ProcessInput: mutes if `false`, the input for the reverb with a small fade to prevent clicks.
- UseBackgroundThread: if `true`, then the convolution will be executed on a background thread.
- Predelay: The predelay in milliseconds
- HiCut: Applies a high cut filter on the impulse response. This recalculates the IR so you can't use it during rendering.
- Damping: Applies a decaying envelope on the impulse response. This recalculates the IR so you can't use it during rendering.
---

This is a fast convolution reverb based on the excellent [FFTConvolver](https://github.com/HiFi-LoFi/FFTConvolver) library. 
You can load a pooled audio file into this module and it will use it as impulse response for the convolution algorithm.

> This module can also be used for cabinet simulation when a cabinet IR is used.



### Load AudioFiles per script

```javascript
// Create a typed Audio Sample Script Reference with right click on the Convolution Module
const var ConvolutionReverb1 = Synth.getAudioSampleProcessor("Convolution Reverb1");

// load all Audio Files from the AudioFiles Folder into the Pool
Engine.loadAudioFilesIntoPool();

// set a new file 
ConvolutionReverb1.setFile("{PROJECT_FOLDER}impulse.wav");
```
