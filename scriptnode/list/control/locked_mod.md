---
keywords: locked_mod
summary:  Shows a modulation dragger on its parent container if it is locked
author:   Christoph Hart
modified: 12.10.2024
parameters:
  - Value: the value you want to send to the modulation output of the container
---
  
This node is useful if you have a container in your network that you want to treat as opaque modulation source. In order to do so:

- add this node as a immediate child of a container, 
- connect its **Value** parameter to whatever modulation source you want
- lock the container (by selecting it and click the lock icon in the toolbar)

This will then show a node with a modulation dragger that you can connect to any other target. 

![](/images/custom/scriptnode/lock_example.png)

Internally it will connect it to this node.

> Note that in order for this to work, the node must be a immediate child of the container you want to lock (in order to allow nested usage of locked containers).

