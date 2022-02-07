---
keywords: ScriptShader
summary:  A OpenGL shader object that can be rendered on a ScriptPanel
author:   Christoph Hart
modified: 31.05.2021
---
  
A shader is a small program that will run natively on the GPU and allows very complex animation / textures. There is a whole universe of different shaders available.

In order to use it, create a shader object using [`Content.createShader(fileName)`](/scripting/scripting-api/content#createshader) and then render the shader on any ScriptPanel using [`Graphics.applyShader()`](/scripting/scripting-api/graphics#applyshader).

There are a few limitations to the shader support in HISE:

- no texture input
- only fragment shader support

and obviously the support of different shaders depend on the hardware on the end user system.

### How to use existing shaders in HISE

Check out [shadertoy.com](https://www.shadertoy.com) for a vast gallery of shaders. Unfortunately there is not a 100% clean API so you will need to adjust the shader code a bit in order to run inside HISE (I tried to make it as compatible as possible so the amount of tweaking is the absolute minimum).  
Below you can see the **Hello world** of shaders on shadertoy.com:

```cpp
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = vec4(col,1.0);
}
```

In order to use this shader in HISE you will have to do two steps:

1. modify the main function signature
2. multiply the output colour with `pixelAlpha`

If you do these two steps, you will end up with this code:

```cpp
void main() // must be named `main()` without parameters
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = pixelAlpha * vec4(col,1.0);
}
```

> As soon as there is an image or something in the `iChannel` boxes on the shadertoy website, the shader will not work, so make sure that you only use shaders without external textures.

### Learn to write shaders

If you want to do more than pasting shaders from shadertoy.com and look at it in awe, you will need to learn how to write shaders. OpenGL shaders use a specific language called `GLSL` which is similar to C / C++. There are lots of useful resources on the web, 

> I can recommend [this](https://www.youtube.com/watch?v=u5HAYVHsasc) Youtube channel. Start with the basic introduction and watch the time pass by as you click the next video over and over again.