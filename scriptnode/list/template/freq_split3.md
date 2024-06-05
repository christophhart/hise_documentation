---
keywords: freq_split3
summary:  A 3 band frequency split setup
author:   Christoph Hart
modified: 30.05.2024
parameters:
  -Band1: The split frequency between Band 1 and 2
  -Band2: The split frequency between Band 2 and 3
---

This template will create a frequency splitter between two bands. It takes care of setting up a bunch of [jlinkwitzriley](/scriptnode/list/jdsp/jlinkwitzriley) filters with the correct filter modes and creates parameters in the container that will move the filter frequency of the respective filter nodes to implement a frequency band split.