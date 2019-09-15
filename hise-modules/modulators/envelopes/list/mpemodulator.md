---
keywords: MPE Modulator
summary:  A modulator that uses the MPE standard to create a polyphonic modulation signal
author:   Christoph Hart
modified: 18.03.2019
parameters:
- Monophonic: if true, the modulator will create a monophonic signal instead of a polyphonic. This is useful if the modulation target itself is monophonic
- Retrigger:  if Monophonic is enabled, this will determine whether the modulator will restart its calculations if a note is pressed while another one is playing or not. Disabling this might be helpful for "Legato" use cases where you want a consistent modulation signal over an entire melody instead of single notes.
- GestureCC:  the Gesture that the modulator will respond to. Technically it's not just CC messages, but all of the 5 [gesture types](/glossary/mpe#summary) available in MPE.
- SmoothingTime: a low pass filter which is applied on the signal to smooth fast parameter changes.
- DefaultValue: the initial value that is being used when the modulator starts its voice.
- SmoothedIntensity: this is just an internal parameter that applies smoothing to the intensity.
---
  
The MPE modulator is the bread and butter of the [MPE](/glossary/mpe) system inside HISE. It creates a polyphonic modulation signal based on the MPE standard.

> **Important:** Unlike every other modulator in HISE, this modulator will not retain its state by default, but rely on the [MPE Panel](/ui-components/floating-tiles/plugin/mpepanel) to get its values.