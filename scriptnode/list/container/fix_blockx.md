---
keywords: fix_blockx
summary:  Processes its child nodes with a static but configurable block size
author:   Christoph Hart
modified: 30.05.2024
---
  
This version is a somewhat dynamic version of the [fix8_block](/scriptnode/list/container/fix8_block). "Somewhat dynamic" as in it allows you to change the block size during development using the property combobox.

> The block size selector is hidden by default, smash that parameter button to show it.

Choosing a correct block size for parts of the network is a delicate process where you can make a tradeoff between performance and CPU usage. In order to evaluate which block size is the best bang for the buck, this node can be used to check different values.

> Note that when you compile a fix_blockx node, it will take the current block size as a static value just as if you would have used eg. the [fix8_block8](/scriptnode/list/container/fix8_block) node. This removes the entire overhead of branching between different block size code paths and allows the optimizer to do its work.

If you want a "true" dynamic block size that you can alter through a parameter, check out the [dynamic_blocksize](/scriptnode/list/container/dynamic_blocksize) node.