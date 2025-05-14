---
keywords: Project Folder
author:   Christoph Hart
summary:  A overview of the Project Management in HISE
icon:     /images/icon_filebrowser
index:    2
---

After creating a [new Project](/working-with-hise/menu-reference/file#create-new-project) your project folder will hold a set of predefined sub-folders for all the scripts and files that you might need in your instrument/plugin.

These folders are categorized according to their filetype and usage:

![image folderstructure](images/custom/folder.png)

[AdditionalSourceCode](/working-with-hise/project-management/projects-folders/additional-source-code) - The place for additional C++ files that are using the [C++ API](/cpp_api).

[AudioFiles](/working-with-hise/project-management/projects-folders/audio-files) - Single audio-files that can be used in the [Audio Loop Player](/hise-modules/sound-generators/list/audiolooper) or the [Convolution Reverb](/hise-modules/effects/list/convolution).

[Binaries](/working-with-hise/project-management/projects-folders/binaries) - Contains the `Source` and `temp` folders that are necessary to compile your instrument. After compilation your exported plugins will show up here in a `Compiled`-Folder

[Images](/working-with-hise/project-management/projects-folders/images) - A folder that can contain image files and filmstrips for usage in the interface designer as well as a few predefined hooks (e.g. splashscreen and fonts). Per scripting accessible via `"{PROJECT_FOLDER}image.png"`.

[MetaData](/working-with-hise/project-management/projects-folders/meta-data) - The Metadata _info files (.xml) in the projects root folder hold the project specific settings.

[MidiFiles](/working-with-hise/project-management/projects-folders/midi-files) - A folder for MIDI files used in the [Midiplayer](/hise-modules/midi-processors/list/midiplayer)

[Presets](/working-with-hise/project-management/projects-folders/presets) - Contains the **HISE Preset files** (`.hip`), which are the save-files of your Projects plugin architecture. The auto-save files will also show up here.

[SampleMaps](/working-with-hise/project-management/projects-folders/sample-maps) - When you mapped samples in the [Sampler](/hise-modules/sound-generators/list/streamingsampler) this folder will hold the `SampleMap.xml`'s that point to your samples.

[Samples](/working-with-hise/project-management/projects-folders/samples) - The folder for your samples and the compressed `.ch1`-monolith files.

[Scripts](/working-with-hise/project-management/projects-folders/scripts) - If you create an interface for your instrument this folder will hold the main `interface.js`-file + all the scripts that you need for building the GUI and user-interactions of your instrument.

[UserPresets](/working-with-hise/project-management/projects-folders/user-presets) - The folder for the User-`.presets` that can save different states of your instruments GUI. You can easily organize these with the [Presetbrowser](/ui-components/floating-tiles/plugin/presetbrowser)-FloatingTile.

[XmlPresetBackups](/working-with-hise/project-management/projects-folders/xml-preset-backups) - The folder for your **HISE presets** human readable `.xml` savefiles. 



## Workflow 

During development, HISE will fetch all files from these folders. When you export a plugin or standalone app it will embed the data into the plugin and read it directly from memory. 

But be aware that file-reloading is not always consistent: some files are loaded and cached on startup, some files are [lazy loaded](https://en.wikipedia.org/wiki/Lazy_loading) when you actually need them, and some files (you might have a clue which ones) are directly streamed from disk. 

Note that you _can_ use files from outside the project folder, however it is **highly recommended** not to do this. The reason: you won't be able to transfer the project to another computer without breaking some links, let alone exporting the plugin and expecting the external resources to be resolved. 

As long as way stay in the HISE Project paradigm we can use it's a relative path system to: 
- load SampleMaps using the Scripting API
- load different audio files into the looper or the convolution reverb
- link images
- create user presets that load & save interface states

Oh, and samples that will be played through the streaming engine, will obviously also use this system. Two concepts are therefore fundamental to understand: **File Pools** and the **Project Folder Wildcard**.

## File Pools

There are a few data types ([SamplePool](/ui-components/floating-tiles/hise/samplepooltable), [ImagePool](/ui-components/floating-tiles/hise/imagepool), [MidifilePool](/ui-components/floating-tiles/hise/midifilepool), [AudiofilePool](/ui-components/floating-tiles/hise/audiofilepool), [SampleMapPool](/ui-components/floating-tiles/hise/samplemappool)) in HISE that use a pool system that caches loaded resources as long as they are used. These pools makes sure that you reuse internal data (so that when eg. two convolution reverbs use the same impulse response, they will use the same audio buffer in the memory).

Some file types are even cached from the beginning: They are loaded into the pool on startup and then the files aren't accessed directly anymore but the cached data is used instead. 

> This might lead to a few quirks that are often solved by restarting HISE after changing a file in order to use the updated version instead of the cached one.

## Project Folder Wildcard

There are multiple occasions in HISE where you need to use external resources, and all of them use the HISE project system - some of them (like SampleMaps) do this implicitely and you don't have to bother about how it works, but in some situations (mostly when using Scripting API calls that access an external resource) you will have to supply a String that is resolved to the desired resource. 

For these situations you will need the **Project Folder Wildcard**: everytime you want to access a file inside the main Project Folder, just prepend: 

```
{PROJECT_FOLDER}
``` 
to the relative path from the subfolder and HISE will resolve the resource automatically - for both files during development as well as for embedded data in the compiled product and across all operating systems.

A little example: Your project folder is `C:\My Funky Project` and you want to load a image called `BG12_final.png` that is located in the folder `C:\My Funky Project\Images\Backgrounds`

Following the logic described above, you will need to use this wildcard:

```
panel.loadImage("{PROJECT_FOLDER}Backgrounds/BG12_final");
```
There are two things that deserve some attention:

1. If you're working in Windows, you're probably used to use the backslash `\` for the path delimiter. Be aware that this won't work on any Unix based OS, so HISE uses the `/` character for path delimiters for the ultimate cross-platform experience. Also note how you don't need to add a `/` directly after the project folder wildcard but append just the relative path to the desired file location.
2. If you want to load images, you will most likely use files from the Images subdirectory. HISE is smart enough to assume this too. This means you can (and must) omit `Images/` from the path string. In this case, `{PROJECT_FOLDER}` will not point to the actual HISE project folder, **but to the subdirectory that is appropriate to the context**. Now depending on the API call this might vary: [`AudioSampleProcessor.setFile()](/scripting/scripting-api/audiosampleprocessor#setfile) will automatically use the [`AudioFiles`](/working-with-hise/project-management/projects-folders/audio-files) subdirectory. For some API calls, you even don't need the project folder wildcard, because you are not supposed to use anything outside the subdirectory. Examples for this behaviour is [`Sampler.loadSampleMap()`](/scripting/scripting-api/sampler#loadsamplemap) which automatically searches in the **SampleMaps** Folder and the `include()` command that includes other script files from the **Scripts** Folder.

## Best Practices

### Manually editing XML files

If you've read through the chapters of each folder, you'll notice that almost all data files use the XML data format. This has an important advantage: you can use your favourite text editor for batch processing files. 

In the end, the HISE application is just *one way* of editing these files and depending on the use case, opening a text editor and doing search and replace operations will be highly more efficient (this will also enable you to work around some of the quirks of HISE). Especially when it comes to sample mapping, this is sometimes an invaluable tool.

You are probably wondering why the XML format was chosen over the JSON data format, which would be a suitable candidate given the scripting engine is built upon Javascript. The reason is compatibility towards a native binary tree data structure built into JUCE: the [ValueTree](https://docs.juce.com/master/classValueTree.html). If you're not a hardcore C++ programmer, you don't need to understand the details of this implementation, just note that this binary data format comprises a convenient 1:1 translation into XML and is used all across HISE:
- HISE snippets and the encoded states for modules are Base64 encoded strings that use a ValueTree
- `.hip` files are ValueTrees
- the entire Plugin-Interface data model is built upon a ValueTree
- All files that are XML files during development will be converted to ValueTrees in the compiled project.

Although, there are a few situations where the XML data format and the JSON format are used at the same time (for example if you are storing objects as values for a ScriptPanel in user presets). This results in rather ugly constructs (a stringified JSON with lots of weird escape sequences) but is a necessary evil the for all the benefits we get from the ValueTree data structure.

### Using Git with HISE

If you're coming from a development environment like KONTAKT which puts all files into one big binary chunk, you're probably wondering about the rationale of such a system. The answer is simple. The binary/XML encapsulation permits compatibility with version control systems like Git. If you don't know what Git is, please take a few hours to learn about version control in general and Git in particular. This is a standard for any kind of serious software development and not using it deprives you of many advantages.

Having multiple files enables the version control system to track changes more precisely and simplifies simultaneous development: you can work on script files while another person is building the module structure or mapping the samples and you both will be able to commit your changes without conflicts (and even if you're working on the same file, in most cases the merge process is pretty straight forward because almost every data file is human-readable).
