---
keywords: ModulatorChain
summary:   C++ API Class reference
author:   Christoph Hart
---

A chain of Modulators that can be processed serially.  
A ModulatorChain can hold three different types of Modulators:  
- VoiceStartModulators that calculate their value only if the voice has been started.  
- VariantModulators which calculate their value for each sample  
- EnvelopeModulators which calculate their value for each sample and each voice  
  
In order to make a ModulatorChain work, you have to- create one while specifying a Mode and the voice amount.  
- populate it with modulators via [getHandler()](/cpp_api/hise/classhise_1_1_modulator_chain#gethandler)->addModulator().  
- overwrite [getNumChildProcessors()](/cpp_api/hise/classhise_1_1_modulator_chain#getnumchildprocessors), [getNumInternalChains()](/cpp_api/hise/classhise_1_1_processor#getnuminternalchains) and [getChildProcessor()](/cpp_api/hise/classhise_1_1_modulator_chain#getchildprocessor) (const and not const)  
-   
In your code you have to call all these methods at the appropriate time / place:  
- initialize it with the sample rate and the block size via '[prepareToPlay()](/cpp_api/hise/classhise_1_1_modulator_chain#preparetoplay)'  
- initialize a buffer that will store the modulation values.  
- call the functions handleMidiEvent() and renderNextBlock() to make sure it gets the midi messages and does its processing.  
- call the functions [startVoice()](/cpp_api/hise/classhise_1_1_modulator_chain#startvoice), [stopVoice()](/cpp_api/hise/classhise_1_1_modulator_chain#stopvoice), renderVoice(), and [reset()](/cpp_api/hise/classhise_1_1_modulator_chain#reset) for every voice that should use this chain. (Skip this for monophonic modulation  
  
You might want to use the functions shouldBeProcessed(), [isPlaying()](/cpp_api/hise/classhise_1_1_modulator_chain#isplaying), getVoiceValues()  
For an example usage of an polyphonic ModulatorChain, take a look at the WavetableSynth class. For an example usage of an monophonic ModulatorChain, the LfoModulator class is your friend.   
## Class Hierarchy

### Base Classes

- [`hise::Chain`](/cpp_api/hise/classhise_1_1_chain)  
- `hise::EnvelopeModulator`  

## Class methods

### ModulatorChain

```cpp
 ModulatorChain(MainController *mc, const String &id, int numVoices, Modulation::Mode m, Processor *p)
```

Creates a new modulator chain. You have to specify the voice amount and the Modulation::Mode  

### createEditor

```cpp
ProcessorEditorBody * createEditor(ProcessorEditor *parentEditor) override
```

Creates a ProcessorEditor for this [Processor](/cpp_api/hise/classhise_1_1_processor) and returns the pointer.  
If you subclass this, just allocate a ProcessorEditor of the desired type on the heap and return it. Remember to pass the [Processor](/cpp_api/hise/classhise_1_1_processor) as parameter to allow asynchronous GUI notification. The concept between [Processor](/cpp_api/hise/classhise_1_1_processor) and ProcessorEditor is the same as AudioProcessor and AudioProcessorEditor.   

### getHandler

```cpp
Chain::Handler * getHandler() override
```

Returns the handler that is used to add / delete Modulators in the chain. Use this if you want to change the modulator.   

### getHandler

```cpp
const Chain::Handler * getHandler() const override
```

read only access to the Handler.   

### getFactoryType

```cpp
FactoryType * getFactoryType() const override
```

Returns the Factory type this processor is using.   

### getColour

```cpp
Colour getColour() const override
```

Overwrite this method if you want a special colour.  
This colour will be used in the debug console and in the editor.   

### setFactoryType

```cpp
void setFactoryType(FactoryType *newFactoryType) override
```

Sets the FactoryType that will be used.   

### prepareToPlay

```cpp
void prepareToPlay(double sampleRate, int samplesPerBlock) override
```

Sets the sample rate for all modulators in the chain and initialized the UpdateMerger.   

### getNumChildProcessors

```cpp
int getNumChildProcessors() const override
```

Wraps the handlers method.   

### getChildProcessor

```cpp
Processor * getChildProcessor(int processorIndex) override
```

Wraps the handlers method.   

### getParentProcessor

```cpp
Processor * getParentProcessor() override
```

Overwrite this and return the processor that owns this chain if it exists.   

### getParentProcessor

```cpp
const Processor * getParentProcessor() const override
```

Overwrite this and return the processor that owns this chain if it exists.   

### getChildProcessor

```cpp
const Processor * getChildProcessor(int processorIndex) const override
```

Wraps the handlers method.   

### reset

```cpp
void reset(int voiceIndex) override
```

Resets all envelopes. This can be used for envelopes that do not control the main gain value and therefore do not switch back to IDLE if the note stops playing before the envelope is finished.  
Also their display is updated to clear remaining tails (that aren't cleared because of a missing update call to UpdateMerger.   

### handleHiseEvent

```cpp
void handleHiseEvent(const HiseEvent &m) override
```

Sends the midi message all modulators.  
You can't use the voice index here, since it is not guaranteed if the message starts a note.   

### isPlaying

```cpp
bool isPlaying(int voiceIndex) const override
```

Checks if any of the EnvelopeModulators wants to keep the voice from being killed.  
If no envelopes are active, it checks if the voice was recently started or stopped using an internal array.   

### startVoice

```cpp
float startVoice(int voiceIndex) override
```

Calls the start voice function for all voice start modulators and envelope modulators and sends a display message.   

### stopVoice

```cpp
void stopVoice(int voiceIndex) override
```

Calls the stopVoice function for all envelope modulators.   

### setInternalAttribute

```cpp
void setInternalAttribute(int, float) override
```

Changes a [Processor](/cpp_api/hise/classhise_1_1_processor) parameter.  
Overwrite this method to do your handling. Call the overloaded method with the notification type parameter for external changes.  
parameterIndexthe parameter index (use a enum from the derived class)   
newValuethe new value between 0.0 and 1.0   
  

### getAttribute

```cpp
float getAttribute(int) const override
```

returns the attribute with the specified index (use a enum in the derived class).   

### createSubclassedState

```cpp
ModulatorState * createSubclassedState(int) const override
```

Overwrite this method and return a newly created ModulatorState of the desired subclass. It will be owned by the [Modulator](/cpp_api/hise/classhise_1_1_modulator).   

### setIsVoiceStartChain

```cpp
void setIsVoiceStartChain(bool isVoiceStartChain_)
```

If you want the chain to only process voice start modulators, set this to true.   

### newRenderMonophonicValues

```cpp
void newRenderMonophonicValues(int startSample, int numSamples)
```

This overrides the TimeVariant::renderNextBlock method and only calculates the TimeVariant modulators.  
It assumes that the other modulators are calculated before with renderVoice().  
bufferthe buffer that will be filled with the values of the timevariant modulation result.   
  

### calculateBlock

```cpp
void calculateBlock(int, int) override
```

Does nothing (the complete renderNextBlock method is overwritten.   

### getConstantVoiceValue

```cpp
float getConstantVoiceValue(int voiceIndex) const
```

Iterates all voice start modulators and returns the value either between 0.0 and 1.0 (GainMode) or -1.0 ... 1.0 (Pitch Mode).   
