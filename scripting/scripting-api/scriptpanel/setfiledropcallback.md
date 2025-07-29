This function allows a file to be dropped on the panel that you can use for any purpose. It's basically the same functionality as the [`FileSystem.browse()`](/scripting/scripting-api/filesystem#browse) call, but with a different UX that some people might prefer over the native file dialogue.

The function expects three parameters, the first one will determine at which events the callback will be exeucted and must be one of these Strings (similar to the `callbackLevel` property):

| String | Description |
| --- | -------- |
| `"No Callbacks"` | Ignore all file drag operations (default). |
| `"Drop Only"` | Only fires the callback when the file was dropped. |
| `"Drop & Hover"` | Additionally fires a callback when a dragged file enters / exits the panel. |
| `"All Callbacks"` | Also fires the callback when you move the dragged file inside the panel. |

If you pass in an empty String, it will deactivate the callback like `"No Callbacks"`. You can use this parameter to limit the execution of the callback to match your implementation: if you only want to react to a file being dropped, then use `"Drop Only"` and the other callback levels offer a way for you to change the UI to let the user know that the file can be dropped (on top of the OS-native mouse cursor change).

The second parameter is a wildcard that filters the file types that can be dropped on the panel. The format is the usual file wildcard format, so `*.txt` or `*.*`.  
If you want multiple wildcards, use a semicolon or comma: `*.aiff,*.wav,*.mp3`.

> if you want to only allow folders to be dropped, you need to supply the string `"{FOLDER}"` as wildcard.

The third parameter is the function that is executed at all events specified by the callback level parameter. It must be a (inline) function with a single parameter that
 contains a JSON object with the file drop status information:

| Property | Type | Event | Description |
| --- | -- | --- | -------- |
| `x` | `int` | Move, Enter, Drop | the `x` position relative to the top left of the panel of the drag event. |
| `y` | `int` | Move, Enter, Drop | the `y` position relative to the top left of the panel of the drag event. |
| `hover` | `bool` | Move, Enter, Drop, Exit | `true` if the file is currently being dragged over the panel. |
| `drop` | `bool` | Move, Enter, Drop, Exit | `true` if the file is being dropped. |
| `fileName` | `String` | Drop | The absolute path of the file being dropped. If more than one file is dropped, then this will be an array with all matching filenames. |

> If you need a [File](/scripting/scripting-api/file) object from the file being dropped, just use the new [`FileSystem.fromAbsolutePath()`](/scripting/scripting-api/filesystem#fromabsolutepath) method

If you want to store the filename as value in a user preset, you need to wrap the String into a JSON object like this:

```javascript
Panel1.setFileDropCallback("All Callbacks", "*.wav", function(f)
{
    if(f.drop)
    {
        // We can't pass in only the filename
        // (a String is forbidden as preset value in order
        // to prevent subtle bugs) so we need to create
        // a simple object with a single property
        var x = {};
        x.fileName = f.fileName;
        
        // We could also just have passed in f to the function,
        // but this reduces the noise a bit
        this.setValue(x);
        this.changed();
    }
});

inline function onPanel1Control(component, value)
{
    // This might be empty (at initialisation or for whatever reason)...
    if(isDefined(value.fileName))
    {
        var myFile = FileSystem.fromAbsolutePath(value.fileName);
        // Do something with myFile...
    }
};
```

