---
keywords: Tour
summary:  An introductory tour through HISE
index:    02
weight:   50
Author:   Dominik Mayer
---

![Hise GUI](images/custom/hise_GUI_1.0.1.png)

In this tour we are going to explore a new **HISE** project and the basic architecture of building instruments with **HISE** from start to compilation. 

When you first start up your desktop version of **HISE** you will get asked to create a new project. The project will consist of a folder structure for all the files, scripts and samples that are necessary to build and compile your virtual instrument. Most of them are empty at the beginning, but ready to be filled with your ideas.

Have a look at [Project Management](/working-with-hise/project-management) to learn more about these folders and the general architecture of a **HISE** project. 

But let's jump in right away: 

## The Main Workspace

![Main Workspace](images/custom/main-workspace.png)

The **Main Workspace** is the area of HISE where you patch together Sound Processors, Modulators and FX ([HISE Modules](/hise-modules)) to create the Audio DSP (DigitalSignalProcessing) architecture of your instrument.

The central Module Panel holds the **Master Chain**. It's the topmost root container of your instrument and will hold all the modules that you might want to add to it.

The top-down arrangement thereby follows the [tree structure](https://en.wikipedia.org/wiki/Tree_structure) paradigm and allows to build instruments with an efficent signal flow, optimized for handling a lot of voices in parallel.

You can save your **HISE Preset** (The name for the current modules state) in two different formats. Either as a compressed `.hip`-file **File > Save as Archive** (features: autosave, HiseSnippet), or as a human-readable `.xml`-File **File > Save as XML** (features: version control).

## adding a Sound Generator

![masterchain](images/custom/masterchain.png)

Click the little plus icon to create a new [Sound Generator](/hise-modules/sound-generators). Best, pick something simple like the Sine Wave Generator or the Waveform Generator and start playing around.

You will notice that the Sine Wave Generator features nearly the same top-bar as the Master Chain with its mostly self-explanatory controls:

**Minimize** **Colorpicker** [processor ID]() **Mute** **Meter** [Routing Matrix](/glossary/routing-matrix) **Gain** **Pan** and **Delete** 

![Sine](/images/custom/gen-sinewave.png)


## Modulation Chains

Beneath the top-bar you can find the **Tab-Section** with the Processor & Modulation chains of the Sound-Generator. Each one of them reveales a chain for adding additional processors & modulators to a specific aspect of the generated sound. 

![Tabs](images/custom/tabs.png)

**MIDI**

The MidiProcessor Chain processes MIDI input before the actual sound generation. This includes incoming MIDI Messages, CC Inputs as well as executed scripts. Here you can add a couple of useful [Midi Processors](/hise-modules/midi-processors), and the mighty [Script Processor](/hise-modules/midi-processors/list/scriptprocessor) with which you can inject your own scripts into each specific Sound Generator to finetune its behaviour.

**Gain**

Via the GainModulation Chain you can modulate the volume of the sounds after the sound generation. You can see that it already contains a [Simple Envelope](/hise-modules/modulators/list/simpleenvelope)-Modulator by default (as indicated by the little **1**) to remove the start and end clicks of a raw synthesized soundwave.

**Pitch**

As the name suggests, the PitchModulation Chain gives you access to modulate the pitch of the generated sound in a range from -12 to +12 semitones(**st**). It features the same Modulators as the GainModulation Chain.

**FX**

The EffectChain is applied at last. Here you can add a bunch of well-known [Effects](/hise-modules/effects) to spice up your sounds.


## Modulators 

The **Gain** and **Pitch**-Modulators deserve a deeper look. They represent a generic type of modulator that has the task to generate a sample accurate (real-time) control signals to modulate their respective sources. 

When you look at the header of a Gain-Modulator you can see that the "Gain bar" (**dB**) of a Sound-Generator is replaced by an Intensity bar that shows the values from 0 to 1, and in the Pitch-Modulators a range from -12 to +12 semitones (**st**). The Intensity sets how intense the modulation should be applied.

A nice feature to get a grip of their effect: You can click the Plot-Button to visualize the modulators influence in the **Right Panel** sidebar.

![mod-header](images/custom/mod-header.png)

Hit the **plus** Button to add Modulators from the following Modulator categories: 

[Voice Start Modulators](/hise-modules/modulators/voice-start-modulators) (polyphonic):

which set a value directly when a key is pressed and a voice is started. (see: [Velocity Modulator](/hise-modules/modulators/voice-start-modulators/list/velocity))

[Time Variant Modulators](/hise-modules/modulators/time-variant-modulators) (monophonic):

whose signals vary over time and can influence the voice dynamically. ([LFO](/hise-modules/modulators/time-variant-modulators/list/lfo))

[Envelope Modulators](/hise-modules/modulators/list)(polyphonic):

who follow a defineable envelope to shape the tone of the voices. ([AHDSR](/hise-modules/modulators/list/ahdsr))

>In a few of the TimeVariant and Envelope-Modulators you'll even find slots for modulating the Modulations, which creates the possibility for some quite complex modulation arrangements. Also make sure that you try out the power of these modulators on some of the Effects in the FX section. 

The best way to explore all the features of the Modules and Modulators in **HISE** is probably to dig in right away and start to add, combine and delete some modules and play around with them. You can use the [HISE Modules](/hise-modules)-Reference here in the docs to get a general overview and discover their hidden capabilities.

Behind the scenes, the architecture of modules that is built within the Main/Preset Workspace is reflected in the `.xml` file that is saved in the **XmlPresetBackups** folder. After you have saved your preset as an `.xml`-file **File > Save as XML** you can open it with an external code editor to take a look at its raw architecture. This can be quite insightful, especially if you want to understand how to access and manipulate the modules and their attributes via [scripting](/scripting).


## HISE Snippets

By the way: Did you know that it's very easy to share your **HISE presets** as Snippets with each other? Exporting your preset via **Export > Export as HISE Snippet** will copy a base64-encoded version of the `.xml` to your clipboard. 

You can  easily share this string on the [Forum](https://forum.hise.audio/) (tip: surrounding the string with markdown code-fences (three successive backticks) will make it look much nicer.)

Import the **HISE Snippet** from clipboard via **File > Import HISE Snippet**. 


## The Scripting Workspace
![](images/custom/scripting_workspace.png)


The [Scripting Workspace](/working-with-hise/workspaces/scripting-workspace) is a specialised Workspace that features an IDE-like [Code editor](/working-with-hise/workspaces/scripting-workspace/code-editor) for scripting, side by side with the [Interface Designer](/working-with-hise/workspaces/scripting-workspace/canvas) which helps you to create a GUI for your plugin. 

Because the interface is instantiated via script and the UI Components behaviour has to be regularly tweaked by scripting, they sit besides each other, but can be toggled on or off in the left sidebar with their respective icons. 

On your first visit of the Scripting Workspace it may be possible that you encounter a pretty bleak and grey surface. That indicates that no [Script Processor](/hise-modules/midi-processors/list/scriptprocessor) has yet been created and connected to the **Code Editor**. 

There is a handy shortcut to quickly hook up an UI: Click the house button in the top bar. It will present you with a dialog to set up a new User Interface of variable sizes. After confirmation this shortcut creates a ScriptProcessor with the ProcessorID: "Interface" in the MIDIProcessorChain of the MasterChain of your **HISE preset** and automatically connects it to the **Code Editor**.

## Code Editor

![Code Editor](images/custom/code-editor.png)

The [Code editor](/working-with-hise/workspaces/scripting-workspace/code-editor) now holds a ScriptProcessor named "Interface". You can see that the first line of the script contains :

```javascript
Content.makeFrontInterface(600, 500);
```

This command tells **HISE** to (_blush_) make a Front Interface with the width of `600` and the height of `500` pixels that you can see right now on the Interface Designers Canvas. You can change the values (`600 to 60`), and hit **Compile [F5]**. This evaluates the script, redraws the interface and prints "Compiled OK" to the **Console** beneath the editor. But.. oh, obviously this Interface Canvas is much too small, so let's change it back to the previous values. 

We don't want to delve too much in scripting right now but it's important to know that even the basic use of **HISE** definitely relies on scripting for building instruments. If you want to learn more about scripting in **HISE** please check out the [Scripting](/scripting) docs.  
In case that you just want to say hello to the world, type + **[F5]**:

```!javascript
Console.print("Hello World");
```

## Interface Designer

![interfacedesigner](images/custom/interface-designer.png)

So, let's take a look at the [Interface Designer](/working-with-hise/workspaces/scripting-workspace/canvas). This is the place to create the interface for your instrument/plugin. In the top-left corner of the Canvas you can find a little lock icon **[F4]**. With it you can toggle between the **edit** and the **presentation mode** of the Interface Designer. 

While in **edit mode** add a new [Slider](/ui-components/plugin-components/knob) Component by **right-clicking** on the surface of the interface. 

> You can drag the slider around or move it pixel-wise with the arrow keys (hold **Ctrl** to move it 10 pixels and/or **Shift** to rescale the elements boundaries). There is also the option to easily copy & paste the UI Component with dragging and holding the **Alt**-Key and to multiselect UI Components while holding **Ctrl**. You can delete the item with the **Del**-Key.

#### Property Editor

On the right hand side you can see the [Property Editor](/working-with-hise/workspaces/scripting-workspace/canvas#property-editor). It lets you access and modify differnt properties of an UI Component. A list of all common and special UI Components can be found in [Plugin Components](/ui-components/plugin-components).

The Sliders **ID** will most definitely be "Knob1". You can change it to anything you want, but you should be aware that the **ID** is the internal handle for accessing the component via scripting. So if you should want to change it at a later stage it's quite easy to mess things up. The **ID** should therefore be as consistent as possible. If you just want to change the name of the slider you can do that via the `text` property.

If you toggle back to **presentation mode** **[F4]** the interface will lock down. You can now use the controls like in a finished plugin. This workflow gives you a handy way to design and test your plugins interface. You can additionally display a preview of the plugin-interface by clicking the top-bar house-button again, or add an external preview window via **View > Add interface preview**.

##### Component List

On the left hand side of the Interface Designer you can see an overview of your added UI Components in the [Component List](/working-with-hise/workspaces/scripting-workspace/canvas#component-list). 

You can drag the Components to change the z-order of the components from the top (background) to the bottom (front). The green and red dots indicate if an UI Components state is going to be saved in a [User Presets](/working-with-hise/project-management/user-presets) via the `saveInPreset` property. 

A neat way to group several elements together is to drag them into a shared [Panel](/ui-components/plugin-components/panel) Component. This makes it easy to structure complex projects as well as to implement page-like UI-designs. You can open a JSON representation of the UIComponents properties when you press the [j]-Key with a selected element. You can then edit these values on the fly and accept the changes with [F5].


## The Sampler Workspace

![Sampler-Workspace](images/custom/sampler-workspace.png)

The [Sampler Workspace](/working-with-hise/workspaces/sampler-workspace) is built all around the the [Sampler](/hise-modules/sound-generators/list/streamingsampler) Module and displays three of its tabs in one workspace. 

The main task of these tabs is to comfortly map your samples into SampleMaps, edit them to suit your needs and finally export the mapped samples into a deliverable file-format that can be shipped with your instrument.

General Workflow:

1. Put all the samples that you want to map into your Projects [Samples](/working-with-hise/project-management/projects-folders/samples)-Folder
2. Drag the samples from the Filebrowser[link] into the [Sample Map Editor](/working-with-hise/workspaces/sampler-workspace/sample-map-editor) and choose one of three options to map them: 
   1. [Drop Point](/working-with-hise/workspaces/sampler-workspace/sample-map-editor#drop-point), which places the samples where you drag them. 
   2. [Pitch Detection](/working-with-hise/workspaces/sampler-workspace/sample-map-editor#pitch-detection), which automatically tries to detect the pitch of the samples.
   3. [Filename Token Parser](/working-with-hise/workspaces/sampler-workspace/sample-map-editor#filename-token-parser), which reads the filename of your samples and maps them according to your requirements.
3. Edit and finetune your samples with the [Sample Editor](/working-with-hise/workspaces/sampler-workspace/sample-editor) and the [Sampler Settings](/working-with-hise/workspaces/sampler-workspace/sample-settings). 
4. When you are happy with the map, save it into the SampleMap folder. You can access SampleMaps with scripting[link] and play & switch them in your instrument. 
5. If you are sure that you won't change the samples anymore you can compress them into the lossless **HLAC Monolith file-format** `.ch1` (per SampleMap). This speeds up streaming-performance and reduces file-size.
6. In the final step, these Monolith files can be collected and exported together as **HISE Resource Archive File** `.hr1 ` via **Export > Export Samples for Installer** to distribute the samples with your instrument. 

