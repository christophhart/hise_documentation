---
keywords: Quick Tour
summary:  An introductory tour through HISE
index:    02
weight:   50
Author:   Dominik Mayer
---

![Hise GUI](images/custom/quick_tour/hise_interface.png)

In this quick tour we are going to explore the **HISE GUI*.

When you first start up your desktop version of **HISE** you will get asked to create a new project. Have a look at [Project Management](/working-with-hise/project-management) to learn more about its folders and the general architecture of a **HISE** project.

>You can save your project in two different ways. Either with **File > Save as Archive** as a compressed archive (`.hip`-file, which is also the autosave format), or as a human-readable `.xml`-File **File > Save as XML** (which is recommended for using version control).


## The Module Tree

![Main Workspace](images/custom/quick_tour/module-tree.png)

In the **Module Tree** on the left side of the interface HISE you can patch together Sound Processors, Modulators and FX ([Audio Modules](/hise-modules)) to create the Audio DSP (Digital Signal Processing) architecture of your instrument.

The topmost module is the **Master Chain**. It's the root container of all audio modules and the exit point of the final audio signal. 

The top-down arrangement follows the [tree structure](https://en.wikipedia.org/wiki/Tree_structure) paradigm and allows to build instruments with an efficent signal flow, optimized for handling a lot of voices in parallel.

The module tree is a powerful tool for viewing and editing the overall structure of a project.

The colored squares function as bypass buttons. <img align="left" src="https://github.com/user-attachments/assets/a402715d-db5a-4a07-97f8-4855983a34c6">
<br clear="left"/>

The arrow icon  ![image](https://github.com/user-attachments/assets/d60e2de2-d1e6-44e8-a4b1-200a7ad4e72c)
opens a processor for editing in the main workspace.

<img align="left" src="https://github.com/user-attachments/assets/2fee296b-d373-479d-8d59-ebb6fad3a654">
On MIDI processors, the MIDI icon blinks to show incoming messages. Clicking the MIDI icon opens an Event Logger.
<br />
<br />

Events can be filtered with a HISEScript expression, for example,  ```Message.isNoteOn() || Message.isNoteOff()```
<br clear="left"/>

The small colored circle on modulator sources and targets indicates the current value of the modulator (if the dot is filled in, the modulator is at a value of 1.0). Clicking the circle opens a plotter.

![output](https://github.com/user-attachments/assets/47f76eab-3e70-489d-b39c-2e20d725b5a0)

Clicking a VU meter opens the routing matrix for that module. ![image](https://github.com/user-attachments/assets/013b95ae-6790-4fe0-80a6-a496af2e30d8)

The pencil enters edit mode, where submodules can be added, removed, and reordered via drag and drop.
![image](https://github.com/user-attachments/assets/003355d0-6554-4503-8849-46e60829a61a)


### Add a Sound Generator

In the **Module Tree** you can click the "pen-icon" to activate the adding functionality. 

When you click the plus icon next to the **Master Chain** you can create a new [Sound Generator](/hise-modules/sound-generators). Pick something simple like the Sine Wave Generator or the Waveform Generator and click on the newly created module.

![Sine](/images/custom/gen-sinewave.png)

On the header of the module you can change it's name (ID), pick a color, mute the generator, set the Gain/Intensity or pan its audio signal. When you **right-click** on the header you can copy&paste its xml data, or create script references with which you can access more internal functions of the module by script. 


### Modulation Chains

![Tabs](images/custom/tabs.png)

Beneath the top-bar you can find the **Tab-Section** with the Processor & Modulation chains of the Sound-Generator. Each one of them reveales a chain for adding additional processors & modulators to a specific aspect of the generated sound. 


**MIDI**

The MidiProcessor Chain processes MIDI input and scripts before the actual sound is generated. This includes incoming MIDI Messages, CC Inputs as well as executed scripts. Here you can add a couple of useful [Midi Processors](/hise-modules/midi-processors), and a [Script Processor](/hise-modules/midi-processors/list/scriptprocessor) with which you can inject your own scripts into each specific Sound Generator to finetune its behaviour.

**Gain**

Via the GainModulation Chain you can modulate the volume of the sounds after the sound generation. You can see that it already contains a [Simple Envelope](/hise-modules/modulators/envelopes/list/simpleenvelope)-Modulator by default (as indicated by the little **1**) to remove the start and end clicks of a raw synthesized soundwave.

**Pitch**

As the name suggests, the PitchModulation Chain gives you access to modulate the pitch of the generated sound in a range from -12 to +12 semitones(**st**). It features the same Modulators as the GainModulation Chain.

**FX**

The EffectChain is applied at last. Here you can add a bunch of well-known [Effects](/hise-modules/effects) to spice up your sounds.


### Modulators 

![mod-header](images/custom/quick_tour/lfo_modulator.png)

The modulators for the *Gain** and **Pitch**-chains deserve a deeper look. They represent a generic type of modulator with the task to generate a sample accurate (real-time) control signals to modulate their respective sources. 

When you look at the header of a Gain-Modulator you can see that the "Gain bar" (**dB**) of a Sound-Generator is replaced by an Intensity bar that shows the values from 0 to 1, and in the Pitch-Modulators a range from -12 to +12 semitones (**st**). The Intensity sets how intense the modulation should be applied.

You can visualise their signal with clicking on the little indicator next the modulators name.


Hit the **plus** icon of a Modulation-Chain to add modulators from the following categories: 


---

[Voice Start Modulators](/hise-modules/modulators/voice-start-modulators) (polyphonic):

- which set a value directly when a key is pressed and a voice is started. (see: [Velocity Modulator](/hise-modules/modulators/voice-start-modulators/list/velocity))

[Time Variant Modulators](/hise-modules/modulators/time-variant-modulators) (monophonic):

- whose signals vary over time and can influence the voice dynamically. ([LFO](/hise-modules/modulators/time-variant-modulators/list/lfo))

[Envelope Modulators](/hise-modules/modulators/envelopes)(polyphonic):

- who follow a defineable envelope to shape the tone of the voices. ([AHDSR](/hise-modules/modulators/envelopes/list/ahdsr))

---

In a few of the TimeVariant and Envelope-Modulators you'll even find slots for modulating the Modulations, which creates the possibility for some quite complex modulation arrangements.

The best way to explore all the features of the Modules and Modulators in **HISE** is probably to dig in right away and start to add, combine and delete some modules and play around with them.

>Behind the scenes, the architecture of modules that is built within the Main/Preset Workspace is reflected in the `.xml` file that is saved in the **XmlPresetBackups** folder. After you have saved your preset as an `.xml`-file **File > Save as XML** you can open it with an external code editor to take a look at its raw architecture. This can be quite insightful, especially if you want to understand how to access and manipulate the modules and their attributes via [scripting](/scripting).


## The Code Editor
![](images/custom/scripting_workspace.png)

 
When you open a new HISE project for the first time, you will see two editor next to each other: 
- The [Code Editor]() which an IDE-like [Code editor](/working-with-hise/hise-interface/code-editor) for scripting.
- The [Interface Designer](/working-with-hise/hise-interface/interface-designer) which helps you to create a GUI for your plugin. 

The **Master Chain** holds a ScriptProcessor named "Interface". The **Code Editor** shows its "onInit"-Tab. This is the main script in which you can start scripting a GUI or any other interaction inside HISE. Per default this script contains a function to create an interface, that is displayed in the **Interface Designer**.

```javascript
Content.makeFrontInterface(600, 500);
```

> You can click the little "open icon" next to the ScriptProcessor "Interface" to open the script and the Interface Designer.

Let us test the scripting. Type:

```!javascript
Console.print("Hello World");
```

in the onInit Tab, and hit **[F5]** to compile. This evaluates the script, redraws the interface and prints the message to the [Console](/working-with-hise/hise-interface/code-editor#console) beneath the editor.

We don't want to delve too much in scripting right now but it's important to know that even the basic use of **HISE** relies on scripting and learning about it is needed if you want to craft your own instrument or plugin. Check out the [Scripting](/scripting) docs for more.


## Interface Designer

![interfacedesigner](images/custom/quick_tour/interface_designer.png)

Now we'll take a look at the  [Interface Designer](/working-with-hise/hise-interface/interface-designer). This is the place where you create the interface for your instrument/plugin. In the top-left corner of the Canvas you can find a little pen icon **[F4]**. With it you can toggle between the **edit** and the **presentation mode** of the Interface Designer. 

While in **edit mode** add a new [Slider](/ui-components/plugin-components/knob) [UI Component](/ui-components) by **right-clicking** on the surface of the interface.
You can drag the slider around or move it pixel-wise with the arrow keys (hold **Ctrl** to move it 10 pixels and/or **Shift** to rescale the elements boundaries). There is also the option to easily copy & paste the UI Component with dragging and holding the **Alt**-Key and to multiselect UI Components while holding **Ctrl**. You can delete the component with the **Del**-Key.


#### Property Editor

On the right hand side you can see the [Property Editor](/working-with-hise/hise-interface/interface-designer#property-editor). It lets you access and modify different properties of an UI Component.

The Sliders **ID** will be "Knob1". You can change it to anything you want, but you should be aware that the **ID** is the internal handle for accessing the component via scripting. So if you should want to change it at a later stage it's quite easy to mess things up. The **ID** should therefore be as consistent as possible. If you just want to change the name of the slider you can do this via the `text` property.

If you toggle back to **presentation mode** **[F4]** the interface will lock down. You can now use the controls like in a finished plugin.

##### Component List

On the left hand side of the Interface Designer you can see an overview of your added UI Components in the [Component List](/working-with-hise/hise-interface/interface-designer#component-list). 

You can drag the Components to change the z-order of the components from the top (background) to the bottom (front). 

A neat way to group several elements together is to drag them into a shared [Panel](/ui-components/plugin-components/panel) Component. This makes it easy to structure complex projects as well as to implement page-like UI-designs. 

You can open a JSON representation of the UIComponents properties when you press the [j]-Key with a selected element. You can then edit these values on the fly and accept the changes with [F5].


## ScriptNode Editor

![ScriptNode Editor](images/custom/quick_tour/scriptnode_workspace.png)

You can get access to the ScriptNode Editor in two ways. Either you create a [ScriptFX](/hise-modules/effects/list/scriptfx) in the FX-Chain of the **MasterChain** for creating a DSP effect, or by creating a [Scriptnode Synthesiser](/hise-modules/sound-generators/list/scriptsynth) Sound Generator in the Master Chain if you want to process incoming MIDI events.

Click the little "open in"-icon next to their name to open the ScriptNode Editor.

![ScriptNode new](images/custom/quick_tour/scriptnode_create.png)

After creating a new DSP-Network you will see a empty container in which you can add new DSP nodes. Clicking into the chain opens up a "Create Node" window in which you can add new nodes and built your DSP-Network. Take a look at the [Scriptnode Node list](/scriptnode/list) and the [ScriptNode 101](/scriptnode/101) to get started.



## Sample Editor

![Sampler-Workspace](images/custom/sampler-workspace.png)

The [Sampler Workspace](/working-with-hise/hise-interface/sampler-workspace) is built all around the the [Sampler](/hise-modules/sound-generators/list/streamingsampler) Module and displays three of its tabs in one workspace. 

The main task of these tabs is to map your samples into [SampleMaps](/hise-modules/sound-generators/list/streamingsampler#sample-maps), edit them to suit your needs and finally export the mapped samples into a deliverable file-format that can be shipped with your instrument.

General Workflow:

- Put all the samples that you want to map into your Projects [Sample Folder](/working-with-hise/project-management/projects-folders/samples)
- Drag the samples from the [Filebrowser](/ui-components/floating-tiles/hise/filebrowser) into the [Sample Map Editor](/working-with-hise/hise-interface/sampler-workspace/sample-map-editor) and choose one of three options to map them: 
- **Drop Point**, which places the samples where you drag them. 
- **Pitch Detection**, which automatically tries to detect the pitch of the samples.
- [Filename Token Parser](/working-with-hise/hise-interface/sampler-workspace/sample-map-editor#filename-token-parser), which reads the filename of your samples and maps them according to your requirements.

- Edit and finetune your samples with the [Sample Editor](/working-with-hise/hise-interface/sampler-workspace/sample-editor) and the [Sampler Settings](/working-with-hise/hise-interface/sampler-workspace/sample-settings). 
- When you are happy with the map, save it. It'll appear in the SampleMap folder. You can now access SampleMaps with scripting[link] and play them with your instrument. 
- If you are sure that you won't change the samples anymore you can compress them into the lossless **HLAC Monolith file-format** `.ch1` (per SampleMap). This speeds up streaming-performance and reduces file-size.
- In the final step, these Monolith files can be collected and exported together as **HISE Resource Archive File** `.hr1 ` via **Export > Export Samples for Installer** to distribute the samples alongside your instrument. 

## HISE Snippets and Examples

By the way: Did you know that it's very easy to share your project as snippet? Exporting your preset via **Export > Export as HISE Snippet** will copy a base64-encoded version of your projects `.xml` to your clipboard. The HISE snippet is also able to embed referenced scripts (`include("")`) in the code as "embedded" files.

> You can easily share this string on the [Forum](https://forum.hise.audio/) (tip: surrounding the string with markdown code-fences (three successive backticks) will make it look much nicer.)

Import the **HISE Snippet** from clipboard via **File > Import HISE Snippet**. 

### Snippet Browser

Under **Help > Browse example snippets** you can find the **Snippet Browser** in which you can save your own HISE Snippets or explore a range of example snippets that showcase a broad range of HISE functionality.

![SnippetBrowser](images/custom/quick_tour/snippet_browser.png)

The Snippet Browser will open a detached HISE instance, so that opening different snippets won't interfere with your current project. You can add your own HISE snippets to this instance and then click the **plus icon** on the top-left to save the snippet to the Snippet Browser. You can add a little description, categories and tags to it.

If you want to check out the example snippets click the **cog-wheel-icon**, set a snippet directory and username and download the latest example snippets and assets. 

If you want to contribute to the Example snippets please file a üull request at: [HiseSnippetDB](https://github.com/qdr/HiseSnippetDB).


