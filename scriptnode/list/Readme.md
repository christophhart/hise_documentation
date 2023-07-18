---
keywords: Scriptnode Node List
summary:  A complete list of all available nodes in scriptnode
author:   Christoph Hart
modified: 24.06.2019
---
  
This is an overview over all nodes that you can use in a scriptnode network. In order to create a node, click anywhere in a container and you will see this popup:

![](/images/scriptnode/createpopup.png)

All nodes are categorized into so called factories, which is one level of hierarchy. For example in the `math` factory you'll find math operators and the `project` factory contains all nodes that you have exported to C++ in the current project (as well as all other DspNetworks which can be nested into each other).  

Each node has a unique ID called `FactoryPath` which will be used to identify and create the node in both the interpreter and the C++ code generator.