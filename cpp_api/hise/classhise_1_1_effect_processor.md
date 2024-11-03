---
keywords: EffectProcessor
summary:   C++ API Class reference
author:   Christoph Hart
---

Base class for all Processors that applies a audio effect on the audio data.  
You won't ever subclass from this class directly, but use either MasterEffectProcessor or VoiceEffectProcessor, depending on the type of your effect.   
## Class Hierarchy

### Base Classes

- [`hise::Processor`](/cpp_api/hise/classhise_1_1_processor)  

### Derived Classes

- `hise::MasterEffectProcessor`  
- `hise::MonophonicEffectProcessor`  
- `hise::VoiceEffectProcessor`  


## Class methods

### renderAllChains

```cpp
void renderAllChains(int startSample, int numSamples)
```

Renders all chains (envelopes & voicestart are rendered monophonically.   

### prepareToPlay

```cpp
void prepareToPlay(double sampleRate, int samplesPerBlock) override
```

You have to override this method, since almost every effect needs the samplerate anyway.   

### getColour

```cpp
Colour getColour() const override
```

Overwrite this method if you want a special colour.  
This colour will be used in the debug console and in the editor.   

### hasTail

```cpp
bool hasTail() const =0
```

Overwrite this method if the effect has a tail (produces sound if no input is active   

### isTailingOff

```cpp
bool isTailingOff() const
```

Checks if the effect is tailing off. This simply returns the calculated value, but the EffectChain overwrites this.   

### renderNextBlock

```cpp
void renderNextBlock(AudioSampleBuffer &buffer, int startSample, int numSamples)=0
```

Renders the next block and applies the effect to the buffer.   
