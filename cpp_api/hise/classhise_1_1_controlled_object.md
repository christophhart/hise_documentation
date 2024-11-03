---
keywords: ControlledObject
summary:   C++ API Class reference
author:   Christoph Hart
---

A base class for all objects that need access to a [MainController](/cpp_api/hise/classhise_1_1_main_controller).  
If you want to have access to the main controller object, derive the class from this object and pass a pointer to the [MainController](/cpp_api/hise/classhise_1_1_main_controller) instance in the constructor.   
## Class Hierarchy


### Derived Classes

- `hise::raw::UIConnection::Base< juce::Button, bool >`  
- `hise::raw::UIConnection::Base< juce::ComboBox, var >`  
- `hise::raw::UIConnection::Base< juce::Slider, float >`  
- `hise::FileHandlerBase`  
- `hise::InteractiveEditor`  
- `hise::JavascriptThreadPool`  
- `hise::MarkdownPreviewPanel::PooledImageProvider`  
- `hise::MarkdownPreviewPanel::ProjectLinkResolver`  
- `hise::MidiControllerAutomationHandler::MPEData`  
- [`hise::PoolBase`](/cpp_api/hise/classhise_1_1_pool_base)  
- `hise::PoolCollection`  
- [`hise::Processor`](/cpp_api/hise/classhise_1_1_processor)  
- [`hise::raw::DataHolderBase`](/cpp_api/raw/classhise_1_1raw_1_1_data_holder_base)  
- [`hise::raw::PluginParameter< FunctionType >`](/cpp_api/raw/classhise_1_1raw_1_1_plugin_parameter)  
- [`hise::raw::Pool`](/cpp_api/raw/classhise_1_1raw_1_1_pool)  
- [`hise::raw::Reference< ProcessorType >`](/cpp_api/raw/classhise_1_1raw_1_1_reference)  
- `hise::raw::SuspendableAsyncUpdater`  
- `hise::raw::UIConnection::Base< ComponentType, ValueType >`  
- `hise::SampleDataExporter`  
- `hise::ScopedSoftBypassDisabler`  
- `hise::ScriptCreatedComponentWrapper::ValuePopup::Properties`  
- `hise::ScriptingObjects::TimerObject`  
- [`hise::raw::Reference< hise::Processor >`](/cpp_api/raw/classhise_1_1raw_1_1_reference)  
- `scriptnode::NodeBase::HelpManager`  


## Class methods

### ControlledObject

```cpp
 ControlledObject(MainController *m, bool notifyOnShutdown=false)
```

Creates a new ControlledObject. The [MainController](/cpp_api/hise/classhise_1_1_main_controller) must be supplied.   

### mainControllerIsDeleted

```cpp
void mainControllerIsDeleted()
```

Overwrite this and make sure that it stops accessing the main controller.   

### getMainController

```cpp
const MainController * getMainController() const noexcept
```

Provides read-only access to the main controller.   

### getMainController

```cpp
MainController * getMainController() noexcept
```

Provides write access to the main controller. Use this if you want to make changes.   
