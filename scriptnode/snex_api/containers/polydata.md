---
keywords: PolyData<typename T, int NumVoices> 
summary:  My Funky Summary
author:   Christoph Hart
---

A data structure that handles polyphonic voice data.  
In order to use it, create it (just like a span) and then use the range-based iterator to fetch the data.  
Depending on the context of the loop, it will either iterate over all values or just pick the one for the currently active voice. In order for this to work, you need to call prepare with a valid voice index pointer.  
The element type T can be any class with a default constructor. For the sake of optimizations, NumVoices has to be a number of two at all times. It's recommended to use either 1 or the preprocessor definition NUM_POLYPHONIC_VOICES, which offers a global way to set the max voice count per project.  
If the PolyData class is being used with NumVoices=1, the compiler should be able to remove the overhead of the class completely so you don't get any performance penalty by making your classes capable of handling polyphony!  

```cpp
// A SNEX node is usually templated with the polyphony voice count
// so you can also forward it to every PolyData member of your class
template <int NV> struct my_class
{
    // Wrap the data that defines a voice state into a PolyData
    // container.
    // Note: you can use more complex types than just a primitive
    // integer and for performance reasons (cache alignment) it's
    // actually recommended to create one data structure that holds
    // the entire state.
    PolyData<float, NV> data;

    void prepare(PrepareSpecs ps)
    {
        // All you need to do is to forward the prepare
        // call to *every* PolyData container that you
        // want to use.
        data.prepare(ps);
    }

    // This is your render callback where you want to use the state
    template <typename PD> void process(PD& pd)
    {
        // the get() method will point to the current voice
        // (so if the 8th voice is rendered, it would be a the same
        // as a `data[7]` access for a standard container)
        auto& current_data = data.get();

        // Do whatever you want with the current voice state
        current_data = Math.fmod(current_data + 0.1f, 1.0f);
    }

    // If you want to change the data through a parameter callback
    // it's recommended to use the iterator.
    template <int P> void setParameter(double value)
    {
        // the iterator will either loop through
        // all data elements if it's outside a
        // voice rendering (most likely caused by a UI callback)
        // or just one element of the active voice (most likely used
        // by modulation inside the audio rendering).

        for(auto& d: data)
            d = (float)value;
    }

    // The reset() callback will either be called after initialisation
    // or when a voice is started. Again, using the iterator makes sure that
    // it resets all values at initialisation and just the current voice
    // at voice start (just like the parameter callback).
    void reset()
    {
        for(auto& d: data)
            d = 0.0f;
    }
};

// This will create a polyphonic version of your node with the
// global HISE polyphonic voice count (defaults to 256).
using poly_class = my_class<NUM_POLYPHONIC_VOICES>;

// a monophonic version of your node. Note that this will produce
// the exact same machine code as if you would just use a normal
// integer variable so there is absolutely no CPU overhead!
using mono_class = my_class<1>;
```

  

## Class methods

### prepare

```cpp
void prepare(const PrepareSpecs &sp)
```

Call this method with a [PrepareSpecs](/scriptnode/snex_api/data_structures/preparespecs/) objet and it will setup the handling of the polyphony.  
It will use the int pointer in the [PrepareSpecs](/scriptnode/snex_api/data_structures/preparespecs/) object to figure out whether the voice rendering is enabled / active and what data slot to use.  
There are multiple states of the value at the sp.voiceIndex address:  
-1: the voice rendering is currently inactive (because it's called by the message thread or during initialization. Using the for loop now will result in an iteration over all elements.  
nullptr: the voice rendering is disabled. The class will act like PolyData<T, 1>, (however it will still take the memory of NUM_VOICES elements).  
any number: the voice rendering is active and the for-loop will just iterate once with the given number as offset from the data start.   

### get

```cpp
T & get() const
```

If you know that you're inside a rendering context, you can use this function instead of the for-loop syntax. Be aware that the performance will be the same, it's just a bit less to type.   

### begin

```cpp
T * begin() const
```

Allows range-based for loops to work inside the voice context.   

### getVoiceIndexForDebugging

```cpp
String getVoiceIndexForDebugging() const
```

Just used during development.   

### getFirst

```cpp
const T & getFirst() const
```

Returns a reference to the first data. This can be used for UI purposes.   
