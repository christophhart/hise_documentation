---
keywords: DataReadLock
summary:  My Funky Summary
author:   Christoph Hart
---

Use this in order to lock the access to the external data.   

## Class methods

### DataReadLock

```cpp
 DataReadLock(snex::ExternalData &d, bool tryRead=false)
```

Create a data lock from the external data object.   

### operator bool

```cpp
 operator bool() const
```

Returns true if the lock could be acquired (if tryRead is false, then this will always return true).  
You can use this for a scoped based approach to data synchronisation:  

```cpp
if(auto lock = DataReadLock(ed, true))
{
    doSomethingWhileLocked();
}
```

  
