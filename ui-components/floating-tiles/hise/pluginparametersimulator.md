---
keywords: PluginParameterSimulator
summary:  A floating tile that simulates the interaction with plugin parameters through a DAW
author:   Christoph Hart
modified: 07.04.2025
---
  
This floating tile is a development tool that can be used to test / debug the [Plugin Parameter](/glossary/plugin-parameters) handling within HISE. It simulates a DAW host and shows knobs for all plugin parameters exactly as they would be listed in the host when you compile your project as plugin. This lets you verify the order, ranges & behaviour of all plugin parameters as well as test the behaviour of different hosts.

It supports the full feature set of the HISE plugin parameter handling, which includes:

- naming & range conversion / value suffix
- all three plugin parameter types (macro plugin parameters, custom automation slots and script controls with `isPluginParameter==true`).
- parameter gestures - dragging the sliders will send a parameter change gesture to HISE which you can then react to in your script.
- parameter groups && custom sorting
- NKS support (simulates the NKS parameter mapping if enabled)

The recommended way to use this floating tile is a custom popup - just click on the custom popup button on the top left in HISE, then add this floating tile, adjust the size to your screen setup and save it so you can later open it with a single click.

> Note that the entire plugin parameter list is being rebuilt after every compilation of your main interface script. If you have changed any plugin parameter property through the Interface Designer, you need to recompile your script to apply the changes.

### Thread / automation simulator

In addition to just view / interact with the plugin parameters you can also simulate different scenarios:

- host automation (which means that the parameter callback will most likely happen in the audio thread).
- dedicated automation thread (last time I checked Protools is sending it's parameter automation on a dedicated thread)
- zig-zag automation with definable resolution in the audio thread. If you're dragging the slider, all that HISE can do is to send the most recent change at the next audio callback. In order to analyse the CPU performance in scenarios where the host might split up the audio buffer to increase the automation resolution, you can simulate this by selecting a automation resolution when the zig-zag mode is enabled. This will split the audio buffer into chunks of the given buffer size (basically the same as eg. the [container.fix32_block](/scriptnode/list/container/fix32_block) node is doing) and then send the zig zag ramp value with the given resolution

These tools are available through the selectors in the top bar.

> Note that the resolution selector only affects the zig zag mode in the audio thread. If you're running the custom AAX thread, it will send a new value about every 5 milliseconds.


