---
keywords: Types::dyn
summary:   C++ API Class reference
author:   Christoph Hart
---

The dyn template class is an array that is only referencing memory that is owned by something else.  
It can be freely resized, redirected and allows a fast and safe iteration and []-operator access using the index type.  
Maybe the most important usage of this class is a dyn<float> which has an alias called block.   
class T
## Class methods

### operator*=

```cpp
dyn< float > & operator*=(float s)
```

Multiplies a dyn<float> container with a scalar value. This is a quick way of multiplying an entire block with a single float number.  

```cpp
template <typename ProcessDataType> void process(ProcessDataType& data)
{
    // Create a dyn<float> reference to the left channel
    auto b = data[0];
     
    // multiply the entire block with 0.5f (-6dB)
    b *= 0.5f;
}
```

  

### operator*=

```cpp
dyn< float > & operator*=(const dyn< float > &other)
```

Multiplies a dyn<float> container with another block (of the same size).  

```cpp
template <typename ProcessDataType> void process(ProcessDataType& data)
{
    // Create a dyn<float> reference to the left channel
    auto l = data[0];
    auto r = data[1];
     
    // multiply the entire block with 0.5f (-6dB)
    l *= r;
}
```

  

### operator+=

```cpp
dyn< float > & operator+=(float s)
```

Adds a constant value to a dyn<float> container.  

```cpp
template <typename ProcessDataType> void process(ProcessDataType& data)
{
    // Create a dyn<float> reference to the left channel
    auto b = data[0];
     
    // add a DC Offset with -12dB
    b += 0.125f;
}
```

  

### operator+=

```cpp
dyn< float > & operator+=(const dyn< float > &other)
```

Adds a dyn<float> container to another block (of the same size).  

```cpp
template <typename ProcessDataType> void process(ProcessDataType& data)
{
    // Create a dyn<float> reference to the left channel
    auto l = data[0];
    auto r = data[1];
     
    // mix the left channel with the right channel
    l += r;
}
```

  

### begin

```cpp
T * begin() const
```

This allows a range-based loop iterator to go through each element of the dyn array.  
You will never use this method directly, but use the range-based for loop syntax from C++:  

```cpp
dyn<float> d1;
span<float, 8> data = { 0.0f, 1.0f, 2.0f, 3.0f,
                         4.0f, 5.0f, 6.0f, 7.0f };

// let d1 point to the entire data block
d1.referTo(data, data.size(), 0);
 
// loop through all elements and add two.
// Note the &-qualifier which tells the loop
// to grab a reference so you can actually modify
// the element!
for(auto& element: d1)
{
    element += 2.0f;
}
 
// If you omit the &-qualifier, it will create a
// local copy of the element and not write it back
// to the array.
for(auto element: d1)
{
    element += 200.0f;
}
 
auto mustBeTrue = data[0] == 2.0f; // not 202.0f!
```

  

### size

```cpp
int size() const noexcept
```

Returns the size of the array. Be aware that this is not a compile time constant.   

### referTo

```cpp
void referTo(OtherContainer &t, int newSize=-1, int offset=0)
```

Refers to a given container. A dyn container does not store its own memory, but can be used to reference other data containers (either another dyn or a span with the same type:  

```cpp
// Create a block of float data
span<float, 8> data = { 0.0f, 1.0f, 2.0f, 3.0f,
                        4.0f, 5.0f, 6.0f, 7.0f };
                         
// Create two dyn<float> containers
dyn<float> d1;
dyn<float> d2;

// let d1 point to the entire data block
d1.referTo(data, 8, 0);
 
// let d2 point to the three elements starting at index 2
d2.referTo(data, 3, 2);
 
auto same1 = d1[0] == data[0]; // true
auto same2 = d2[0] == data[2]; // true
```

  
The second argument is the length of the dyn (so if you call `size()` later this value will be returned). The third parameter acts as offset so you can create slices of another container. Obviously, offset + newSize must be smaller or equal to the size of the original container.   
