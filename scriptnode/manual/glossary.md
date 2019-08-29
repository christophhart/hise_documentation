---
keywords: Scriptnode Glossary
summary:  A list of brief explanations of the most important concepts in scriptnode
author:   Christoph Hart
modified: 24.06.2019
---

# Scriptnode Glossary

There are a few concepts in scriptnode which will be used throughout the interface and this documentation which are important to understand.

## DSP Network

A DSP Network is an object that will bypass the scripting callbacks of a script module and use it's signal graph instead. It's the entry point to the world of scriptnode and can be activated by the magic spell `Engine.createDspNetwork("someName");`

## Signal

The signal is a stream of multichannel audio samples with the given samplerate and buffer size. Unless specified otherwise, a node will process all channels of the signal that it receives.

## Node

---
keywords: Scriptnode Glossary
summary:  A short overview over the most important concepts in scriptnode
author:   Christoph Hart
modified: 24.06.2019
---

A node is an object within the graph that processes the signal and the most simple building block of any graph you'll create in scriptnode. It's visual representation contains a header, a (optional) body and a list of sliders for its parameters.

## Factory

A factory is a collection of nodes that belong together and is used to create nodes using their path (`factory.node`). The most important factories are the `container` factory and the `core` factory, but there are a few other factories.

## Container

A container is a node that contains a list of other nodes. There are many different containers which differ in the way they process their children. Containers can be nested to create complex signal path arrangements. The root node is a `container.chain` node, which processes its children serially.

## Parameter

A parameter is a number that will change the behaviour of a node. Unlike the signal graph which still follows the tree paradigm, Parameters can be connected to basically anything. Nodes have a fixed amount of parameters, but Containers can have a dynamic amount of parameters that connect to parameters of their child nodes to build up "macro" parameters.

> Unlike parameters in HISE, scriptnode parameters do not have a fixed range (but rather a default range). You can change the ranges anytime by right-clicking on the knob and change its `min` and `max` property.

## Modulation Source

A modulation source will analyse the signal and use its value to control a parameter of another node. Depending on the parent container type, it will update the target once per sample, once per block or once per defined interval. This can be used to create dynamic EQs, modulating effects, etc.

## Connection

A Connection (represented by a cable) will control its target by the source, which can be either a Parameter of a container or a modulation source.

## Property

A property is a more "static" attribute of a node - it can't be controlled on audio rate and rather defines the behaviour of the node - eg. whether it should react on MIDI input or the name of the inline function to execute as callback. Properties can be edited by right-clicking on the header of a node.

## Polyphony

Scriptnode has a inbuilt concept of polyphony - nodes which have a "state" exist in two versions: a monophonic one and a polyphonic one with a "state" per voice. As soon as you create a DSP Network in a polyphonic script module, it will create the polyphonic version and use HISE's voice management system to handle the polyphonic states automatically. 

> A polyphonic node will always have the suffix `[poly]` in its header. This is a quick way to see which nodes have a polyphonic state.