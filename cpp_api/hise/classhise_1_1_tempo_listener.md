---
keywords: TempoListener
summary:   C++ API Class reference
author:   Christoph Hart
---

This class is a listener class that can react to tempo changes.  
In order to use this, subclass this and implement the behaviour in the tempoChanged callback.   
## Class Hierarchy


### Derived Classes

- [`hise::MidiPlayer`](/cpp_api/hise/classhise_1_1_midi_player)  


## Class methods

### tempoChanged

```cpp
void tempoChanged(double newTempo)=0
```

The callback function that will be called if the tempo was changed.  
This is called synchronously in the audio callback before the processing, so make sure you don't make something stupid here.  
It will be called once per block, so you can't do sample synchronous tempo stuff, but that should be enough.   
