---
keywords: Tour
summary:  An introductory tour through HISE
index:    02
weight:   50
Author:   Dominik Mayer
---


## A new HISE project
![Hise GUI](images/custom/hise_GUI_1.0.1.png)

In this tour we are going to explore a new **HISE** project and the basic architecture of building instruments with **HISE** from start to compilation. 

When you first start up your desktop version of **HISE** you will get asked to create a new project. The project will consist of a folder structure for all the files, scripts and samples that are necessary to build and compile your virtual instrument. Most of them are empty at the beginning, but ready to be filled with your ideas.

Have a look at [Project Management](/working-with-hise/project-management) to learn more about these folders and the general architecture of a **HISE** project. 

#### Settings

 In the top right corner of the HISE interface you can find the [Settings](/working-with-hise/settings). You can adjust your project and user settings here and find a lot of other useful configurations. Check the Audio & MIDI Settings to pick your audio driver and hook up your MIDI equipment.  

> BTW: If you encounter a little **question mark**, don't hesitate to click & take a look. It holds on-spot documentation about the use of **HISE**.

## The Main/Preset Workspace

![Main Workspace](images/custom/main-workspace.png)

The **Main/Preset Workspace** is the area of HISE where you patch together Sound Processors, Modulators and FX ([HISE Modules](/hise-modules)) to create the **HISE preset** architecture of your instrument.

The mid panel holds the **Master Chain**. It is the topmost container of your instrument and will hold all the modules that you might want to add to it. It represents the root node of the **HISE presets** `.xml` [tree structure](https://en.wikipedia.org/wiki/Tree_structure). This top-down tree-architecture allows to build instruments with an efficent signal flow that are optimized for handling a lot of voices in parallel.


### adding a Sound Generator

![masterchain](images/custom/masterchain.png)

Click the little plus icon to create a new [Sound Generator](/hise-modules/sound-generators). Best, pick something simple like the Sine Wave Generator or the Waveform Generator and start playing around.

You will notice that the Sine Wave Generator features nearly the same top-bar as the Master Chain with its mostly self-explanatory controls:

**minimize** **colorpicker** [processor ID]() **mute** **meter** [routing matrix](misc.html#routing-Matrix) **gain** **pan** and **delete** 

![Sine](/images/custom/gen-sinewave.png)


### Modulation Chains

Beneath the top-bar you can find the **Tab-Section** with the Processor & Modulation chains for the Sound-Generator. Each one of them reveales a chain for adding additional processors & modulators to a specific aspect of the generated sound. The tabs thereby follow the natural order of the signal flow from the left to the right:

![Tabs](images/custom/tabs.png)

**MIDI**

The MidiProcessor Chain processes the input just before the actual sound generation. This includes incoming MIDI Messages, CC Inputs as well as executed scripts. Here you can add a couple of useful [Midi Processors](/hise-modules/midi-processors), and the mighty [Script Processor](/hise-modules/midi-processors/list/scriptprocessor) with which you can inject your own scripts into each specific Sound Generator to finetune its behaviour.

**Gain**

Via the GainModulation Chain you can modulate the volume of the sounds. You can see that it already contains a [Simple Envelope](/hise-modules/modulators/list/simpleenvelope)-Modulator by default (as indicated by the little **1**) to remove the start and end clicks of the raw synthesized soundwave.

**Pitch**

As the name suggests, the PitchModulation Chain gives you access to modulate the pitch of the generated sound in a range from -12 to +12 semitones(**st**). It features the same Modulators as the GainModulation Chain.

**FX**

The EffectChain is the place for everything that happens after the actual sound-generation. Here you can add a bunch of well-known [Effects](/hise-modules/effects) to spice up your sounds.


### Modulators 

The **Gain** and **Pitch**-Modulators deserve a deeper look. While the MIDI and FX-Processors are independent module-types, the Gain and Pitch-Modulators represent a more generic type of modulator. They have the task to generate sample accurate (real-time) control signals to modulate their respective sources. 

You can see that the gain bar (**dB**) in the header of the Gain-Modulators is replaced by an intensity-bar that shows the values from 0 to 1, and in the Pitch-Modulators a range from -12 to +12 semitones (**st**). A nice feature to get a grip of their effect: You can click the Plot-Button to visualize the modulators influence in the **Right Panel** sidebar.

![mod-header](images/custom/mod-header.png)

Hit the **plus** Button to add Modulators from the following Modulator categories: 

[Voice Start Modulators](/hise-modules/modulators/voice-start-modulators) (polyphonic):

which set a value directly when a key is pressed and a voice is started. (see: [Velocity Modulator](/hise-modules/modulators/voice-start-modulators/list/velocity))

[Time Variant Modulators](/hise-modules/modulators/time-variant-modulators) (monophonic):

whose signals vary over time and can influence the voice dynamically. ([LFO](/hise-modules/modulators/time-variant-modulators/list/lfo))

[Envelope Modulators](/hise-modules/modulators/envelope-modulators) (polyphonic):

who follow a defineable envelope to shape the tone of the voices. ([AHDSR](/hise-modules/modulators/list/ahdsr))

>In a few of the TimeVariant and Envelope-Modulators you'll even find slots for modulating the Modulations, which creates the possibility for some quite complex modulation arrangements. Also make sure that you try out the power of these modulators on some of the Effects in the FX section. 

The best way to explore all the features of the Modules and Modulators in **HISE** is probably to dig in right away and start to add, combine and delete some modules and play around with them. You can use the [HISE Modules](/hise-modules)-Reference here in the docs to get a general overview and discover their hidden capabilities.

Behind the scenes, the architecture of modules that is built within the Main/Preset Workspace is reflected in the `.xml` file that is saved in the **XmlPresetBackups** folder. After you have saved your preset as an `.xml`-file **File > Save as XML** you can open it with an external code editor to take a look at its raw architecture. This can be quite insightful, especially if you want to understand how to access and manipulate the modules and their attributes via [scripting](/scripting).


### HISE Snippets

By the way: Did you know that it's very easy to share your **HISE presets** as Snippets with each other? Exporting your preset via **Export > Export as HISE Snippet** will copy a base64-encoded version of the `.xml` to your clipboard. 

You can then easily share this string on the [Forum](https://forum.hise.audio/) (tip: surrounding the string with markdown code-fences (three successive backticks) will make it look much nicer.)

Import the **HISE Snippet** from clipboard via **File > Import HISE Snippet**. 


## Scripting/Interface Workspace
![](images/custom/scripting_workspace.png)


The [Scripting/Interface Workspace](/working-with-hise/workspaces/scripting-workspace) is a specialised Workspace that features an IDE-like [Code editor](/working-with-hise/workspaces/scripting-workspace/code-editor) for scripting, side by side with the [Interface Designer](/working-with-hise/workspaces/scripting-workspace/interface-designer) which helps you to create a GUI for your plugin. 

Because the interface is instantiated via script and the UIComponent behaviour is regularly tweaked by scripting, they sit besides each other, but can be toggled on or off in the left sidebar with their respective icons. 

On your first visit of the Scripting Workspace it may be possible that you encounter a pretty bleak and grey surface. That indicates that no [Script Processor](/hise-modules/midi-processors/list/scriptprocessor) has yet been created and connected to the **Code Editor**. In **HISE** the Interface has to be instantiated with a Scripting Call inside a Script Processor.

In case you want to quickly hook up an UI, click the house button in the top bar. It will present you with a dialog to set up a new User Interface of variable sizes. After confirmation this shortcut creates a ScriptProcessor with the ProcessorID: "Interface" in the MIDIProcessorChain of the MasterChain of your **HISE preset** and automatically connects it to the **Code Editor**.

Switch back to the Main Workspace. You can click on the ScriptProcessors little **open-in** Button to open it (again :)) in the Scripting Workspace.


### Code Editor

![Code Editor](images/custom/code-editor.png)

The [Code editor](/working-with-hise/workspaces/scripting-workspace/code-editor) now holds a ScriptProcessor named "Interface". You can see that the first line of the script contains :

```javascript
Content.makeFrontInterface(600, 500);
```

This command tells **HISE** to (_blush_) make a Front Interface with the width of `600` and the height of `500` pixels. You can change the values if you want (`600 to 60`), and hit **Compile [F5]**. This evaluates the script, redraws the interface and prints "Compiled OK" to the **Console** beneath the editor. But.. oh, obviously this Interface Canvas is much too small, so let's change it back to the previous values. 

We don't want to delve too much in scripting right now but it's important to know that even the basic use of **HISE** definitely relies on scripting for building instruments. If you want to learn more about scripting in **HISE** please check out the [Scripting](scripting.html) docs.  


In case that you want to say hello to the world, type + **[F5]**:

```!javascript
Console.print("Hello World");
```

### Interface Designer

![interfacedesigner](images/custom/interface-designer.png)


Let's take a look at the Interface Designer. In the top-left corner of the middle panel you can find a little lock icon ![lock](images/custom/lock.png) **[F4]**. Click it to toggle between the **edit** and the **presentation mode** of the Interface Designer. 

While in **edit mode** ![pen](images/custom/pen.png) add a new [Slider](uicomponents.html#Slider) Component by **right-clicking** on the surface of the interface. You can drag the slider around or move it pixel-wise with the arrow keys ←↑↓→ (hold **Ctrl** to move it 10 pixels and/or **Shift** to rescale the elements boundaries). There is also the option to easily copy&paste the UIComponents with dragging and holding the **Alt**-Key and to multiselect UIComponents while holding **Ctrl**. You can delete the item with the **Del**-Key.

On the right hand side you can see the **Property Editor**. It lets you access and modify the properties of  UIComponent. The Sliders **ID** will most definitely be "Knob1". You can change it to anything you want, but you should be aware that the **ID** is the internal handle for accessing the component via scripting. So if you should want to change it at a later stage it's quite easy to mess things up. The **ID** should therefore be as consistent as possible. If you just want to change the name of the slider you can do that via the `text` property.

There are quite a bunch of properties and they also differ depending on the type of UIComponent. If you want to familiarize yourself with their use, take a look at the question-mark popup ![](images/custom/question.png) in the top-bar of the Property Editor to see their specifications. You can find more details about the different Components in the [UI Components](uicomponents.html) chapter.

If you toggle back to **presentation mode** **[F4]** the interface will lock down. You can now use the controls like in a finished plugin. This workflow gives you a handy way to design and test your plugins interface. You can additionally display a preview of the plugin-interface by clicking the house-button ![house](images/custom/house.png) again, or add an external preview window via **View > Add interface preview**.

On the left hand side of the Interface Designer you can see an overview of your added UIComponents in the **Component List**. You can drag them around to change the z-order of the components from the top (background) to the bottom (front). The green and red dots indicate if an UIComponent is going to be saved in a UserPreset via the `saveInPreset` property. Learn more about [UserPresets](misc.html#User-Presets) in it's dedicated chapter in the [Misc](misc.html) section. A neat way to group several elements together is to drag them into a shared [Panel](uicomponents.html#ScriptPanel) component. This makes it easy to structure complex projects as well as to implement a page-like UI-design. You can open a JSON representation of the UIComponents properties when you press [**j**] with a selected element. You can edit these values and accept the changes with [**F5**].



check the changes or new interface scripting chapter.. 
https://github.com/christophhart/hise_documentation/blob/master/NewInterfaceDesigner.md




