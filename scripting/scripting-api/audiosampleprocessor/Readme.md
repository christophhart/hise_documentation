---
keywords: AudioSampleProcessor
summary:  The AudioSampleProcessor API.
---


An `AudioSampleProcessor` object is a reference to a HISE module that can load audio files (eg. the [Audio Loop Player](/hise-modules/sound-generators/list/audiolooper) or the [Convolution Reverb](/hise-modules/effects/list/convolution). The associated project folder is [AudioFiles](/working-with-hise/project-management/projects-folders/audio-files).

There are API calls that can load different audio files from the [AudioFilePool](/ui-components/floating-tiles/hise/audiofilepool), change the range within the audio file.  

Normally you create an object of this type using [Synth.getAudioSampleProcessor()](/scripting/scripting-api/synth#getaudiosampleprocessor) and then call one of its methods.