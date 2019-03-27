---
keywords: Sampler
summary:  A Sampler Tour
modified: 26.03.2019
---

![sampler-empty](images/sampler/sampler-map-full.png)

One of the key highlights of HISE is to build sample based VSTis. The main module for that task is the [Sampler Module](../reference/modules.html#Sampler) and because of its complexity this whole chapter is dedicated to how it works and how to get the most out of it.  

The Sampler is a disk streaming sampler which leverages the full power of the **HISE** Engine. It is optimized to play a lot of voices in parallel and allows to map your samples in SampleMaps up to an individual SampleMap-size of 4GB. 

The samples can be arranged in a three-dimensional map to account for Keys(x), Velocity(y) and Round Robin Groups(z) and a lot of tools are provided to map and edit your samples quick and efficiently. 

General Workflow:

* Put your samples in the projects **Samples** Folder.
* Map and save your samples in an (open an editable) `.xml` [SampleMap](sampler.html#Sample-Mapping)-format in your projects **SampleMaps** Folder. 
* Collect an compress all samples in a SampleMap with the [HISE Lossless Audio Codec](sampler.html#Export-to-HLAC-Monolith) (`.ch1`) into a single monolith file. 
* When the development of the plugin is ready, all HLAC monolith files can be bundled in a [HISE Resource](sampler.html#Hise-Resources-Archive-File) (`.hr1`) Archive File, that can be distributed to the user. 


## Sampler Tabs

The Sampler features four tabs, which open by clicking on the button below the Modulator Chain button bar:

* Sampler Settings
* Sample Editor
* Map Editor
* Table View

### Sampler Settings
![sampler-settings](images/sampler/sampler-settings.png)

You can use this panel to change the samplers global properties:


* Disk IO Settings	
  * Buffer Size
  * Preload Size 
  *	Purge Channel
  *	Purge All

  Memory 
  Disk Usage

> You can see the memory usage and the disk performance of this sampler instance on the left. The memory usage includes the streaming buffers, so if you want to decrease the memory usage, consider lowering the streaming buffers (which increases the disk performance) or reduce the voice amount.


* Voice Settings
  * Amount
  * Soft Limit
  * Fade Time

* Group Settings
  * RR Groups
  * Group FX
  * Edit FX
* Playback Settings
  * Pitch Track
  * Retrigger
  * Playback




### Sample Editor
![sampler-editor](images/sampler/sampler-editor.png)


The Sample Editor has three panels: A toolbar with some handy actions, a audio waveform which displays the selected sound and some Value Setters to change the *audio-related* properties of the selected samples.

> **HISE** uses a global selection which can include multiple samples. The waveform will only show the last selected sample, where the Value Setters show the range of each property (the minimum value of any sample and the maximum value of any sample)


### Map Editor
![sampler-empty](images/sampler/sampler-map.png)



- **Samplemap** (the root object with all information)
	- *Round Robin Group*  (a group which will be cycled on every note on)
		- Sample (a reference to a audio file with some information on how to play it)
		- ...
	- ...

Every sample is loaded in an object called **Samplemap**, which contains a arbitrary amount of **Round Robin Groups**, which contain all samples.

The sampler has no further organization logic - robin groups are normally processed the same way, so it makes sense to put them all into one sound generator. For everything else (eg. release trigger), use another **Sampler** with a **Midi Processor** that provides this functionality.

| Name | Description |
| ---- | ----------- |
| RootNote | the root note. This is the reference pitch note |
| KeyHigh | the highest mapped key |
| KeyLow | the lowest mapped key |
| VeloLow | the lowest mapped velocity |
| VeloHigh | the highest mapped velocity |
| RR Group | the group index for round robin / random group start behaviour |

**Shortcuts**

| Shortcut | Action |
| -------- | ------ |
`Alt + Drag` | Drag the selected samples to another location |


### Table View
![sampler-table](images/sampler/sampler-table.png)


The sample table is a list of all loaded samples and can be sorted. There is also a search bar with a full [RegEx parser](https://en.wikipedia.org/wiki/Regular_expression)


## Sample Mapping

![sampler-full](images/sampler/sampler-full.png)

**HISE** provides different methods to help you to map your samples. You can either:  
* Drag & drop your samples to a specific **Drop Point**
* Let a **Root Note Pitch Detection** Algorithm determine the samples Root Position
* Or use the mighty **Filename Token Parser** to map the samples according to their filename


`SampleMaps`

You can import collections of samples as SFZ format or as internal SampleMap XML-File.

You can load and save **SampleMaps** independently from the sampler patch as human-readable XML file, which makes it an own sampler file format 
The open `.xml`
All audio files that are loaded in a sampler are organized in a pretty simple  structure (again a like a tree, like everything in **HISE**)


### Filename Token Parser

![filenamtokenparser](images/sampler/sampler-filenametokenparser.png)


The Sampler has a powerful **Filename Token Parser** which divides the filename into `tokens` and maps them to properties of the sample zone.  
Let's assume we have two samples with the filenames

`Cello_stacc_RR1_D#2_mp.wav`  
`Cello_stacc_RR2_C3_f.wav`

Using the filename parser, we can automap the samples so that they have these properties:

**1. Sample**: First RR Group, Root Note D2, Velocity Range 25-50  
**2. Sample**: Second RR Group, Root Note C3, Velocity Range 75-100


Load some audio files into the sampler and choose **Automap root based on file name**. You will see a window like this above where you can define the file name parse logic.

Enter the correct separator (the parser needs one character that is used to divide the filename into tokens. The default separator is `_`, but you can use any character.) The file name should now be divided into the tokens and every token will be a row in the dialog window. Step through every token and tell the parser what to do.


**String:**

The token content of the first filename (it will iterate over all files, but it displays only the first file so you can see what the parser is doing)


**Property:**

defines the property that should be set. You can set pretty much all midi related sample properties:

| Option | Property | Datatype |
| ------ | -------- | -------- |
| Velocity Value | `VeloLow` & `VeloHigh` | maps the velocity range to (`VALUE, VALUE+1`). |  
| Velocity Range | `VeloLow` & `VeloHigh` | spreads the  velocity evenly to the complete Range. You must use the data type `Number with Range` or `Custom` for this mode. |
| Single Key | `RootNote`, `KeyLow` & `KeyHigh` | Maps the value to RootNote, KeyLow and KeyHigh. |
| RR Group | `RRGroup` | moves the sound into the specified group (starting with 1) |
| Ignore | - | Do nothing with this token. Use this for every token that does not contain special information (it is the default value anyway). |
		

**Data Type**

The data type column defines the formatting of the token and how the parser extracts information from it (the result is always a number). Depending on the data type, you need to enter additional information into the *Items* and the *Values* columns.

| Data Type | Description | Item List | Value List |
| --------- | ----------- | --------- | ---------- |
| Number | Simply uses the number | - | - |
| Number with Range | Uses the number and a upper limit to define a range (for `Velocity Range`) | the upper limit as number | - |
| Note Name | if the token is a note name (format: "D#3"), use this data type to get the right midi note number (middle octave is 3). | - | - |
| Custom  | Maps any string in the item list to a number in the value list.  <br>*Example:* `RR1 RR2` and `1 2` will map the tokens `RR1` to group 1 and `RR2` to group 2. | the string token list (seperated by space)  | the number list (seperated by space) |
| Fixed Value | Simply sets a value that can be entered in the item list | the constant value as number | - |
| Ignored | Ignores the token. You should not have to use this directly, as it's the datatype for ignored tokens. | - | - |

After you filled out all required fields, you can store the parse settings to a file or copy it to clipboard - in case you entered a wrong value somewhere, you don't want to repeat the whole process.

Now press OK and the parser tries to automap all samples to the right place.

> There is a handy tool called "Close Gaps" which can be useful after importing the files with this method.



### SFZ Importer

SFZ is a free file exchange format for samplers. However, **HISE** is not designed to be a SFZ sample player. The SFZ parser makes it more easy to transfer other sample formats to **HISE**. Although there are opcodes for almost any property of a sampler, I limited the supported opcodes to the following list:

`sample, lokey, hikey, lovel, hivel, offset, end, loop_mode, loopstart, loopend, 
tune, pitch_keycenter, volume, group_volume, pan, groupName, key`

These are pretty much all opcodes thich relate to a **HISE** sampler property. 

> If you want to convert NI KONTAKT libraries, check out the Chicken Translator SFZ edition.

Loading SFZ files is remarkably easy, just use the SFZ button, or drop a .sfz file on the sampler. If there are multiple groups in the SFZ file, you will see a dialog window where you can consolidate the sfz groups to RR Groups or ignore dedicated sfz groups (and drop the same sfz on another sampler with a inverted selection to split the sfz file to two independant samplers)


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