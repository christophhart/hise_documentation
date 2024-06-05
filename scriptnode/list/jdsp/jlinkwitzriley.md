---
keywords: jlinkwitzriley
summary: A Linkwitz-Riley filter node that wraps the JUCE dsp::LinkwitzRileyFilter class.
parameters:
  - Frequency: Sets the cutoff frequency of the filter (20.0 to 20000.0 Hz, default 2000.0 Hz).
  - Type: Selects the filter type, including Low Pass (LP), High Pass (HP), and All Pass (AP).
author:   Christoph Hart
modified: 30.05.2024
---
  
The jlinkwitzriley node implements a Linkwitz-Riley filter using the JUCE [dsp::LinkwitzRileyFilter](https://docs.juce.com/master/classdsp_1_1LinkwitzRileyFilter.html) class. This node provides high-quality filtering capabilities with a choice of low pass, high pass, and all pass filter types.

Linkwitz-Riley filters are commonly used in audio applications due to their flat frequency response and phase characteristics when used in crossover networks. They are designed to sum to unity gain and maintain phase coherence, making them ideal for applications such as loudspeaker crossovers, where maintaining signal integrity across the crossover point is critical.

To use multiple Linkwitz-Riley filters for a multiband splitter, you can create a series of filters to divide the audio signal into multiple frequency bands. The key is to use Linkwitz-Riley filters in both low pass (LP) and high pass (HP) modes to split the signal at desired crossover frequencies. Additionally, the all pass (AP) filter mode is useful for maintaining phase coherence when recombining the bands.

Getting the configuration right is a bit annoying to setup manually. Luckily, you can use the [freq_split](/scriptnode/list/template/freq_split3) templates which will create a container with the correct mode settings & parameter connections for you.

> Note that there is also a (deprecated) node called [filters.linkwitzriley](/scriptnode/list/filters/linkwitzriley). It's highly recommended to use the `jlinkwitzriley` instead because the other one has stability issues when modulating the frequency.