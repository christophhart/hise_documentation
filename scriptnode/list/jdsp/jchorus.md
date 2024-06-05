---
keywords: jchorus
description: A chorus effect node that wraps the JUCE dsp::Chorus class.
parameters:
  - CentreDelay: Controls the center delay time of the chorus effect (0.0 to 100.0 ms, default 7.0 ms).
  - Depth: Adjusts the depth of the modulation (0.0 to 1.0, default 0.25).
  - Feedback: Sets the feedback amount of the chorus effect (-1.0 to 1.0, default 0.0).
  - Rate: Controls the rate of the modulation in Hertz (0.0 to 100.0 Hz, default 1.0 Hz).
  - Mix: Sets the mix between the dry and wet signals (0.0 to 1.0, default 0.5).
author:   Christoph Hart
modified: 30.05.2024
---
  
The jchorus node implements a chorus effect using the JUCE [dsp::Chorus](https://docs.juce.com/master/classdsp_1_1Chorus.html#a56d8f76c57f63f465a0ef48d2ac66e1f) class. It provides control over several parameters that shape the chorus effect, allowing for a wide range of modulation and depth settings.

The chorus effect works by mixing the original audio signal with one or more delayed copies of itself. These delayed signals are modulated with low-frequency oscillation (LFO) to create slight variations in pitch. This combination of delayed and modulated signals creates a thicker, more complex sound, often described as shimmering or widening. The parameters available in the jchorus node allow precise control over the delay, modulation depth, feedback, modulation rate, and the mix of dry and wet signals.