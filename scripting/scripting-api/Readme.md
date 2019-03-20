---
keywords: Scripting API
summary:  The API reference for the scripting language in HISE.
icon:     /images/icon_apicollection
weight:   50
index:    06
author:   Christoph Hart
---

# Scripting API

The scripting API in HISE can be used to customize the behaviour.

## Using references to objects in HISE

Most of the time you will find yourself changing existing objects in HISE - either UI Components or HISE modules. The usual workflow for this task is to grab a reference with the desired target type and then call one of its methods:

```javascript
const var knob = Content.getComponent("My Knob"); // Create a reference to a knob
knob.setValue(125);                               // Call a method.
```

  
> In a real world project, you will most likely use multiple references. In this case consider storing them in an [Array](/scripting/scripting-api/array) and iterate over it

## HISE module reference types

The HISE module architecture is based on a strong hierarchy of inheritance with a few interface types. This means that every HISE module has exactly one base class but can have multiple interface classes that add additional functionality.  
For example the **VelocityModulator** has the base class [Modulator](/scripting/scripting-api/modulator), because it creates a signal that can be used to control paramaters of other modules.  
However, it can also be connected to a [`Table`](/scripting/scripting-api/scripttable) that can be used to change the velocity curve. Therefore, it has the additional interface type [TableProcessor](/scripting/scripting-api/tableprocessor).

> Depending on what functionality you want, you need to create a reference of the desired base class type or interface.

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