This function connects the macro control system and the global routing system by letting you send / receive value changes from macro controls. In order to use it, just call this method to assign any cable to a macro index. 

| Parameter | Values | Description |
| ---- | -- | ---------- |
| `macroIndex` | int from 0 to 7 | the macro control that you want to connect to the global cable |
| `macroIsTarget` | bool | whether the macro control should control the global cable or vice versa (obviously this can't be bidirectional to prevent feedback loops) |
| `filterRepetitions` | bool | whether the cable should filter out repetitions of the same value. This might vastly decrease the CPU usage if you're modulating the cable value and don't want to send a new macro value each block. |

