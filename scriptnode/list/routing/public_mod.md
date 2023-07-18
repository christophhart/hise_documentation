---
keywords: public_mod
summary:  Propagates the value as modulation output
author:   Christoph Hart
modified: 18.07.2023
---
  
This node can be used to define a modulation output for the entire network. This allows you to create custom modulation sources that you can reuse in multiple other networks.

If you want to compile your DSP network and use it as modulation source so that it shows up with one of those draggers:

![](/images/scriptnode/modout.png)

You will need to create this node and connect it's **Value** parameter to any modulation source:

![](/images/scriptnode/public1.png)

You can then compile the network and load the `project.your_node_id` node and it will have a modulation dragger with the output that is send to the **Value** knob internally:

![](/images/scriptnode/public2.png)
