---
keywords: Sampler
summary:  The sampler module of HISE
---


One of the key highlights of HISE is to build sample based VSTis. The main module for that task is the [Sampler](/hise-modules/sound-generators/list/streamingsampler).  

The Sampler is a disk streaming sampler which leverages the full power of the **HISE** Engine. It is optimized to play a lot of voices in parallel and allows to map your samples in SampleMaps up to an individual SampleMap-size of 4GB. 

The samples can be arranged in a three-dimensional map to account for Note number(x), Velocity(y) and Round Robin Groups(z) and a lot of tools are provided to map and edit your samples quick and efficiently. 

![](/images/custom/samplemapaxis.svg:400px)

**General Workflow**:

- Put your samples in the projects [Samples](/working-with-hise/project-management/projects-folders/samples) Folder.
- Map and save your samples into a `.xml` SampleMap with the [Map Editor](/ui-components/floating-tiles/hise/samplemapeditor). The saved SampleMaps will show up in the projects [SampleMaps](/working-with-hise/project-management/projects-folders/sample-maps) Folder. 
- Collect an compress all samples in a SampleMap with the [HISE Lossless Audio Codec](sampler.html#Export-to-HLAC-Monolith) (`.ch1`) into a single monolith file. 
- When the development of the plugin is ready, all HLAC monolith files can be bundled in a [HISE Resource](sampler.html#Hise-Resources-Archive-File) (`.hr1`) Archive File, that can be distributed to the user. 


## Sampler Tabs

The Sampler features four different edit tabs

- [Sampler Settings](/working-with-hise/workspaces/sampler-workspace/sample-settings)
- [Sample Editor](/working-with-hise/workspaces/sampler-workspace/sample-editor)
- [Map Editor](/working-with-hise/workspaces/sampler-workspace/sample-map-editor)
- [Table View](/working-with-hise/workspaces/sampler-workspace/sample-table)


## Sample Maps


## Sample Mapping

![sampler-full](images/sampler/sampler-full.png)


You can load and save **SampleMaps** independently from the sampler patch as human-readable XML file, which makes it an own sampler file format 
The open `.xml`


### Round Robin


### MultiMic Samples

> Pro-Tip: If you have a multimic sample library, create a Samplemap for one mic position, export the samplemap and replace the audio reference files with a text editor and "Search and Replace"...  
> Then create a new sampler and load this samplemap. With this trick you don't have to import and edit the other samples, as they will use the same properties as the first mic position.  


## Compress and Export

### Export to HLAC (Monolith)

**HISE Lossless Audio Codec**

16-Bit HLAC monolith


Yes 

Oh and the .hrx compression / decompression is 100% bit equal, the Full Dynamics is something baked into HLAC directly.


#### Standard

#### Full Dynamic
24bit samples 


Full Dynamics is still 16bit, but it normalises the samples internally in chunks of 1024 samples so that decaying samples still use the full available bit depth.

This way you still get the advantages of a 16bit signal path (half memory usage for all the streaming buffers) but the quantisation noise at the end of a sample is not audible anymore (which can happen if you heavily compress or distort the sound).

The user can decide for herself if she favors disk usage or sound quality during the extraction of the samples. But with full dynamics enabled, the .hr1 archive files uses 24 bit FLAC encoding, otherwise the normalisation would be pointless.

gets slightly bigger 

if your material is 16bit from the start, you won‘t get any benefits from using Full dynamics. Just disable it at exporting and the end user will not have this option.



#### .ch1 hlac monolith files




### Hise Resources Archive File

.hr1

The HR is an archive (like zip). It compresses (lossless) the sample monoliths further for delivery to the user. When the user runs the plugin for the first time they will be asked to locate the HR files, then the monoliths will be extracted to their chosen location, after which they can delete the HR files.


* split archive


**Export Samples for Installer**

> **Export all Monoliths into Resource File**

-> Root Folder of Project



The user can decide for himself if he favors disk usage or sound quality during the extraction of the samples. 

But with full dynamics enabled, the .hr1 archive files uses 24 bit FLAC encoding, otherwise the normalisation would be pointless.







### Connect to GUI


[Link to SampleMap GUI Connect Recipes ]()



# Chris Stuff


## Structure

A sample map is arranged into three dimensions.

![](/images/custom/samplemapaxis.svg:600px)

- **Samplemap** (the root object with all information)
- *Round Robin Group*  (a group which will be cycled on every note on)
- Sample (a reference to a audio file with some information on how to play it)

Every sample is loaded in an object called **Samplemap**, which contains a arbitrary amount of **Round Robin Groups**, which contain all samples.

The sampler has no further organization logic - robin groups are normally processed the same way, so it makes sense to put them all into one sound generator. For everything else (eg. release trigger), use another **Sampler** with a **Midi Processor** that provides this functionality.







## Loading Samplemaps

> Pro-Tip: If you have a multimic sample library, create a Samplemap for one mic position, export the samplemap and replace the audio reference files with a text editor and "Search and Replace"...  
> Then create a new sampler and load this samplemap. With this trick you don't have to import and edit the other samples, as they will use the same properties as the first mic position.  



