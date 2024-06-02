---
keywords: snex_shaper<class ShaperType> 
summary:  My Funky Summary
author:   Christoph Hart
---

A SNEX node that can be used to implement waveshaping algorithms.  
If you're writing a waveshaper that transforms the audio signal, you can use this class. It gives you a special callback and also a display that shows the waveshaper function.  
Be aware that if you export this node to C++, it will use this class as template to create a full node, but in SNEX you don't need to supply the ShaperType template parameter.   
The default code template forwards all rendering functions to a single getSample(float input) method. As long as you your algorithm is stateless, you can just implement the logic there, otherwise you have to adapt the boilerplate process calls accordingly:  

```cpp
// this will be called for every sample in every channel
float getSample(float input)
{
    return input;
}

// these callbacks just forward to the method above
template <typename T> void process(T& data)
{
    for(auto ch: data)
    {
        for(auto& s: data.toChannelData(ch))
        {
            s = getSample(s);
        }
    }
}

template <typename T> void processFrame(T& data)
{
    for(auto& s: data)
        s = getSample(s);
}
```

  

## Class methods

### prepare

```cpp
void prepare(PrepareSpecs ps)
```

[snex_node::prepare()](/scriptnode/snex_api/node_types/snex_node/)  
  

### reset

```cpp
void reset()
```

[snex_node::reset()](/scriptnode/snex_api/node_types/snex_node/)  
  

### process

```cpp
template <typename ProcessDataType> void process(ProcessDataType &data)
```

[snex_node::process](/scriptnode/snex_api/node_types/snex_node/)  
  

### processFrame

```cpp
template <typename FrameDataType> void processFrame(FrameDataType &data)
```

[snex_node::processFrame](/scriptnode/snex_api/node_types/snex_node/)  
  

### setExternalData

```cpp
void setExternalData(const ExternalData &d, int index)
```

snex_node::setExternalData().   
  

### setParameter

```cpp
template <int P> void setParameter(double v)
```

snex_node::setParameter<P>()   
  
