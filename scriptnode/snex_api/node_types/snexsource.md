---
keywords: SnexSource
summary:  My Funky Summary
author:   Christoph Hart
---


## Class methods

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
