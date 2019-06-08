---
keywords: HISE Modules
summary:  Reference for HISE DSP Modules
author:   Christoph Hart
modified: 18.03.2019
index: 03
weight: 50
---

A **HISE Module** is a basic Audio-DSP building block of HISE. You can stitch them together to create your instrument/plugin. They come in four different base types:

- [Sound Generators](/hise-modules/sound-generators) 

- [Midi Processors](/hise-modules/midi-processors) 

- [Modulators](/hise-modules/modulators)

- [Effects](/hise-modules/effects) 

Every Module has a topbar with at least four controls:  

**Fold/Collapse > Processor ID > Bypass Button > and an X to delete it.** 

![transposer topbar](images/custom/transposer-topbar.png)

Behind the scenes (in the module `.xml`-tree) every **HISE Module** is called Processor. Each modules has its specific "Type=" attribute, that declares what it "is" and a unique **Processor ID** that identifies the individual module. A [script reference](/scripting/scripting-in-hise#module-references) to a module needs a consistent **Processor ID** to point to, so be careful to change the **Processor ID** later on, because it will probably break your references.  

A **right click** on the topbar opens a dialog in which you can copy the Modules `.xml` to the clipboard. You can paste it into a ParentProcessor to create a duplicate of it.

There's also the option to ["create a script reference"](/scripting/scripting-in-hise#module-references) to the Module. Paste this into a ScriptProcessors `onInit` Callback to change its attributes with scripting. 


### HISE module reference types

The HISE module architecture is based on a strong hierarchy of inheritance with a few interface types. This means that every HISE module has exactly one base class but can have multiple interface classes that add additional functionality.  

For example the [Velocity Modulator](/hise-modules/modulators/voice-start-modulators/list/velocity) has the base class [Modulator](/scripting/scripting-api/modulator), because it creates a signal that can be used to control parameters of other modules.  

However, it can also be connected to a [Table](/ui-components/plugin-components/table) that is used to change the velocity curve. Therefore, it has an additional interface type: [TableProcessor](/scripting/scripting-api/tableprocessor).

> Depending on what functionality you want, you need to create a reference to the desired base class type or interface.

```javascript
const var v = Synth.getModulator("VeloMod"); // create a base class reference
v.setAttribute(v.UseTable, 1);               // enable the table
v.setIntensity(0.5);                         // change the intensity to 50%


const var v_t = Synth.getTableProcessor();   // create a interface class reference
v_t.addTablePoint(0, 0.5, 0.25);             // create a table point in the centre.
```

```javascript
// short cut - create a temporary interface reference
v.asTableProcessor().addTablePoint(0, 0.5, 0.25);
```

### List of base class references:

- [`AudioSampleProcessor`](/scripting/scripting-api/audiosampleprocessor)  
- [`TableProcessor`](/scripting/scripting-api/tableprocessor)  
- [`SlotFX`](/scripting/scripting-api/slotfx)
- [RoutingMatrix](/scripting/scripting-api/routingmatrix)
- [Sampler](/scripting/scripting-api/sampler) 

## TODO [SliderPackProcessor]
