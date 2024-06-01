---
keywords: clip
summary:  Please enter a brief description.
author:   Christoph Hart
modified: 01.06.2024
parameters:
  - Value: The (absolute) maximum value that is passed through the node
---
  
This operator implements a hard-clipping function where it truncates all values above the threshold defined by the **Value** parameter. 

> It also operates on the negative signal side, so if you set the **Value** to 0.5, any signal value that is smaller than `-0.5` will be clipped to `-0.5`.
