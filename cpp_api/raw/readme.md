---
keywords: namespace raw
summary:  A high-level API for creating projects using C++
author:   Christoph Hart
---

This namespace acts as entry point to the HISE code base and provides helper classes and convenient functions to tuck away the complexity of the full code base. The goal of this namespace is to provide access to the HISE code base for the majority of use cases that are required by people using HISE for their projects. The full API class list of all HISE classes can be overwhelming, so this is supposed to be a starting point for people diving into the C++ side of HISE.  
Also, all classes in this API are guaranteed to meet stricter API standards regarding documentation and backwards compatibility. Important: until further notice, this is a very WIP namespace so you can expect it to change radically until the dust has settled.  
In this namespace you get:  
- a convenient place to look for magic numbers: the IDs namespace  
- a class that helps building / changing the module architecture of HISE: the [Builder](/cpp_api/raw/classhise_1_1raw_1_1_builder)  
- a wrapper around a module that gets notified when a parameter changes: the [Reference](/cpp_api/raw/classhise_1_1raw_1_1_reference)  
- a class that loads embedded data: the [Pool](/cpp_api/raw/classhise_1_1raw_1_1_pool)  
- a class that handles the (asynchronous) and lockfree execution of larger tasks: the [TaskAfterSuspension](/cpp_api/raw/classhise_1_1raw_1_1_task_after_suspension).   
  
