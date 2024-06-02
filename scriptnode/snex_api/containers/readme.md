---
keywords: SNEX container types
summary:  My Funky Summary
author:   Christoph Hart
---

The classes in this module are templated container types that can be used to create multi-dimensional data structures. If you don't know C++, here's a quick rundown of the template concept:  
A template is a class declaration which contains data members and functions but unlike a "real" class, the template class can be created with multiple types (or integer arguments). This makes a template more like a "class generator" than a class.  
The advantage of templates is that they are created at compile time with the types you specify so you can abstract the logic away from the underlying types. This makes it a perfect tool for the creation of container types which should be agnostic of their element type.  
All the classes in this group are templated containers with T indicating the element type.  

```cpp
// Using the span template to declare a float array with 4 elements:
span<float, 4> data = { 1, 2, 3, 4 };

// You can define aliases for later usage
using StereoFrame = span<float, 2>;

// You can also nest templates to create multidimensional structures.
span<StereoFrame, 512> stereoBuffer;
```

  
SNEX container types