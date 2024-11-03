---
keywords: HiseEventBuffer
summary:   C++ API Class reference
author:   Christoph Hart
---

The buffer type for the [HiseEvent](/cpp_api/hise/classhise_1_1_hise_event).   

## Class methods

### clear

```cpp
void clear()
```

Clears the buffer.   

### isEmpty

```cpp
bool isEmpty() const noexcept
```

checks if the buffer is empty.   

### getNumUsed

```cpp
int getNumUsed() const
```

Returns the number of events in this buffer.   

### begin

```cpp
HiseEvent * begin() const noexcept
```

compatibility for standard C++ type iterators.   

### end

```cpp
HiseEvent * end() const noexcept
```

compatibility for standard C++ type iterators.   
