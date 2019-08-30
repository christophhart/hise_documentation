---
keywords: jit
summary:  A JIT compiled node using SNEX
author:   Christoph Hart
modified: 29.08.2019
---
  
This node can be used to write customized DSP algorithms. It uses the [SNEX](/scriptnode/manual/snex) language and some predefined callbacks.

### Callbacks

The SNEX code will be compiled to functions that are executed on certain events (similar to HiseScript). There are four callback types:

#### The `prepare()` callback

```cpp
void prepare(double samplerate, int blocksize, int numChannels)
```

The `prepare` callback will be executed when the node is initialised or when some of the processing specifications (samplerate, blocksize or channel amount) change. You should use this function to setup your variables according to the specifications - calculate frequency coefficients etc.

#### The `reset()` callback.

```cpp
void reset()
```

The `reset()` callback will be called whenever the processing pipeline needs to be resetted. This may occur under various circumstances and should be as fast as possible (unlike the prepare callback which happens very rarely):

- when a voice is started
- when the node is unbypassed
- after the `prepare` function was called

You should use this function to clear any state variable (eg. last values or counters for oscillators).

#### The `setX` callbacks

```cpp
void setX(double newValue)
```

Whenever you want to change a parameter from the outside, you can write a function that starts with `set`and it will automatically create a scriptnode parameter with the same name (so `setGain` will create a parameter called **Gain**)

#### The `processX` callbacks

These callbacks will be executed to calculate the audio signal. There are three different callbacks available, each one will be more suitable than the others for certain types of applications.

```cpp
// channel processing: one block of audio data at the time
void processChannel(block input, int numChannel)

// Monophonic (or stateless multichannel) processing: One sample in, one sample out
float processSample(float input)

// frame-based processing: all samples of every channel at the time
void processFrame(block frame)
```

The decision which callback you want to use depends on the algorithm: for stereo-effects, the interleaved processing of the `processFrame` callback is most suitable, but is slower than the `processSample` or the `processChannel` callbacks, which should be preferred for monophonic signal calculation.

> Be aware that if the `core.jit` node is wrapped in a `framex_block` node, the `processFrame` node will yield the best performance because it directly maps to the functionality of the surrounding container.

The `core.jit` node will pick the best function for the given context: block based processing or frame-based processing by wrapping it into a `framex_block` container node.

**Block based processing**: This is the default and means that the stream of audio samples is divided into chunks with a fixed length. In this case the functions are chosen in this order:

1. `processChannel()`
2. `processFrame()`
3. `processSample()`

The `processFrame` method will be always be prioritised over the `processSample` method because once you define it, it's highly likely that you want to perform some kind of interleaved algorithm.

The fastest operation mode is of course using the `processChannel` method with a `for` iterator, however using the `processFrame` method should be equally fast as using a `framex_block` method.

**Frame based processing**: Some DSP algorithms need to have all samples of each channel available at the same time. The simplest example would be a stereo-to mono converter, which just add the channels:

```cpp
l = l + r;
r = l;
```

This is known as interleaved (or frame-based) processing and can be achieved by wrapping any node into a `framex_block` container. In this case, the callbacks will be chosen in this order:

1. `processFrame()`
2. `processSample()`
3. `processChannel()`

Be aware that while the `processChannel` function is still used as last resort, it yields the worst performance, since it will create a buffer with the length 1 for each sample in each channel and then call the function.

The `core.jit` node will show which `processX` function is currently in use (along with the CPU usage), so you can compare the performances.