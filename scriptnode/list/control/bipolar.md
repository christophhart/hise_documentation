---
keywords: bipolar
summary:  Creates a bipolar modulation signal from a normalised modulation input
author:   Christoph Hart
modified: 03.07.2022
parameters: 
- Value: The input value (which is supposed to be connected to the original modulation source)
- Scale: how much the value should deviate from the mid point (setting the scale to 1 results in the output signal being identical to the input)
- Gamma: allows a bipolar skew around the mid point scaling (take a look at the graph how it works) and is useful to create some non-linearity in the parameter connections.
---
  
This node allows the modulation to be centred around the mid position with an adjustable scale and gamma value which is useful whenever you need to do bipolar modulation around a certain value.