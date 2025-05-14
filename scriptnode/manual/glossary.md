---
keywords: Scriptnode Glossary
summary:  A short overview over the most important concepts in scriptnode
author:   Christoph Hart
modified: 24.06.2019
---

# Scriptnode Glossary

There are a few concepts in scriptnode which will be used throughout the interface and this documentation which are important to understand.

## DSP Network

A DSP Network is the main container that will process a scriptnode patch. You can either use embedded networks, which are saved within the project XML tree  or save them as individual files. The latter has the advantage that you can also compile the DSP networks to a C++ class that you then can load with a Hardcoded FX module.

## Node

A node is an object within the graph that processes the signal and the most simple building block of any graph you'll create in scriptnode. It's visual representation contains a header, a (optional) body and a list of sliders for its parameters.

## Signal

An important abstraction that scriptnode does for you is to combine multiple audiochannels (and MIDI events) into one "signal" that flows through the DSP network: the rationale behind this is that for most of the use cases you don't care about the channel amount (or even make it compatible with different channel configurations). Plus having to duplicate the signal graph for stereo processing is pretty annoying. So Unless specified otherwise, a node will process all channels of the signal that it receives. The gain module doesn't care whether it has to process 16 channels or one channel, it just operates on how many channels it has to do.

Another aspect of the signal is the samplerate and buffer size. As you may know, any processing of an audiosignal is usually done in chunks of multiple samples (buffer size) at once with a given samplerate. Now while HISE has a "static" samplerate and buffersize which is defined by the user (or the host that it's operating in), nodes in scriptnode can be processed in different settings: the `container.oversample` nodes will multiply both the samplerate and the buffer size with the oversampling factor, and the `container.framex_block` nodes will bring down the buffer size to exactly `1` which gives you the possiblity for sample-accurate modulation of parameters.

A good way to grasp the concept of signal is using the [analyse.specs](/scriptnode/list/analyse/specs) node which will tell you exactly the specifications of the signal flowing through the respective location:

![](/images/scriptnode/signal_specs.png)

The good thing is that you don't have to care about all this: as soon as you drop a node somewhere, it will be initialised with the required specifications for this location and starts processing the incoming audio samples.

## Factory

A factory is a collection of nodes that belong together and is used to create nodes using their path (`factory.node`). The most important factories are the `container` factory and the `core` factory, but there are a few other factories.

## Container

A container is a node that contains a list of other nodes. There are many different containers which differ in the way they process their children. Containers can be nested to create complex signal path arrangements. The root node is a `container.chain` node, which processes its children serially.

## Parameter

A parameter is a double precision floating point value that will change the behaviour of a node. Unlike the signal graph which still follows the tree paradigm, Parameters can be connected to basically anything (the only limitation is that container parameters can only connect to their children or it breaks the rules of encapsulation). Nodes have a fixed amount of parameters, but Containers can have a dynamic amount of parameters that connect to parameters of their child nodes to build up "macro" parameters.

### Range

Unlike parameters in HISE, scriptnode parameters do not have a fixed range (but rather a default range that you can change to whatever you need). A range does not only define a min and max value, but also three other properties:

- **SkewFactor**. A skew factor of 1.0 is linear and other values will "skew" the curve to the min value (skew < 1.0) or max value (skew > 1.0). It's calculated using the formula `Math.pow(normalizedInput, skewFactor)`
- **StepSize**. A step size that allows the parameter to act in discrete steps. **Important:** this property is exclusive to the skew factor so you can either have a skewed range or a discrete range.
- **Inverted**: swaps the min and max value for inverting the curve

You can change the ranges anytime, either by right-clicking on the knob and change its properties in the popup editor, or by using the range editor which gives you a more intuitive approach.

A description of this user interface can be found [here](/working-with-hise/hise-interface/scriptnode-editor)

### Scaled vs. unscaled parameters

There are two types of parameters in scriptnode: scaled (aka normalized) parameters and unscaled parameters. A *scaled parameter* expects the input to be within the 0...1 range and converts the input value to its own range. This is the default behaviour and allows you to adjust the "modulation" amount directly by changing the target range of the knob (this wasn't the case in early versions of scriptnode and lead to many issues and data redundancy). However there are a few use cases where you don't want this behaviour and directly use the source value without any conversion. These types of parameters (so-called *unscaled parameters*) have a little `U` icon displayed next to its knob. A few examples of these nodes are:

- the `control.converter` node: the range of its value parameter shouldn't matter, what goes in, comes out as converted value no matter the range
- the `cable.expr` node: if you jump through the hoops of defining a custom SNEX function to convert your signal value, you don't want it to 

> Some control nodes that process a cable value come in two different forms to ensure that the modulation chain can be carried out with the desired mode in mind. Eg. the `control.pma` node has a `control.pma_unscaled` variant that allows you to "pass through" the value that you hook up to its **Value** parameter.

## Modulation Source

A modulation source will analyse the signal and use its value to control a parameter of another node. Depending on the parent container type, it will update the target once per sample, once per block or once per defined interval. This can be used to create dynamic EQs, modulating effects, etc.

> Enable the CPU profiling mode in order to see the update rate of modulation connections for each cable. This lets you quickly find issues with wrong modulation frequencies which result in zipper noises.

## Connection

A Connection (represented by a cable) will control its target by the source, which can be either a Parameter of a container or a modulation source.  

A connection has an input range and an output range and will perform a conversion between those. If the input range is equal to the output range (or the source or target parameter is unscaled), then the conversion is skipped and the raw value is being passed through the connection (even if it exceeds the range of the connection). 

> Note that you can toggle the opacity of the cables. This helps you reduce the visual clutter during development.

## Property

A property is a more "static" attribute of a node - it can't be controlled on audio rate and rather defines the behaviour of the node - eg. whether the [smoothed_parameter](/scriptnode/list/control/smoothed_parameter) node should use a linear ramp or an exponential curve for the smoothing algorithm.

These properties are usually selected using a drop down combobox selector. If you then compile the DSP network, it will hardcode this value into the C++ class which allows a bit more optimization.

## Polyphony



Scriptnode has a inbuilt concept of polyphony - nodes which have a "state" exist in two versions: a monophonic one and a polyphonic one with a "state" per voice. As soon as you create a DSP Network in a polyphonic script module, it will create the polyphonic version and use HISE's voice management system to handle the polyphonic states automatically. 

> A polyphonic node will always have the suffix `[poly]` in its header. This is a quick way to see which nodes have a polyphonic state.

## VoiceResetter

A voice resetter is an interface class for HISE modules that give them the power to keep voices alive and kill them if they have finished playing. Whenever you try to implement a sound generating algorithm in scriptnode to create your own polyphonic synthesiser, you will have to send a message to the HISE voice management system when your voice should stop playing. This task is usually performed by either the [`envelope.voice_manager`](/scriptnode/list/envelope/voice_manager) node or the [`envelope.silent_killer`](/scriptnode/list/envelope/silent_killer) node. Then on the "HISE" side (always think of scriptnode as black box when it comes to communication with the rest of your project), you will need a module that has the ability of killing voices which will pick up the message from these nodes and perform the voice reset so that your voice count doesn't explode.

There are multiple modules which offer this feature, some just offer that functionality as isolated purpose (the [Scriptnode Voice Killer](/hise-modules/modulators/envelopes/list/scriptnodevoicekiller)) and some modules have this function built in (eg. the [Script Envelope Modulator](/hise-modules/modulators/envelopes/list/scriptenvelopemodulator)) or the [Polyphonic Script FX](/hise-modules/effects/list/polyscriptfx). The patch browser will show a little panic button in the coloured icon for every module that has an active voice-reset functionality:


![Reset](/images/custom/scriptnode/voice_reset.PNG)

> Note that the polyphonic script FX **can** have that functionality enabled (it's tied to the `HasTail` property of the loaded network). If the panic button is greyed out, then it won't act as voice resetter. Note that if the `HasTail` flag is set in polyphonic effects they will keep the voice alive unless you add a voice-management node in there which might result in voice leaks as discussed [here](https://github.com/christophhart/HISE/issues/564)

