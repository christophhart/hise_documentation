---
keywords: Sample
summary:  A single Sample object.
author:   Christoph Hart
modified: 31.07.2024
---

Functions for doing something with a single samples selected from a Sampler. You can get and filter the array of samples from the sampler with one of these functions:

- [Sampler.createListFromGUISelection()](/scripting/scripting-api/sampler#createlistfromguiselection)
- [Sampler.createListFromScriptSelection()](/scripting/scripting-api/sampler#createlistfromscriptselection)
- [Sampler.createSelection(String regex)](/scripting/scripting-api/sampler#createselection)
- [Sampler.createSelectionFromIndexes(var indexData)](/scripting/scripting-api/sampler#createselectionfromindexes)
- [Sampler.createSelectionWithFilter(var filterFunction)](/scripting/scripting-api/sampler#createselectionwithfilter)

```javascript
const var Sampler1 = Synth.getChildSynth("Sampler1"); // Script reference to Sampler module

const var sampler_obj = Sampler1.asSampler(); // Sampler object

const var sample = sampler_obj.createSelection("foley").pop(); // single sample from regex array

Console.print(sample.get(sample.FileName));
```