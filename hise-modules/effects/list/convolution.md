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

### Loading a single impulse response called impulse.wav

The file impulse.wav should be placed in the AudioFiles folder. This script assumes there is a Convolution Reverb already added called `Convolution Reverb1`.

```javascript
// Create a typed Audio Sample Script Reference with right click on the Convolution Module
const var ConvolutionReverb1 = Synth.getAudioSampleProcessor("Convolution Reverb1");

// Load all Audio Files from the AudioFiles Folder into the Pool
Engine.loadAudioFilesIntoPool();

// Load the impulse response. Use of {PROJECT_FOLDER} here automatically refers to the AudioFiles folder.
ConvolutionReverb1.setFile("{PROJECT_FOLDER}impulse.wav");
```

### Including several user-selectable impulse responses with a plugin
Impulse Response files should be placed in the AudioFiles project directory. If [Embed Audio Files](/working-with-hise/settings/project.html#embed-audio-files) is enabled, they will be embeded into the compiled plugin.

Call [`Engine.loadAudioFilesIntoPool()`](/scripting/scripting-api/engine/index.html#loadaudiofilesintopool) to ensure the files are accessible in the compiled plugin. This returns an array of paths in the `{PROJECT_FOLDER}filename.wav` format, which can be directly loaded into the Convolution Reverb.

```javascript
// Create a typed Audio Sample Script Reference with right click on the Convolution Module
const var ConvolutionReverb1 = Synth.getAudioSampleProcessor("Convolution Reverb1");

// Create a comboBox
const var impulseSelector = Content.addComboBox("impulseSelector",0,0);

// Clear the items in the combobox. Otherwise, the entire list will be appended each time the script is run.
impulseSelector.set("items","");

// Load all Audio Files from the AudioFiles Folder into the Pool and get the list of references
const var impulses = Engine.loadAudioFilesIntoPool();

// Add names of impulse responses to the comboBox
for (impulse in impulses)
{ 
  impulseSelector.addItem(impulse.replace(".wav","").replace("{PROJECT_FOLDER}","")); //Add just the name, removing the .wav extension and `{PROJECT_FOLDER}`
}

// Create custom callback for the comboBox
inline function onimpulseSelectorControl(component, value)
{
  ConvolutionReverb1.setFile(impulses[value - 1]); //Load the selected IR. Note that the comboBox value is 1 indexed
};

impulseSelector.setControlCallback(onimpulseSelectorControl);
```
