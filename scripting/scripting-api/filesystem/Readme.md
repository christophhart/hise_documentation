---
keywords: FileSystem
summary:  The API class for accessing the file system in HISEScript
author: Christoph Hart
modified: 17.07.2020
---

This API class can be used for File I/O and create [`File`](/scripting/scripting-api/file) objects that can be used to access files.

### Special Locations

In order to access files, you will need to use the constants of the `FileSystem` object in order to go to special locations.

| Location | Description |
| ==== | =============== |
| AudioFiles | The audio file folder. In HISE it will be the repo folder, but in the compiled project it will be a sub folder in the appdata folder. |
| Samples | The sample folder as specified in the settings (or the subfolder of the HISE project during development). |
| AppData | The app data directory. This is the main directory for your project which will house the configuration files and user presets. |
| UserHome | The user home folder. 
| Documents | The user's Document folder. |
| Desktop | The user's desktop folder. |
| Downloads | The user's download folder. |

> Please be aware that using any of the user's folder without a good reason is bad taste and should be avoided if possible.