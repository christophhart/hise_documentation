---
keywords: normaliser
summary:  Normalises the input value using the range of the Value parameter.
author:   Christoph Hart
modified: 04.07.2022
parameters:
  - Value: Connect the modulation source to this parameter and it will use the range to convert the incoming (unscaled) value to a normalised value between 0 and 1.
---

This node can be used if you want to connect a [unscaled](/scriptnode/manual/glossary#scaled-vs.-unscaled-parameters) parameter to a target that should use the target's parameter range (aka normalised modulation). Just connect the modulation source to the **Value** parameter (and set it's range to the desired source range), then connect the modulation output from this node to your target parameter and it will scale it correctly using the range of the target parameter.

