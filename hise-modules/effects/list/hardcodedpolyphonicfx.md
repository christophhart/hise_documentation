---
keywords: HardcodedPolyphonicFX
summary:  Select a compiled polyphonic DSP Network to process it in the effect chain.
author:   Christoph Hart
modified: 30.05.2024
---

This module can load compiled networks with the `AllowPolyphonic` flag and process voice-based DSP algorithms. It is the hardcoded counterpart of the [Polyphonic Script FX](/hise-modules/effects/list/polyscriptfx).

In order to use this module, you need to compile at least one network with the `AllowPolyphonic` flag set to true, then select it in the drop down menu (or call the Scripting API method [SlotFX.setEffect()](/scripting/scripting-api/slotfx#seteffect) if you want to do that programmatically).

> Be aware that unlike the dynamic scriptnode modules, the hardcoded / compiled versions expect a static channel count so make sure that the `CompileChannelAmount` property of the network matches the actual channel configuration.

### Additional modulation slots

Besides a considerable boost in CPU performance, using the hardcoded module gives you the ability of modulating the first parameters of your effect with a dedicated modulation chain that you can fill with HISE moduleators (velocity, AHDSR, etc). This feature is deactivated by default, but you can recompile HISE with the preprocessor `NUM_HARDCODED_POLY_FX_MODS` set to the number of modulation slots you need. This is a global property, so if you want to control the first three parameters of each hardcoded poly FX with a modulation chain, recompile HISE with `NUM_HARDCODED_POLY_FX_MODS=3`.

> Obviously you will need to put that preprocessor also in your **ExtraDefinition** fields of your project so it will be picked up when exporting your plugin.

### Voice management

Just like the polyphonic script FX, this module can manage the voice logic of HISE. Read more about this topic [here](/hise-modules/effects/list/polyscriptfx#voice-management).