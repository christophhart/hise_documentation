---
keywords: ProjectHandler
summary:   C++ API Class reference
author:   Christoph Hart
---

This class handles the file management inside HISE.  
It assumes a working directory and supplies correct paths for all OSes relative to the project root folder.   
## Class Hierarchy

### Base Classes

- `hise::FileHandlerBase`  

## Class methods

### isRedirected

```cpp
bool isRedirected(ProjectHandler::SubDirectories dir) const
```

Checks if a directory is redirected.   

### isActive

```cpp
bool isActive() const
```

Checks if the ProjectHandler is active (if a directory is set).   

### createRSAKey

```cpp
void createRSAKey() const
```

Fills the given array with the contents of the specified directory. If 'sortByTime' is true, the most recent files will be the first items in the list.   
