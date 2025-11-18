---
keywords: Node
summary:  Please enter a brief description.
author:   Christoph Hart
modified: 31.07.2024
---
  
The "Script" part of [Scriptnode](/scriptnode) means that you can use HiseScript to programmatically modify, add or remove nodes within a DSP network. This can be used to build up dynamic FX chains, programmatically create complex patches that would be annoying to patch up [manually](/working-with-hise/hise-interface/scriptnode-editor) or other use cases that require you to change the layout of your DSP network.
  
The `Node` object is how you can access a [node](/scriptnode/list) with scripting. It is usually created / referenced from a [DSPNetwork](/scripting/scripting-api/dspnetwork) scripting object and then can perform almost every operation that you do in the scriptnode workspace:

- create / remove nodes from a container
- setting parameters or properties
- adding / connecting parameters or modulation outputs
- bypassing / move the nodes within the parent container

```javascript

// create a reference to a scriptnode network with the given ID
const var sn = Engine.createDspNetwork("my_network");

// create a reference to the root container of that network
// (!= the network itself)
const var rootNode = sn.get("my_network");

// Add a oscillator with the ID "osc"
const var node = sn.create("core.oscillator", "osc");

// Add the oscillator to the root container.
node.setParent(rootNode, -1);

Console.print(node.getNumParameters());
```