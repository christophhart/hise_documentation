During development it's highly recommended to use human readable GLSL text files in the script repository, however there are a few use cases where you need to dynamically load new shaders:

1. If you ship new shaders with expansions
2. If you want a monolithic patch (for pasting the HiseSnippet to the forum).

This method can be used to give the shader a base64 encoded string that was created with the [`ScriptShader.toBase64()`](/scripting/scripting-api/scriptshader#tobase64) method.