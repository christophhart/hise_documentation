---
keywords: snex_node
summary:  My Funky Summary
author:   Christoph Hart
---

A general purpose node with all callbacks.  
This node is the most comprehensive one and offers the complete set of callbacks. Depending on your use case, it might be easier to use one of the more specialised callbacks.   

## Class methods

### prepare

```cpp
void prepare(PrepareSpecs ps)
```

This function will be called whenever the processing specifications change. You can use this to setup your processing.   

### handleHiseEvent

```cpp
void handleHiseEvent(HiseEvent &e)
```

This callback will be called whenever a HiseEvent (=MIDI event on steroids) should be executed. Note that the execution of HiseEvents depends on the surrounding context.   

### reset

```cpp
void reset()
```

This callback will be called whenever the processing pipeline needs to be resetted (eg. after unbypassing an effect or starting a polyphonic voice).   

### process

```cpp
template <int C> void process(ProcessData< C > &d)
```

This callback will be executed periodically in the audio thread and should contain your DSP code.   

### processFrame

```cpp
template <typename FrameDataType> void processFrame(FrameDataType &data)
```

This callback will be executed if the node is inside a frame processing context.   

### setExternalData

```cpp
void setExternalData(const ExternalData &d, int index)
```

This function will be called whenever a change occurs in the external data.  
During the execution of this function the write access to the external data is locked and it is highly recommended to use a [DataReadLock](/scriptnode/snex_api/helper_classes/datareadlock/) object whenever you access the external data in the other callbacks.  

```cpp
struct my_class
{
    ExternalData localCopy;

    void process(ProcessData<2>& data)
    {
        DataReadLock sl(localCopy);

        if(!localCopy.isEmpty() && sl)
        {
            block b;
            localCopy.referBlockTo(b, 0);
                
            b[10]

        }
    }

    void setExternalData(const ExternalData& d, int index)
    {
        // This is unnecessary because it's already locked
        // but that's basically what happens here...
        // DataWriteLock sl(d);

        localCopy = d;
    }
```

  

### setParameter

```cpp
template <int P> void setParameter(double v)
```

This function will be called whenever a parameter changes. It has the parameter index as template argument so you can branch at compile time.  
This function might be called from an audio rate modulation so make sure that it's performant enough to handle its use cases. Also if you are using the snex::Types::PolyData<T, NumVoices> container for polyphonic states make sure to use its iterator to handle both cases (changing all voices vs. modulating the current voice).   
