---
keywords: extra_mod
summary:  Receives the signal from one of the extra modulation chains in the Scriptnode Synthesiser
author:   Christoph Hart
modified: 31.05.2024
parameters:
  - Index: selects the modulation chain to listen to (either 0 or 1)
---
  
This node is similar to the [pitch_mod](/scriptnode/list/core/pitch_mod) node and listens to **local** modulator signals within a Scriptnode Synthesiser patch.  

A scriptnode synthesiser has two additional modulation chains which are not used by anything by default. However if you want to design a custom synth and want to offer the ability of sample accurate modulation of certain parameters (eg. the hard-sync of a custom VA synthesiser), you can use this node to pickup whatever modulation signal you create in one of the two extra modulation slots.

> This node is only useful inside a Scriptnode Synthesiser patch (or in a polyphonic FX patch that is used by a scriptnode synthesiser).

