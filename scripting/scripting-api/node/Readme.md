---
keywords: Node
summary:  Please enter a brief description.
author:   Christoph Hart
modified: 31.07.2024
---
  
The `Node` object is how you can access [ScriptNode nodes](/scriptnode/list) with scripting. The [ScriptNode Editor](/working-with-hise/hise-interface/scriptnode-editor) is normally taking care of a lot of these functions, but if you want to manipulate a [DSPNetwork](/scripting/scripting-api/dspnetwork) via script, this gives you access to each single nodes properties and methods.


```javascript
const var sn = Engine.createDspNetwork("ScriptNode");

const var node = sn.create("core.oscillator", "osc");

Console.print(node.getNumParameters());
```