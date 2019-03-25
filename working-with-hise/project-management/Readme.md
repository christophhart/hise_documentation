---
keywords: Project Management
author:   Christoph Hart
summary:  A overview of the Project Management in HISE
---

HISE offers a custom project management system for handling the metadata and all external resources. The basic concept of this system is a **HISE Project**, which is a folder that contains all files that are used inside the project. The files are categorized into multiple subdirectories according to their file type and usage.

During development, HISE will fetch all resources from the files. But when you export a plugin or standalone app it will embed the data into the plugin and read it directly from the memory. Be aware that is a simplification: some files are cached and loaded on startup, some files are being [lazy loaded](https://en.wikipedia.org/wiki/Lazy_loading) when you actually need them, and some files (you might have a clue which ones) are streamed from disk. This will be explained thoroughly when we'll go through each subdirectory.

Note that you can use files outside the project folder directory, however it is **highly recommended** to not do this. The reason is obvious: you won't be able to transfer the project to another computer let alone exporting the plugin and expect that the external resources can be resolved. This is why you will be asked to create a HISE folder the first time you open the HISE application.

As soon as you created the project folder, you can use a relative path system to:
- load sample maps using the scripting API
- load different audio files into the looper or convolution reverb
- use images
- create user presets that load / save interface states

Oh, and samples that will be played through the streaming engine, will obviously also use this system. Now before we crawl through each subdirectory we'd like to introduce two concepts that are fundamental to understanding the different data types: *File Pools* and the *Project Folder Wildcard*.

### File Pool

There are a few data types in HISE that use a pool system that caches loaded resources as long as they are used. This pool makes sure that you reuse internal data (so that when eg. two convolution reverbs use the same impulse response, they will use the same audio buffer in the memory).

Some file types are even cached from the beginning: They are loaded into the pool on startup and then the files aren't accessed anymore but the cached data is used instead. 

> This might lead to a few quirks that can be solved by restarting HISE after changing a file in order to use the updated version instead of the cached one.

For each file type that is using a Pool there is a dedicaded FloatingTile that shows a list of all files in the pool and shows detailed information about the metadata as well as some handy drag 'n drop functions.

### The project folder wildcard

There are multiple occasions in HISE where you need to use an external resource, and all of them use the HISE project system - some of them like SampleMaps do this implicitely and you don't have to bother about how it works, but in some situations (mostly when using Scripting API calls that access an external resource) you will have to supply a String that is resolved to the desired resource. 
For these situations you will need the project folder wildcard: everytime you want to access a file inside the project folder, just prepend 

```
{PROJECT_FOLDER}
``` 

to the relative path from the subfolder and HISE will resolve the resource automatically - for both files during development as well as embedded data in the compiled product and across all operating systems.

A little example: Your project folder is `C:\My Funky Project` and you want to load a image called `BG12_final.png` that is located in the folder `C:\My Funky Project\Images\Backgrounds`. Following the logic described above, you will need to use this wildcard:

```
panel.loadImage("{PROJECT_FOLDER}Backgrounds/BG12_final");
```

There are two things that deserve some attention:

1. If you're working in Windows, you're probably used to use the backslash `\` for the path delimiter. Be aware that this won't work on any Unix based OS, so HISE uses the `/` character for path delimiters for the ultimate cross-platform experience. Also note how you don't need to add a `/` directly after the project folder wildcard but append just the relative path to the desired file location.
2. If you want to load images, you will most likely use files from the Images subdirectory. HISE is smart enough to assume this too. This means you can (and must) omit `Images/` from the path string. So in this case, `{PROJECT_FOLDER}` will not point to the actual HISE project folder, **but to the subdirectory that is appropriate to the context**. Now depending on the API call this might vary: `AudioSampleProcessor.setFile()` will use the `AudioFiles` subdirectory. For some API calls, you even don't need the project folder wildcard, because you are not supposed to use anything outside the subdirectory. Examples for this behaviour is `Sampler.loadSampleMap()` and the `include()` command that includes other script files.

## Subdirectories

Now we will take a look at each subdirectory and its special behaviour. We'll use the order that you will see the first time you open your HISE project folder in a OS file browser: sorted alphabetically.

### AdditionalSourceCode

If you are using custom C++ modules, this folder will be the place for every C++ code you add to your project. HISE expects two files in this directory: 

- a CopyProtection.cpp file 
- a AdditionalSourceCode.cpp file
 
These two files will be copied into the temporary build directory and compiled as separate compile units. You should include all other files in the directory so if you're using more files than these two, just include them in these files. Be aware that you need to use the relative path to the source folder of the temporary project (so the file `AdditionalSourceCode.h` in the same directory needs to be included like this:

```cpp
/** AdditionalSourceCode.cpp

	(this file is copied into Builds/Source)
*/

// This will not compile because the file will be copied to another location
//#include "AdditionalSourceCode.h"

#include "../../AdditionalSourceCode/AdditionalSourceCode.h"
```

### AudioFiles

This folder contains audio file that are supposed to be embedded: impulse responses or custom loops that are loaded into the [Looper](/hise-modules/sound-generators/list/looper). Audio files that are streamed from disk using the [Sampler](/hise-modules/sound-generators/list/sampler) have their own directory since they are handled in a completely different fashion.

Since these files can grow to any arbitrary amount, they are loaded as soon as you need them. By default they are embedded into the plugin on export, but you can change this behaviour using the `EmbedAudioFiles` property in the [project settings](/link).

> If you export a project, it will embed all audio files that have been loaded in the pool. Depending on which files you have loaded in your current session this will have different results and you might end up with audio files missing in the compiled project. There are two solutions to the problem. The first is to manually load every audio file before exporting and hope that you never forget this step. A less painful and thus preferable option is using a [script function](/scripting/scripting-api/engine#loadaudiofilesintopool) that automatically loads the entire folder into the pool.

This filetype is also one of the rare ocassions where absolute paths are not completely off the table: If you use a AudioWaveform on your UI, the end user can drag n' drop any audio file from his computer on it and it will also be loaded into the pool. In this case it will store the absolute path. 

### Binaries

This is the temporary build directory which HISE will use during export. The compiled executables will be located in a subdirectory called `Compiled`. Now if you don't alter the build process or are interested in the internals of how it all works, you can ignore this folder, the only vital information you will need to take away from this is that you **MUST NOT** edit any file in there - they are autogenerated and removed automatically.

> If you're using Git, this is a perfect candidate for `.gitignore`

### Images

As the self explanatory name suggests, this is the place for all embedded images - filmstrips and backgrounds. Also, all other artwork-related data like custom fonts or the icon should be put here.

HISE supports the most important image types (JPG, GIF and PNG), however it's preferred to use PNG format since it offers the best compression ratio and decompression performance. There is one thing you need to know about images: they can get really big and waste a lot of memory. The reason is that the images will be decompressed and stored in memory as 32bit bitmaps, so retina filmstrips of a 3D rendered knob can easily eat up hundreds of megabyte of RAM.
If you're using retina images, be aware that HISE uses a "logical" resolution that is the same as the non-retina pixel size, however you can just feed it with high resolution images and it will automatically scale them correctly (and for non-retina images, use a downscaled version).

Apart from custom backgrounds and filmstrips, there are a few hardcoded locations that HISE will use to look for commonly used image data:

- **Icon**: just add a transparent, square PNG called `Icon.png` in the Images folder and it will be used as application icon (we recommend at least a 256x256 resolution). For plugins this won't have any effect.
- **Splash Screen**: you can add a splash screen that will be shown during application launch. In this case, just drop a `SplashScreen.png` file (or for iPhone screens a `SplashScreeniPhone.png`). It's recommend to use the same resolution as your final UI size, otherwise things will look weird.
- **Custom keyboard filmstrips**: If you want to use a customized keyboard, you can add images for each of the 12 keys (up and down state). Take a look at the [Keyboard](/floating-link) floating tile for more information.
- **Fonts**: if you are using a custom font, the end user will most likely not have it installed on his computer. So in order to make sure that your UI will look the same you will need to embed any non-standard font that you use into the project. In order to do so, put them all into the `Fonts` subdirectory of the Images folder (for more information, take a look at the [script functions](link) that load custom fonts).
- **About Page**: the [About Page](floating-link) floating tile can use a custom background image. Just add a file called `about.png` in the Images folder and it will use it.

### MidiFiles

HISE has a generic [MIDI Player](Link) module that allows playback of any arbitrary MIDI sequence. The data source for this module are standard MIDI files from this directory. These files are being loaded on startup, so if you add new MIDI loops, you might have to restart HISE or reload the pool to see the new file.

Be aware that the MIDI files are read-only - any modification that you will do to MIDI sequences will only affect the local copy and not being written back into the pooled versions - the only way to get the modified versions into the outside world is dragging them into a DAW.

### Presets

The presets folder is certainly the most poorly named thing in HISE, but because of lacking alternatives and problems with backwards compatibiltiy we're stuck with this name, so let's get it over quickly.  
It contains files that store a snapshot of your HISE project in a binary file format with the file extension `.hip` - which I once decided to call *preset* in a dubious state of mind, hence the name. These files contain the HISE module tree, all embedded scripts, the UI model and the current interface state. This differs from the files in the `XmlPresetBackups` directory because they split the scripts and UI data model into separate files. This makes them totally useless in a workflow that uses a version control system. But because they are almost self-contained they are used for the autosave function and you can use them for saving intermediate states of your plugin that shouldn't interfere with your XML files.

> If you export a HISE snippet, it will use the exact same data as a .hip file, but in a different representation (a Base64 encoded String).

### SampleMaps

A SampleMap is a collection of audio samples with mapping information that is the standard data format for the [Sampler]() module. For a detailed specification of this format please read the dedicated SampleMap reference, but here we will just focus on the handling of those files. All we need to know for this is that they are XML files and every SampleMap is loaded into the pool on startup. The reason for this is that you have a list of all samplemaps available through the API call `Sampler.getSampleMapList()`, which you can use to implement the sample loading UI (otherwise calling this method would result in scanning the directory everytime which comes with a huge performance overhead). Also the sampler module just needs to store the ID of the samplemap which makes the XML files less verbose.

SampleMaps are identified using a unique ID, which is highly recommended to match with their filename (and there is a [tool]() that checks and corrects this). You can also use a folder hierarchy to categorize your samplemaps. Let's take a look at a example and see how the file location translates into the ID. Let's assume we have four sample maps. We start with the absolute paths:

```
C:\My Funky Project\SampleMaps\Bass\Sustain.xml
C:\My Funky Project\SampleMaps\Bass\Release.xml
C:\My Funky Project\SampleMaps\Cello\Sustain.xml
C:\My Funky Project\SampleMaps\Cello\Release.xml
```

Now we use the folder wildcard instead (and again, change the naughty `\` with `/`:

```
{PROJECT_FOLDER}Bass/Sustain.xml
{PROJECT_FOLDER}Bass/Release.xml
{PROJECT_FOLDER}Cello/Sustain.xml
{PROJECT_FOLDER}Cello/Release.xml
```

As you can see there are two things that are consistent in each name: the `{PROJECT_FOLDER}` wildcard and the `.xml` extension. Both things are redundant to write: You cannot load SampleMaps outside the project folder, and there are no other legit file extensions other than `.xml` (which isn't true for images and audio files obviously). Therefore, we can safely remove those and end up with the final ID:

```
Bass/Sustain
Bass/Release
Cello/Sustain
Cello/Release
```

These are the exact Strings that you will get from the `Sampler.getSampleMapList()` function and are supposed to be used as arguments for Sampler.loadSampleMap().

Another important aspect of the SampleMap ID is that if you are using the **HLAC** monolith format, the ID translates to the monolith filename(s). 

> You can change this and tell the samplemap exactly which monolith it should load, but unless you explicitely use this feature, this will be the default behaviour. 

Monolith files are not supposed to use a folder hierarchy (because the end user can get this wrong too easily), so the path delimiter will simply be transformed into a `_` in the filename. Our four samplemaps (which happen to be multimic samplemaps with 2 mic positions) will look for to these monoliths:

```
Bass_Sustain.ch1
Bass_Sustain.ch2
Bass_Release.ch1
Bass_Release.ch2
Cello_Sustain.ch1
Cello_Sustain.ch2
Cello_Release.ch1
Cello_Release.ch2
```

### Metadata files.

A **HISE Project** is not just a collection of sub directories: there are also a few files in the root directory that contain important information about the project:

- the `ProjectInfo.xml` file which contains the project settings like name, plugin code and compiler flags.
- the `UserInfo.xml` file which contains information about your company. It's separated from the project file so you can duplicate it for all your projects.
- if you're using the copy protection system that's built into HISE, there will be a `RSA.xml` file which contains the private and public key used for the encryption of the license key file. Be aware that this is highly confidential information so if this file is leaked, the entire copy protection system for your product is compromised.



## Best Practices

### Manually editing XML files

If you've read the chapters of each subdirectory, you'll notice that almost any data file is using the XML data format. This has an important advantage: you can use basic text editing for batch processing files. At the end, the HISE application is just *one way* of editing these files and depending on the use case, opening a text editor and doing search and replace operations will be highly more efficient (also this will enable you to work around some of the quirks of HISE). Especially when it comes to sample mapping, this is an invaluable tool.

you are probably wondering why the XML format was chosen over the JSON data format, which would be a suitable candidate given the scripting engine is built upon Javascript. The reason is the compatibility to the native binary tree data structure built into JUCE: the [ValueTree](https://docs.juce.com/master/classValueTree.html). If you're not a hardcore C++ programmer, you don't need to understand the details of the implementation, just be aware that this gives you a binary data format with a convenient 1:1 translation into XML and is used all across HISE:
- HISE snippets and the encoded states for modules are Base64 encoded strings that use a ValueTree
- .hip files are ValueTrees
- the entire UI data model is built upon a ValueTree
- All files that are XML files during development will be converted to ValueTrees in the compiled project.

However, there are a few situations where the XML data format and the JSON format are used at the same time (for example if you are storing objects as values for a ScriptPanel in user presets). This results in rather ugly constructs (a stringified JSON with lots of weird escape sequences) but is a necessary evil the for all the benefits we get from the ValueTree data structure.

### Using Git with HISE

If you're coming from a development environment like KONTAKT which puts all files into one big binary chunk, you're probably wondering about the benefits of this system. The answer is encapsulation and compatibility with version control like Git. If you don't know what Git is, please take a few hours to learn about version control in general and Git in particular. This is a standard for any kind of serious software development and not using it deprives you of many advantages.
Having multiple files enables the version control system to track changes more precisely and simplifies simultaneous development: you can work on script files while another person is building the module structure or mapping the samples and you both will be able to commit your changes without conflicts (and even if you're working on the same file, in most cases the merge process is pretty straight forward because almost every data file is human-readable).

