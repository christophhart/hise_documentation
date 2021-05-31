This function can be used to pass around data from the HiseScript world to GLSL. It just needs two steps:

1. Define the variable in your GLSL code (with the uniform keyword).
2. Call this method.

So this is the example code for the GLSL part:

```cpp
// GLSL side

uniform float myValue;
uniform vec3 myColour;
uniform float myBuffer[128];

void main()
{
    fragColor = pixelAlpha * vec4(myColour, myValue);
}
```

From the script you need to call this:

```javascript
// Javascript side:

const var shader = Content.createShader("MyShader");

// a single number will be parsed as float
shader.setUniformData("myValue", 0.8);

// an array with three elements will be interpreted as vec3 type.
shader.setUniformData("myColour", [0.0, 1.0, 0.0]);

const var buffer = Buffer.create(128);

// A Buffer object (a float array) will be passed on to the GPU as read only
shader.setUniformData("myBuffer", buffer);
```

Make sure that the types match (or the behaviour will be undefined). Also be aware that you will need to pass in the buffer data when it changes (the GPU doesn't reference the actual buffer data but takes a copy when you call this method).