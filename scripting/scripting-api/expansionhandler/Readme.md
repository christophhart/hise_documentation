---
keywords: ExpansionHandler
summary:  A wrapper object around the global expansion manager
author:   Christoph Hart
modified: 11.03.2021
---
  
The `ExansionHandler` class will offer functions to manage expansions. In order to use it, create one with the function [`Engine.createExpansionHandler()`](/scripting/scripting-api/engine#createexpansionhandler).

> In earlier versions of HISE, this class was globally available (like the `Message` or `Server` class). However for stability reasons the lifetime had to be limited so it's required to create an object in the `onInit` callback.

