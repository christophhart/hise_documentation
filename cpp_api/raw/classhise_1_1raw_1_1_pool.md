---
keywords: raw::Pool
summary:   C++ API Class reference
author:   Christoph Hart
---

A object that handles the embedded resources (audio files, images and samplemaps).   
## Class Hierarchy

### Base Classes

- [`hise::ControlledObject`](/cpp_api/hise/classhise_1_1_controlled_object)  

## Class methods

### allowLoadingOfUnusedResources

```cpp
void allowLoadingOfUnusedResources()
```

By default, this object assumes that the data is already loaded (if not, it fails with an assertion). Call this to allow the Pool object to actually load the items from the embedded data.   

### loadAudioFile

```cpp
AudioSampleBuffer loadAudioFile(const String &id)
```

Loads an audio file into a AudioSampleBuffer.   

### loadImage

```cpp
Image loadImage(const String &id)
```

Loads an Image from the given ID.   

### getListOfEmbeddedResources

```cpp
StringArray getListOfEmbeddedResources(FileHandlerBase::SubDirectories directory, bool useExpansionPool=false)
```

Returns a list of the references to every embedded resource of the given type.   
