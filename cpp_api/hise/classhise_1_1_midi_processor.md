---
keywords: MidiProcessor
summary:   C++ API Class reference
author:   Christoph Hart
---

A MidiProcessor processes a MidiBuffer.  
It can be used to change the incoming MIDI data before it is sent to a [ModulatorSynth](/cpp_api/hise/classhise_1_1_modulator_synth). Note that if you want to create your own MIDI processors, you should use the HardcodedScriptProcessor as base class since it offers a simpler integration of existing Javascript code and a cleaner API.   
## Class Hierarchy

### Base Classes

- [`hise::Processor`](/cpp_api/hise/classhise_1_1_processor)  

### Derived Classes

- [`hise::MidiPlayer`](/cpp_api/hise/classhise_1_1_midi_player)  
- `hise::MidiProcessorChain`  
- [`hise::raw::MainProcessor`](/cpp_api/raw/classhise_1_1raw_1_1_main_processor)  
- `hise::ScriptBaseMidiProcessor`  


## Class methods

### MidiProcessor

```cpp
 MidiProcessor(MainController *m, const String &id)
```

Creates a new MidiProcessor. You can supply a [ModulatorSynth](/cpp_api/hise/classhise_1_1_modulator_synth) which owns the MidiProcessor to allow the processor to change its properties.   

### getColour

```cpp
Colour getColour() const
```

Overwrite this method if you want a special colour.  
This colour will be used in the debug console and in the editor.   

### getSpecialSymbol

```cpp
Path getSpecialSymbol() const override
```

Overwrite this method if you want to supply a custom symbol for the [Processor](/cpp_api/hise/classhise_1_1_processor).  
By default, it creates an empty Path, so you either have to set a custom Symbol using [setSymbol()](/cpp_api/hise/classhise_1_1_processor#setsymbol), or overwrite the [getSpecialSymbol()](/cpp_api/hise/classhise_1_1_midi_processor#getspecialsymbol) method in a subclass.   

### getChildProcessor

```cpp
Processor * getChildProcessor(int) override
```

Normally a MidiProcessor has no child processors, but it is virtual for the MidiProcessorChain.   

### getNumChildProcessors

```cpp
int getNumChildProcessors() const override
```

Normally a MidiProcessor has no child processors, but it is virtual for the MidiProcessorChain.   

### createEditor

```cpp
ProcessorEditorBody * createEditor(ProcessorEditor *parentEditor) override
```

If you want an editor that is more than the header, overwrite this method and return a subclass of ProcessorEditorBody.   

### processHiseEvent

```cpp
void processHiseEvent(HiseEvent &e)=0
```

Process the incoming event.   

### ignoreEvent

```cpp
void ignoreEvent()
```

If this method is called within processMidiMessage(), the message will be ignored.   

### preprocessBuffer

```cpp
void preprocessBuffer(HiseEventBuffer &buffer, int numSamples)
```

Overwrite this method if your processor wants to process the entire buffer at once in addition of single messages.  
By default this is deactivated, but if you override isProcessingWholeBuffer() and return true, it will use this method.   
