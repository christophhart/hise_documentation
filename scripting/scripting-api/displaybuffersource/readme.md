---
keywords: DisplayBufferSource
summary:  A reference to a module that contains display buffers
author:   Christoph Hart
modified: 01.06.2021
---
  
This object is a reference to a HISE module which has a display buffer attached to it. Some modules have a static display buffer (eg. the Analyser node), and all script modules can host multiple display buffers.

In order to create a object of this type, just call [`Synth.getDisplayBufferSource()`](/scripting/scripting-api/synth#getdisplaybuffersource) with the ID of the HISE module you want to reference (similar to getting other typed references).
