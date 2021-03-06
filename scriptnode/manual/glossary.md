---
keywords: Scriptnode Glossary
summary:  A short overview over the most important concepts in scriptnode
author:   Christoph Hart
modified: 24.06.2019
---

# Scriptnode Glossary

There are a few concepts in scriptnode which will be used throughout the interface and this documentation which are important to understand.

## DSP Network

A DSP Network is the main object that will bypass the scripting callbacks of a script module and use it's signal graph instead. It is the entry point to the world of scriptnode and can be activated by the magic spell `const var myNetwork = Engine.createDspNetwork("someName");`. There's a powerful API of function calls that you can use with `myNetwork` to buildup the signal path via scripting.

The lifetime of a DspNetwork object will exceed the compilation (just like a UI component), so if you recompile the script it will look for the one with the given name and just return a reference to it.

## Signal

An important abstraction that scriptnode does for you is to combine multiple audiochannels into one "signal" that flows through the DSP network: the rationale behind this is that for most of the use cases you don't care about the channel amount (or even make it compatible with different channel configurations). Plus having to duplicate the signal graph for stereo processing is pretty annoying. So Unless specified otherwise, a node will process all channels of the signal that it receives. The gain module doesn't care whether it has to process 16 channels or one channel, it just operates on how many channels it has to do.
Another aspect of the signal is the samplerate and buffer size. As you may know, any processing of an audiosignal is usually done in chunks of multiple samples (buffer size) at once with a given samplerate. Now while HISE has a "static" samplerate and buffersize which is defined by the user (or the host that it's operating in), nodes in scriptnode can be processed in different settings: the `container.oversample` nodes will multiply both the samplerate and the buffer size with the oversampling factor, and the `container.framex_block` nodes will bring down the buffer size to exactly `1` which gives you the possiblity for sample-accurate modulation of parameters.

The good thing is that you don't have to care about all this: as soon as you drop a node somewhere, it will be initialised with the required specifications for this location and starts processing the incoming audio samples.

## Node

A node is an object within the graph that processes the signal and the most simple building block of any graph you'll create in scriptnode. It's visual representation contains a header, a (optional) body and a list of sliders for its parameters.

## Factory

A factory is a collection of nodes that belong together and is used to create nodes using their path (`factory.node`). The most important factories are the `container` factory and the `core` factory, but there are a few other factories.

## Container

A container is a node that contains a list of other nodes. There are many different containers which differ in the way they process their children. Containers can be nested to create complex signal path arrangements. The root node is a `container.chain` node, which processes its children serially.

Containers can exported to Cpp modules, which turns them into dedicated nodes.

## Parameter

A parameter is a number that will change the behaviour of a node. Unlike the signal graph which still follows the tree paradigm, Parameters can be connected to basically anything (the only limitation is that container parameters can only connect to their children or it breaks the rules of encapsulation). Nodes have a fixed amount of parameters, but Containers can have a dynamic amount of parameters that connect to parameters of their child nodes to build up "macro" parameters.

> Unlike parameters in HISE, scriptnode parameters do not have a fixed range (but rather a default range). You can change the ranges anytime by right-clicking on the knob and change its `min` and `max` property.

## Modulation Source

A modulation source will analyse the signal and use its value to control a parameter of another node. Depending on the parent container type, it will update the target once per sample, once per block or once per defined interval. This can be used to create dynamic EQs, modulating effects, etc.

## Connection

A Connection (represented by a cable) will control its target by the source, which can be either a Parameter of a container or a modulation source. A connection has a min and max value, interval and skew factor, which controls the range of how it will change the destination as well as some other properties (readymade converters or different math operation modes). There is also the possiblility of bypassing these properties altoghether and calculate the value send to the targets using a SNEX expression.

## Property

A property is a more "static" attribute of a node - it can't be controlled on audio rate and rather defines the behaviour of the node - eg. whether it should react on MIDI input or the name of the inline function to execute as callback. Properties can be edited by right-clicking on the header of a node.

Every property has a `public` attribute, which controls whether the property should be modifiable when you export the module as Cpp node: an internal table that contains a special gain curve is supposed to be an internal property and not changeable from the outside, but a file reference to the impulse response of your complex convolution reverb should be changeable. In this case, the property will be renamed to use its ID (so the `File` property of the node `MyReverb` will be named `MyReverb.File` in the exported Cpp node).

## Polyphony

Scriptnode has a inbuilt concept of polyphony - nodes which have a "state" exist in two versions: a monophonic one and a polyphonic one with a "state" per voice. As soon as you create a DSP Network in a polyphonic script module, it will create the polyphonic version and use HISE's voice management system to handle the polyphonic states automatically. 

> A polyphonic node will always have the suffix `[poly]` in its header. This is a quick way to see which nodes have a polyphonic state.