---
keywords: Matrix Modulation System
summary:  New file
author:   Christoph Hart
modified: 24.06.2025
---
  
This is a high-level overview of the new matrix modulation system in HISE 5.0 - there have been many changes to various locations within HISE so this page tries to summarize it all and provide links to the detailed documentation of each function where applicable.

Before you dive into the specifics you can also take a look at the [Modulation Matrix Tutorial](/tutorials/scripting#modulation-matrix-tutorial) that utilizes all the new functions and provides a reference implementation of how to design a synthesiser project with a complex modulation architecture.

## Introduction

The modulation system in HISE was one of the first things that was implemented back in 2014 and had a emphasis on high performance as well as being suited towards sampled instrument design with a rather static modulation architecture and a signal system inspired by KONTAKT's modulation system.

With the expansion of the target audience of HISE towards synth & effect developers, having to deal with some of the quirks of this modulation system was a common issue over the years:

- adding / removing modulator connections is rather complicated and error prone, there is no inbuilt way of handling this use case so the developer relied on complicated script setups to implement a functionality that can be considered a standard. Also the requirement of one global modulator module per possible connection and modulation type blew up the module tree and had severe implications on the development UX.
- connecting a modulation target to a UI component was very complicated and involved lots of custom value conversions & other hacks.
- the modulation signal system with its emphasis on the static "intensity" modulation mode was rather limiting and unintuitive for people who are accustomed to modular synths
- there was an over-emphasis on performance vs. flexibility which is great for adding low-overhead modulators to huge sample playback instruments with large voice counts, but limits the modulation possibilities for synth projects where the overhead of the modulation system pales in comparison to the synthetic sound generators.

Changes have been made over the years to HISE to somewhat mitigate these limitations, but with HISE 5.0 there has been a thorough rewrite of the entire modulation system with additions that are particularly tailored towards designing a complex modulation architecture with a modern UX:

1. Modulate any parameter, not just the ones that have a [modulation chain](/hise-modules/modulators). There is still a benefit of using modulation chains as they allow sample accurate modulation, but most parameters (eg. effect parameters like a reverb size parameter) do not require sample accurate modulation hence a system that updates the parameter once per block is totally fine. For scriptnode / hardcoded FX modules you have a [precise control](/scriptnode/list/core/extra_mod) over which parameters should be modulatable through a modulation chain and which will use the fallback parameter modulation system.
2. Add / remove connections and control their intensity with standard UX tools. Users expect to [drag and drop](/ui-components/floating-tiles/plugin/modulationmatrixcontroller) modulation sources to targets, edit the connections in a [modulation matrix](/ui-components/floating-tiles/plugin/modulationmatrix) that shows all connections and see the modulation intensity as well as the current modulated value being [visualised](/glossary/custom_lookandfeel#drawrotaryslider) on the UI (usually with some form of ring around the UI knob). I tried to come up with a set of generic UI elements that are fully stylable with CSS / custom LAF functions that are ready to use.
3. A simple way of [managing the data model of modulation connections](/scripting/scripting-api/scriptmodulationmatrix) is provided - no custom scripting is necessary anymore to store / restore the connections with user presets. Also there is now a single modulator module for every modulation target - no need to add multiple global modulator modules anymore.
4. Get rid of all the quirks of the HISE modulation system: [Global Envelope Modulator](/hise-modules/modulators/envelopes/list/globalenvelopemodulator) are fully supported, any modulation signal can be applied to the target as either [scale / unipolar or bipolar modulation](/hise-modules/modulators/envelopes/list/matrixmodulator#connection-properties) and there is a unified system for visualization / connection of all modulation sources.

## How to use this system

In order to make use of the new system, you need these things:

1. Use a (single) [Global Modulator Container](/hise-modules/sound-generators/list/globalmodulatorcontainer) that provides all modulation sources that you want to offer. This includes envelope modulators.
2. For every target that has a modulation chain (eg. gain modulation or pitch modulation), add a single new modulator: the [Matrix Modulator](/hise-modules/modulators/envelopes/list/matrixmodulator). This module can be connected to multiple modulation sources and provides all the features listed above.
3. For every UI element (currently limited to knobs / sliders) that are modulatable, either connect it to the `Value` parameter of the MatrixModulator in order to use it as target or define the `matrixTargetId` [Slider](/ui-components/plugin-components/knob) to add it to the list of modulatable parameters. Once this is setup, you can now assign / unassign the modulation connections through the context menu or a drag & drop floating tile as well as directly read out the modulation range & values in the LAF object when rendering the knob appearance.
4. There are additional UI elements that can be used for more features: a matrix component that lists either all connections or just the ones for a particular target and a drag component that you can use to simply drag & drop modulation connections by dropping it on a UI knob.
5. For scripting access to this system, you can use the [ScriptModulationMatrix](/scripting/scripting-api/scriptmodulationmatrix) object which offers methods to programmatically store / restore connections. By using this object it will also add the modulation connections to the user preset system so that connections are restored automatically when loading user presets.

## Scriptnode / Modulation bridge

Since most of the effect design is done in scriptnode, a few things have changed in the interface between HISE and scriptnode in order to improve the modulatability of custom effects:

- you can add modulation chains to scriptnode networks with a new preprocessor.
- [global_mod](/scriptnode/list/core/global_mod) and [pitch_mod](/scriptnode/list/core/pitch_mod) signals as well as the [extra_mod](/scriptnode/list/core/extra_mod) chain signals can now be picked up within scriptnode as well as compiled effects.
- you can define for each parameter of your network if it should be connected to a modulation chain or not. If you connect a parameter to a modulation chain, you can either connect it directly to its targets within the network and define a update rate for the modulation (similar to the fix_block nodes) or leave it unconnected and use the `extra_mod` nodes to pick up a sample accurate modulation signal within the node. The latter option offers the ability of a sample accurate modulation of parameters in scriptnode.

> Read more about the interaction with scriptnode at the [extra_mod](/scriptnode/list/core/extra_mod) documentation