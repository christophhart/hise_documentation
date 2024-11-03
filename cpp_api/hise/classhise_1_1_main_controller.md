---
keywords: MainController
summary:   C++ API Class reference
author:   Christoph Hart
---

The grand central station of HISE.  
The MainController class represents the instance of a HISE project and can be used to access quasi-global data / methods.  
It is divided into multiple sub-classes which encapsulate different logic in order to bring some order into the enormous task of handling everything:  
- the SampleManager subclass handles pooling / preloading of samples  
- the MacroManager (which itself has multiple subclasses) handle all automation / MIDI controller tasks  
- the UserPresetHandler takes care of the loading / browsing of user presets.  
  
Implementations of this class are also derived by the juce::AudioProcessor and some other helper classes. Check out the hise::FrontendProcessor class for actual usage in a C++ HISE project.  
Most classes just want a reference to the MainController instance. If you want to use it in your C++ classes, I recommend subclassing it from [ControlledObject](/cpp_api/hise/classhise_1_1_controlled_object), which exists for this sole purpose.   
## Class Hierarchy

### Base Classes

- `hise::GlobalScriptCompileBroadcaster`  
- `hise::OverlayMessageBroadcaster`  
- `hise::ThreadWithQuasiModalProgressWindow::Holder`  
- `Timer`  

## Class methods

### compileAllScripts

```cpp
void compileAllScripts()
```

Compiles all scripts in the main synth chain   

### allNotesOff

```cpp
void allNotesOff(bool resetSoftBypassState=false)
```

Call this if you want all voices to stop.   

### beginParameterChangeGesture

```cpp
void beginParameterChangeGesture(int index)
```

same as AudioProcessor::beginParameterGesture().   

### endParameterChangeGesture

```cpp
void endParameterChangeGesture(int index)
```

same as AudioProcessor::beginParameterGesture().   

### setPluginParameter

```cpp
void setPluginParameter(int index, float newValue)
```

sets the plugin parameter to the new Value.   

### getUptime

```cpp
double getUptime() const noexcept
```

Returns the uptime in seconds.   

### getBpm

```cpp
double getBpm() const noexcept
```

returns the tempo as bpm.   

### skin

```cpp
void skin(Component &c)
```

skins the given component (applies the global look and feel to it).   

### addTempoListener

```cpp
void addTempoListener(TempoListener *t)
```

adds a [TempoListener](/cpp_api/hise/classhise_1_1_tempo_listener) to the main controller that will receive a callback whenever the host changes the tempo.   

### removeTempoListener

```cpp
void removeTempoListener(TempoListener *t)
```

removes a [TempoListener](/cpp_api/hise/classhise_1_1_tempo_listener).   

### getMainSynthChain

```cpp
ModulatorSynthChain * getMainSynthChain()=0
```

this must be overwritten by the derived class and return the master synth chain.   

### getCpuUsage

```cpp
float getCpuUsage() const
```

Returns the time that the plugin spends in its processBlock method.   

### getNumActiveVoices

```cpp
int getNumActiveVoices() const
```

Returns the amount of playing voices.   

### isInitialised

```cpp
bool isInitialised() const noexcept
```

This returns always true after the processor was initialised.   

### setGlobalPitchFactor

```cpp
void setGlobalPitchFactor(double pitchFactorInSemiTones)
```

This sets the global pitch factor.   

### getGlobalPitchFactor

```cpp
double getGlobalPitchFactor() const
```

This returns the global pitch factor.  
Use this in your startVoice method and multiplicate it with your angleDelta.   

### getGlobalPitchFactorSemiTones

```cpp
double getGlobalPitchFactorSemiTones() const
```

This returns the global pitch factor as semitones.  
This can be used for displaying / saving purposes.   
