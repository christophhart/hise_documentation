You can use this method to access files from one of the given locations (take a look at the [Special Locations](/scripting/scripting-api/filesystem#special-locations) above for a list of available folders).

You can navigate from that folder to the file you want with the [`File.getChildFile()`](/scripting/scripting-api/file#getchildfile) method.

To get files from the [AudioFiles](/working-with-hise/project-management/projects-folders/audio-files) folder of an exported project, eg. for use in a [Convolution Reverb](/hise-modules/effects/list/convolution) or an [Audio Loop Player](/hise-modules/sound-generators/list/audiolooper), use [`Engine.loadAudioFilesIntoPool()`](scripting/scripting-api/engine/index.html#loadaudiofilesintopool).
