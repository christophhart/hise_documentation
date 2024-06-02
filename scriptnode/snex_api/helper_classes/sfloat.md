---
keywords: sfloat
summary:  My Funky Summary
author:   Christoph Hart
---

A single precision smoothed floating point value.   

## Class methods

### reset

```cpp
void reset()
```

Stops the ramping and sets the value to the target.   

### set

```cpp
void set(float newTargetValue)
```

Sets a new target value and resets the ramp position to the beginning.   

### isActive

```cpp
bool isActive() const
```

Returns true if the value is being smoothed at the moment.   

### advance

```cpp
float advance()
```

Returns the currently smoothed value and calculates the next ramp value.   

### get

```cpp
float get() const
```

Returns the current value.   

### prepare

```cpp
void prepare(double samplerate, double timeInMilliseconds)
```

Setup the processing. The ramp time will be calculated based on the samplerate.   
