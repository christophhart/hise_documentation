---
keywords: pack
summary:  Uses a Slider pack as Lookup table
author:   Christoph Hart
modified: 01.06.2024
---
  
This node will use a slider pack as lookup table and can be used to implement step sequencer modulation signals etc.

It works in the normalised domain, so an input value of `0.0` will output whatever the first slider value is and an input value of `1.0` will output the last slider value.

> It uses linear interpolation to fade between the slider values.

