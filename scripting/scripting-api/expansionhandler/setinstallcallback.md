This callback expects one argument that will contain an object with some information about the installation status.

| Property | Description |
| ---- | ------- |
| `obj.Status` | A status code indicating the state of the installation: `0` before the extraction starts, `1` during the extraction and `2` if the extraction is finished. The callback is guaranteed to be executed with `2` at least once. |
| `obj.Expansion` | If the installation (and optional initialisation using the authentication credentials) suceeded, this will contain a reference to the expansion so you can do some post-installation tasks. |
| `obj.Progress` | This contains the extraction progress. It's basically the same as `Engine.getPreloadProgress`. |
| `obj.SourceFile` | The package file that is being extracted. |
| `obj.TargetFolder` | The directory where the expansion is being installed to. |
| `obj.SampleFolder` | The sample folder that is being used for the samples. |

You can use this callback for different tasks that might suit your handling of expansions:

- deleting the .hr1 file after a sucessful installation
- rebuilding user presets after an expansion update
- automatically switching to the installed expansion using `ExpansionHandler.setCurrentExpansion()`

```javascript

const var t = FileSystem.getFolder(FileSystem.Desktop).getChildFile("test.hr1");
const var e = Engine.createExpansionHandler();

function installCallback(obj)
{
    if(obj.Status == 2 && isDefined(obj.Expansion))
    {
        // make sure the user presets are updated
        obj.Expansion.rebuildUserPresets();
        
        // ask the user if he wants to delete the archive file...
        Engine.showYesNoWindow("Installation sucessful", 
                               "Do you want to delete the archive file", 
        function(ok)
        {
            if(ok)
                t.deleteFileOrDirectory();                
        });
    }
};

e.setInstallCallback(installCallback);
e.installExpansionFromPackage(t, FileSystem.Expansions);
```