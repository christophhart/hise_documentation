---
keywords: FrameProcessor<int NumChannels> 
summary:  My Funky Summary
author:   Christoph Hart
---

A simple helper class that provides interleaved iteration over a multichannel signal.  
Some processing algorithms require interleaved processing so that you have all samples for all channels available.  
The most simple example would be a MS-Decoder  

```cpp
// Mid-Side processing

float m = (l + r) * 0.5f;
float s = (l - r) * 0.5f;

l = m + stereo_amount * s;
r = m - stereo_amount * s;
```

  
In scriptnode / SNEX, the signal data is not interleaved by default, which means that the data for each channel is stored consecutively in memory. This has the advantage that most operations that do not require frame processing can use SIMD operations.  
However if your algorithm requires frame based processing, you can use this class which tucks away most of the interleaving boilerplate code.  

```cpp
// This is the callback function required by SNEX / scriptnode
void process(ProcessData<2>& data)
{
    // Create a FrameProcessor object from the data
    auto frame = data.toFrameData();

    // Iterate through the frames and call the other function below
    while(frame.next())
        processFrame(frame);
}

// This callback will be called whenever the processing environment
// is using frame-based processing
void processFrame(span<float, 2>& frame)
{
    auto& l = frame[0];
    auto& r = frame[1];

    float m = (l + r) * 0.5f;
    float s = (l - r) * 0.5f;

    l = m + stereo_amount * s;
    r = m - stereo_amount * s;
}
```

  
Since the function will be most likely inlined by the compiler, there is no performance overhead, and you don't need to implement the algorithm twice for compatibility with frame-based calls.  
Note the implicit cast to the span type in the function call.   
  

## Class methods

### operator[]

```cpp
template <typename IndexType> const float & operator[](IndexType index) const
```

forwards the []-operator to the span type. This is templated so you can use the index types of the span class for wrapped / clamped / unsafe access.  

```cpp
auto f = processData.toFrameData();

span<float, 2>::wrapped index;
index = 1259; // => will be wrapped to '1'
f[index] = 12.0f;
```

  

### next

```cpp
int next()
```

Loads the next frame and returns false if the end of the signal is reached.  
You can use this as condition of a while loop in order to iterate over the entire signal:  

```cpp
while(f.next())
{
    // do something with this frame...
    f[0] = 2.0f;
}
```

  
