---
keywords: Syntesizer Group
summary: A container for other Sound generators that allows FM and other additional synthesis types.
---

The Synthesiser Group is one of two sound generators who can host other sound generators: the [Container](/hise-modules/sound-generators/list/synthchain) just processes its sound generators one after another without knowing anything about their voices (each sound generator will have its own voice management).  
However there are some use cases where you would like to group sound generators on voice level so that they can interact in some way. This is where this sound generator comes in. 

## Additive Synthesis

You can stack multiple generators together and run them through the same modulation which makes it a suitable workflow for additive synthesis. Be aware that the generators will be stacked up on the voice level instead of being rendered as a whole.

## FM Synthesis

You can setup one sound generator to be the modulator for another sound generator to create a basic FM synthesiser. The sound generators do not have to be synthesised waveform generators, so you can also apply FM on your samples!

## Unisono Detune

The Synthesiser Group has a automatic unisono feature that duplicates the voices, detunes them and spreads them over the stereo field. You can have up to 16 voices that help you thicken up the sound. 