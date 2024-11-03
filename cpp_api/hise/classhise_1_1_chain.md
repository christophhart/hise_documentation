---
keywords: Chain
summary:   C++ API Class reference
author:   Christoph Hart
---

A [Processor](/cpp_api/hise/classhise_1_1_processor) that has a dynamic size of child processors.  
If your [Processor](/cpp_api/hise/classhise_1_1_processor) has more than a fixed amount of internal child processors, derive it from this class, write a Chain::Handler subclass with all needed operations and you can add / delete Processors on runtime.  
You might want to overwrite the Processors functions getNumChildProcessors() and getChildProcessor() with the handlers methods (handle internal chains manually) This allows the restoreState function to only clear the dynamic list of processors.   
## Class Hierarchy


### Derived Classes

- `hise::EffectProcessorChain`  
- `hise::MidiProcessorChain`  
- [`hise::ModulatorChain`](/cpp_api/hise/classhise_1_1_modulator_chain)  
- `hise::ModulatorSynthChain`  
- `hise::ModulatorSynthGroup`  


## Class methods

### restoreChain

```cpp
bool restoreChain(const ValueTree &v)
```

Restores a Chain from a ValueTree. It creates all processors and restores their values. It returns false, if anything went wrong.   

### getParentProcessor

```cpp
Processor * getParentProcessor()=0
```

Overwrite this and return the processor that owns this chain if it exists.   

### getParentProcessor

```cpp
const Processor * getParentProcessor() const =0
```

Overwrite this and return the processor that owns this chain if it exists.   

### getHandler

```cpp
Handler * getHandler()=0
```

return your subclassed Handler.   

### getHandler

```cpp
const Handler * getHandler() const =0
```

read only access to the Handler.   

### setFactoryType

```cpp
void setFactoryType(FactoryType *newType)=0
```

Sets the FactoryType that will be used.   

### getFactoryType

```cpp
FactoryType * getFactoryType() const =0
```

Returns the Factory type this processor is using.   
