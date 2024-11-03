---
keywords: ModulatorSynth
summary:   C++ API Class reference
author:   Christoph Hart
---

The base class for all sound generators in HISE.  
It is a extension of the juce::Synthesiser class with the following additions:  
- slots for adding MIDI processing modules, modulators and effects  
- usage of the [HiseEvent](/cpp_api/hise/classhise_1_1_hise_event) type instead of the MidiMessage.  
  
If you're know your way around writing a sound generator based on the juce::Synthesiser class, the adaption to this class should be very straight forward.   
## Class Hierarchy

### Base Classes

- `Synthesiser`  
- [`hise::Processor`](/cpp_api/hise/classhise_1_1_processor)  
- `hise::RoutableProcessor`  

### Derived Classes

- `hise::JavascriptModulatorSynth`  
- `hise::JavascriptSynthesiser`  
- `hise::ModulatorSynthChain`  
- `hise::ModulatorSynthGroup`  


## Public types
### enum Parameters
| Name | Description |
| -- | ------ |
| `Gain` | the volume as gain factor from 0...1 |
| `Balance` | the stereo balance from -100 to 100 |
| `VoiceLimit` | the amount of voices |
| `KillFadeTime` | the fade time when voices are killed module_list |

## Class methods

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

  
[restoreFromValueTree()](/cpp_api/hise/classhise_1_1_modulator_synth#restorefromvaluetree)  
  

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

  
[exportAsValueTree()](/cpp_api/hise/classhise_1_1_modulator_synth#exportasvaluetree)  
  

### getAttribute

```cpp
float getAttribute(int parameterIndex) const override
```

returns the attribute with the specified index (use a enum in the derived class).   

### setInternalAttribute

```cpp
void setInternalAttribute(int parameterIndex, float newValue) override
```

Changes a [Processor](/cpp_api/hise/classhise_1_1_processor) parameter.  
Overwrite this method to do your handling. Call the overloaded method with the notification type parameter for external changes.  
parameterIndexthe parameter index (use a enum from the derived class)   
newValuethe new value between 0.0 and 1.0   
  

### getDefaultValue

```cpp
float getDefaultValue(int parameterIndex) const override
```

Overwrite this and return the default value.   

### getChildProcessor

```cpp
Processor * getChildProcessor(int processorIndex) override
```

This must be overriden by every [Processor](/cpp_api/hise/classhise_1_1_processor) and return the [Chain](/cpp_api/hise/classhise_1_1_chain) with the [Chain](/cpp_api/hise/classhise_1_1_chain) index.  
You can either:- return nullptr, if the [Processor](/cpp_api/hise/classhise_1_1_processor) uses no internal chains  
- one of the internal chains (it's recommended to use the InternalChains enum for this case)  
- return the [Processor](/cpp_api/hise/classhise_1_1_processor) at the index if the [Processor](/cpp_api/hise/classhise_1_1_processor) is a [Chain](/cpp_api/hise/classhise_1_1_chain). You can use it's handler's getProcessor() method.   
  

### getNumChildProcessors

```cpp
int getNumChildProcessors() const override
```

This must return the number of Child processors.  
If this [Processor](/cpp_api/hise/classhise_1_1_processor) is a [Chain](/cpp_api/hise/classhise_1_1_chain), you can use it's getHandler()->getNumProcessor() method.   

### getNumInternalChains

```cpp
int getNumInternalChains() const override
```

If your processor uses internal chains, you can return the number here.  
This is used by the ProcessorEditor to make the chain button bar.   

### createEditor

```cpp
ProcessorEditorBody * createEditor(ProcessorEditor *parentEditor) override
```

Creates a ProcessorEditor for this [Processor](/cpp_api/hise/classhise_1_1_processor) and returns the pointer.  
If you subclass this, just allocate a ProcessorEditor of the desired type on the heap and return it. Remember to pass the [Processor](/cpp_api/hise/classhise_1_1_processor) as parameter to allow asynchronous GUI notification. The concept between [Processor](/cpp_api/hise/classhise_1_1_processor) and ProcessorEditor is the same as AudioProcessor and AudioProcessorEditor.   

### renderNextBlockWithModulators

```cpp
void renderNextBlockWithModulators(AudioSampleBuffer &outputAudio, const HiseEventBuffer &inputMidi)
```

Call this instead of Synthesiser::renderNextBlock to let the ModulatorChains to their work.  
This only renders the TimeVariantModulators (like a master effect) and calculates the voice modulation, so make sure you actually apply the voice modulation in the subclassed ModulatorSynthVoice callback.   

### preVoiceRendering

```cpp
void preVoiceRendering(int startSample, int numThisTime)
```

This method is called to handle all modulatorchains just before the voice rendering.   

### renderVoice

```cpp
void renderVoice(int startSample, int numThisTime)
```

This method is called to actually render all voices. It operates on the internal buffer of the ModulatorSynth.   

### postVoiceRendering

```cpp
void postVoiceRendering(int startSample, int numThisTime)
```

This method is called to handle all modulatorchains after the voice rendering and handles the GUI metering. It assumes stereo mode.  
The rendered buffer is supplied as reference to be able to apply changes here after all voices are rendered (eg. gain).   

### getColour

```cpp
Colour getColour() const override
```

Overwrite this method if you want a special colour.  
This colour will be used in the debug console and in the editor.   

### handleHiseEvent

```cpp
void handleHiseEvent(const HiseEvent &e)
```

Same functionality as Synthesiser::handleMidiEvent(), but sends the midi event to all Modulators in the chains.   

### prepareToPlay

```cpp
void prepareToPlay(double sampleRate, int samplesPerBlock)
```

This sets up the synth and the ModulatorChains.  
Call this instead of Synthesiser::setCurrentPlaybackSampleRate(). It also sets the [ModulatorChain](/cpp_api/hise/classhise_1_1_modulator_chain)'s voice amount, so be sure you add all SynthesiserVoices before you call this function.   

### setBypassed

```cpp
void setBypassed(bool shouldBeBypassed, NotificationType notifyChangeHandler=dontSendNotification) noexcept override
```

This bypasses the processor. You don't have to check in the processors logic itself, normally the chain should do that for you.   

### killAllVoicesWithNoteNumber

```cpp
void killAllVoicesWithNoteNumber(int noteNumber)
```

Kills the note with the specified note number.  
This stops the note with a small fade out (instead of noteoff which can result in very long release times if the envelope says so   

### killLastVoice

```cpp
int killLastVoice(bool allowTailOff=true)
```

Kills the voice that is playing for the longest time.   

### areVoicesActive

```cpp
bool areVoicesActive() const
```

Call this from the message thread and it'll kill all voices at the next buffer.  
Pass in a lambda and it will execute this asynchronously as soon as all voices are killed  
@functionToExecuteWhenKilled: a lambda that will be executed as soon as the voices are killed @executeOnAudioThread: if true, the lambda will be synchronously called on the audio thread   

### soundCanBePlayed

```cpp
bool soundCanBePlayed(ModulatorSynthSound *sound, int midiChannel, int midiNoteNumber, float velocity)
```

Checks if the message fits the sound, but can be overriden to implement other group start logic.   

### noteOn

```cpp
void noteOn(const HiseEvent &m)
```

Same functionality as Synthesiser::noteOn(), but calls calculateVoiceStartValue() if a new voice is started.   

### collectSoundsToBeStarted

```cpp
int collectSoundsToBeStarted(const HiseEvent &m)
```

This method should go through all sounds that are playable and fill the soundsToBeStarted array.   

### getVoiceIndex

```cpp
int getVoiceIndex(const SynthesiserVoice *v) const
```

Returns the voice index for the voice (the index in the internal voice array). This is needed for the ModulatorChains to know which voice is started.   

### addProcessorsWhenEmpty

```cpp
void addProcessorsWhenEmpty()
```

Adds a SimpleEnvelope to a empty ModulatorSynth to prevent clicks.   

### initRenderCallback

```cpp
void initRenderCallback()
```

Clears the internal buffer. This must be called by subclasses for every renderNextBlockWithModulators.   

### setGain

```cpp
void setGain(float newGain)
```

sets the gain of the ModulatorSynth from 0.0 to 1.0.   

### setBalance

```cpp
void setBalance(float newBalance)
```

sets the balance from -1.0 (left) to 1.0 (right) and applies a equal power pan rule.   

### getBalance

```cpp
float getBalance(bool getRightChannelGain) const
```

Returns the calculated (equal power) pan value for either the left or the right channel.   

### getGain

```cpp
float getGain() const
```

Returns the gain of the ModulatorSynth from 0.0 to 1.0.   

### setGroup

```cpp
void setGroup(ModulatorSynthGroup *parent)
```

Sets the parent group. This can only be called once, since synths are not supposed to change their parents.   

### getGroup

```cpp
ModulatorSynthGroup * getGroup() const
```

Returns the ModulatorSynthGroup that this ModulatorSynth belongs to.   

### isInGroup

```cpp
bool isInGroup() const
```

Checks if the Synth was added to a group.   

### getIndexInGroup

```cpp
int getIndexInGroup() const
```

Returns the index of the child synth if it resides in a group and -1 if not.   

### getPlayingSynth

```cpp
ModulatorSynth * getPlayingSynth()
```

Returns either itself or the group that is playing its voices.   

### setClockSpeed

```cpp
void setClockSpeed(ClockSpeed newClockSpeed)
```

Sets the interval for the internal clock callback.   

### getConstantPitchValues

```cpp
const float * getConstantPitchValues() const
```

Returns the pointer to the calculated pitch buffers for the ModulatorSynthVoice's render callback.   

### handleRetriggeredNote

```cpp
void handleRetriggeredNote(ModulatorSynthVoice *voice)
```

specifies the behaviour when a note is started that is already ringing. By default, it is killed, but you can overwrite it to make something else.   

### getPitchValuesForVoice

```cpp
float * getPitchValuesForVoice() const
```

Returns a read pointer to the calculated pitch values.   

### getFreeVoice

```cpp
ModulatorSynthVoice * getFreeVoice(SynthesiserSound *s, int midiChannel, int midiNoteNumber)
```

Returns a read pointer to the calculated pitch values. Used by Synthgroups to render their pitch values on the voice value.   
