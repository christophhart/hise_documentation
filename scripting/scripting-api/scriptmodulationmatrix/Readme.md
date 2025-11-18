---
keywords: ScriptModulationMatrix
summary:  A class that encapsulates the management of complex modulation systems
author:   Christoph Hart
modified: 30.05.2025
---

This class provides programmatical access to the new matrix modulation system in HISE 5.0. It offers convenient methods to query modulation properties, be notified over connection events as well as programmatically perform connection changes.



In addition to these features, this class will also act as data management tool and automatically register itself to the user preset system so that all modulation connections are stored / restored in the user preset.

This class is just a simple wrapper around the functions available at different locations within HISE, so for a detailed overview of the entire matrix modulation system, please take a look at these sections:

- The [Matrix Modulator](/hise-modules/modulators/envelopes/list/matrixmodulator) module for a explanation of the (new) architecture that is powering the modulation matrix system.
- The [ModulationMatrix](/ui-components/floating-tiles/plugin/modulationmatrix) and [ModulationMatrixController](/ui-components/floating-tiles/plugin/modulationmatrixcontroller) floating tiles for a explanation of the available UI building blocks.

In order to use this class make sure to setup your system to work with matrix modulators:

1. Create a global modulator container and add modulation sources in there
2. Add Matrix modulators to every target that you want to modulate
3. Add / customize the floating tiles to display / edit the modulation connections
4. Create this object in the `onInit` callback with [Engine.createModulationMatrix()](/scripting/scripting-api/engine#createmodulationmatrix) and then register callbacks / perform operations on this object.

> Note that this object was completely redesigned in HISE 5.0 with absolutely no attention paid to remaining backwards compatible to the API of older versions, so if you were using this object before, you will need to completely rewrite your modulation logic.