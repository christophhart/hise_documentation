---
keywords: span<class T, int Size, int Alignment> 
summary:  My Funky Summary
author:   Christoph Hart
---

A fixed-size array type for SNEX.  
The span type is an iteratable compile-time array. The elements can be accessed using the []-operator or via a range-based for loop.  
In order to prevent unsafe out-of-bounds memory access, the []-operator access can either take a literal integer index (that will be compiled-time checked against the boundaries), or a index subtype with a defined out-of-bounds behaviour (wrapping, clamping, etc).   

## Static functions

### as

```cpp
 Type & as(T *ptr)
```

Morphs any pointer of the data type into this type.   

## Class methods

### toSimd

```cpp
span< span< float, 4 >, Size/4 > & toSimd()
```

Converts this float span into a SSE span with 4 float elements at once. This checks at compile time whether the span can be converted.   

### begin

```cpp
T * begin() const
```

This method allows a lean range-based for loop syntax:  

```cpp
span<float, 512> data;

for(auto& s: data)
    s = 0.5f;
```

  

### size

```cpp
 int size() const
```

Returns the number of elements in this span.   
