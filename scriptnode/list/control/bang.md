---
keywords: bang
summary:  Sends out a value when another modulation value is received
author:   Christoph Hart
modified: 03.07.2022
parameters:
- Value: the value to be send out when the bang arrives
- Bang: a modulation input above 0.5 will trigger the modulation output of this node
---
  
This node can be used to change the timing of when a modulation signal is send: whenever a modulation signal is received on the bang parameter it will send out the value defined by the (unscaled) value parameter.

> the value of the bang input must be > 0.5 in order to trigger the output

The bang value parameter is unscaled (as the most use cases of this node imply an unscaled parameter chain).