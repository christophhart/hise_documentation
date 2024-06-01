---
keywords: map
summary:  Maps an input range to an output range
author:   Christoph Hart
modified: 01.06.2024
parameters:
  - InputStart: The minimum value of the input range
  - InputEnd: The maximum value of the input range
  - OutputStart: The minimum value of the output range
  - OutputEnd: The maximum value of the output range
---
  
This node will use a linear function to map a dynamic input range to a dynamic output range. The ranges can be defined using the parameters. The math formula behind the node is:

```javascript
// convert the input signal to 0...1
norm = (input - InputStart) / (InputEnd - InputStart);
// convert the output signal from 0...1
output = norm * (OutputEnd - OutputStart) + OutputStart;
```
