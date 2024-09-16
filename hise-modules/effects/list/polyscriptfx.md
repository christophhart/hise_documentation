---
keywords: Polyphonic Script FX
summary:  A polyphonic scriptable audio effect.
author:   Christoph Hart
modified: 30.05.2024
---

Create a polyphonic Script FX with [Scriptnode](/scriptnode).

The Polyphonic Script FX is the [polyphonic](/scriptnode/manual/glossary#polyphony) version of the scriptnode FX module which allows per-voice effect processing.

If you load a DspNetwork in a polyphonic module, it will use the polyphonic version of every node (if available / applicable). Furthermore, it will reset the processing state before each voice is being rendered (eg. clearing out filter coefficients & resetting the state of any rampers).

You can also compile DspNetworks to be used as a polyphonic C++ class in its hardcoded counterpart, the [HardcodedPolyphonicFX](/hise-modules/effects/list/hardcodedpolyphonicfx).

### Voice Management

Although this module is named **FX** it can also be used as a sound generator. This gets especially interesting in combination with the spurious [SilentSynth](/hise-modules/sound-generators/list/silentsynth) module to build multichannel / dynamic sound generators. Therefore this module has the functionality of the [VoiceResetter](/scriptnode/manual/glossary#voiceresetter) class which allows you to keep voices alive until you send a voice reset message from inside your network.

> Note that this behaviour is toggled with the `HasTail` flag of the loaded network and if it is enabled (which is the unlucky default value when you create a new DspNetwork), then the voice will not be killed which leads to a stackup of voices. So if you use the polyphonic FX module, either use it without this flag or make sure to use a voice-management node inside the network.

