---
keywords: Sampler Settings
summary:  The Settings of the Sampler Module
author:   Christoph Hart
modified: 18.03.2019
index: 01
---
![sampler-table](/images/custom/sampler-settings.png) 


> You can see the memory usage and the disk performance of this sampler instance on the left. The memory usage includes the streaming buffers, so if you want to decrease the memory usage, consider lowering the streaming buffers (which increases the disk performance) or reduce the voice amount.

**Disk IO Settings**	
| name | default value | description |
| ---- | ---- | ---------- |
| Buffer Size | 4096 | Sets the buffer size of the Sampler |
| Preload Size | 8192 ||
| Purge Channel | NoMultiChannel ||
| Memory | 0.00MB ||
| Disk Usage | 0.0% ||
| Purge All | Disabled | |


**Voice Settings**
| name | default value | description |
| ---- | ---- | ---------- |
| Amount | 256 ||
| Soft Limit | 256 ||
| Fade Time | 20 ||


*Group Settings*
| name | default value | description |
| ---- | ---- | ---------- |
| RR Groups | 1 ||
| Group FX | Disabled ||
| Edit FX | Group 1 ||

  
*Playback Settings*
| name | default value | description |
| ---- | ---- | ---------- |
| Pitch Track | Enabled ||
| Retrigger | Kill Duplicate ||
| Playback | Normal ||
