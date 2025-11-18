---
keywords: pitch_mod
summary:  receives the polyphonic pitch modulation signal of the parent sound generator
author:   Christoph Hart
modified: 31.05.2024
---
  
This node will receive the modulation signal of the pitch modulation chain of the parent sound generator:

- if the network is loaded in a ScriptnodeSynthesiser, then it will pickup the modulation signal from the pitch modulation chain of itself
- if the network is loaded in a FX module (either Script FX or Polyphonic Script FX), then it will pickup the pitch modulation signal from the sound generator that the FX is residing in.
- if the network is loaded in a modulator module (either Script Envelope or Script TimeVariant Modulator), then it won't work and likely crash.

Note that while the plotter signal in the UI of this node suggests a normalised range from 0 to 1, the value that is sent out of the modulation output is actually a **raw pitch ratio value** that can be directly fed into the **FreqRatio** parameter of any oscillator without conversion. If you modulate a LFO with the full bipolar intensity to get a +- 12 semitone modulation range, the values from this node will oscillate between `0.5` (=-1 octave) and `2.0` as you can see here:

![](/images/custom/scriptnode/pitchmod.png))

The rationale is that if you start modulating this on a per sample basis for FM stuff or other things that require a good pitch resolution, the overhead of converting the range to a pitch ratio comes with a non-signifant overhead (also the pitch ratio was already calculated, so we would have to calculate that again).

By using the pitch ratio domain and the [unscaled modulation mode](/scriptnode/manual/glossary#scaled-vs.-unscaled-parameters), this node achieves the best performance possible for that setup.

> As with all other modulation nodes: starting with HISE 5.0 you can use them in all configurations, even in compiled networks.