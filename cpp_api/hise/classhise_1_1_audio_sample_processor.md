---
keywords: AudioSampleProcessor
summary:   C++ API Class reference
author:   Christoph Hart
---

A [Processor](/cpp_api/hise/classhise_1_1_processor) that uses an audio sample.  
If you want to use a audio sample from the pool, subclass your [Processor](/cpp_api/hise/classhise_1_1_processor) from this and you will get some nice tools:  
- automatic memory management (samples are reference counted and released on destruction)  
- import / export sample properties in the RestorableObject methods  
- handle the thumbnail cache  
- designed to work with an AudioSampleBufferComponent  
  
In order to use this class with a AudioSampleBufferComponent, just follow these steps:  
- Create a AudioSampleBufferComponent and use the method getCache() in the constructor.  
- Set the reference to the AudioSampleBuffer with AudioSampleBufferComponent::setAudioSampleBuffer();  
- Add the AudioSampleBuffer as ChangeListener (and remove it in the destructor!)  
- Add an AreaListener to the AudioSampleBufferComponent and call [setRange()](/cpp_api/hise/classhise_1_1_audio_sample_processor#setrange) and setLoadedFile in the rangeChanged() callback   
  
## Class Hierarchy

### Base Classes

- `hise::PoolBase::Listener`  

## Class methods

### ~AudioSampleProcessor

```cpp
 ~AudioSampleProcessor()
```

Automatically releases the sample in the pool.   

### saveToValueTree

```cpp
void saveToValueTree(ValueTree &v) const
```

Call this method within your exportAsValueTree method to store the sample settings.   

### restoreFromValueTree

```cpp
void restoreFromValueTree(const ValueTree &v)
```

Call this method within your [restoreFromValueTree()](/cpp_api/hise/classhise_1_1_audio_sample_processor#restorefromvaluetree) method to load the sample settings.   

### setLoadedFile

```cpp
void setLoadedFile(const String &fileName, bool loadThisFile=false, bool forceReload=false)
```

This loads the file from disk (or from the pool, if existing and loadThisFile is false.   

### setRange

```cpp
void setRange(Range< int > newSampleRange)
```

Sets the sample range that should be used in the plugin.  
This is called automatically if a AudioSampleBufferComponent is set up correctly.   

### getRange

```cpp
Range< int > getRange() const
```

Returns the range of the sample.   

### getBuffer

```cpp
const AudioSampleBuffer * getBuffer()
```

Returns a const pointer to the audio sample buffer.  
The pointer references a object from a AudioSamplePool and should be valid as long as the pool is not cleared.   

### getFileName

```cpp
String getFileName() const
```

Returns the filename that was loaded.  
It is possible that the file does not exist on your system: If you restore a pool completely from a ValueTree, it still uses the absolute filename as identification.   

### rangeUpdated

```cpp
void rangeUpdated()
```

Overwrite this method and do whatever needs to be done when the selected range changes.   

### newFileLoaded

```cpp
void newFileLoaded()
```

Overwrite this method and do whatever needs to be done when a new file is loaded.  
You don't need to call [setLoadedFile()](/cpp_api/hise/classhise_1_1_audio_sample_processor#setloadedfile), but if you got some internal stuff going on, this is the place.   
