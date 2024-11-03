---
keywords: Modulator
summary:   C++ API Class reference
author:   Christoph Hart
---

A modulator is a [Processor](/cpp_api/hise/classhise_1_1_processor) that encapsulates modulation behaviour and returns a float value between 0.0 and 1.0.  
A Modulator should be always inside a [ModulatorChain](/cpp_api/hise/classhise_1_1_modulator_chain), which handles the processing according to the characteristics of each Modulator.  
In order to create a modulator, subclass one of the two subclasses, VoiceStartModulator or TimeVariantModulator (never subclass this directly), and overwrite the following methods: 
```cpp
const String getType () const;
ModulatorEditor *createEditor();
float calculateVoiceStartValue(const MidiMessage &messageThatStartedVoice);
XmlElement *getDescription () const;
float getAttribute (int parameter_index) const;
void setAttribute (int parameter_index, float newValue);
float getDisplayValue() const;
```

  
There are two handy features to debug a modulator: If plotThisModulator() is set to true, the Modulator will print its output on a popup plotter.  
[ModulatorChain](/cpp_api/hise/classhise_1_1_modulator_chain), ModulatorEditor   
  
## Class Hierarchy

### Base Classes

- [`hise::Processor`](/cpp_api/hise/classhise_1_1_processor)  

### Derived Classes

- `hise::EnvelopeModulator`  
- `hise::TimeVariantModulator`  
- `hise::VoiceStartModulator`  


## Class methods

### Modulator

```cpp
 Modulator(MainController *m, const String &id, int numVoices)
```

Creates a new modulator with the given Identifier.   

### handleHiseEvent

```cpp
void handleHiseEvent(const HiseEvent &)=0
```

If the modulator uses Midi events, you can specify the behaviour here.  
This is likely to be used with midi messages that do not trigger a voice start like cc-messages. For the handling of note-on messages better use the calculateVoiceStartValue() method instead.   

### getNumChildProcessors

```cpp
int getNumChildProcessors() const override
```

Normally a Modulator has no child processors, you can overwrite it if you use internal chains.   

### setColour

```cpp
void setColour(Colour c)
```

Sets the colour of the modulator.   

### getColour

```cpp
Colour getColour() const override
```

Overwrite this method if you want a special colour.  
This colour will be used in the debug console and in the editor.   
