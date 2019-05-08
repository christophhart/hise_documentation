---
keywords: Map Editor
summary:  The editor for the sample mappings.
icon:     /images/icon_samplemapeditor
index:  03
items:	
- Zoom Out: Zoom out the sample map
- New SampleMap: Create a new SampleMap
- Load SampleMap: Load a SampleMap from the pool.
- Save SampleMap: Save the current SampleMap
- Convert to Monolith: Convert the current samplemap to HLAC monolith format
- Import SFZ file format: Import SFZ file format
- Undo: Undo the last operation
- Redo: Redo the last operation
- Zoom In: Zoom in the sample map
- Duplicate: Duplicate all selected samples
- Cut: Cut selected samples
- Copy: Copy samples to clipboard
- Paste: Paste samples from clipboard
- Delete: Delete all selected samples
- warning: Shows up, when you haven't saved your SampleMap
- Select all Samples: Select all Samples
- Deselect all Samples: Deselect all Samples
- Fill Note Gaps: Fill note gaps in SampleMap
- Fill Velocity Gaps: Fill velocity gaps in SampleMap
- Automap Velocity: Sort the sounds along the velocity range according to their volume
- Refresh Velocity Crossfades.: Adds a crossfade to overlapping sounds in a group.
- Trim Sample Start: Removes the silence at the beginning of samples
- rebuild: Rebuilds the SampleMap and refreshes its indexes
---
![sampler-map](/images/custom/sampler-map.png) 

With the Map Editor you can map your samples and save them as a SampleMap.   








## Toolbar

{ICON_TABLE}

## Editing Sample Properties
You can change the MIDI related properties of each sample by setting its property.
You can either use the **+ / -** buttons to change the values relatively, or directly enter a value (in this case it will be applied to the whole selection).

| Name | Description |
| -------- | ---------------------------- |
| **RR Group** | the group index for round robin / random group start behaviour. Although it's called RRGroup, it can be used for any other purpose (like dynamic X-Fade or legato sample triggering). Think of this as an additional z-axis in the note/velocity coordinate system. |
| **RootNote** | the root note. This is the reference pitch note. |
| **HiKey** | the highest mapped key. |
| **LoKey** | the lowest mapped key. |
| **LoVel** | the lowest mapped velocity. |
| **HiVel** | the highest mapped velocity. |
> **Right click** on the property to open a big slider that allows finer adjustment


## SFZ Importer
SFZ is a free file exchange format for samplers. However, **HISE** is not designed to be a SFZ sample player. The SFZ parser makes it more easy to transfer other sample formats to **HISE**. Although there are opcodes for almost any property of a sampler, only these opcodes are supported:

> `sample, lokey, hikey, lovel, hivel, offset, end, loop_mode, loopstart, loopend, tune, pitch_keycenter, volume, group_volume, pan, groupName, key`

These are pretty much all opcodes thich relate to a **HISE** sampler property. If you want to convert NI KONTAKT libraries, check out the Chicken Translator SFZ edition, as this is the preferred way of migrating KONTAKT libraries

Loading SFZ files is remarkably easy, just use the SFZ button, or drop a .sfz file on the sampler. If there are multiple groups in the SFZ file, you will see a dialog window where you can consolidate the sfz groups to RR Groups or ignore dedicated sfz groups (and drop the same sfz on another sampler with a inverted selection to split the sfz file to two independant samplers")


## Drop Point
Drag & drop your samples to a specific location in the Map Editor.

## Pitch Detection
A pitch detection algorithm that maps the samples according to their pitch. (not always 100% reliable) 

## Filename Token Parser
![sampler-map](/images/custom/sampler-filenametokenparser.png) 

The **Filename Token Parser** maps samples according to their filename. It divides the filename into `tokens` and maps them to specific properties of the SampleMap.

Let's assume we have two samples with the filenames:

- `Cello_stacc_RR1_D#2_mp.wav`  
- `Cello_stacc_RR2_C3_f.wav`

Using the filename parser, we can automap the samples so that they have these properties:

**1. Sample**: First RR Group, Root Note D#2, Velocity Range 25-50  
**2. Sample**: Second RR Group, Root Note C3, Velocity Range 75-100

Load some audio files into the sampler and choose **Filename Token Parser**. You will see a window like this above where you can define the file name parse logic.

Enter the correct **Separator** (the parser needs one character that is used to divide the filename into tokens. The default separator is `_`, but you can use any character. The file name should now be divided into the tokens and every token will be a row in the dialog window. Step through every token and tell the parser what to do.


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