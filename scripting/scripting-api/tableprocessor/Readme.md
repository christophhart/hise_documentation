---
keywords: TableProcessor
summary:  Get a access and modify a Table Processor
author:   Christoph Hart
modified: 30.07.2024
---

Create a script reference to a Modulator that uses a TableProcessor like the [Table Envelope](/hise-modules/modulators/envelopes/list/tableenvelope) or the [Velocity Modulator](/hise-modules/modulators/voice-start-modulators/list/velocity)

You can create this object with 

```javascript
const var TableEnvelope1 = Synth.getTableProcessor("StringOfModulator")
```
or with right-clicking the top-bar of a modulator and selecting "Create typed Table script reference".

For a more fine-granular manipulation of a Table object take a look at [Table](/scripting/scripting-api/table)
