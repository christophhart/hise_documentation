---
keywords: Scriptnode
summary:  An introduction to scriptnode
author:   Christoph Hart
modified: 24.06.2019
index:    06
---

![scriptnode-start](/images/interface/scriptnode-start.png)

With Scriptnode you get access to a full fledged modular DSP toolkit for building [DSP networks](/scriptnode/manual/glossary#dsp-network) that can be inserted into the HISE audio chain.

Add one of the following **Script** audio modules to the [Module Tree](/working-with-hise/hise-interface/left-panel/module-tree), create a DSP network and start adding [nodes](/scriptnode/list) to it.

- [Script FX](/hise-modules/effects/list/scriptfx) - Use a DSP network in the FX Chain as a monophonic effect.
- [Polyphonic Script FX](/hise-modules/effects/list/polyscriptfx) - Use a DSP network in the FX chain of a sound generator as a polyphonic effect.
- [Scriptnode Synthesiser](/hise-modules/sound-generators/list/scriptsynth) - Use the MIDI input to build a multivoice Scriptnode synthesiser

Add **Script Modulators** to the Modulation Chain to build customized modulation signals:
- [Script Time Variant Modulator](/hise-modules/modulators/time-variant-modulators/list/scripttimevariantmodulator) - create a monophonic time-variant modulation signal with a DSP network
- [Script Envelope Modulator](/hise-modules/modulators/envelopes/list/scriptenvelopemodulator)- create a polyphonic time-variant modulation signal with a DSP network.

## Rationale

**HISE** started as a toolkit for developing sample based virtual instruments (hence the name: *Hart Instruments Sampler Engine*). The first features were a module for low overhead streaming of audio samples and a scripting engine that allowed customization of the MIDI processing.

The signal flow of HISE was entire built around the tree paradigm, which gave enough flexibility and structure for complex virtual instruments. The audio effects that are built into HISE can be organized the same way, as child elements of a serially processed chain. This limitation was extended with a few concepts (multichannel routing to build AUX sends, global modulators which distribute their signal to multiple targets) to supply a workaround for the use cases that weren't possible (or impractical) with the strict parent-child relation of the tree concept.

However in the course of time, many feature requests / additions to either existing modules or use cases which are impossible to achieve with the current architecture made me think about a way how to add an entire new system that **will not change existing** workflows. These were the requirements:

### Performance

No performance overhead vs. C++ modules. The Javascript engine inside HISE is capable of doing DSP calculations in the sense that it is fairly realtime safe and fast enough for event based processing. However it doesn't stand a chance against natively compiled Cpp code.
So before thinking about anything else it has to make sure that there is not a single CPU cycle wasted. The reason for this is that you should be able to create your own HISE modules that are equally good as anything that I came up with so far by typing `Cpp` code. If the replication of eg. the LFO module uses more CPU than the LFO module inside HISE, there's no reason why you would want to use your module instead of nagging me about changing the existing LFO.

Having an interpreter (and a graph based system like Max MSP is the same as a interpreter) that boils down to virtual function calls for each operation node has to be avoided at all costs (or at least the final product has to avoid it). The thing is, that interpreters are really nice for developing, and the faster you can combine different nodes, change parameter ranges and play around, the sooner you'll come up with some new unique DSP algorithm. It's just that irritating leap from prototyping to production code that is annoying.
A possiblity that combines interpreter flexibility with compile performance is JIT compilation, but the embedding of existing toolchains (most likely LLVM) would be overkill - also a compiler is waiting for you at the end of the development process anyway and it's about time that we give him a little bit more to do than just compiling the static HISE codebase. 
So this is the workflow that can be used to achieve Cpp performance while keeping the development process as joyful as possible:


- design your algorithm using a node-based system. Drag parameters around, change their ranges on the fly just like with a big modulator synthesiser.
- when you export your plugin (or have finished the module you're working on), create a Cpp class that will contain the exact same algorithm and let the compiler optimize it to the degree of handwritten code.

A little example: If you use 3 addition nodes like this:

![additions.png](/images/custom/scriptnode/additions.png)

the interpreter will have to calculate three nodes individually. The generated Cpp code will boil them down to a single assembly instruction:

> The CPP code generator uses compile-time template programming to minimize the amount of boilerplate code - after all, the Cpp code should be fairly readable (and with some caution, even modifyable).

```assembly
mov xmm0 1.04122
```

This is just a naive example, but rest assured that your performance will benefit from the decades spent on compiler optimizations developed by the smartest brains that walk around this planet.

### Flexibility

Making complex signal processing graphs should be possible. Feedback loops, multichannel processing, interleaved processing vs. block based processing, oversampling of certain elements inside the signal path should be accessible without coding experience. After experimenting a bit with a completely flexible graph (nodes with pins that can be connected to anything just like in PD / Max MSP), I opted for a slightly less flexible but more effective structure (spoiler alert: it is still a tree, but a much more flexible one).

Another aspect of flexibility is the fact that you should be able to change the functionality of modules without digging into the Cpp source code. So if you like something, but want to change a little part of its functionality, there should be a reasonably practical workflow to make this happen. The solution to this requirement is a library of premade "meta" nodes that are created using other nodes and exported to a Cpp node. If you want to change the node, just "unfreeze" the node (the exported Cpp code still contains the data of its original scriptnode graph, so this process is reversible), make the changes you want, and then export your customized version back to Cpp.

### Integration

The existing architecture in HISE is still capable of building the core structure of any project imaginable. The desire for customization is rather on a module level. 

Luckily there is already a system for total customization of modules in place inside HISE: the scripting modules. For every module type (effect, modulator, MIDI processor), you can create a scripted version and customize it how you want. This works flawlessly for MIDI processors, but anything that operates on an audio signal has performance implications that makes them not really suitable for production code.
However, we can expand on that system - and by now you might have realized why it's called *script*node.
With a single line of code applied to script processors that process audio, the entire signal path will be redirected to the new system that doesn't have the performance overhead of the scripting engine.

One might think that this step was a bit lazy (and if you want to be a bit cheeky one might argue that this is the only option to save the failed scriptmodule-for-everything approach). However, the extension of the script modules yields another very important advantage: it makes the entire signal graph and its parameters accessible to a scripting environment. Anybody who has ever written a bash script to automate certain parts of whatever will know what a huge timesaver this can be. Creating nodes with code, duplicating entire paths, and even adding / removing modules on the fly can all be achieved with a few lines of code.

I tried to mimic the paradigm from the UI development workflow as much as possible: you have a data model that lives outside the scripting environment, but you can grab references by IDs and operate on them just with the UI components. If you're adding nodes, it first searches the database of existing nodes and return a reference if it finds the ID, so you don't end up with ten convolution reverbs if you press F5 a few times.
To make it even more useful, there are a few nodes which can be connected to a javascript (inline) function that will be executed on certain events: timer events and MIDI callbacks.

## Summary

So with these requirements in mind, I came up with the system called scriptnode. The workflow is pretty simple: 

- Add a script module, create a "DSP Network" and forward the callbacks to it.
- Create containers to build up your signal path.
- Fill it with nodes.
- Connect modulators or parameters to the node parameters.
- When you're done, export it as Cpp node and move on to the next task.

I tried to make the graphical UI as usable as possible: drag around nodes between containers, use Ctrl+Z to undo any opearion, duplicate, copy and paste entire containers, etc. An overview of the possibilities can be found here.

If you want to learn about the functionality of each node, take a look at the reference manual, otherwise feel free to load up a few example snippets and play around, this might be the best start into the world of scriptnode.
