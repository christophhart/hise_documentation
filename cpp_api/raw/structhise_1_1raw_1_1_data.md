---
keywords: raw::Data
summary:   C++ API Class reference
author:   Christoph Hart
---

The base class for all data connections used in the raw namespace.  
This is a powerful and generic class which is the glue between the data of a [Processor](/cpp_api/hise/classhise_1_1_processor) and your raw project.  
- templated data type for best performance without overhead  
- ready made accessor-classes for the most important data in HISE ([Processor](/cpp_api/hise/classhise_1_1_processor) attributes, bypass states, samplemaps, table data)  
  
In order to use it, pass one of the subclasses as template argument to one of the more high-level classes ([UIConnection](/cpp_api/raw/classhise_1_1raw_1_1_u_i_connection) and [Storage](/cpp_api/raw/classhise_1_1raw_1_1_storage)) and they will synchronize with the actual data in your [Processor](/cpp_api/hise/classhise_1_1_processor) tree.  
You can also write your own handler classes - just make sure it has two functions that match the SaveFunction and LoadFunction prototype   
typenameDataTypeDataType
## Class methods
