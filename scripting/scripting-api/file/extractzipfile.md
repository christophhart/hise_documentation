This method will extract a standard ZIP file (without password protection) to the given target directory (which can be either a file path String or a [File](/scripting/scripting-api/file) object).

In order to extract to privileged locations on Windows, for example the user's VST3 folder, it is neccessary to enable the 'Admin Permissions' checkbox in your project's preferences. There isn't currently a way to do this on OSX.

The extraction process will be executed on the sample loading thread and you can assign a callback that is executed to track the extraction progress.

The callback expects a single parameter that will contain a JSON object with the following properties:

| Property | Type | Description |
| ---- | -- | ---------- |
| `Cancel` | bool | Set to `false`. If you want to abort the extraction process, just set this flag to true. |
| `Target` | String | The target directory as file path. |
| `Error` | String | A error message if something went wrong during extracting. |
| `Progress` | double | the progress from 0.0 to 1.0. Be aware that this tracks only the number of files extracted vs. the total number of files, so if you have one big file inside the archive, it will not work. |
| `NumBytesWritten` | int | the number of bytes that have been extracted. |
| `CurrentFile` | String | the relative path of the file that is currently being extracted. |
| `Status` | int | a status flag indicating the state of the extraction: `0` at the beginning, `1` while extracting and `2` at the end. |

The callback will be executed at the beginning of the extraction (with the Status flag `0`) and at the end (with the Status flag `2`) as well as when an error occurs.

If you extract a small archive (less than ~400 files), the callback will also be executed for each file (this limit prevents the scripting queue to be clogged with huge archives).