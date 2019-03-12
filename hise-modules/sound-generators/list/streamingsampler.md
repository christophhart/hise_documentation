---
keywords: Sampler
summary:  The sampler module of HISE
---

The Sampler is a disk streaming sampler with round robin groups, cross-fade looping and SFZ import. 
All audio files that are loaded in a sampler are organized in this pretty simple structure (again a tree, like everything in **HISE**:

## Structure

A sample map is arranged into three dimensions.

![](/images/custom/samplemapaxis.svg:600px)

- **Samplemap** (the root object with all information)
- *Round Robin Group*  (a group which will be cycled on every note on)
- Sample (a reference to a audio file with some information on how to play it)

Every sample is loaded in an object called **Samplemap**, which contains a arbitrary amount of **Round Robin Groups**, which contain all samples.

The sampler has no further organization logic - robin groups are normally processed the same way, so it makes sense to put them all into one sound generator. For everything else (eg. release trigger), use another **Sampler** with a **Midi Processor** that provides this functionality.


## Loading Samplemaps

You can load and save **SampleMaps** independently from the sampler patch as human-readable XML file, which makes it an own sampler file format (similar to SFZ but a lot easier to parse)

> Pro-Tip: If you have a multimic sample library, create a Samplemap for one mic position, export the samplemap and replace the audio reference files with a text editor and "Search and Replace"...  
> Then create a new sampler and load this samplemap. With this trick you don't have to import and edit the other samples, as they will use the same properties as the first mic position.  



