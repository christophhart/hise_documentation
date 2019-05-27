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

You can load and save **SampleMaps** independently from the Sampler as human-readable `.xml` files, which makes it an own sampler file format. 


### Todo MultiMic Samples

> Pro-Tip: If you have a multimic sample library, create a Samplemap for one mic position, export the samplemap and replace the audio reference files with a text editor and "Search and Replace"...  
> Then create a new sampler and load this samplemap. With this trick you don't have to import and edit the other samples, as they will use the same properties as the first mic position.  


## Compress and Export

### Export to HLAC (Monolith)

A Map Editors SampleMap let's you play the samples directly from the Samples folder. This is not the most efficient way to play samples, especially if you have a lot of mapped samples. Here HLAC (HISE Lossless Audio Codec) comes in to compress all the SampleMaps samples into one big "monolith" chunk. **Export to HLAC** will render your samples in a single compressed file, and access the samples from within. This shrinks the overall filesize + speeds up file access. The `.ch1` monolith files will end up in the root directory of the [Samples Folder](/working-with-hise/project-management/projects-folders/samples).

> Read this Forum entry of Christoph if you want to understand how it works behind the hood: [HISE Lossless Audio Codec is ready](https://forum.hise.audio/topic/236/hise-lossless-audio-codec-is-ready) 

There are three modes in which the HLAC (.ch1) file can be processed: 

#### No Normalization

**No Normalization** just takes the samples and compresses them into the monolith file.

#### Normalise every sample

This **normalises every sample** individually and compressed them together. 


#### Full Dynamics

**Full Dynamics** is a mode that leverages the higher resolution of 24bit samples. 

Behind the scenes **Full Dynamics** still uses 16bit, but it normalises the samples internally in chunks of 1024 samples so that decaying samples still use the full available bit depth.

This way you get the advantages of a 16bit signal path (half memory usage for all the streaming buffers) but the quantisation noise at the end of a sample is not audible anymore (which can happen if you heavily compress or distort the sound).

During the extraction process of the samples the user can decide for herself if she favors disk usage or sound quality. But with Full Dynamics enabled, the .hr1 archive file uses 24bit FLAC encoding, otherwise the normalisation would be pointless.


> If your material is 16bit from the start, you won‘t get any benefits from using Full Dynamics. Just disable it at exporting and the end user will not have this option.


### Hise Resources Archive File

If you want to distribute the samples to the enduser you have the option to compresses (lossless) the sample monoliths further for delivery. [Export > Export Samples for installer](/working-with-hise/menu-reference/export#export-samples-for-installer).

The HR is a file archive (like zip). When the user runs the plugin for the first time they will be asked to locate the HR files that were shipped with the instrument/plugin. The monoliths will be extracted to their chosen location, after which the user can opt-in to delete the HR files.


### Connect to GUI

[Link to SampleMap GUI Connect Recipes ]()
