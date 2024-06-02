---
keywords: dyn<class T> 
summary:  My Funky Summary
author:   Christoph Hart
---

The dyn template class is an array that is only referencing memory that is owned by something else.  
It can be freely resized, redirected and allows a fast and safe iteration and []-operator access using the index type.  
Maybe the most important usage of this class is a dyn<float> which has an alias called block.   

## Class methods

### size

```cpp
int size() const noexcept
```

Returns the size of the array. Be aware that this is not a compile time constant.   

### referTo

```cpp
template <typename OtherContainer> void referTo(OtherContainer &t, int newSize=-1, int offset=0)
```

Refers to a given container.   

### referToRawData

```cpp
void referToRawData(T *newData, int newSize, int offset=0)
```

Refers to a raw data pointer.   
