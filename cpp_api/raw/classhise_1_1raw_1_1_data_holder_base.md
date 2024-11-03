---
keywords: raw::DataHolderBase
summary:   C++ API Class reference
author:   Christoph Hart
---

This class is supposed to hold all data defined by your C++ project.  
If you're using a [MainProcessor](/cpp_api/raw/classhise_1_1raw_1_1_main_processor) and MainEditor for your project, you won't need to use this class directly, but create a instance of the templated derived class [DataHolder](/cpp_api/raw/classhise_1_1raw_1_1_data_holder) instead.   
## Class Hierarchy

### Base Classes

- [`hise::ControlledObject`](/cpp_api/hise/classhise_1_1_controlled_object)  
- `hise::RestorableObject`  

### Derived Classes

- [`hise::raw::DataHolder< MainProcessorClass, EditorClass >`](/cpp_api/raw/classhise_1_1raw_1_1_data_holder)  


## Class methods

### createEditor

```cpp
Component * createEditor()=0
```

Overwrite this method and return your plugin's main editor.   
