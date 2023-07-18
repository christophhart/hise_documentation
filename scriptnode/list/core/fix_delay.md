---
keywords: fix_delay
summary:  A static delay with a crossfade between different delay times
author:   Christoph Hart
modified: 18.07.2023
parameters:
- DelayTime: The delay time in milliseconds.
- FadeTime: the fade time in samples
---
  
This is a simple delay line that will delay the incoming signal by the given amount. If the delay time is changed, it will fade between the new and the old delay time in order to avoid glitches.

> Be aware that for modulating effect algorithms (phaser, chorus, etc.) you will need to use a interpolating delay line that allows pitch changes by simulating a different playback speed. The [jdsp.jdelay](/scriptnode/list/jdsp/jdelay) node gives you a delay line with linear interpolation.

If you want to create an echo effect with this module, you will need to use some routing nodes to create a feedback signal graph.