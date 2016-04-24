# Overview

The [Sampler Sound Generator](Processors.php/#sampler) is the most complex sound generator in **HISE**. Documenting all functions would be overkill for the [Processor Reference](Processors.php), therefore this page.

The Sampler is a disk streaming sampler with round robin groups, cross-fade looping and SFZ import.  
All audio files that are loaded in a sampler are organized in this pretty simple structure (again a tree, like everything in **HISE**:

## Structure

- **Samplemap** (the root object with all information)
	- *Round Robin Group*  (a group which will be cycled on every note on)
		- Sample (a reference to a audio file with some information on how to play it)
		- ...
	- ...

Every sample is loaded in an object called **Samplemap**, which contains a arbitrary amount of **Round Robin Groups**, which contain all samples.

The sampler has no further organization logic - robin groups are normally processed the same way, so it makes sense to put them all into one sound generator. For everything else (eg. release trigger), use another **Sampler** with a **Midi Processor** that provides this functionality.

# Working with the sampler

The sampler interface consists of four parts, which can be shown by clicking on the respective button below the Modulator Chain button bar:

<p class="processor">![](images/listSamplerButtons.PNG)</p>

The sampler uses a global sample selection. That means you can select multiple samples in any panel, and they will be updated in the other panels too.

> Also every editing operation has full Undo / Redo support. Simply use <kbd>Ctrl</kbd>+<kbd>Z</kbd> / <kbd>Strg+Y</kbd> (the sampler needs to have keyboard focus for this).

## Sampler Settings

You can use this panel to change the behaviour of the sampler and its global properties:

![](images/listSamplerSettings.png)

ID | Name | Range | Description 
 -- | ---- |  ----- | -----------
4 | Preload Size  | -1 ... **11000** ... | The preload size in samples for all samples that are loaded into the sampler. If the preload size is `-1`, then the whole sample will be loaded into memory.
5 | Buffer Size | 0 ... **4096** ... | The buffer size of the streaming buffers in samples. The sampler uses two buffers **per voice** which are swapped (one is used for reading from disk and one is used to supply the sampler with the audio data)
6 | Voice Amount | 0 ... **64** | The amount of voices that the sampler can play. This is not the same as Voice Limit (which is a property of all Sound Generators).
7 | RR Groups | **0** ... x | The number of groups that are cycled in a round robin manier. **Warning: If you set this value, all samples with a bigger group index loose their group information (it truncates all group numbers to this value)**
8 | Retrigger Mode | **Kill Note**, Note off, Do nothing | determines how the sampler treats repeated notes.
9 | Pitch Tracking | **On**, Off | Enables pitch ratio modification for different notes than the root note. Disable this for drum samples.
10 | OneShot | On, **Off** | plays the whole sample (ignores the note off) if set to enabled.

> You can see the memory usage and the disk performance of this sampler instance on the left. The memory usage includes the streaming buffers, so if you want to decrease the memory usage, consider lowering the streaming buffers (which increases the disk performance) or reduce the voice amount.

## Sample Editor
<p class="processor">![](images/listSampleEditor.PNG)</p>

The Sample Editor has three panels: A toolbar with some handy actions, a audio waveform which displays the selected sound and some Value Setters to change the *audio-related* properties of the selected samples.

> **HISE** uses a global selection which can include multiple samples. The waveform will only show the last selected sample, where the Value Setters show the range of each property (the minimum value of any sample and the maximum value of any sample)

### The toolbar actions

Icon | Action | Description
---- | ------ | -----------
![](images/se_zi.PNG) | Zoom In | Zooms in the audio waveform horizontally.
![](images/se_zo.PNG) | ZoomOut | Zooms out the audio waveform horizontally.
![](images/se_sm.PNG) | SelectWithMidi | If enabled, the most recently triggered sample will be selected for editing.
![](images/se_ssa.PNG) | Enable Sample Start Area Dragging | If enabled, the <span style="color: #5500aa">**Sample Start Area**</span> can be dragged around
![](images/se_lsa.PNG) | Enable <kbd>Strg</kbd> Loop Area Dragging| If enabled, the <span style="color: #006600">**Loop Area**</span> can be dragged around
![](images/se_pa.PNG) | Enable Play Area Dragging| If enabled, the <span style="color: #777777">**Playback Area**</span> can be dragged around
![](images/se_ns.PNG) | NormalizeVolume | This normalizes the volume to 0dB.
![](images/se_le.PNG) | LoopEnabled | This toggles the loop playback.

### The sample waveform

The sample waveform shows the selected sample and if the sample is played, the current playing position.  
You can enable dragging with the toolbar and then drag around one of the areas.

### The *audio-related* sample properties

The sample editor has a [Value Setter](index.php/#value_setter) for all audio-related properties.

Name | Range | Description 
---- | ----- | -----------
Volume | -100dB ... +18dB | The gain in decibels.
Pan | -100L ... 100R | the balance of the sample. 
Normalized | On, Off | enables normalization of the sample data
Pitch | -100ct ... +100ct | the pitch factor in cents (+- 100). This is for fine tuning, for anything else, use RootNote.
SampleStart | 0 ... sample length | the start sample
SampleEnd | sample start ... sample length | the end sample,
SampleStartMod | 0 ... sample length | the amount of samples that the sample start modulation chain can modulate.
LoopStart | 0 ... sample length | the loop start in samples. 
LoopEnd | loop start ... sample end | the loop end in samples. 
LoopXFade | 0 ... loop start | the loop crossfade at the end of the loop 
LoopEnabled | On ... Off | Enable loop playback

> If you crossfade the loop section, the memory size will increase because it calculates the crossfade area and saves it into a internal buffer.

## Samplemap Editor

Name | Description 
---- | -----------
RootNote | the root note. This is the reference pitch note.
KeyHigh | the highest mapped key.
KeyLow | the lowest mapped key.
VeloLow | the lowest mapped velocity.
VeloHigh | the highest mapped velocity.
RR Group | the group index for round robin / random group start behaviour

## Sample Table

The sample table is a list of all loaded samples and can be sorted. There is also a search bar with a full [RegEx parser](https://en.wikipedia.org/wiki/Regular_expression)

# Importing files

Getting audio files into the sampler can be achieved in multiple ways. You can simply drag the files into the map editor, use a pitch detection algorithm to determine the root note or use a filename parser to extract properties from the file name of the sample.

You can import collections of samples as SFZ format or as internal SampleMap XML-File.

## Drag 'n Drop

You can drag a selection of samples into the map editor and they will be mapped according to the drop point:

> The drop-point behaviour is nicked from another well-known sampler ...

## Pitch Detection

## Filename parser

The Sampler has a powerful filename parser which divides the filename into `Tokens` and maps them to properties of the sample zone.  
Let's assume we have two samples with the filenames


`Cello_stacc_RR1_D#2_mp.wav`  
`Cello_stacc_RR2_C3_f.wav`


Using the filename parser, we can automap the samples so that they have these properties:

**1. Sample**: First RR Group, Root Note D2, Velocity Range 25-50  
**2. Sample**: Second RR Group, Root Note C3, Velocity Range 75-100

### The Import dialog

![](images/fileImport.PNG)

Load some audio files into the sampler and choose **Automap root based on file name**. You will see a window like this above where you can define the file name parse logic.

Enter the correct separator (the parser needs one character that is used to divide the filename into tokens. The default separator is `_`, but you can use any character.) The file name should now be divided into the tokens and every token will be a row in the dialog window. Step through every token and tell the parser what to do.


**String:**

The token content of the first filename (it will iterate over all files, but it displays only the first file so you can see what the parser is doing)

---

**Property:**

defines the property that should be set. You can set pretty much all midi related sample properties:

Option | Property | Datatype
------ | -------- | --------
Velocity Value | `VeloLow` & `VeloHigh` | maps the velocity range to (`VALUE, VALUE+1`).
Velocity Range | `VeloLow` & `VeloHigh` | spreads the velocity evenly to the complete Range. You must use the data type `Number with Range` or `Custom` for this mode.
Single Key | `RootNote`, `KeyLow` & `KeyHigh` | Maps the value to RootNote, KeyLow and KeyHigh.
RR Group | `RRGroup` | moves the sound into the specified group (starting with 1)
Ignore | - | Do nothing with this token. Use this for every token that does not contain special information (it is the default value anyway).
		


---

**Data Type**

The data type column defines the formatting of the token and how the parser extracts information from it (the result is always a number). Depending on the data type, you need to enter additional information into the *Items* and the *Values* columns.

Data Type | Description | Item List | Value List
--------- | ----------- | --------- | ----------
Number | Simply uses the number | - | -
Number with Range | Uses the number and a upper limit to define a range (for `Velocity Range`) | the upper limit as number | -
Note Name | if the token is a note name (format: "D#3"), use this data type to get the right midi note number (middle octave is 3). | - | -
Custom  | Maps any string in the item list to a number in the value list.  <br>*Example:* `RR1 RR2` and `1 2` will map the tokens `RR1` to group 1 and `RR2` to group 2. | the string token list (seperated by space)  | the number list (seperated by space) 
Fixed Value | Simply sets a value that can be entered in the item list | the constant value as number | -
Ignored | Ignores the token. You should not have to use this directly, as it's the datatype for ignored tokens. | - | -

After you filled out all required fields, you can store the parse settings to a file or copy it to clipboard - in case you entered a wrong value somewhere, you don't want to repeat the whole process.

Now press OK and the parser tries to automap all samples to the right place.

> There is a handy tool called "Close Gaps" which can be useful after importing the files with this method.

## SFZ Importer

SFZ is a free file exchange format for samplers. However, **HISE** is not designed to be a SFZ sample player. The SFZ parser makes it more easy to transfer other sample formats to **HISE**. Although there are opcodes for almost any property of a sampler, I limited the supported opcodes to the following list:

`sample, lokey, hikey, lovel, hivel, offset, end, loop_mode, loopstart, loopend, 
tune, pitch_keycenter, volume, group_volume, pan, groupName, key`

These are pretty much all opcodes thich relate to a **HISE** sampler property. 

> If you want to convert NI KONTAKT libraries, check out the Chicken Translator SFZ edition.

Loading SFZ files is remarkably easy, just use the SFZ button, or drop a .sfz file on the sampler. If there are multiple groups in the SFZ file, you will see a dialog window where you can consolidate the sfz groups to RR Groups or ignore dedicated sfz groups (and drop the same sfz on another sampler with a inverted selection to split the sfz file to two independant samplers)

## Loading Samplemaps

You can load and save **SampleMaps** independently from the sampler patch as human-readable XML file, which makes it an own sampler file format (similar to SFZ but a lot easier to parse)

> Pro-Tip: If you have a multimic sample library, create a Samplemap for one mic position, export the samplemap and replace the audio reference files with a text editor and "Search and Replace"...  
> Then create a new sampler and load this samplemap. With this trick you don't have to import and edit the other samples, as they will use the same properties as the first mic position.  
