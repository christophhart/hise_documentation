---
keywords: raw::DataHolder
summary:   C++ API Class reference
author:   Christoph Hart
---

This class acts as glue to link your [MainProcessor](/cpp_api/raw/classhise_1_1raw_1_1_main_processor) and MainEditor instances into your HISE project.  
If you use the raw API to create HISE projects, you just need to create two classes:  
- A [raw::MainProcessor](/cpp_api/raw/classhise_1_1raw_1_1_main_processor) object that manages all the data / logic  
- A raw::MainEditor object that defines your user interface.  
  
Then you need to return an instance of this class with the two classes as template arguments from the FrontendProcessor::createPresetRaw() method - or just use the CREATE_RAW_PROCESSOR macro that takes care of this for you:  

```cpp
class MyProcessor: public raw::MainProcessor
{
    // [...]
};

class MyInterface: public raw::MainEditor
{
    // [...]
};

CREATE_RAW_PROCESSOR(MyProcessor, MyInterface);
```

  
## Class Hierarchy

### Base Classes

- [`hise::raw::DataHolderBase`](/cpp_api/raw/classhise_1_1raw_1_1_data_holder_base)  
- `hise::raw::MainProcessor::ConnectedObject< MainProcessorClass >`  
class MainProcessorClassclass EditorClass
## Class methods

### createEditor

```cpp
Component * createEditor() override
```

Overwrite this method and return your plugin's main editor.   

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
