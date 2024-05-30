---
keywords: haas
summary:  Applies Haas stereo processing to the signal
author:   Christoph Hart
modified: 04.07.2022
parameters:
  - Position: The position in the stereo field from full left to full right.
---
  

The fx.haas node is a sound processing effect that is used to create the Haas effect, which is a psychoacoustic phenomenon that occurs when two sounds with similar frequencies are played at the same time, but slightly offset in time. The Haas effect creates the perception of a single sound that is heard as coming from the direction of the first sound to arrive at the listener's ear.

The position parameter of the fx.haas node controls the position of the sound within the stereo field. A value of -1 indicates that the sound is fully panned to the left, while a value of 1 indicates that the sound is fully panned to the right. A value of 0 indicates that the sound is centered in the stereo field. The position parameter can be used to control the perceived direction of the sound within the stereo field.

It's important to note that the fx.haas node has a hardcoded maximum time delay of 20 milliseconds for the full position range. 