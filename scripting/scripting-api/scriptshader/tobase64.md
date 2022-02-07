If you want to use dynamic shaders, you can call this method to get a compressed version of the current shader code which you then can pass into [`ScriptShader.fromBase64()`](/scripting/scripting-api/scriptshader#frombase64)

> The most efficient workflow is to use `Console.print()` with this method, then copy & paste the output as string literal.

Note that this string will include all files that are imported in the main shader using `#include` so it's guaranteed to work without relying on any dependency.