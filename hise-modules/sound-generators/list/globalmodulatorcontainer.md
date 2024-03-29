---
keywords: Global Modulator Container
summary:  A Container for Global Modulators
author:   Christoph Hart
modified: 18.03.2019
---

**The Global Modulator Container** can hold Modulators that are not directly linked with a Sound Generators chain. They only create their modulation signal. 

You can **fetch** these Modulators with the "Global.."-Modulators all over your Module architecture. This makes it possible to use the same Modulator in different locations.

- [GlobalVoiceStartModulator](/hise-modules/modulators/voice-start-modulators/list/globalvoicestartmodulator) - Fetches global Voice Start Modulators
- [GlobalStaticTimeVariantModulator](/hise-modules/modulators/voice-start-modulators/list/globalstatictimevariantmodulator) - Fetches a Time Variant Modulator, but takes a static Voice-Start value from its current variant value.
- [GlobalTimeVariantModulator](/hise-modules/modulators/time-variant-modulators/list/globaltimevariantmodulator) - Fetches global Time Variant Modulators

### Global Envelopes

With the release of HISE 3.5.0 it is now possible to also use envelope modulators (= polyphonic, time-variant modulation sources) as a global modulation source. Before this update, this wasn't possible because of this reason:

> You can't use envelope modulators as global modulators. The reason for this is that a envelope modulator is quite complex (it can change the release time of a note, otherwise it would be a pretty useless envelope) and that would lead to a lot of unintended consequences. Read more about this in a post about the [Global Modulator System](https://forum.hise.audio/topic/78/the-global-modulator-system).

The solution to the problem described in the link above is to **unify the voice allocation** for all sound generators. This can be done using the scripting API call [`Synth.setUseUniformVoiceHandler()`](/scripting/scripting-api/synth#setuseuniformvoicehandler).
