This function will render audio related samplemap properties into the sample files and update the samplemap. This allows a **destructive** editing step for all static properties that can be baked into the samples. You can use this to:
- trim the samples to their actual length
- bake in loop crossfades
- apply one of the envelopes (pitch, volume or low pass). 

Doing this increases the performance of the sample playback a little bit, and trimming the samples will reduce the file size / loading times (HLAC monoliths will encode the entire sample file). So unless you are planning to change these properties dynamically (which is rather unusual), this might be a useful step in the predistribution stage.

> This is a destructive operation on sensitive material (usually sample files are not checked into a version control system), so **make sure to make a manual copy of the original files before proceeding!** In addition to any manual backup, there is an automatic backup that is being made before every step, but there might be edge cases that might result in total data loss.

If you select this function in the menu bar, you'll see this dialog:

![](/images/custom/applysamplemapproperties.png)

Select the samplemap you want to "render" and then choose a suffix for the backup folder. This will create a folder in your project directory under

```
%PROJECT_ROOT%/SampleBackups/%SAMPLEMAP%%SUFFIX%/
```

which will contain the samplemap in the state before this process as well with all samples that are about to be processed. 

> If the folder already exists, the process will not render the samplemap again, but reverse the process and overwrite all files with the content from said backup folder. This will be indicated by the status message saying **"Press OK to restore the backup from ..."**

Now you can select all properties that you want to render. You can choose to render all properties at once or just a few selected ones (use the preset box to the right to quickly setup common options).

Press OK and it will make a backup of the samplemap and all audio files, and then process the properties to the samples in the sample folder

There are a few things to know about the process:

- if the samplemap that you want to render is already encoded as HLAC monolith, it will discard the monolith and resort to the original audio files, so make sure they are still there. You will then have to reencode the HLAC monolith after this step.
- you can't run this process with samplemaps that uses multiple references to a single sample file because of error system overload.
- you can't run this process with samplemaps that reference samples outside the sample folder which is a bad practice anyway and should be avoided at all cost!



