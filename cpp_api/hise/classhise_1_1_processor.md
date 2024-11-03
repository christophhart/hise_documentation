---
keywords: Processor
summary:   C++ API Class reference
author:   Christoph Hart
---

The base class for all HISE modules in the signal path.  
Every object within HISE that processes audio or MIDI is derived from this base class to share the following features:  
- handling of child processors (and special treatment for child processors which are Chains)  
- bypassing & parameter management (using the 'float' type for compatibility with audio processing & plugin parameters): [setAttribute()](/cpp_api/hise/classhise_1_1_processor#setattribute) / [getAttribute()](/cpp_api/hise/classhise_1_1_processor#getattribute)  
- set input / output values for metering and visualization ([setInputValue()](/cpp_api/hise/classhise_1_1_processor#setinputvalue), [setOutputValue()](/cpp_api/hise/classhise_1_1_processor#setoutputvalue))  
- access to the global [MainController](/cpp_api/hise/classhise_1_1_main_controller) object (see [ControlledObject](/cpp_api/hise/classhise_1_1_controlled_object))  
- import / export via ValueTree (see RestorableObject)  
- methods for identification ([getId()](/cpp_api/hise/classhise_1_1_processor#getid), [getType()](/cpp_api/hise/classhise_1_1_processor#gettype), [getName()](/cpp_api/hise/classhise_1_1_processor#getname), [getSymbol()](/cpp_api/hise/classhise_1_1_processor#getsymbol), [getColour()](/cpp_api/hise/classhise_1_1_processor#getcolour))  
- access to the console  
  
The general architecture of a HISE patch is a tree of Processor objects, all residing in a main container of the type ModulatorSynthChain (which can be obtained using [getMainController()](/cpp_api/hise/classhise_1_1_controlled_object#getmaincontroller)->getMainSynthChain()). There is a small helper class ProcessorHelpers, which contains some static methods for searching & checking the type of the Processor.  
Normally, you would not derive from this class directly, but use some of its less generic subclasses ([MidiProcessor](/cpp_api/hise/classhise_1_1_midi_processor), [Modulator](/cpp_api/hise/classhise_1_1_modulator), [EffectProcessor](/cpp_api/hise/classhise_1_1_effect_processor) or [ModulatorSynth](/cpp_api/hise/classhise_1_1_modulator_synth)). There are also some additional interface classes to extend the Processor class with specific features: Processor Interface Classes  
## Class Hierarchy

### Base Classes

- `hise::SafeChangeBroadcaster`  
- `hise::RestorableObject`  
- [`hise::ControlledObject`](/cpp_api/hise/classhise_1_1_controlled_object)  
- `hise::Dispatchable`  

### Derived Classes

- [`hise::EffectProcessor`](/cpp_api/hise/classhise_1_1_effect_processor)  
- `hise::EffectProcessorChain`  
- [`hise::MidiProcessor`](/cpp_api/hise/classhise_1_1_midi_processor)  
- [`hise::Modulator`](/cpp_api/hise/classhise_1_1_modulator)  
- [`hise::ModulatorSynth`](/cpp_api/hise/classhise_1_1_modulator_synth)  


## Class methods

### Processor

```cpp
 Processor(MainController *m, const String &id_, int numVoices)
```

Creates a new Processor with the given Identifier.   

### ~Processor

```cpp
 ~Processor()
```

Overwrite this if you need custom destruction behaviour.   

### createEditor

```cpp
ProcessorEditorBody * createEditor(ProcessorEditor *parentEditor)=0
```

Creates a ProcessorEditor for this Processor and returns the pointer.  
If you subclass this, just allocate a ProcessorEditor of the desired type on the heap and return it. Remember to pass the Processor as parameter to allow asynchronous GUI notification. The concept between Processor and ProcessorEditor is the same as AudioProcessor and AudioProcessorEditor.   

### exportAsValueTree

```cpp
ValueTree exportAsValueTree() const override
```

This saves the Processor.  
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

  
[restoreFromValueTree()](/cpp_api/hise/classhise_1_1_processor#restorefromvaluetree)  
  

### restoreFromValueTree

```cpp
void restoreFromValueTree(const ValueTree &previouslyExportedProcessorState) override
```

Restores a previously saved ValueTree.  
The value tree must be created with exportAsValueTree or it will be unpredictable. The child processors are created automatically (both for chains and processors with fixed internal chains, but you should overwrite this method if your Processor uses parameters.  
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

  
[exportAsValueTree()](/cpp_api/hise/classhise_1_1_processor#exportasvaluetree)  
  

### getType

```cpp
const Identifier getType() const =0
```

Overwrite this method to specify the name.  
Use non-whitespace Strings (best practice is CamelCase). In most cases, this will be enough: 
```cpp
const String getType() const { return "ProcessorName";}; 
```

  

### getSymbol

```cpp
const Path getSymbol() const
```

Returns the symbol of the Processor.  
It either checks if a special symbol is set for this particular Processor, or returns the default one defined in [getSpecialSymbol()](/cpp_api/hise/classhise_1_1_processor#getspecialsymbol)  

### setSymbol

```cpp
void setSymbol(Path newSymbol)
```

Sets a special symbol for the Processor.  
If this method is used, the [getSymbol()](/cpp_api/hise/classhise_1_1_processor#getsymbol) method will return this Path instead of the default one defined in [getSpecialSymbol()](/cpp_api/hise/classhise_1_1_processor#getspecialsymbol);   

### setAttribute

```cpp
void setAttribute(int parameterIndex, float newValue, juce::NotificationType notifyEditor)
```

Changes a Processor parameter.  
This can be used in the audio thread eg. by other Processors. Overwrite the method [setInternalAttribute()](/cpp_api/hise/classhise_1_1_processor#setinternalattribute) to store the parameters in private member variables. If the Processor is polyphonic, the attributes must stay the same for different voices. In this case store a multiplicator for the attribute in a ProcessorState.  
parameterIndexthe parameter index (use a enum from the derived class)   
newValuethe new value between 0.0 and 1.0   
notifyEditorif sendNotification, then a asynchronous message is sent.   
  

### getAttribute

```cpp
float getAttribute(int parameterIndex) const =0
```

returns the attribute with the specified index (use a enum in the derived class).   

### getDefaultValue

```cpp
float getDefaultValue(int) const
```

Overwrite this and return the default value.   

### getChildProcessor

```cpp
Processor * getChildProcessor(int processorIndex)=0
```

This must be overriden by every Processor and return the [Chain](/cpp_api/hise/classhise_1_1_chain) with the [Chain](/cpp_api/hise/classhise_1_1_chain) index.  
You can either:- return nullptr, if the Processor uses no internal chains  
- one of the internal chains (it's recommended to use the InternalChains enum for this case)  
- return the Processor at the index if the Processor is a [Chain](/cpp_api/hise/classhise_1_1_chain). You can use it's handler's getProcessor() method.   
  

### getNumChildProcessors

```cpp
int getNumChildProcessors() const =0
```

This must return the number of Child processors.  
If this Processor is a [Chain](/cpp_api/hise/classhise_1_1_chain), you can use it's getHandler()->getNumProcessor() method.   

### getDescription

```cpp
String getDescription() const =0
```

Return a one-line description of the processor.   

### getNumInternalChains

```cpp
int getNumInternalChains() const
```

If your processor uses internal chains, you can return the number here.  
This is used by the ProcessorEditor to make the chain button bar.   

### enableConsoleOutput

```cpp
void enableConsoleOutput(bool shouldBeEnabled)
```

Enables the Processor to output messages to the Console.  
This method itself does nothing, but you can use this to make a button or something else.   

### getColour

```cpp
Colour getColour() const
```

Overwrite this method if you want a special colour.  
This colour will be used in the debug console and in the editor.   

### getVoiceAmount

```cpp
int getVoiceAmount() const noexcept
```

getNumVoices() is occupied by the Synthesiser class, d'oh!   

### getId

```cpp
const String & getId() const
```

Returns the unique id of the Processor instance (!= the Processor name).  
It must be a valid Identifier (so no whitespace and weird characters).   

### getName

```cpp
const String getName() const
```

Overwrite this and return a pretty name. If you don't overwrite it, the [getType()](/cpp_api/hise/classhise_1_1_processor#gettype) method is used.   

### setBypassed

```cpp
void setBypassed(bool shouldBeBypassed, NotificationType notifyChangeHandler=dontSendNotification) noexcept
```

This bypasses the processor. You don't have to check in the processors logic itself, normally the chain should do that for you.   

### isBypassed

```cpp
bool isBypassed() const noexcept
```

Returns true if the processor is bypassed. For checking the bypass state of ModulatorSynths, better use isSoftBypassed().   

### prepareToPlay

```cpp
void prepareToPlay(double sampleRate_, int samplesPerBlock_)
```

Sets the sample rate and the block size.   

### getSampleRate

```cpp
double getSampleRate() const
```

Returns the sample rate.   

### getLargestBlockSize

```cpp
int getLargestBlockSize() const
```

Returns the block size.   

### getOutputValue

```cpp
float getOutputValue() const
```

This can be used to display the Processors output value.   

### getInputValue

```cpp
float getInputValue() const
```

This can be used to display the Processors input value.   

### setEditorState

```cpp
void setEditorState(int state, bool isOn, NotificationType notifyView=sendNotification)
```

Saves the state of the Processor's editor. It must be saved within the Processor, because the Editor can be deleted.  
You can add more states in your subclass (they should be expressable as bool). Best use a enum: 
```cpp
enum EditorState
{
    newState = Processor::numEditorStates,
};
```

  

### getEditorState

```cpp
bool getEditorState(int state) const
```

Restores the state of the Processor's editor. It must be saved within the Processor, because the Editor can be deleted.   

### restoreCompleteEditorState

```cpp
void restoreCompleteEditorState(const XmlElement *storedState)
```

Restores the EditorState from a BigInteger that was retrieved using getCompleteEditorState.   

### getIdentifierForParameterIndex

```cpp
Identifier getIdentifierForParameterIndex(int parameterIndex) const
```

This returns a Identifier with the name of the parameter.  
If you want to use this feature (this lets you access Parameters with the script, you should add the parameter name for each parameter in your subtype constructor.   

### getNumParameters

```cpp
int getNumParameters() const
```

This returns the number of (named) parameters.   

### setIsOnAir

```cpp
void setIsOnAir(bool isBeingProcessedInAudioThread)
```

Call this method after inserting the processor in the signal chain.  
If you call prepareToPlay before calling this method, it won't lock which makes inserting new processors nicer.   
