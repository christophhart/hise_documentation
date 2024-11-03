---
keywords: raw::UIConnection
summary:   C++ API Class reference
author:   Christoph Hart
---

This class offers a bidirectional connection between [Data](/cpp_api/raw/structhise_1_1raw_1_1_data) and its UI representation.  
In order to use it, just add one of these as Member variable in your interface class:  

```cpp
class MyInterface
{
    MyInterface(hise::MainController* mc):
        s("My Funky Slider"),
        connection(&s, mc, "Sine 1", hise::SineSynth::SaturationAmount)
    {
        addAndMakeVisible(s);
        s.setRange(0.0, 1.0, 0.01);
    }

    juce::Slider s;
    raw::UIConnection::Slider connection;
}
```


```cpp
If you just want a more generic, but unidirectional connection (Processor->UI) take a look at the Reference class.
```

  
