---
keywords: raw::GenericStorage
summary:   C++ API Class reference
author:   Christoph Hart
---

The base class for storing data as user preset.   
## Class Hierarchy

### Base Classes

- [`hise::raw::Data< juce::var >`](/cpp_api/raw/structhise_1_1raw_1_1_data)  
- `hise::RestorableObject`  

### Derived Classes

- `hise::raw::LambdaStorage< DataType >`  
- [`hise::raw::Storage< FunctionClass >`](/cpp_api/raw/classhise_1_1raw_1_1_storage)  
- `hise::raw::LambdaStorage< float >`  


## Class methods

### exportAsValueTree

```cpp
ValueTree exportAsValueTree() const override
```

Overwrite this method and return a representation of the object as ValueTree.   

### restoreFromValueTree

```cpp
void restoreFromValueTree(const ValueTree &previouslyExportedState) override
```

Overwrite this method and restore the properties of this object using the referenced ValueTree.   
