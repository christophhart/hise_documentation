---
keywords: branch
summary:  A container that allows selective processing of its child nodes
author:   Christoph Hart
modified: 30.05.2024
parameters:
  -Index: The zero based index of the child node that should be processed.
---
  
Usually the signal flow in a scriptnode network is unconditional and flows through all nodes. However there are a few applications where you might want to branch the processing.

Example: If you have multiple sound generator chains and want to swap between them (like in the screenshot above), it would be possible to generate all of them and then select the one you want to hear using a [selector](/scriptnode/list/routing/selector) node. However this is highly inefficient, as the CPU has to generate the sound of all sound generators and throw away all but one. What we need is a simple branch, that will conditionally execute exactly one voice.

In a programming language, you would simply use a series of `if` statements:

```javascript
if(Index == 0)
   processChildNode(0);
else if (Index == 1)
   processChildNode(1);
// ...
```

This node will replicate exactly this function: whatever value is set as Index parameter will cause the childnode at the respective position to be processed while leaving the other child nodes unprocessed.

> The wires below the node will indicate which node is active (like the third one in the example above).

