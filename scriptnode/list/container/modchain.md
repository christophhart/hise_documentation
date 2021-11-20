---
keywords: modchain
summary:  Create a modulation signal
author:   Christoph Hart
modified: 06.08.2021
---
  
This container will process its children without affecting the actual signal, so you can use it to create a modulation signal.  
The child nodes will also run at a reduced sample rate / buffer size (which can be specified using the global `HISE_EVENT_RASTER` preprocessor, which defaults to `8`).

In most use cases you will have a [`core.peak`](/scriptnode/list/core/peak) node as last child node which will then create a modulation signal from the processing of the previous nodes.

> Be aware that if you want to create a periodic modulation signal with a fixed update rate that is independent from the end user's buffer size setting, you have to ensure a fix buffer size using the [`container.fix_block`](/scriptnode/list/container/fix8_block) node family that contains both this modchain node as well as all targets.