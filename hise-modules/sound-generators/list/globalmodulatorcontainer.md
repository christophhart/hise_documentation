---
keywords: Global Modulator Container
summary:  A Container for Global Modulators
author:   Christoph Hart
modified: 18.03.2019
---

**The Global Modulator Container** can hold Modulators that are not directly linked with a Sound Generators chain. They only create their modulation signal, so you can consider them as modulation sources that can be picked up at various places within HISE.

## Global Modulator targets

You can **fetch** the modulation signal created by the modulators in this sound generator with the "Global.."-Modulators all over your Module architecture. This makes it possible to use the same Modulator in different locations.

Note that you are limited to a single connection per global modulator and the modulation type must also match the modulation source:

- [GlobalVoiceStartModulator](/hise-modules/modulators/voice-start-modulators/list/globalvoicestartmodulator) - Fetches global Voice Start Modulators
- [GlobalStaticTimeVariantModulator](/hise-modules/modulators/voice-start-modulators/list/globalstatictimevariantmodulator) - Fetches a Time Variant Modulator, but takes a static Voice-Start value from its current variant value.
- [GlobalTimeVariantModulator](/hise-modules/modulators/time-variant-modulators/list/globaltimevariantmodulator) - Fetches global Time Variant Modulators
- [Global Envelope Modulator](/hise-modules/modulators/envelopes/list/globalenvelopemodulator) - fetches a polyphonic time-variant modulation signal

## Matrix modulation targets

A much more flexible option of picking up the modulation signals was introduced in HISE 5.0 with the [Matrix Modulator](/hise-modules/modulators/envelopes/list/matrixmodulator). Unlike the global modulator, this module can pick up and combine multiple modulation signals into a single modulation signal that can be fed into the modulation chain at the target location. This allows you to create a much more flexible modulation architecture.

