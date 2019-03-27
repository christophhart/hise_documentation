---
keywords: Scripting
summary:  The scripting reference for HISE.
icon:     /images/icon_script
index: 03
weight: 50
---


**Scripting** provides the glue with which you can access the Modules and UIComponents in a ScriptProcessor and mold together the interactions of your instrument.


- Script Processor link plus short intro


It also provides a powerful [Scripting API](scripting.html#Scripting-API) with more than 200 inbuilt functions to access and modify almost every aspect of a virtual instrument. 

The scripting language of **HISE** builds upon javascript (Some therefore call it HISEScript) and features major improvements to adapt the javascript language to a real-time-solid audio environment. 

> If you are into the dirty details; please consider watching Christophs talk: [Javascript for DSP prototyping](https://www.youtube.com/watch?v=fV9hOZrNO_g) to learn more about the technical implementation.

If you want to refresh your knowledge of basic javascript please jump to the [HISE Javascript Tutorial](scripting.html#HISE-Javascript-Tutorial) which is adapted to the scope of scripting in **HISE**.

Here are some of the most useful purposes of scripting:

- Access the modules Parameters/Attributes and change their values (eg. the frequency of the pitch LFO) with script logic.
- Use the MIDI Callbacks (`onNoteOn`, `onNoteOff`, `onController`) to customize the behaviour of your instrument regarding incoming MIDI Messages.
- Access the UIComponents and change/trigger their properties to create a dynamic interface experience.
- Implement custom GUI interactions for your instrument (Page handling, Film Strips, ScriptPanels) that react to User Input.

Please have a look at the [Recipes](../recipes/) Repository to access a few common **HISE** scripting examples.


#### Performance

Compared to compiled C++ code, the Javascript engine is rather slow. But for occasional event handling like incoming MIDI data or a timer every 50 milliseconds the engine is absolutely fit enough. This is completely sufficent for the most use cases of audio plugins and virtual instruments. If you don't want to relinquish the performance gains of a native C++ implementation please consider taking a look at [Hraw](hraw.html).
