---
keywords: Sample Map Editor
summary:  The editor for the sample mappings.
icon:     /images/icon_samplemapeditor
index:  02
---
![sampler-map](/images/interface/sample-map-editor.png) 

With the **Sample Map Editor** you can map your samples and save them as a [SampleMaps](/hise-modules/sound-generators/list/streamingsampler#sample-maps). You can add samples to the map with drag & dropping samples from your OS' filebrowser onto the map.

Then select one of the three mapping functions: 
- **Drop Point** - Drop your samples to a specific location in the Sample Map Editor. Move the samples up & down to select different drop modes.  
- **Pitch Detection** - A pitch detection algorithm that maps the samples according to their pitch. (not always 100% reliable)
- The mighty **[Filename Token Parser](/working-with-hise/hise-interface/sampler-workspace/sample-map-editor#filename-token-parser)**, in which you can map the samples according to their filename.


## Editing the Samplemap

After you added your samples to the SampleMap it's possible to drag them around in the Map Editor and adjust their map properties with the [SampleMap Value Setters](/working-with-hise/hise-interface/sampler-workspace/sample-map-editor) and edit their audio-related properties in the adjacent [Sample Editor](/working-with-hise/hise-interface/sampler-workspace/sample-editor). 

In the Sample Map Editor you can use some of the usual suspected Action Keys while dragging:
- **Ctrl** - to move the samples in octaves.
- **Shift** - to restrict the movement from the samples current position to the x and y axis.
- **Alt** - to duplicate samples.
- **Ctrl + Arrow Keys** - To move the samples with the keyboard arrows.

After you're finished with editing you can save the SampleMap (Ctrl+s) and give it a filename. The SampleMap will be saved into the projects [SampleMaps Folder](/working-with-hise/project-management/projects-folders/sample-maps) and will from this moment on be available in the SampleMap Selector in the toolbar and accessible with the scripting capabilities of HISE. [Example: Minimal Sampler](/tutorials/modules#minimal-sampler-example)

The next step would be to compress the SampleMaps samples into a single big monolith-file (HLAC) for improved loading-time and reduced file-size. Learn more about this here: [Compress and Export](/hise-modules/sound-generators/list/streamingsampler#compress-and-export)


### SampleMap Value Setters
| Name | Description |
| -------- | ---------------------------- |
| **RR Group** | the group index for round robin / random group start behaviour. Although it's called RRGroup, it can be used for any other purpose (like dynamic X-Fade or legato sample triggering). Think of this as an additional z-axis in the note/velocity coordinate system. |
| **RootNote** | the root note. This is the reference pitch note. |
| **HiKey** | the highest mapped key. |
| **LoKey** | the lowest mapped key. |
| **LoVel** | the lowest mapped velocity. |
| **HiVel** | the highest mapped velocity. |
| **LowerVelocityXFade** | Change the lower Velocity X-Fade  |
| **UpperVelocityXFade** | Change the upprt Velocity X-Fade |
> **Right click** on the property to open a big slider that allows finer adjustment


## Toolbar
- **New SampleMap** - Create a new SampleMap
- **Import SFZ file format** - [Import SFZ file format](/working-with-hise/hise-interface/sampler-workspace/sample-map-editor#sfz-importer)
- **Select SampleMap** - Load a SampleMap that has already been saved.
- **Warning** - Shows up, when you haven't saved your SampleMap
- **Save SampleMap** - Save the current SampleMap as..
- **Convert the current samplemap to HLAC monolith** - Convert the current samplemap to HLAC monolith format

- **Zoom In** - Zoom in the sample map
- **Zoom Out** - Zoom out the sample map
- **Undo** - Undo the last operation [Ctrl + Z]
- **Redo** - Redo the last operation [Ctrl + Y]

- **Select all Samples** - Select all Samples [Ctrl + A]
- **Deselect all Samples** - Deselect all Samples [Escape]
- **Autoplay sample on selection** - Autoplays the sample on selection. 

- **Fill Note Gaps** - Fill note gaps in SampleMap, horizontally
- **Fill Velocity Gaps** - Fill velocity gaps in SampleMap, vertically
- **Add Crossfades to overlapping sounds in groups** - Switches to crossfade mode. LoKey and HighKey properties are switched to **LowerVelocityXFade** and **UpperVelocityXFade**.



## Filename Token Parser
![sampler-map](/images/custom/sampler-filenametokenparser.png) 

The **Filename Token Parser** parses parts of the samples filenames into `tokens`. You can then map these tokens to specific properties of the sample map.

Let's say we have two sample with these filenames:
- **1** - `Cello_stacc_RR1_D#2_p.wav`  
- **2** - `Cello_stacc_RR2_C3_f.wav`

First we split the filename with the **Separator** (the default separator is `_`). Then we map the tokens to specific properties of the sample map:

- **1** - RR Group 1, Root Note D#2, Velocity Range 0-63  
- **2** - RR Group 2, Root Note C3, Velocity Range 64-127


### The Rows

**String**

The separated tokens of the first filename (it will iterate over all files, but only display the first filename tokens so that you can see what the parser is doing)


**Property**

The Property column decides to which SampleMap property the token is assigned to.

| Option | Property | Datatype |
| --- | ---- | --------- |
| Ignore | - | do nothing with this token. ignore the token information. (default) |
| Single Key | `LoKey`, `HiKey` & `Root` | sets the MIDI NoteNumber. Use a single "Number" (0-127) or a "Note name" in the format D#3 (middle octave = 3)  |
| RR Group | `RRGroup` | moves the sample into the specified RRGroup (starting with Group 1), Use "Number" or a "Custom" data type for this. |
| Velocity Spread | `LoVel` & `HiVel` | spreads the velocity across the whole range divided by the amount of found "Custom" items (pp,mp,ff). |
| Velocity Range | `LoVel` & `HiVel` | spreads the velocity across a range (_1-63_). You must use the data type "Number with Range" or "Custom" for this mode. |
| Low Velocity | `LoVel` | sets the lower velocity value, independently. use it together with **High Velocity**. "Number" only |
| High Velocity | `HiVel` | set the high velocity value. "Number" only |
| Velocity Value | `LoVel` & `HiVel` | maps each samples velocity to a single value ( LoVel: <number>, HiVel: <number>+1 ) |

		

**Data Type**

The Data Type column defines as which data type the token should be interpreted. The result is always a number, or a space separated number list (Values).

| Data Type | Description | Items | Values |
| ------ | -------------- | ---- | ---- |
| Number | Uses the number received from the token | - | - |
| Number with Range | Uses two numbers. base and a upper limit (0-56) to define a range. (for `Velocity Range`, exclusively) | the upper limit as number | - |
| Note Name | If the token is a Note Name (format: "D#3"), use this data type to convert it to the right midi note number (middle octave is 3). | - | - |
| Custom  | Maps any string in the item list to a number in the value list. **Example:** `RR1 RR2` and `1 2` will map `RR1` to RRGroup 1 and `RR2` to RRGroup 2. | the string token list (separated by space)  | the number list (separated by space) |
| Fixed Value | Sets a fixed value that can be entered in the Items&Values columns | number | number |
| Ignored | Ignores the token. You should not have to use this directly, as it's the datatype for ignored tokens. | - | - |

In case that you want to store the parser settings for further use: You can Copy & Paste or Save & Load the Filename Token Parsers settings in the top of the Popup.


The Solution to the example:

`Cello_stacc_RR1_D#2_p.wav`

`Cello_stacc_RR2_C3_f.wav`

| Token | Property | Data Type |
| - | --- | -------- |
| `Cello` | Ignore | Ignored |
| `stacc` | Ignore | Ignored |
| `RR1` | RRGroup | Custom |
| `D#2` | Single Key | Note name |
| `p` | Velocity Spread | Custom |




## SFZ Importer
SFZ is a free file exchange format for samplers. However, **HISE** is not designed to be a SFZ sample player. The SFZ parser makes it more easy to transfer other sample formats to **HISE**. Although there are opcodes for almost any property of a sampler, only these opcodes are supported:

> `sample, lokey, hikey, lovel, hivel, offset, end, loop_mode, loopstart, loopend, tune, pitch_keycenter, volume, group_volume, pan, groupName, key`

These are pretty much all opcodes thich relate to a **HISE** sampler property. If you want to convert NI KONTAKT libraries, check out the Chicken Translator SFZ edition, as this is the preferred way of migrating KONTAKT libraries

Loading SFZ files is remarkably easy, just use the SFZ button, or drop a .sfz file on the sampler. If there are multiple groups in the SFZ file, you will see a dialog window where you can consolidate the sfz groups to RR Groups or ignore dedicated sfz groups (and drop the same sfz on another sampler with a inverted selection to split the sfz file to two independant samplers")


### Scripting

If you want to access attributes of SampleMaps or change SampleMap aspects with scripting, use a typed Sampler script reference. (Shortcut: Right click on the top bar of the Sampler)

```javascript
const var Sampler2 = Synth.getSampler("Sampler1");
```