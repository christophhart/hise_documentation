---
keywords: Sampler
summary:  The sampler module of HISE
---

One of the key highlights of HISE is to build sample based VSTis. The main module for that task is the [Sampler](/hise-modules/sound-generators/list/streamingsampler).  

The Sampler is a disk streaming sampler which leverages the full power of the **HISE** Engine. It is optimized to play a lot of voices in parallel and allows to map samples in SampleMaps up to an individual SampleMap-size of 4GB. 

The samples can be arranged in a three-dimensional map to account for Note number(x), Velocity(y) and Round Robin Groups(z) and a lot of tools are provided to map and edit your samples quick and efficiently. 

![](/images/custom/samplemapaxis.svg:400px)

**General Workflow**:

- Put your samples in the projects [Samples](/working-with-hise/project-management/projects-folders/samples) Folder.
- Create a Sampler and map and save your samples into a `.xml` SampleMap with its [Map Editor](/ui-components/floating-tiles/hise/samplemapeditor). The saved SampleMaps will show up in the projects [SampleMaps](/working-with-hise/project-management/projects-folders/sample-maps) Folder. 
- Collect an compress all samples in a SampleMap with the [HISE Lossless Audio Codec](sampler.html#Export-to-HLAC-Monolith) (`.ch1`) into a single monolith file. 
- When the development of the plugin is ready, all HLAC monolith files can be bundled in a [HISE Resource](/hise-modules/sound-generators/list/streamingsampler#hise-resources-archive-file) (`.hr1`) Archive File, that can be distributed to the user. 


## Sampler Tabs

The Sampler features four special edit tabs:

- [Sampler Settings](/working-with-hise/workspaces/sampler-workspace/sample-settings)
- [Sample Editor](/working-with-hise/workspaces/sampler-workspace/sample-editor)
- [Map Editor](/working-with-hise/workspaces/sampler-workspace/sample-map-editor)
- [Table View](/working-with-hise/workspaces/sampler-workspace/sample-table)

Additional to the default chains, it features two extra [Modulation Chains](/hise-modules/sound-generators/list/streamingsampler#chains-) to modulate the **Sample Start** of samples and the **Group Fade** between different RRGroups.

## Sample Maps

You can load and save **SampleMaps** independently from the Sampler as human-readable `.xml` files, which makes it an own sampler file format. It saves all the individual sample-settings that you give your samples in the Map- and Sample-Editor.

```
<?xml version="1.0" encoding="UTF-8"?>

<samplemap ID="" RRGroupAmount="2" MicPositions=";">
  <sample Root="62" LoKey="62" HiKey="63" LoVel="0" HiVel="127" RRGroup="2"
          FileName="{PROJECT_FOLDER}Folk Harp/EWHarp_Normal_A#1_v2_RR1.wav"
          Duplicate="1" Pan="5" Pitch="4" Volume="-10" SampleStart="515"
          LoopStart="3934" LoopXFade="216" SampleStartMod="10036" LoopEnabled="1"/>
  <sample Root="62" LoKey="62" HiKey="63" LoVel="0" HiVel="127" RRGroup="1"
          FileName="{PROJECT_FOLDER}Folk Harp/EWHarp_Normal_A#1_v2_RR2.wav"
          Duplicate="1" Normalized="1" NormalizedPeak="42.6667" LoopEnabled="1"
          SampleStart="50803" SampleEnd="304376" SampleStartMod="51418"
          Pitch="1" Pan="-8" Volume="2"/>
</samplemap>
```

## Compress and Export

### Export to HLAC (Monolith)

![convert-to-monolith](/images/icon_convert-to-monolith:32px)

A freshly mapped SampleMap plays the samples directly from the Samples folder. This is not the most efficient way to play samples, though, especially if you have a lot of mapped samples. 

Here the HLAC (HISE Lossless Audio Codec) comes in to compress all the SampleMaps samples into one big "monolith" chunk. **Export to HLAC** will render your samples in a single compressed file, to have faster access to the audio material. This shrinks the overall filesize + speeds up general file access. The `.ch1` monolith files will end up in the root directory of the [Samples Folder](/working-with-hise/project-management/projects-folders/samples).

> Read this Forum entry of Christoph if you want to understand how it works behind the hood: [HISE Lossless Audio Codec is ready](https://forum.hise.audio/topic/236/hise-lossless-audio-codec-is-ready) 

There are three modes in which the HLAC (.ch1) file can be processed: 

#### No Normalization

**No Normalization** just takes the samples and compresses them into the monolith file.

#### Normalise every sample

This **normalises every sample** individually and compressed them together. 


#### Full Dynamics

**Full Dynamics** is a mode that leverages the higher resolution of 24bit samples. 

Behind the scenes **Full Dynamics** still uses 16bit, but normalises the samples internally in chunks of 1024 samples so that decaying samples still use the full available bit depth.

This way you get the advantages of a 16bit signal path (half memory usage for all the streaming buffers) but the quantisation noise at the end of a sample is not audible anymore (which can happen if you heavily compress or distort the sound).

During the extraction process of the samples the user can decide for herself if she favors disk usage or sound quality. But with Full Dynamics enabled, the .hr1 archive file uses 24bit FLAC encoding, otherwise the normalisation would be pointless.


> If your material is 16bit from the start, you won‘t get any benefits from using Full Dynamics. Just disable it at exporting and the end user will not have this option.


### Hise Resources Archive File

If you want to distribute the samples to the enduser you have the option to compress 
the monoliths (lossless) further for delivery. [Export > Export Samples for installer](/working-with-hise/menu-reference/export#export-samples-for-installer).

The HLAC codec is optimized for maximal decoding performance so a standard lossless algorithm like FLAC 
can provide you with a 10%-20% better compression ratio. 

The Hise Resource is a file archive that uses the FLAC codec and splits up the files into customizable chunks of 500MB - 1GB. 
So if you compress a 3.7GB library and choose 1GB file size, you will get these files:

```
Samples.hr1 // 1GB
Samples.hr2 // 1GB
Samples.hr3 // 1GB
Samples.hr4 // 700MB
```

When the user runs the plugin for the 
first time they will be asked to locate the HR files that were shipped with the 
instrument/plugin. The monoliths will be extracted to their chosen location, after 
which the user can opt-in to delete the HR files.

A thorough explanation of this process can be found on the excellent user manual of David Healey's [Sofia Woodwinds](https://librewave.com/knowledge-base/sample-library-installation-guide/?v=3a52f3c22ed6#Installing_the_samples):