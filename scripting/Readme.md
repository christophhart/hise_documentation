---
keywords: Scripting
summary:  The scripting reference for HISE.
index: 05
weight: 50
---

![scripting-ui](images/custom/scripting-ui.png:700px)

**Scripting** provides the glue with which you can access each Module and UIComponent in a [Script Processor](/hise-modules/midi-processors/list/scriptprocessor) and mold together more advanced interactions with your instrument.

- The [Scripting in HISE](/scripting/scripting-in-hise) chapter introduces you to the basics, and explains the design decisions that led to some [Additions](/scripting/scripting-in-hise/additions-in-hise) to HISEs JavaScript implementation. 

- If you need a refresher in basic JavaScript take a look at the [HISE JavaScript Tutorial](/scripting/scripting-in-hise/javascript) which is adapted to the scope of scripting in **HISE**.

- The [Scripting API](/scripting/scripting-api) is the backbone of **HISE**s powerful scripting capabilities. You can access and modify almost every aspect of your virtual instrument with its 200+ inbuilt functions. 

> If you are interested in the dirty details; please consider watching Christophs talk: [Javascript for DSP prototyping](https://www.youtube.com/watch?v=fV9hOZrNO_g) to learn more about the technical implementation.

Here are some of the most useful purposes of scripting in HISE:

- Access Module parameters/attributes and change their values (eg. the frequency of the pitch LFO) with script logic.
- Use the MIDI Callbacks (`onNoteOn`, `onNoteOff`, `onController`) to customize the behaviour of your instrument regarding incoming MIDI Messages.
- Access the UIComponents and change/trigger their properties to create a dynamic interface experience.
- Implement custom GUI interactions for your instrument (Page handling, Film Strips, ScriptPanels) that react to User Input.



### Performance

Compared to compiled C++ code, a Javascript engine is rather slow. But for occasional event handling like incoming MIDI data or a timer every 50 milliseconds the JS-engine is absolutely fit for the purpose. This is completely sufficent for the most use cases of audio plugins and virtual instruments. If you don't want to relinquish the performance gains of a native C++ implementation please consider taking a look at [C++ API](/cpp_api).
