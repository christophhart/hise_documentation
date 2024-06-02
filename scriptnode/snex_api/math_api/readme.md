---
keywords: SNEX math functions
summary:  My Funky Summary
author:   Christoph Hart
---

This module lists all math functions available in SNEX. It offers the exact same functions as the Math class in HiseScript and in SNEX you will use the exact same syntax so the sin function can be called with Math.sin().  
However this is just syntactic sugar and you can call it also with hmath::sin().  

```cpp
// All functions are available for single precision
float x = Math.sin((float)Math.PI * 2.9f);

// and double precision floating point numbers
double x = Math.sin(Math.PI * 2.9);

// Watch out when mixing types with multiple arguments, this won't compile because
// it can't resolve the function overload!
auto nope = Math.max(2.0f, 1.5);
```

  
SNEX math functions