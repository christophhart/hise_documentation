 
We'll be using samples with well-formatted file names, that means that the mapping information can be fully extracted from the names without having to use the mapping editor. 

There are a multitude of ways to map audio files in the sampler, from drag 'n drop to batch processing via regex commands. However I strongly recommend using a strict file naming scheme. There is a powerful file name parser in HISE which allows to map the samples automatically so if you do it right, you'll never have to touch the mapping editor ever.

You can download a sample set ready to be imported into HISE here:

[Musicbox Samples](http://hise.audio/download/tutorial/MusicboxSamples.zip)

For the sake of simplicity, extract and copy all samples you want to import into the `Samples` subfolder of the new project (you can also opt to redirect the sample folder to another location, which is useful if you have a large sample library on another hard disk).

You need to create a sampler module that the samples will be imported to. Click on the `+` icon next to the "Master Chain" label and select "Sampler".

You can use multiple sampler modules within one patch (and for more complex projects it is obligatory to do so). However for our little tutorial, one sampler should be enough (we'll be adding some synths later too).

As with HISE 1.0.0, there is a dedicated workspace when working with samplers. You can switch to this workspace by pressing the ![Workspace](http://hise.audio/images/tutorial/GotoWorkspace.png) button on the Sampler you've just created (this also works for script processors, but that will be covered later on). This should switch to this view:

![SamplerWorkspace](http://hise.audio/images/tutorial/SamplerWorkspace.png)

There are 4 main panels:

| Name | Description |
| -- | ----------- |
| File Browser | A file browser with drag 'n drop functionality and a preview function (currently for images only). |
| Sample Editor | Edit the properties of the selected samples. |
| Sample Map Editor | Edit the mapping of the current SampleMap. |
| Sample Table | A list with all available samples and a search bar with Regex support (which is incredibly handy if you know how to use it ...) |

> There's also the Sample Pool Table which shows all samples loaded into HISE, but it's not important for now...

### Drag samples into the map editor

You should already be in the project folder. Double click on the 'Samples' folder, select all samples (<kbd>Cmd / Strg + A</kbd>) and drag them into the map of the sampler. Select "Filename Token Parser" and press OK".

![SC_DragSamples.gif](http://hise.audio/images/tutorial/SC_DragSamples.gif)

### Use the file import dialog to extract the mapping information

Before we setup the right settings in the next window, let's take a look at one filename:

```javascript
Musicbox_A0_0_127.wav
1        2  3  4
```

1. The instrument name (and can be ignored for mapping)
2. The note name which will be used for mapping
3. The low velocity limit
4. And the high velocity limit

The filename is split into tokens which are vertically arranged and can be assigned to different mapping properties. Select these properties for each token:

1. Ignore
2. Single Key
3. Low Velocity
4. High Velocity

and press OK:

![SC_ImportDialog.gif](http://hise.audio/images/tutorial/SC_ImportDialog.gif)

> For a detailed explanation of the file import dialog, please refer to the chapter in the [Reference Manual](http://hise.audio/manual/Sampler.php#theimportdialog).

### Fix the mapping

In a ideal world, you could start playing now with the samples and proceed to the next part. However the current mapping has two issues:

1. There are gaps between notes because it is not chromatically sampled.
2. The note names are off by two octaves

So we need to get our hands a little dirty and fix those issues manually in the sample map editor. To fix the gaps, select all samples by dragging the lasso and click on the "Close vertical gaps icon".

To fix the octave offset, press and hold down the <kbd>Alt</kbd> key (that the cursor changes to the hand) and move the selection two octaves up):

Afterwards you should save your current Samplemap via the Save-Button(Floppy Disk) or with `Ctrl+S`. It will now reside in your projects **SampleMaps** folder as an .xml file.  

![SC_Mapping.gif](http://hise.audio/images/tutorial/SC_Mapping.gif)

### Export as HLAC monolith

HISE has a custom lossless audio codec that is heavily optimized on decoding performance (which is about 10x as fast as FLAC). You can use this codec and collect all your sample files into one monolithic audio file by exporting the current SampleMap. Press the ![Monolith](http://hise.audio/manual/images/Monolith.png) button to open this dialog:

![Export](http://hise.audio/manual/images/MonolithExport.png)

Choose **Low file size** and enter a name for the sample map. Press OK - and ignore the error message that will popup :)

Now you should have a .xml file in your `SampleMaps` directory and a monolith file with the extension `ch1` in the Samples directory (if you export multi mic samples, they will have the extension `ch2`, ...). The file size went down from 12MB to 4MB.

> If you have multiple sample sets, you can export each one as dedicated sample map and use scripting callbacks to switch between these samples.

That's it. You now have a perfectly mapped sample set ready to be played. In the next chapters we will add some modulators and effects to the patch.

> `keywords: "Tutorial Pt. 2" | description: Going into the sampler.`