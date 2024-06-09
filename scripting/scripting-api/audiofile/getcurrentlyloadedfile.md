The `getCurrentlyLoadedFile` method returns the reference string for the currently loaded audio file. This reference string indicates the file path or name of the audio file that is currently in use. If the file is located in the **AudioFiles** folder of your project, the path up to the **AudioFiles** folder will be represented by the `{$PROJECT_FOLDER}` placeholder. Otherwise this will return the system-specific absolute path to the audio file that was loaded into the audio file slot.

This is particularly useful for ensuring that file references remain consistent regardless of the actual location of the project on your file system.

If you want to get the actual file object from the return value of this method, it's recommended to use the [FileSystem.fromReferenceString()](/scripting/scripting-api/filesystem#fromreferencestring) method which takes in either an absolute path or a reference string and hence is the perfect match for the return value.

```javascript
// Retrieve the reference string for the currently loaded file
const var refString = audioFile.getCurrentlyLoadedFile();

const var actualFile = FileSystem.fromReferenceString(refString, FileSystem.AudioFiles);
```