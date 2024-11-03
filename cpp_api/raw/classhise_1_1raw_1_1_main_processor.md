---
keywords: raw::MainProcessor
summary:   C++ API Class reference
author:   Christoph Hart
---

This is the base class for the processor you're going to use as main data object.  
If you are working in HISE without using this C++ API, you will use a ScriptProcessor in the root Container as main interface processor (this is done via the Scripting API call Content.makeFrontInterface()).  
This module will then be responsible for the following things:  
- Defining the user interface  
- Managing the data that is used for restoring the plugin state (or user presets).  
- Contains the logic for your UI to react on MIDI events.  
  
You can do all these things on the C++ side by creating a derived class from this class and use the following tools:  

### Create the UI
  
The UI is a separate class that needs to be used as main editor - you just need to create an instance of your Component class and return it from RawDataBase::createEditor(). You probably want to derive your main editor class from the ConnectedObject subclass which offers a convenient way to access this module once it's added to the signal path.  

###  Logic
  
The recommended way for storing data that can be represented as float numbers is by adding parameters to this processor using the [addParameter()](/cpp_api/raw/classhise_1_1raw_1_1_main_processor#addparameter) function. Other processors can then register themselves with a lambda to be notified about changes using the [registerCallback()](/cpp_api/raw/classhise_1_1raw_1_1_main_processor#registercallback) function. This way you can benefit from all the other helper classes in the raw namespace: [UIConnection](/cpp_api/raw/classhise_1_1raw_1_1_u_i_connection), [Reference](/cpp_api/raw/classhise_1_1raw_1_1_reference), etc.  

### MIDI Processing
  
This class is derived from [MidiProcessor](/cpp_api/hise/classhise_1_1_midi_processor) so you can react on MIDI events. Other than the scripted version, which allows either a synchronous or a deferred execution of the MIDI callback, this class offers both options at once, so you can do synchronous tasks in the audio thread as well as handling UI tasks in a asynchronous callback that will be executed on the message thread.  

## Initialisation
  
The recommended way of using this class is to create a subclassed instance of it and pass it to the helper function addAndSetup(), which takes care of the entire initialisation for you:  

```cpp
class MyData : public hise::FrontendProcessor::RawDataBase,
               hise::raw::MainProcessor::ConnectedObject
{
public:
    MyData(MainController* mc) :
        RawDataBase(mc)
    {
        // This should be the first thing you do, everything else
        // will probably need the main processor.
        raw::MainProcessor::addAndSetup(this, new MyDataProcessor(getMainController()));

        // Do more initialisation here...
    };
};
```

  
## Class Hierarchy

### Base Classes

- [`hise::MidiProcessor`](/cpp_api/hise/classhise_1_1_midi_processor)  

## Public types
### enum ExecutionType
| Name | Description |
| -- | ------ |
| `Synchronously` | will be executed synchronously on the audio thread. |
| `Asynchronously` | will be deferred and executed on the UI thread sometime in the future. |

## Class methods

### ~MainProcessor

```cpp
 ~MainProcessor()
```

The destructor of the main processor.  
Be aware that this might be called while other modules are still alive - the order of destruction of HISE modules in the module tree is top down, and chances are that this is one of the first modules.  
So if you have modules that use a reference to this class (eg. everything derived from ConnectedObject, make sure you check if the object still exists for operations that might be called after the destruction.   

### init

```cpp
void init()
```

This method will be called after the processor was correctly initialised.  
You can use this to build up the module tree.   

### registerCallback

```cpp
void registerCallback(Processor *p, int parameterIndex, const Callback &f, ExecutionType executionType=Synchronously)
```

Registers a lambda to the given parameter.  
Use this class to add parameters to your main interface that other classes can listen to.  
Since it uses the standard parameter system of a [hise::Processor](/cpp_api/hise/classhise_1_1_processor), this is limited to float numbers. Boolean and discrete values can obviously also be handled, however if you have more complex data types, you need to add them as [Data](/cpp_api/raw/structhise_1_1raw_1_1_data) subclass   

### getIdentifierForParameterIndex

```cpp
Identifier getIdentifierForParameterIndex(int parameterIndex) const override
```

This returns a Identifier with the name of the parameter.  
If you want to use this feature (this lets you access Parameters with the script, you should add the parameter name for each parameter in your subtype constructor.   

### setInternalAttribute

```cpp
void setInternalAttribute(int parameterIndex, float newValue) override
```

Changes a [Processor](/cpp_api/hise/classhise_1_1_processor) parameter.  
Overwrite this method to do your handling. Call the overloaded method with the notification type parameter for external changes.  
parameterIndexthe parameter index (use a enum from the derived class)   
newValuethe new value between 0.0 and 1.0   
  

### getAttribute

```cpp
float getAttribute(int parameterIndex) const override
```

returns the attribute with the specified index (use a enum in the derived class).   

### processHiseEvent

```cpp
void processHiseEvent(HiseEvent &e) final override
```

Process the incoming event.   

### exportAsValueTree

```cpp
ValueTree exportAsValueTree() const override
```

This saves the [Processor](/cpp_api/hise/classhise_1_1_processor).  
It saves the ID, the bypassed state and the fold state. It also saves all child processors. You can overwrite this function and add more properties and their child processors but make sure you call the base class method.  
For primitive values, you can use the macro saveAttribute(name, nameAsString):  
You don't need to save the editor states, as the first 32 bits of EditorState is saved.  

```cpp
ValueTree exportAsValueTree() const override
{
    // must be named 'v' for the macros
    ValueTree v = BaseClass::exportAsValueTree(); 

    saveAttribute(attributeName, "AttributeName");

    // ...

    if(useTable) saveTable(tableVariableName, "TableVariableNameData");

    return v;
};
```

  
[restoreFromValueTree()](/cpp_api/raw/classhise_1_1raw_1_1_main_processor#restorefromvaluetree)  
  

### restoreFromValueTree

```cpp
void restoreFromValueTree(const ValueTree &v) override
```

Restores a previously saved ValueTree.  
The value tree must be created with exportAsValueTree or it will be unpredictable. The child processors are created automatically (both for chains and processors with fixed internal chains, but you should overwrite this method if your [Processor](/cpp_api/hise/classhise_1_1_processor) uses parameters.  
There is a handy macro saveAttribute(name, nameAsString) for this purpose.  

```cpp
restoreFromValueTree(const ValueTree &v) override // parameter must be named 'v' for the macros
{
    // replace BaseClass with the class name of the immediate base class
    BaseClass::restoreFromValueTree(v); 
    
    loadAttribute(attributeName, "AttributeName");
    // ...
    
    // If your Processor uses tables: 
    if(useTable) loadTable(tableVariableName, "TableVariableData");
}
```

  
[exportAsValueTree()](/cpp_api/raw/classhise_1_1raw_1_1_main_processor#exportasvaluetree)  
  
