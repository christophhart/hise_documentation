---
keywords: Sample Map Editor
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
- warning: Funky do
- Select all Samples: Select all Samples
- Deselect all Samples: Deselect all Samples
- Fill Note Gaps: Fill note gaps in SampleMap
- Fill Velocity Gaps: Fill velocity gaps in SampleMap
- Automap Velocity: Sort the sounds along the velocity range according to their volume
- Refresh Velocity Crossfades.: Adds a crossfade to overlapping sounds in a group.
- Trim Sample Start: Removes the silence at the beginning of samples
---
![sampler-map](/images/custom/sampler-map.png) 
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

## Pitch Detection

## Filename Token Parser
![sampler-map](/images/custom/sampler-filenametokenparser.png) 




