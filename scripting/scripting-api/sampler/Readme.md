---
keywords: Sampler
summary:  A script reference to a Sampler module
weight:   50
index:    01
author:   Christoph Hart
---

The `Sampler`object can be used to access sampler-specific properties, like loading samplemaps, changing sample properties, setting the current RR index, etc.

> If you have a generic reference obtained by calling `Synth.getChildSynth()`, you can turn it into a Sampler reference with [`ChildSynth.asSampler()`](/scripting/scripting-api/childsynth#assampler):

```javascript
const var Sampler1 = Synth.getChildSynth("Sampler1");

Sampler1.asSampler().loadSampleMap("My SampleMap");
```

Be aware that most of the functions that change samples will be executed asynchronously - if you want to keep your UI updated, take a look at [`ScriptPanel.setLoadingCallback()`](/scripting/scripting-api/scriptpanel#setloadingcallback)