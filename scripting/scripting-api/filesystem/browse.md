This will create a file browser from the OS that let's the user choose a file for loading or saving (in case of saving it will confirm a overwrite).

- the `startFolder` parameter can be either a `File` object or one of the [special location](/scripting/scripting-api/filesystem#special-locations) constants of the `FileSystem` API object. If you pass `undefined` it will choose a sensible default (most likely the most recent location).
- the `forSaving` parameter decides whether the file is supposed to be overwritten or just read from.
- the `wildcard` parameter is a file wildcard (like eg. `*.txt` for all text files) and can be used to filter the files being displayed. If the wildcard is an empty string, it will show all files.
- the `callback` parameter is a function with one parameter that will be executed when a file has been chosen.

If you call this function it will return immediately and open the file browser asynchronously (otherwise the script execution would time out during the selection).  
Therefore you will need to pass in a function that will be executed as soon as the user has selected a file. It expects a function with a single parameter that will hold a [File](/scripting/scripting-api/file) object with the selected file:

```javascript
FileSystem.browse(undefined, false, "*.txt", function(result)
{
    // the parameter is a File object, so we just show it
    // in the OS' file browser.
    result.show();
});
```

