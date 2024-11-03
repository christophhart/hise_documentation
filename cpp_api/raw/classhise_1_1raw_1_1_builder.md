---
keywords: raw::Builder
summary:   C++ API Class reference
author:   Christoph Hart
---

The builder is a low overhead helper class that provides functions to add modules.  
Create one of those, supply the [MainController](/cpp_api/hise/classhise_1_1_main_controller) instance and call its methods to build up the architecture of your plugin.  

```cpp
// The main controller of this project
auto mc = getMainController();

// The root container of this project
auto masterContainer = mc->getMainSynthChain();

Builder b(mc);

// Adds a sine wave generator
auto sine = b.create<hise::SineSynth>(masterContainer, IDs::Chains::Direct);
sine->setAttribute(hise::SineSynth::OctaveTranspose, 5.0f, sendNotification);

// Adds a reverb to the sine wave generator
auto reverb = b.create<hise::SimpleReverbEffect>(sine, IDs::Chains::FX);
reverb->setAttribute(hise::SimpleReverbEffect::WetLevel, 0.5f, sendNotification);
```

  
Important: This class can only be used from the IDs::Threads::Loading thread in a suspended state. If you want to use this class from another thread, wrap it into a lambda and give it to the [TaskAfterSuspension](/cpp_api/raw/classhise_1_1raw_1_1_task_after_suspension) class.   

## Class methods

### find

```cpp
Reference< T > find(const String &name)
```

Finds and creates a reference object to the module with the given ID.   

### add

```cpp
T * add(T *processor, Processor *parent, int chainIndex=IDs::Chains::Direct)
```

Adds the given module to the parent processor. Specify the chainIndex for modulators / effects.   

### create

```cpp
T * create(Processor *parent, int chainIndex=IDs::Chains::Direct)
```

Creates a module of the given class and adds it to the parent with the specified chainIndex. See ChainIndexes.  
This only works with HISE modules that are registered at one of the factories, so if you want to add a custom module, use the [add()](/cpp_api/raw/classhise_1_1raw_1_1_builder#add) function instead.   

### remove

```cpp
bool remove(Processor *p)
```

Removes a processor and all its child processors from the signal path.   

### createFromBase64State

```cpp
Processor * createFromBase64State(const String &base64EncodedString, Processor *parent, int chainIndex=IDs::Chains::Direct)
```

Creates a module from the given Base64 encoded String and adds it to the parent module with the suppliedChainIndex.   

### setAttributes

```cpp
void setAttributes(Processor *p, const AttributeCollection &collection)
```

Sets all the attributes from the given collection.  
You can use std::initialiser_lists for a clean syntax:  

```cpp
AttributeCollection c =
{
    { SimpleEnvelope::Attack, 10.0f },
    { SimpleEnvelope::Release, 248.0f }
};

for(auto* envelope: myEnvelopes)
    builder.setAttributes(envelope, c);
```

  

### setIdWithIndex

```cpp
void setIdWithIndex(Processor *p, const Identifier &prefix, int index, bool renameChildProcessors=false)
```

Sets the ID of the given processor using the supplied index. It will convert zero-based indexes to one-based index so calling setIdWithIndex(p, "MyProcessor", 0) will result in the ID "MyProcessor1".  
If renameChildProcessors is true, then it will recursively change the IDs of all children, appending their parent IDs.  

```cpp
sine is a sine wave generator with a filter that is modulated by the velocity
builder.setIdWithIndex(sine, "mySine", 4);

// the velocity modulator will be named
// "mySine5_Filter_Velocity
```

  

### getModuleTreeString

```cpp
String getModuleTreeString(Processor *p=nullptr) const
```

returns a string that can be used for debugging purposes.   
