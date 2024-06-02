---
keywords: ProcessData<int C> 
summary:  My Funky Summary
author:   Christoph Hart
---

A data structure that contains the processing context for a DSP algorithm.  
It has a compile-time channel amount to that you can use channel loop iterators without performance overhead (because it will be most likely unrolled).  
This class is extremely lightweight to fit into 32 bytes and contains:  
- a pointer to the audio data  
- a pointer to the event data  
- the number of samples / events  
- a reset flag that can be used to control the execution of polyphonic voices  
  
It also provides a few tools to make the code as lean as possible by providing access to its data using one of the three toXXXData functions:  
- toChannelData() for channel based processing  
- toFrameData() that creates a [FrameProcessor](/scriptnode/snex_api/helper_classes/frameprocessor/) object for frame based processing  
- toEventData() that creates a dyn<HiseEvent> so you can process the events   
  

## Static functions

### getNumChannels

```cpp
 int getNumChannels()
```

Gets the number of channels.   

## Class methods

### ProcessData

```cpp
 ProcessData(float **d, int numSamples_, int numChannels_=NumChannels)
```

Creates a ProcessDataFix object from the given data pointer.   

### begin

```cpp
ChannelPtr * begin() const
```

Allows iteration over the channel data.  
The [ChannelPtr](/scriptnode/snex_api/data_structures/channelptr/) return type can be passed into the toChannelData() method in order to create a dyn<float> object that can be used to iterate over the channel's sample data:  

```cpp
ProcessData<2> data;

for(auto& ch: data)
{
    // Pass the `ch` iterator into the `toChannelData` function
    // in order to iterator over the float samples...
    for(float& s: data.toChannelData(ch))
    {
        s *= 0.5f;
    }
}
```

  

### end

```cpp
ChannelPtr * end() const
```

see begin().   

### operator[]

```cpp
dyn< float > operator[](int channelIndex)
```

creates a iteratable channel object for the .   

### toFrameData

```cpp
FrameProcessor< C > toFrameData()
```

Generates a frame processor that allows frame-based iteration over all given channels.   

### getNumSamples

```cpp
int getNumSamples() const
```

Returns the amount of samples for this processing block. This value is guaranteed to be less than the blockSize value passed into the last prepare()  

### toChannelData

```cpp
block toChannelData(const ChannelPtr &channelStart) const
```

Converts a [ChannelPtr](/scriptnode/snex_api/data_structures/channelptr/) to a block.   

### toEventData

```cpp
dyn< HiseEvent > toEventData() const
```

Creates a buffer of HiseEvents for the given chunk.   
