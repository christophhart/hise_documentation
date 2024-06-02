---
keywords: ModValue
summary:  My Funky Summary
author:   Christoph Hart
---

A small helper class for usage within a wrap::mod node.   

## Class methods

### getChangedValue

```cpp
bool getChangedValue(double &d)
```

Return true if that changed flag was set. Use this in the handleModulation callback.   

### setModValue

```cpp
void setModValue(double newValue)
```

Set the modulation value and the changed flag. This is best used in a periodic context, where you don't care about the change flag.   

### setModValueIfChanged

```cpp
bool setModValueIfChanged(double newValue)
```

Set the modulation value and change flag only if the value has changed.  
If the modulation that you are using is not periodically, you can use this in order to prevent unnecessary calls to the modulation targets.   
