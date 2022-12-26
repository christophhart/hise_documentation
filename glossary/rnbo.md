---
keywords: RNBO Import
summary:  How to import RNBO Patches in HISE
author: Christoph Hart (assisted by ChatGPT)
---

The purpose of this documentation is to provide a guide on how to import a DSP patch from RNBO into HISE. 

RNBO is a subset of Max/MSP and was released in December 2022. You can read more about it here:

https://rnbo.cycling74.com

The RNBO integration supports a number of powerful capabilities, including:

-   MIDI communication
-   Tempo syncing, including transport start/stop and BPM synchronization
-   Modulation output (only in scriptnode) using the `outport` object with the `mod` tag ID
-   HISE complex data types (Tables, SliderPacks, and AudioFiles) can be used as data buffers within an RNBO patch.

In this process, we will use the template builder in HISE to create the necessary wrapper code and compile the patch as a dynamic-link library (DLL). This will allow us to seamlessly integrate the patch into scriptnode and use it within HISE, either as node inside scriptnode or as Hardcoded effect module.

>If you are familiar with the process of integrating third-party C++ DSP code or using the Faust Integration in HISE, the process of integrating RNBO should be relatively straightforward because you'll be using the same basic concept as these other integration processes.
 
## Export the RNBO Patch

To begin the process of exporting the DSP patch from RNBO, you will need to open the patch in RNBO and navigate to the "Export" menu (it's a button on the right edge of the window). Here, you will find options for exporting the patch as C++ classes.

To ensure that the patch is exported correctly, you will need to configure the following settings:

| Setting             | Value        | Description    |
|----|----|--------------------------------------------------------------------------------------|
| Output directory    | `DspNetworks/ThirdParty/src` | This setting determines the folder where the exported patch will be saved. It is important to use the correct output directory, as this is where HISE will look for the patch when it is time to build the wrapper code.                                                 |
| ExportName          | `your_patch_name` | This setting determines the name of the exported patch. It must be unique within your HISE project, and it must also be a valid C++ identifier (see below).                                                                             |
| ClassName           | `your_patch_name` | This setting determines the name of the C++ class that will be created for the patch.                                                                             |
| Polyphony settings  | "Disabled" | This setting determines whether the patch will be exported with polyphonic capabilities. In this case, we want to disable polyphony as it must be disabled in order to use the patch with HISE. However, you can enable the HISE polyphony in the next step if you want to play the patch in a polyphonic scriptnode context.  |

Make sure to use the same C++ Identifier for the ExportName and ClassName. A valid C++ identifier is a name that is used to identify a variable, function, class, or any other entity in C++. There are a few rules that must be followed when naming an identifier in C++:

1.  An identifier must start with a letter or an underscore (`_`).
2.  An identifier cannot contain any whitespace characters.
3.  An identifier can only contain letters, digits or underscores (_).
4.  An identifier can't be a reserved keywords (`if`, `while`, `public`, ...).

For example, the following are all valid C++ identifiers:

-   `myVariable`
-   `_privateVariable`
-   `someFunction`

On the other hand, the following are all invalid C++ identifiers:

-   `2ndVariable` (starts with a digit)
-   `my variable` (contains whitespace)
-   `for` (a reserved keyword)

Once you have configured these settings, you can go ahead and export the patch by clicking the "Export" button. This will generate the necessary C++ files and save them to the specified output directory. After the export process is finished, open HISE and use it to build the C++ wrapper template.

### Special event IDs

The wrapper class in HISE will send a few special events that you can use in the RNBO patch. 

## Create the HISE C++ wrapper

To create the C++ wrapper code for the RNBO patch, you will need to use the template builder in HISE. Here is the process for creating the template:

1.  Open HISE and navigate to the "Tools" menu.
2.  Select the "Create Template for RNBO Patch" option.
3.  In the template builder window that appears, use the drop-down menu to select the C++ file for the RNBO patch that you exported in the previous step.
4.  Adjust the configuration options as necessary. These may include the number of channels and the polyphony settings. Every setting has a help button with more information.
5.  Press the "OK" button to create the wrapper code. This will generate a new file in the "ThirdParty" folder of your HISE project.
6.  Once the wrapper code has been created, you will need to export the DLL and restart HISE in order for the changes to take effect.

Once the wrapper code has been created, you can use the RNBO patch like any other third-party C++ node in HISE. This can be done either through hardcoded FX or by using scriptnode with your HISE project. 

This should conclude the process using the most basic feature set. Now we'll take a look at more advanced concepts for a tighter integration of RNBO patches with HISE / scriptnode

### Enable modulation output

To set up your RNBO patch to send a modulation signal that can be applied to any parameter in scriptnode, you will need to enable the **Modulation** feature in the template builder. This will allow the HISE wrapper to listen for messages at the `outport` object with the `mod` tag, and send the value to any connected modulation targets 

To enable a periodic modulation event after each audio buffer, you can add an `inport` object with the `postrender` tag to your RNBO patch. This will send out a "bang" message after each buffer has been processed. To determine the number of samples being processed between calls to the `postrender` inport, you can add another inport with the `blocksize` tag. This inport will be called whenever the processing specifications change, and can be used to adjust the modulation event accordingly.

> This is consistent with the way how modulation works in scriptnode and allows you to control the modulation resolution using the `fix_block` containers.

Here is an example of an RNBO patch that replicates the functionality of the `core.peak` node in HISE:

![](https://i.imgur.com/nZOAcAy.png)

As you can see, this patch uses the `outport` with the `mod` tag to send a periodic modulation signal (the signal cable that is fed into the `peakamp~` object), and the `inport` objects with the `postrender` and `blocksize` tags to enable a "once-per-buffer" update rate. By following a similar approach, you can set up your RNBO patch to send a modulation signal that can be applied to any parameter in scriptnode.

### Use complex data slots

In HISE, all three of the main complex UI elements (Table, SliderPack, and AudioFile) operate on the same data type: a `float` array. This array can be passed as a reference to an RNBO patch, allowing you to access and manipulate it within the patch. This allows you to, for example, control the sample that you want to feed into a granular synthesizer using a HISE `ScriptingAudioWaveform` widget, or draw the wavetable function for a custom oscillator using a `Table` UI element.

The communication between HISE and RNBO is straightforward: all you need to do is define a `buffer~` object in RNBO with a unique `name` attribute (which can be any string, but it is recommended to use a valid C++ identifier for future-proofing purposes) and the `external` attribute set to 1. This tells RNBO that the data is coming from the outside, and is necessary in order to use the HISE UI elements to manipulate the data.

Then in the Template builder, you just need to enter this ID into the fields of the data type you want to use it for. 

Example: 
1. Add a `buffer~ @name my_table @external 1` object in RNBO
2. Add `my_table`  to the `Table IDs` field of the Template builder

When you compile the node, it will show a single table that you can connect to an external slot or reference from your main interface just like any other table in HISE.

There are a few things to keep in mind when handling audio files in RNBO: RNBO expects the data to be in an interleaved format, where all samples of a single channel are written consecutively. To handle this, the RNBO wrapper will need to duplicate the buffer data and convert the format, which will unfortunately double the memory usage. In addition, multi-format audio files (such as SFZ or Samplemap) are not supported, so you can only use a single audio file per slot.