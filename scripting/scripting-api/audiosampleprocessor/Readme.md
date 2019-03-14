A `AudioSampleProcessor` object is a reference to a HISE module that can load audio files (eg. the [Audio Loop Player](/hise-modules/sound-generators/list/audiolooper) or the [Convolution Reverb](/hise-modules/effects/list/convolution).

There are API calls that can load different audio files from the [Audio File Pool](Pool), change the range within the audio file.  
Normally you create an object of this type using [Synth.getAudioSampleProcessor()](/Scripting API/Synth#getaudiosampleprocessor) and then call one of its methods.