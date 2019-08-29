---
keywords: AdditionalSourceCode
author:   Christoph Hart
summary:  Explains the AdditionalSourceCode Folder
index:    01
---


If you are using custom C++ modules, this folder will be the place for every C++ code you add to your project. HISE expects two files in this directory: 

- a CopyProtection.cpp file 
- a AdditionalSourceCode.cpp file
 
These two files will be copied into the temporary build directory and compiled as separate compile units. You should include all other files in the directory so if you're using more files than these two, just include them in these files. Be aware that you need to use the relative path to the source folder of the temporary project (so the file `AdditionalSourceCode.h` in the same directory needs to be included like this:

```cpp
/** AdditionalSourceCode.cpp

	(this file is copied into Builds/Source)
*/

// This will not compile because the file will be copied to another location
//#include "AdditionalSourceCode.h"

#include "../../AdditionalSourceCode/AdditionalSourceCode.h"
```
