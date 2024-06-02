---
keywords: PrepareSpecs
summary:  My Funky Summary
author:   Christoph Hart
---

A data structure containing the processing details for the context.  
This is being passed into the prepare() method of each node and can be used to setup the internals.   

## Class members
#### sampleRate
```cpp
 double sampleRate = 0.0
```
the sample rate. This value might be modified if the node is being used in an oversampled context.   
#### blockSize
```cpp
 int blockSize = 0
```
The maximum samples that one block will contain. It is not guaranteed that the number will always be that amount, but you can assume that it never exceeds this number.   
#### numChannels
```cpp
 int numChannels = 0
```
The number of channels for the signal.   
#### voiceIndex
```cpp
 PolyHandler* voiceIndex = nullptr
```
A pointer to the voice index (see [PolyData](/scriptnode/snex_api/containers/polydata/) template).   

## Class methods

### operator bool

```cpp
 operator bool() const
```

The bool operator is overwritten so you can use it inside a if condition. It will return true if the specification is valid.   
