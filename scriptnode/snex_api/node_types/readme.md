---
keywords: SNEX Node Types
summary:  A list of the available SNEX nodes in scriptnode.
author:   Christoph Hart
---

There are multiple SNEX nodes available in scriptnode that can be used for different purposes. If you want to use SNEX, just add one of the nodes above (they are in the core factory, so the full iD is eg. core.snex_osc.  

## File organization
  
The XML file of a DspNetwork usually contains the entire signal graph with the exception of the SNEX node code. As soon as you create a new node class, a file called node_id.h will be added to one of the sub directories:  

```cpp
- DspNetworks
-- code_library
--- snex_nodes
--- snex_timer
--- snex_shaper
```

  
This file will contain the code class (the .h extension comes from it being a valid C++ file). In addition to this, it will also create a   
node_id.xml file in the same directory that contains the metadata of the node (how many parameters, their range and some information about ExternalData usage).   
SNEX Node Types