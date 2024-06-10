---
keywords: fix8_block
summary:  Divides the block into chunks of 8 samples.
author:   Christoph Hart
modified: 01.09.2019
---
  
The `container.fixX_block` nodes will divide the incoming signal into chunks of fixed length and process their child nodes with the given block size. Be aware that this doesn't mean that the block size is always this amount, it just guarantees that it will never exceed the amount of samples.

This is particularly useful if you are modulating a parameter: unless the node resides in a `frameX_block`, the modulation value will be send once per audio buffer.
This might result in a very infrequent update (eg. 20ms for 1024 samples), so if you need to make sure that the modulation is fairly precise, wrap your processing into one of these nodes.

If you need true **per-sample-processing**, consider using the [`core.framex_block`](/scriptnode/list/container/framex_block) node, but in most use-cases this node will yield the best compromise between audio quality and performance.

> If you bypass this node, it will still process its children, but with the default functionality of a [`chain`](/scriptnode/list/container/chain) container. This allows you to quickly A/B the effect of the block division.

### Related nodes:

- If you don't know which block size to choose for the child nodes (because you want to evaluate the artifacts vs processing speed ratio), take a look at the [fix_blockx](/scriptnode/list/container/fix_blockx)
- If you want to give the end user the ability to switch between different block sizes (down to sample accurate frame processing), use the [dynamic_blocksize](/scriptnode/list/container/dynamic_blocksize) node

