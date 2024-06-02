---
keywords: ChannelPtr
summary:  My Funky Summary
author:   Christoph Hart
---

The ChannelPtr is just a lightweight wrapper around the start of the channel data of a [ProcessData](/scriptnode/snex_api/data_structures/processdata/) object.  
It is returned by the iterator and can be used to create a [dyn<float>](/scriptnode/snex_api/containers/dyn/) object to iterate over the samples:  

```cpp
void process(ProcessDataFix<2>& data)
{
    for(auto & ch: data)
    {
        // pass the `ch` variable to the toChannelData() call and it will create
        // a proper dyn<float> (using the sample amount from the data object).
        for(auto& s: data.toChannelData(ch))
            s *= 0.5f;
    }
}
```

  
