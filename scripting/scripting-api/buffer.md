---
keywords: Buffer
summary:  A buffer of floating point data
author:   Christoph Hart
modified: 08.06.2024
---
  
This class is a one dimensional array with a fixed type of a single precision float number which is usually used to represent an audio signal. 

Multi channel signals are usually represented with an Array of Buffer objects. Besides the usage as an audio signal there are some API methods which will just leverage the fixed type structure for a better communication with the C++ layer (eg. you can get all slider pack values as a Buffer object using [SliderPack.getDataAsBuffer()](/scripting/scripting-api/scriptsliderpack#getdataasbuffer)) or shovel value arrays over to the GPU as OpenGL [uniform data](/scripting/scripting-api/scriptshader#setuniformdata).

The type strictness allows some significant performance increases which makes it a suitable candidate for audio processing (of course HiseScript is still orders of magnitudes slower than C++ / SNEX, but if you need to do some stuff in here, it's the fastest option). 

Its prime use case and reason of existence (doing realtime audio stuff in HiseScript) is deprecated with the introduction of scriptnode, but it still remains a versatile and powerful tool for any kind of non-performance critical audio processing.

### Creating Buffers

In order to create a buffer object, you can either use the inbuilt function `Buffer.create(numSamples)` or use `Buffer.referTo()` to make a reference to another buffer.

```javascript
// Create a buffer with 512 samples
const var b = Buffer.create(512);;

// Create a buffer that references the first buffer
// with the offset 128 and the length 80
const var b2 = Buffer.referTo(b, 128, 80);

Console.print(b.length); // 512
Console.print(b2.length); // 80

// set the value of the first sample in the second buffer
b2[0] = 90.0;

// since we're referencing the original buffer, this is
// the 128th element of the first buffer
Console.print(b[128]); // 90.0
```

You can also create buffers from an audio file like this:

```javascript
// Load the example assets from the snippet browser
FileSystem.loadExampleAssets();

// grab whatever asset is first
const var firstAudioFile = Engine.loadAudioFilesIntoPool()[0];

// load it using the reference string format
const var af = FileSystem.fromReferenceString(firstAudioFile, FileSystem.AudioFiles);

// should be 1
Console.assertTrue(af.isFile());

const var channels = af.loadAsAudioFile();

Console.print(channels[0].length);
```

### Working with Buffers

The Buffer object type is deeply integrated into HiseScript and can be considered as native object type next to an Array or a JSON object. In fact, the interaction with a Buffer object is almost indistinguishable from working with a stock JS-Array:

```javascript
const var b = Buffer.create(128);

// element assignment and access using the []-operator
b[0] = 0.5;
Console.print(b[0]);

// buffer length using the length property (same as Array.length)
Console.print(b.length);

// range based for loop iterates all samples in the buffer
for(s in b)
{
	s = Math.random();
}

// call special methods on the Buffer object
b.detectPitch(44100.0);
```

#### Vectorized math operations

In addition to this Array-like interface, the Buffer object contains some handy overload operators that will perform basic math operations. Since the datatype is a single precision float that is tightly packed, we can leverage SIMD instructions to heavily speed up those calculations (in fact we're reaching almost C++ level performance with those as the overhead of calling the methods is neglible for larger buffers)

```javascript
b * 2.0			    // Applies the gain factor to all samples in the buffer
b * otherBuffer	    // Multiplies the values of the buffers and store them into 'b'
b + 2.0			    // adds 2.0f to all samples
b + otherBuffer		// adds the other buffer
```	

Important: Because all operations are inplace, these statements are aquivalent:

```javascript
(b = b * 2.0) == (b *= 2.0) == (b * 2.0);
```

For copying and filling buffers, the '<<' and '>>' operators are used.

```javascript
0.5 >> b			// fills the buffer with 0.5f (shovels 0.5f into the buffer...)
b << 0.5			// same as 0.5f >> b
a >> b				// copies the buffer a into b;
a << b				// copies the buffer b into a;
```

### Special functions

The Buffer object has a few special methods that are related to audio processing (eg. find the magnitude / peak of a Buffer or detect the pitch). One thing that is a bit different to most other functions in HISE is that they have a varying amount of parameters so you can call it with an optional range limitation for the offset and number of samples.

```javascript
// Create a Buffer and fill it with a ramp for clarity
const var b = Buffer.create(8);

b[0] = 0.0; b[1] = 1.0; b[2] = 2.0; b[3] = 3.0; 
b[4] = 4.0; b[5] = 5.0; b[6] = 6.0; b[7] = 7.0; 

// Let's take the getMagnitude() function as an example
// but this is the same for any method with a startSample
// and numSamples parameter

// without parameters, it checks the whole buffer
Console.print(b.getMagnitude()); // 8

// A single parameter sets the offset so that it
// checks from this offset to the end
Console.print(b.getMagnitude(4)); // 8, same value, bad example...

// Using two parameters defines a range where to look
// in this case from [2 ... 3]
Console.print(b.getMagnitude(2, 2)); // 3
```


