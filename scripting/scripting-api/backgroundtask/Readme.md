---
keywords: BackgroundTask
summary:  A script object that can perform heavyweight tasks on a separate thread
author:   Christoph Hart
modified: 03.11.2021
---
  
Every callback that you define in HiseScript is being serialised and called on a single thread in order to avoid synchronisation issues and race conditions (a situation where two threads try to access the same resource). There is a priority system in place which makes sure that certain tasks cannot block other tasks (so eg. a control callback will be executed before a paint routine and if you recompile a script it will discard all pending callbacks for this script processor).

> A notable exception is of course the realtime callbacks which are executed directly in the audio thread but since you should not allocate anything in there anyways, any possible race conditions between the scripting thread and the audio thread are not super critical.

However there are a few occasions where this model creates unwanted side effects: a really complex task that will take a lot of time might clog this system and prevent user interaction. In order to solve this, you can use this object to offload a heavyweight function to a separate thread while the scripting thread remains idle and responsive.

> Be aware that at this point it is a highly experimental function and I would not advise using this without extensive testing of your use case as there might be many subtle issues that come from the multithreading of the function executions.

The prime use case for this object is when you are working with samples to create custom workflow tools.

In order to use it, create an object with [`Engine.createBackgroundTask()`](/scripting/scripting-api/engine#createbackgroundtask), and then give it a function to execute with `callOnBackgroundThread()`. 


