---
keywords: lerp<typename IndexType> 
summary:  My Funky Summary
author:   Christoph Hart
---

A index type with linear interpolation  
This index type builts upon the [float_index](/scriptnode/snex_api/index_types/float_index/) type and offers inbuilt interpolation when accessing a floating point array!  

```cpp
span<float, 4> data = { 10.0f, 11.0f, 12.0f, 13.0f };

// First we define an integer index with the wrap logic and a matching upper limit
// to the span above
using WrapIndex = index::wrapped<4, true>;

// Now we take this index and transform it to an unscaled float index
// using double precision as input
using FloatIndex = index::unscaled<double, WrapIndex>;

// We can now wrap the float index into the lerp template and get linear interpolation.
using Interpolator = index::lerp<FloatIndex>;

Interpolator idx(5.5); // the wrap logic transforms this to 1.5

// Calculate the interpolated value (11.5f)
auto x = data[idx];

// Compile error! The interpolation will calculate a value so you can't reference it!
auto& x = data[idx];
```

  

## Class methods

### lerp

```cpp
 lerp(Type initValue=Type(0))
```

Create a interpolator with the given value.   

### operator=

```cpp
lerp & operator=(Type v)
```

Assign a new value to the interpolator.   
