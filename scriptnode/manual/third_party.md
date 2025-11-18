---
keywords: Third Party C++ Nodes
summary:  Adding custom C++ nodes to your project
author:   Christoph Hart
modified: 14.06.2022
---
  
If you [compile your scriptnode dsp networks as dll](/working-with-hise/menu-reference/export#compile-dsp-networks-as-dll) it will create a C++ file for each network. HISE will then load this code as dynamic library and allows you to use the C++ version of your networks inside HISE (either as "frozen" DspNetwork inside a network or as [HardcodedFX module](/hise-modules/effects/list/hardcoded-master-fx)) in the module tree. 

When you export your plugin, it will include these files into the C++ compilation so that you don't need to bother about shipping the dynamic library file alongside your plugin / app.

But it doesn't stop there. This system can also be used to add any arbitrary C++ DSP code as node and even lets you run HISE under your IDE's debugger (VS or XCode) while developing the C++ nodes.

In order to do so, you just need to add your files in the subfolder `DspNetworks/ThirdParty`, and then use the same workflow like when you're exporting DspNetworks. When creating your nodes, you need to follow these rules:

- One file per node. The file must have the file extension `.h` and must be named exactly like the node that it represents.
- Any additional source code must be placed in the `src` subfolder of the directory (and then included by the node file).
- If you want to use your nodes inside a DspNetwork that you want to compile, you have to define a `node_properties.json` file that contains information required by the code generator.
- The file must define a class inside the `project` namespace with the same name as the node and the class must be a valid node class.

The API looks very similar to the classes that you use inside a `snex_node`. But the most simplest way to follow these rules is to use the tool function in the file menu **Create Third Party C++ node template**. This will create a file with your desired name and adds a C++ class that compiles as node with all required functions and metadata informations (it will also create the node_properties.json file with some default flags). From there you can start implementing your DSP algorithms (or write the glue code to embed third party algorithms from the `src` subfolder).

> If you're on Windows, you can choose to close HISE after the dll compilation and run the dll in the VS debugger by double clicking on the solution file. On macOS it's a little bit more complicated because you have to select HISE as debug executable in the Xcode scheme editor.

### Communication

There are multiple ways to handle the data communication between HISE and the C++ node:

| Connection | Data type | Direction | realtime safe |
| --- | --- | --- | --- |
| Parameter callbacks | single `double` value | HISE -> node | yes |
| Complex Data objects | `float` buffers | bidirectional | yes |
| Global Cable value | single `double` value | bidirectional | yes |
| Global Cable data | arbitrary JSON object | bidirectional | no |

#### Parameter callbacks

Parameter callbacks are functions that are defined in your node and can be called with a single double precision float value. They are templated with the parameter index to avoid branching and are always called through this function of your node:

```javascript
template <int P> void setParameter(double value);
```

You need to register them with the expected range, ID and callback in the `createParameters()` callback:

```cpp
void createParameters(ParameterDataList& data)
{
  {
    parameter::data p("MyParameter", { 0.0, 1.0 });
    registerCallback<0>(p);
    p.setDefaultValue(0.5);
    data.add(std::move(p));
  }
}
```

They will show up as knobs on the module interface and can be connected like any other parameter of a HISE module using the `parameterId` property (or via `Module.setAttribute(Module.ParameterId, value)` scripting method). Note that the direction of communication is only from HISE to your node - you cannot use this way for sending values back to HISE.

#### Complex Data objects

You can define the number of complex data objects for each node and then use the data that comes from HISE. This allows you to use

- Tables
- SliderPacks
- AudioFiles
- FilterCoefficients
- RingBuffers

in your node. In order to use any of these objects, just change the value of the constant expression in your node class:

```cpp
static constexpr int NumTables = 0;
static constexpr int NumSliderPacks = 2;
static constexpr int NumAudioFiles = 0;
static constexpr int NumFilters = 0;
static constexpr int NumDisplayBuffers = 0;
```

In this example the node will now tell HISE to create two SliderPacks and expose it to the node. This is done through the `setExternalData` callback which you can use to fetch the data. 

```cpp
ExternalData ed;
block sp1;
block sp2;

void setExternalData(const ExternalData& data, int index)
{
  // Copy a reference to the entire external data object
  ed = data;

  // Create references to the actual data
  if(index == 0)
    data.referBlockTo(sp1, 0);

  if (index == 1)
    data.referBlockTo(sp2, 0);
}
```

Now if you want to use the data somewhere in your node (eg. the process callbacks), it's recommended to use the data mutex so that there is no concurrent access between threads:

```cpp
if(auto sl = DataTryReadLock(ed))
{
  // first slider value
  const float value = sp1[0];

  // send a message to flash the third slider
  ed.setDisplayedValue(3.0);
}
```

#### Global cable

If you need true bidirectional communication with an arbitrary data type, you can use the global cable system to receive and send any data from and to HISE. Note that within the global cable system there are two separate communication lines:

- realtime safe single double value
- non-realtime safe JSON data communication

For a reference on how to use this, please take a look at the global_cable node reference.  

### UI Thread considerations

The `juce::Timer` (or `juce::AsyncUpdater`) class require the message thread to run and be available and that is not the case in the DLL build, because the code in there runs in a different process and cannot access the UI thread of the main application. So if you try to use the JUCE classes for asynchronous communication on the UI thread, it will not work. This problem is only occuring when running the node inside HISE - as soon as you compile the plugin, the UI thread is available again.

So for the development phase I've added a small helper class that runs a thread inside the DLL process and basically replicates the functionality of the `juce::Timer` and `juce::AsyncUpdater` class. All you need to do is to subclass from these classes instead of the JUCE ones and it will take care of everything:

```cpp
template <int NV> struct my_node: public juce::Timer // nope
{

};

template <int NV> struct my_node: public hise::DllTimer // this will work
{
    my_node()
    {
        startTimer(30);
    }

    void timerCallback() override { ... }
};

template <int NV> struct my_node: public juce::AsyncUpdater // nope
{

};

template <int NV> struct my_node: public hise::DllAsyncUpdater // this will work
{
    my_node()
    {
        
    }

    void process(ProcessData<2>& data) {
        triggerAsyncUpdate();
    }

    void handleAsyncUpdate() override {}
};
```

These are drop in replacements of the JUCE classes. Once you compile the plugin, it will automatically resort to using the default JUCE classes with the proper UI thread model.
