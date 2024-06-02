---
keywords: ExternalData
summary:  My Funky Summary
author:   Christoph Hart
---

HISE has a few complex inbuilt data structures that are connected to various UI elements (Tables, SliderPacks) etc.  
The access to those classes and their underlying data is handled by this class.  
This class is used as parameter in the setExternalData callback, which will be called whenever something changes.  
It's usually good practice to keep a copy of the last ExternalData around in your class to refer blocks to it or synchronize access using a DataReadLock or - more unusual - DataWriteLock.   

## Public types
### enum DataType
| Name | Description |
| -- | ------ |
| `Table` | the data of a Table object (a look up table with 512 float numbers) |
| `SliderPack` | the data of a SliderPack (a resizable array of float numbers) |
| `AudioFile` | a multichannel audio file with some metadata (loop points, samplerate). |
| `FilterCoefficients` | filter coefficients that can be used for displaying purposes |
| `DisplayBuffer` | a FIFO buffer that can be used for analysing / visualisations |

## Class members
#### dataType
```cpp
 DataType dataType = DataType::numDataTypes
```
the data type of the target data.   
#### numSamples
```cpp
 int numSamples = 0
```
The number of samples (= the length of the float array)   
#### numChannels
```cpp
 int numChannels = 0
```
The number of audio channels (usually 1 if not an audio file).   
#### isXYZAudioData
```cpp
 int isXYZAudioData = 0
```
Specifies whether the data points to a multichannel sample set.   
#### data
```cpp
 void* data = nullptr
```
An untyped pointer to the actual data.   
#### obj
```cpp
 hise::ComplexDataUIBase* obj = nullptr
```
A pointer to the complex data object that is used for eg. UI updates.   
#### sampleRate
```cpp
 double sampleRate = 0.0
```
the samplerate (if the data is an audio file).   

## Class methods

### ExternalData

```cpp
template <typename T>  ExternalData(T &other, DataType type)
```

Creates an external data object from a constant value class.   

### referBlockTo

```cpp
void referBlockTo(block &b, int channelIndex) const
```

assigns a block container to the data type. If the external data is pointing to an audio file you can specify the channelIndex.   

### setDisplayedValue

```cpp
void setDisplayedValue(double valueToDisplay)
```

This will send a update message to the UI so you can implement eg. a playback position.   

### isEmpty

```cpp
bool isEmpty() const
```

Returns true if there is no data associated with this object.   

### isXYZ

```cpp
bool isXYZ() const
```

If the ExternalData object points to audio data this specifies whether it's a multisample set or a single sample.   
