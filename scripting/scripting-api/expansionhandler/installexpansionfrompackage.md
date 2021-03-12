If you have included the .hxi as metadata during the [Sample export](/working-with-hise/menu-reference/export#export-samples-for-installer), you can use this function to automatically extract the samples, copy the expansion file (and encrypt it if you have user credentials available) and refresh the list.

This operation will be asynchronously executed on the sample loading thread, which means you can use the [`ScriptPanel.setLoadingCallback`](/scripting/scripting-api/scriptpanel#setloadingcallback) function which will notify the user about the progress (extracting large sample sets might take a while so you most likely want some indication about the process).

The function expects two parameters, the first must be a file object that points to the .hr1 file you want to install and the second parameter must be either a constant from the FileSystem class or a file object pointing to an (existing) folder:

| 2nd Parameter | Effect |
| ---- | ----- |
| `FileSystem.Expansion` | The samples will be copied to the expansion folder. This means they end up in the AppData directory of your system drive which is not the best idea if you have lots of samples |
| `FileSystem.Samples` | The samples will be copied to the global sample folder that you can specified with the CustomSettingsPanel(!LINK). It will create an symlink file in the Expansion's Sample folder to redirect anything to the global sample folder. |
| Custom folder object | This will create a symlink file in the Expansion's sample folder to point to any arbitrary location. You can use this to setup your own sample management system and allow the user to spread the samples across multiple locations. |

You can change / query the folder you specify later on using the [`Expansion.setSampleFolder()`](/scripting/scripting-api/expansion#setsamplefolder) and [`Expansion.getSampleFolder()`](/scripting/scripting-api/expansion#getsamplefolder) methods.

 

 