---
keywords: jpanner
summary:  Please enter a brief description.
author:   Christoph Hart
modified: 30.05.2024
parameters:
- Pan: The position in the stereo field from -1.0 (full left) to 1.0 (full right).
- Rule: the panning rule that is used to determine the attenuation of signals across the stereo field.
---
  
This node wraps some panning algorithms from the JUCE codebase in a node. You can choose on of the listed panning rules which will affect the gain of the signal. 

| Rule | Attenuation | Description |
| -- | - | ----- |
| Linear | -6dB | Regular 6 dB or linear panning rule, allows the panned sound to bep erceived as having a constant level when summed to mono. |
| Balanced | 0dB | Both left and right are 1 when pan value is 0, with left decreasing to 0 above this value and right decreasing to 0 below it. |
| Sin3dB | -3dB | alternate version of the regular 3 dB panning rule with a sine curve. |
| Sin4p5dB | -4.5dB | alternate version of the regular 4.5 dB panning rule with a sine curve. |
| Sin6dB | -6dB | Alternate version of the regular 6 dB panning rule with a sine curve. |
| SquareRoot3dB | -3dB | regular 3 dB or constant power panning rule, allows the panned sound to be perceived as having a constant level regardless of the pan position. |
| SquareRoot4p5dB  | -4.5dB | regular 4.5 dB panning rule, a compromise option between 3 dB and 6 dB panning rules. |

