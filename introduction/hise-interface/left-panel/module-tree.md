---
keywords: The Module Tree
summary:  The module tree of the current HISE instrument.
index:    01
---

![Module Tree](images/custom/quick_tour/module-tree.png)

The **Module Tree** on the left of the HISE interface is the area where you patch together [Audio Modules](/hise-modules) (Sound Generators, MIDI/Script Processors, Modulators and FX) to create the DSP (Digital Signal Processing) architecture of your instrument.


## Adding Audio Modules

When you click the **green pencil** on the top left you can add or delete Audio Modules with the **plus** and **trash** icons next to the Master Chain and its Processor & Modulation chains. 

The **plus icon** will open a selection dialog filled with modules that match the type of their parents chain. After clicking on one of the modules it will be added to the Module Tree and do its thing.   

- In the Master Chain you can add [Sound Generators](/hise-modules/sound-generators/list). 

- In the MIDI Chain, [MIDI and Script Processors](/hise-modules/midi-processors/list)

- [Modulators](/hise-modules/modulators) to the **GainModulation** and **PitchModulation** Chain,

- or [Effects](/hise-modules/effects/list) to the FX Chain.

When you focus and click on a newly added module the module will open in a popup and show its controls, attributes and additional chains.

On the left side of a Sound Generator you can find a (triangle) **fold button** to hide the chains of a generator and the **colored square** with which you can quickly bypass a module.
This **Bypass shortcut** also works on Modulators and Effects. 

Squeezed between the **colored square** and the modules Name/ID you can find three different type of helper tools:

## Routing Matrix
![Routing Matrix](images/interface/routing-matrix.png)

When you click the little **peak meter** on Sound Generators and Effects the **Routing Matrix** will open in a popup. With it you can route and send the audio signal to different destinations of your plugins architecture.

In the **Master Chain** you can increase the Channel amount (2-16) of your plugin with a **right-click** on its **Routing Matrix**. You can now change the routing by first clicking the source and then its destination. There are also shortcuts to connect **all channels to Stereo** et al. 

From now on you can route a Sound Generators or Effects output to different channels of your plugin (with their dedicated routing matrices) or use the [Routing Matrix FX](/hise-modules/effects/list/routefx) to redirect the audio signal. 

> For setups with Sends please take a look at the [Send Effect](/hise-modules/effects/list/sendfx) and [Send Container](/hise-modules/sound-generators/list/sendcontainer).

> If you want to develop a **Multichannel to DAW** plugin you have to use the plugin-version of HISE (standalone will not work) or build HISE with multichannel support [Forum Thread](https://forum.hise.audio/topic/566/hise-multiple-outputs).

[Script API: RoutingMatrix](/scripting/scripting-api/routingmatrix)


## Event Logger
![Event Logger](images/interface/event-logger.png)

The little MIDI symbol next to a MIDI module opens the **Event Logger**. It logs incoming MIDI messages and prints out their meta-data in realtime. The list shows the Events **type** (T) (NoteOn/NoteOff), if the note is **ignored** (I) or **artificial** (A), the **Midi Channel**, **NoteNumber** and **Value** (Velocity).

With a right-click on the top of the columns you can filter for additional meta-data like Transpose, Detune and EventId. 

In the search-bar of the **Event Logger** you can filter the events with HISEScript. This is especially useful if you want to test/filter for certain messages values, CC numbers etc.. 

`Message.getNoteNumber() <= 60;` // Copy this into the search-bar and apply it with [Enter/F5] to only show events lower or equal C3.  

> For the distinction between **real** (incoming MIDI) and **artificial** (created by script) events please take a look at the [HISE Event](/glossary/hise-event) article.


## Modulation Plotter
![Mod Plotter](images/interface/plotter.png)

Next to [Modulators](/hise-modules/modulators) you can find a little circle. Its colours intensity indicates the modulators effect on the intensity of the Modulators chain. If you click the circle a little popup opens and shows a plot of the current mod value. 


### Additional Tips & Links

> If you're planning to develop a plugin with a lot of recurring modules you might be interested in setting up the Module Tree per script with the [ScriptAPI: Builder](/scripting/scripting-api/builder) Class. This can help in quickly generating complex plugin architectures with consistent IDs etc.. 




