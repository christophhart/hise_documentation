---
keywords: SampleMaps
author:   Christoph Hart
summary:  Explains the HISE SampleMaps Folder
index:    07
---


A SampleMap is a collection of audio samples with mapping information that is the standard data format for the [Sampler](/hise-modules/sound-generators/list/streamingsampler) module. For a detailed specification of this format please read the dedicated SampleMap reference, but here we will just focus on the handling of those files. All we need to know for this is that they are XML files and every SampleMap is loaded into the pool on startup. The reason for this is that you have a list of all samplemaps available through the API call [`Sampler.getSampleMapList()`](/scripting/scripting-api/sampler#getsamplemaplist), which you can use to implement the sample loading UI (otherwise calling this method would result in scanning the directory everytime which comes with a huge performance overhead). Also the sampler module just needs to store the ID of the samplemap which makes the XML files less verbose.

SampleMaps are identified using a unique ID, which is highly recommended to match with their filename (and there is a [tool](/working-with-hise/menu-reference/tools#update-samplemap-ids-based-on-file-names) that checks and corrects this). You can also use a folder hierarchy to categorize your samplemaps. Let's take a look at a example and see how the file location translates into the ID. Let's assume we have four sample maps. We start with the absolute paths:

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