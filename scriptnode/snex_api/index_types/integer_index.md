---
keywords: integer_index<typename LT, bool CheckOnAssign> 
summary:  My Funky Summary
author:   Christoph Hart
---

The base class for integer indexes.  
keyword: index::integer, index: 0  

This class can be used to safely access an array with a defined out-of-bounds behaviour:- wrapped: wrap indexes over the upper limit into the valid range (=modulo operator)  
- clamped: clamps to the highest / lowest valid index:  
- zeroed: when the index is invalid, a zero value will be used  
- looped: like wrapped, but negative indexes get wrapped around too  
- unsafe: zero overhead, unsafe array access  
  
In order to use this class, just create an instance of it with the integer index you try to access, then pass this object into the []-operator of the span<T> or dyn<T> container:  

```cpp
// pass the index into the constructor
index::wrapped<0, false> idx(6);

// create a dummy data array
span<float, 5> data = {1, 2, 3, 4, 5 };

// using this index will wrap around the data bounds.
auto x = data[idx]; // => 6
```

  
You can supply a compile-time boundary as template argument that will lead to optimized code (but then it's your responsibility to make sure you call it with suitable container types).  
An integer index class can be further refined into a [float_index](/scriptnode/snex_api/index_types/float_index/) in order to use (normalised) float numbers as index.   

## Class methods

### integer_index

```cpp
 integer_index(Type initValue=Type(0))
```

Creates an index with the given init value.   

### operator=

```cpp
integer_index & operator=(Type v)
```

Assigns the given integer value to this object.   

### operator++

```cpp
integer_index & operator++()
```

The index type supports preincrementation so you can use it in a loop.   

### operator++

```cpp
int operator++(int)
```

Postinc will always return a checked index because it will return an integer value. Use preincrementation if possible.   

### operator--

```cpp
integer_index & operator--()
```

Predecrement operator with a bound check.   

### operator+

```cpp
integer_index operator+(int delta) const
```

Returns a copy of that index type with the delta value added to its value.   

### operator-

```cpp
integer_index operator-(int delta) const
```

Returns a copy of that index type with the delta subtracted from its value.   

### next

```cpp
bool next() const
```

increments the index and returns true if it's within the bounds. This only works with unsafe and compile-time sized index types.   

### operator int

```cpp
 operator int() const
```

Cast operator to an integer value. This only works with compile-time sized indexes.   

### setLoopRange

```cpp
void setLoopRange(int start, int end)
```

Sets the loop range (only valid for index::looped)   
