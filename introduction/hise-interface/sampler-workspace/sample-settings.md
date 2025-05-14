---
keywords: Sampler Settings
summary:  The Settings of the Sampler Module
author:   Christoph Hart
modified: 18.03.2019
index: 04
---
![sampler-table](/images/custom/sampler-settings.png) 

Although not part of the Sample Workspace, the Sampler settings can be quite important to adjust the samplers Disk IO-, Voice-, Group- and Playback Settings to your needs. You can find them with clicking on a Sampler module and selecting the **Sampler Settings** tab.

## Disk IO Settings	

| name | default value | description |
| --- | --- | ------------ |
| Buffer Size | 4096 | Sets the buffer size of the Sampler. The sampler uses two streaming buffers which are swapped (one is used for reading from disk and one is used to supply the sampler with the audio data). |
| Preload Size | 8192 | Change the preload size in samples for all samples that are loaded into the sampler. If the preload size is set to `-1`, the whole sample will be loaded into memory.|
| Purge Channel | NoMultiChannel | Purge the Channel when using MultiChannel|
| Memory | 0.00MB | Shows the memory usage of the loaded samplemap |
| Disk Usage | 0.0% | Shows the disk usage of the played samples |
| Purge All | Disabled | If Purge All is set to Enabled, all samples of this sampler won't be loaded into memory. |

In the Disk IO Settings you can see the Memory and the Disk Usage of the sampler. The memory usage includes the streaming buffers, so if you want to decrease the memory usage, consider lowering the Buffer Size (which increases the disk performance) or reduce the voice amount.

## Voice Settings

| name | default value | description |
| --- | --- | ------------ |
| Amount | 256 | The hard limit of voices that this sampler can play. |
| Soft Limit | 256 | The soft limit of voices that this sampler plays before it  starts to fade out voices.   |
| Fade Time | 20 | If you play more than the number of soft-limit voices this setting will determine the fadeout time of each voice that is going to be killed in ms. |


## Group Settings

| name | default value | description |
| --- | --- | ------------ |
| RR Groups | 1 | Set the amount of RRGroups of the Sampler |
| Group FX | Disabled | Enable, to play all groups simultanously. The crossfade can be modulated in the Group Fade Modulation Chain. |
| Edit FX | Group 1 | Set the crossfade table for each RRGroup if Group XF is enabled. Invert the table to crossfade between different groups. |

  
## Playback Settings

| name | default value | description |
| ---- | ---- | ---------- |
| Pitch Track | Enabled | Change the samples pitch ratio with Root note. Disable this for drum samples. |
| Retrigger | Kill Duplicate | Determines how the sampler treats repeated notes: **Kill Note**, **Note Off**, **Do nothing**, **Kill Duplicate** |
| Playback | Normal | Switch between **Normal** and **Reverse** Playback. **One Shot** plays the whole sample (ignores the NoteOff). |



### Scripting

You can access most of these properties with scripting. Use a generic script reference to access the [Samplers](/scripting/scripting-api/sampler) audio settings by script. 

```javascript
const var Sampler1 = Synth.getChildSynth("Sampler1");
```