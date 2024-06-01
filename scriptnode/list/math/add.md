---
keywords: add
summary:  Adds a static DC offset to the signal
author:   Christoph Hart
modified: 01.06.2024
parameters:
  - Value: The static value to be added to the signal
---
  
This node will add a static constant value (called DC offset) to the signal. There are many applications that require this node:

- if you want to create a modulation signal, you have to add 1.0 and then multiply it with further processing
- if you want to implement asymetric distortion, you will have to add a (small) value to the signal before running it through the distortion (and use a HP filter afterwards).
