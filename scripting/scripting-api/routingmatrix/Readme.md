---
keywords: RoutingMatrix
summary:  The RoutingMatrix object
author:   Do Mayer
modified: 31.07.2024
---
The `RoutingMatrix` object with which you can manipulate the channels and connections of each audio modules outputs.  


```javascript
const var MasterChain = Synth.getRoutingMatrix("Master Chain");
MasterChain.setNumChannels(8);

```