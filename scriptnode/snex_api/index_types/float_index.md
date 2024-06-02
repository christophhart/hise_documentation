---
keywords: float_index<typename FloatType, typename IntegerIndexType, bool IsNormalised> 
summary:  My Funky Summary
author:   Christoph Hart
---

A second level index type which takes a integer index type and allows floating point number indexing.  
There are two modes that this index can operate in: unscaled and scaled. The latter allows indexing using a normalized value between 0...1 which is very common in DSP applications.  

```cpp
using MyIntegerIndex = index::clamped<512, false>;
using MyFloatIndex = index::scaled<double, MyIntegerIndex>;

span<float, 512> data;

MyFloatIndex idx(0.5);

data[0.5] = 90.0f; // data[256] = 90.0f
```

  

## Class methods

### float_index

```cpp
 float_index(FloatType initValue=0)
```

Creates a float_index with the given value.   

### getAlpha

```cpp
FloatType getAlpha(int limit) const
```

This will return the fractional part of the index. You won't need to use this manually.   

### operator=

```cpp
float_index & operator=(FloatType v_)
```

Assigns a new value to the index.   

### operator+

```cpp
float_index operator+(FloatType t) const
```

Adds the given value to the index.   

### operator-

```cpp
float_index operator-(FloatType t) const
```

Subtracts the index.   

### operator FloatType

```cpp
 operator FloatType() const
```

Cast the index to the native float type. You can only do this with a fixed boundary type.   
