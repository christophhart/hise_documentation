---
keywords: ErrorHandler
summary:  Object for implementing a custom error handling
author:   Christoph Hart
modified: 12.07.2022
---
  
There are a few error messages in HISE that will usually show up a dark overlay with a (questionably worded) message and some buttons to react on it. Unfortunately, the amount of customizability is pretty low so this acts as a good way to detect whether a plugin was made with HISE or not.

Now you can completely deactivate the overlay using the preprocessor `HISE_DEACTIVATE_OVERLAY` when compiling your plugin, but this is just shooting the messenger and will leave your user completely in the dark why there is no audio coming out of the plugin or which sample was not found.

This object offers a better solution with a customizable error callback that will be executed whenever the overlay would appear, so you can react on it in a way that is more consistent with your UI.

In order to use it, just call [`Engine.createErrorHandler()`](/scripting/scripting-api/engine#createerrorhandler) and then use its methods to customize the way you want to react to HISE error events.

> Be aware that as soon as you create this object, it will deactivate the standard overlay automatically (so it's basically the same as compiling with `HISE_DEACTIVATE_OVERLAY`).