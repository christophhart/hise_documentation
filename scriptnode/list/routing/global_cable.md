---
keywords: global_cable
summary:  Send a double precision float value anywhere to HISE
author:   Christoph Hart
modified: 30.05.2024
parameters: 
- Value: Changing this parameter will send the value through the global cable to all connected targets.
---

This node lets you send / receive a value anywhere in HISE to be picked up by different targets:

- scripting callbacks using [GlobalCable.registerCallback()](/scripting/scripting-api/globalcable#registercallback)
- other `global_cable` nodes in the same network (or other networks for cross-network communication)
- external C++ nodes (see below)

In order to use it, just create this node and register it to a unique ID. Then you can either send values by using the **Value** parameter or receive values by dragging the modulation output to another target.

### Using global cables in C++

You can now also use the global cable system in your external C++ node to send values back to HISE. This is especially useful for displaying parameters on your UI (eg. the gain reduction of your custom compressor or internal level metering). In order to do so, you will need to subclass your C++ node from a special template interface that will contain the hash codes of the IDs of the cables. This is best done by the function **Tools -> Create C++ code for global cables**. This will collect all currently available global cable IDs and create a C++ code that you can paste into your C++ file:

```javascript
// Use this enum to refer to the cables, eg. this->setGlobalCableValue<GlobalCables::Funky_cable>(0.4)
enum class GlobalCables
{
	Funky_cable = 0,
	Another_funky_cable = 1
};
// Subclass your node from this
using cable_manager_t = routing::global_cable_cpp_manager<SN_GLOBAL_CABLE(623777931),
                                                          SN_GLOBAL_CABLE(1331638607)>;
```

Now all you need to do is to paste this before your node and subclass it:

```javascript
template <int NV> struct cpp_cable_test: public data::base,
									     public cable_manager_t // <= add this bad boy
{
	
```

then you can send any value through the cable using the magic numbers defined in the enum as template argument, eg in the parameter callback:

```javascript
template <int P> void setParameter(double v)
{
	if(P == 0)
	{
		this->setGlobalCableValue<GlobalCables::Funky_cable>(v);
	}
}
```

> Note that calling this method is realtime safe and you can call it from anywhere in your processing code. It might be a bit more efficient to limit the calls to once per block though as there might be a few listeners that will execute their callback synchronously.

### Sending / Receiving arbitrary data through a global cable in C++

You can now also send any kind of `juce::var` data back to HISE and register a callback to receive the data in your script. In order to do so, just use the method `sendDataToGlobalCable` instead of `setGlobalCableValue`:

```cpp
juce::var x("someString");
juce::var x2(new VariantBuffer(512));
juce::var x3(JSON::fromString("{noice: 1234}"));

this->sendDataToGlobalCable<GlobalCables::Funky_cable>(x1);
this->sendDataToGlobalCable<GlobalCables::Funky_cable>(x2);
this->sendDataToGlobalCable<GlobalCables::Another_funky_cable>(x3);
```

Note that the data is being cloned for each target & is not realtime safe so this rather for heavyweight tasks like sending analysis data back to the UI.

in order to register a C++ lambda to receive a `juce::var` data object when you call the scripting method `GlobalCable.sendData()`, use this method either in the constructor of your node or the prepare callback:

```cpp
registerDataCallback<GlobalCables::Funky_cable>([](const var& funky)
{
	if(auto b = funky.getBuffer())
	{
	    // do something with the buffer content
	}
	if(funky.isString())
	{
		auto text = funky.toString();

		// do something with the string
	}
});
```




