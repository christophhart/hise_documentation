---
keywords: DspNetwork
summary:  An object that will perform a DSP algorithm based on a network of nodes.
author:   Christoph Hart
modified: 23.06.2019
---
  
The `DSPNetwork` is a class with a collection of [nodes](/scripting/scripting-api/node) that can be arranged in multiple containers to build up a signal chain. 
It supercharges the script processor modules that already perform DSP operations with a graph-based audio development environment.

## Feature list

- prototype effects, modulators and sound generators using a intuitive graph-based environment with a workflow similar to a modular synthesiser.
- completely scriptable and dynamic signal path using different types of containers.
- C++ code generator that creates nodes that perform 1:1 equivalent DSP processing.
- consistent workflow with the other HISE features (think of Interface Designer for DSP).
- inbuilt concept of polyphony
- a few core DSP classes, additional libraries will be wrapped soon (STK is the first).

For a full documentation about the scriptnode system, take a look at the dedicated documentation.