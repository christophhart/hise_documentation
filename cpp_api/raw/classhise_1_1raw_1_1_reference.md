---
keywords: raw::Reference
summary:   C++ API Class reference
author:   Christoph Hart
---

A lightweight wrapper around a [Processor](/cpp_api/hise/classhise_1_1_processor) in the HISE signal path.  
This object can be used as a wrapper around one of the [Processor](/cpp_api/hise/classhise_1_1_processor) modules in your HISE project. Upon creation, it will search for the given ID (or use the first module that matches the type if the ID is not supplied).  
If desired, it will also be notified about changes to a parameter which can be used to update the UI.  

```cpp
Reference<hise::PolyFilterEffect> polyFilter(mc, "MyFunkyFilter", true);

ParameterCallback update = [this](float newValue) 
{
    this->frequencySlider->setValue(newValue, dontSendNotification); 
};

polyFilter.addParameterToWatch(hise::MonoFilterEffect::Frequency, update);
```

  
If you want a bidirectional connection between UI and the processor, take a look at the [UIConnection](/cpp_api/raw/classhise_1_1raw_1_1_u_i_connection) classes, which offer ready made listeners / updaters for some of the basic JUCE widgets (Slider, ComboBox, Button)   
## Class Hierarchy

### Base Classes

- [`hise::ControlledObject`](/cpp_api/hise/classhise_1_1_controlled_object)  
- `hise::SafeChangeListener`  
classProcessorTypeProcessorType
## Class methods

### Reference

```cpp
 Reference(MainController *mc, const String &id=String(), bool addAsListener=false)
```

Creates a reference to the processor with the given ID. If the ID is empty, it just looks for the first processor of the specified type.   

### addParameterToWatch

```cpp
void addParameterToWatch(int parameterIndex, const ParameterCallback &callbackFunction)
```

Adds a lambda callback to a dedicated parameter that will be fired on changes.   

### getProcessor

```cpp
ProcessorType * getProcessor() const noexcept
```

Returns a raw pointer to the connected [Processor](/cpp_api/hise/classhise_1_1_processor).   
