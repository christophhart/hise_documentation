---
keywords: dynamic_blocksize
summary:  Allows a dynamic block size for processing its child nodes
author:   Christoph Hart
modified: 10.06.2024
parameters:
 - BlockSize: the upper block size limit that will be processed. 
---
  
This container is a dynamic version of the [fix_block](/scriptnode/list/container/fix8_block) node which limits the block size to a upper value and allows fine-grained control over the processing specification.

### Differences between the fix block nodes

There are three different node types that will limit the block size:

- this node
- one of the [fix_block](/scriptnode/list/container/fix8_block) nodes with a static block size
- [fix_blockx](/scriptnode/list/container/fix_blockx) with a static block size that can be changed with a property

Unlike the `fix_block` nodes which will have a static block size that will be baked into the compilation of the node, this node will allow you to dynamically change the block size in order to implement something like a "quality" setting.

| What | fix_block8 | fix_blockx | dynamic_blocksize |
| - | -- | -- | -- |
| **Description** | Uses a static block size that is part of the node | Uses a static block size that can be changed via property | Uses a dynamic block size that can be resized using a parameter that can be controlled by a meta parameter of the network. |
| **Compilation** | Will be compiled with the block size specified of the node | Will be compiled with the block size that is currently set by the property | Will compile a dynamic version that will branch between the different block sizes. |
| **Performance** | No runtime overhead after compilation | No runtime overhead after compilation | Slight runtime overhead because of the branch. |
| **=> When to use** | If you know exactly what block size you want | If you want to evaluate different block sizes during development. | If you want the end user to select different quality settings. |

### The BlockSize parameter

The block size parameter can be automated with another parameter. 

> Note that the value of the parameter is not the actual blocksize, but the index to an internal array of valid block sizes. 

This allows the incoming value to be sanitized and ensures that it's always working with a valid block size:

```javascript
const var blockSizes = [1, 8, 16, 32, 64, 128, 256, 512];

setBlockSize(2); // 16
setBlockSize(0); // 1, sample accurate frame processing
setBlockSize(3.5); // 64 (will round to next power of two)
setBlockSize(9000); // 512 (uses a upper limit of 512)
```

The parameter values are named within scriptnode to reflect that, but if you're going to connect the parameter to an external parameter, you might loose that precious information (because the parameter naming is not propagated through the cables).

You might ask yourself why there is no entry for 2 or 4 samples which are valid power of two block sizes. The rationale behind this is that there is the global `HISE_EVENT_RASTER` preprocessor which defaults to 8 samples, so if you go below that you're messing with the timestamps of events so it's discouraged by design.

### Bonus Level: BlockSize of 1 

In addition of selecting different block sizes, you can also choose `1` as block size (with a parameter value of zero according to our explanation above). Doing so will effectively turn this node into a [framex_block](/scriptnode/list/container/framex_block) block which will take a different code path for sample based processing. 
