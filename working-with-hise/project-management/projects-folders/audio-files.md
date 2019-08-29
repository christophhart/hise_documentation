---
keywords: AudioFiles
author:   Christoph Hart
summary:  Explains the AudioFiles Folder
index:    02
---

This folder contains audio file that are supposed to be embedded: impulse responses or custom loops that are loaded into the [Audio Loop Player](/hise-modules/sound-generators/list/audiolooper). Audio files that are streamed from disk using the [Sampler](/hise-modules/sound-generators/list/streamingsampler) have their own directory since they are handled in a completely different fashion.

Since these files can grow to any arbitrary amount, they are loaded as soon as you need them. By default they are embedded into the plugin on export, but you can change this behaviour using the ['EmbedAudioFiles'](/working-with-hise/settings/project#embed-audio-files) property in the [Project Settings](/working-with-hise/settings/project).

> If you export a project, it will embed all audio files that have been loaded in the pool. Depending on which files you have loaded in your current session this will have different results and you might end up with audio files missing in the compiled project. There are two solutions to the problem. The first is to manually load every audio file before exporting and hope that you never forget this step. A less painful and thus preferable option is using a [Engine.loadAudioFilesIntoPool()](/scripting/scripting-api/engine#loadaudiofilesintopool) script function that automatically loads the entire folder into the pool.

This filetype is also one of the rare ocassions where absolute paths are not completely off the table: If you use a AudioWaveform on your UI, the end user can drag n' drop any audio file from his computer on it and it will also be loaded into the pool. In this case it will store the absolute path. 
