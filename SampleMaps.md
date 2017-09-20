# Handling SampleMaps

SampleMaps are separate files which contain a mapping of a specific set of samples and can be swapped during runtime. This tutorial will show you the basic process of using SampleMaps in order to load different samplesets from a scripted interface. 

## 1. Create SampleMaps

The first step is to create the mappings, load samples into a sampler and export them as SampleMap. We will also choose to export the samples as HLAC compressed monolith (which is highly recommended for performance reasons).

We'll be using our MusicBox samples from the HISE Tutorial and create three SampleMaps using only one sample per SampleMap. In order to do this, we'll need a Sampler module. Go to the Tutorial project and create a new instrument (**File -> New File**). Now add a Sampler module and rename it to "MySampler" or something else. Switch to the Sampler Workspace and drag the first sample `MusicBox_A0_0_127.wav` to its position (doesn't really matter where as long as you choose different positions for each sample), choose **Drop Point** and press *OK*.

Now we'll export this one sample as samplemap. Click on the export icon (the arrow), set the samplemap name to "First SampleMap.xml", and "Low File Size" and press Export. 

Before we continue, let's take a look at how SampleMaps are stored. Open the project folder (**File -> Show Project Folder in Explorer / Finder**) and go to the `SampleMaps` directory. If things went smooth you should see a file called `First SampleMap.xml`. If you open it in Sublime or any other text editor, you should see something like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>

<samplemap ID="First SampleMap" SaveMode="2" RRGroupAmount="1" MicPositions=";">
  <sample ID="0" FileName="{PROJECT_FOLDER}Musicbox_A0_0_127.wav" Root="45"
          HiKey="45" LoKey="45" LoVel="0" HiVel="127" RRGroup="1" Volume="0"
          Pan="0" Normalized="0" Pitch="0" SampleStart="0" SampleEnd="221465"
          SampleStartMod="0" LoopStart="0" LoopEnd="221465" LoopXFade="0"
          LoopEnabled="0" LowerVelocityXFade="0" UpperVelocityXFade="0"
          SampleState="0" NormalizedPeak="-1" Duplicate="0" MonolithOffset="0"
          MonolithLength="225280" SampleRate="44100"/>
</samplemap>
```

As you can see, it just contains the mapping information for the sample we dropped with some additional metadata. Note that the `ID` property of the SampleMap reflects the filename, which is required for the compiled plugin to find the SampleMap (there will be no filename later because the samplemaps will be embedded into the plugin).

However, this SampleMap file is not the only thing that was created during export. Navigate to the `Samples` subfolder and you should see a file called `First SampleMap.ch1`. This is the compressed sampledata for this samplemap. The file extension `ch1` means first channel, so if you export a samplemap with multiple mic positions, you'll get one file per position (`.ch2`, `.ch3`, etc). Note how the file size went from 1.25MB to 413kB (this is the lossless compression algorithm at its work).

Now proceed with creating other SampleMaps. Press the **New SampleMap** icon in the SampleMapEditor, drag another sample somewhere and export it as "Second SampleMap.xml" and repeat this step again for "Third SampleMap.xml". Check the directories again if the sample maps were created correctly. If they were, we can proceed to the second part.

## 2. Swap SampleMaps using scripting calls

Now that we've successfully created and exported some SampleMaps, we can load them into a sampler using scripting callbacks. The most basic implementation is to use a combobox, fill it with the list of available SampleMaps and swap them in the control callback.

Click on the House icon on the top and press **OK** to create a main user interface with the default size. Add this line somewhere in the `onInit` callback and press **Compile**:

```javascript
const var MySampler = Synth.getSampler("MySampler");
```

Now add a combobox by enabling the interface designer (the pen symbol), click somewhere on the interface and choose **Add new ComboBox** (leave it at the default ID `ComboBox` for our simple example). Right click on the ComboBox and choose **Create custom Callback for ComboBox**. This should automatically create some code in the editor that we'll need later. Now exit the edit mode in the interface designer (click on the pen so that the grid disappears and the pen becomes a lock). 

If you click on the ComboBox, nothing happens, this is because it has no items yet. There is a scripting method which returns a list of all available SampleMaps in the current project. Add this code line below the line above:

```javascript
const var sampleMapList = Sampler.getSampleMapList();
```

Press **Compile** and open the *ScriptWatchTable*. Right click on the `sampleMapList` row. Right clicking on objects / arrays in this table is a neat way to view its content. It should open a popup containing this text:

```javascript
[
  "First SampleMap",
  "Second SampleMap",
  "Third SampleMap"
]
```

As you can see, it's a plain Javascript array containing all SampleMap IDs. In order to pass this to the combobox, we need to join it into a string. This line should do the trick:

```javascript
ComboBox.set("items", sampleMapList.join("\n"));
```

Press **Compile** and click on the ComboBox. You should now see a popup with all available SampleMaps. However it doesn't do anything yet. Replace the `//Add your custom logic here...` comment with this line:

```javascript
Console.print(value);
```

recompile and select some entries. Each time you select something, it should print a number to the console. If you watch closely, you'll notice that the first entry has the number 1, so in order to access the correct value, we need to do replace the last line with this:

```javascript
Console.print(sampleMapList[value-1]);
```

Now we're almost there (it's good practice to use the `Console.print` method until we know that everything is working correctly). Just replace this line with the actual call:

```javascript
MySampler.loadSampleMap(sampleMapList[value-1]);
```

and whenever the combobox is selected, it will load the corresponding samplemap. This will also be the case when you load user presets.

## Conclusion

This is only the most simple use case of swapping samplemaps. You can of course use a more complex widget (I'll be uploading a SampleMap browser widget soon) and use a folder structure in your samplemap folder to add a hierarchy.

The complete example can be downloaded from the tutorial repository:

https://github.com/christophhart/hise_tutorial

(it's the SampleMapExample.xml file).
