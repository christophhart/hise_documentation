---
keywords: raw::TaskAfterSuspension
summary:   C++ API Class reference
author:   Christoph Hart
---

A wrapper around a task that is supposed to take a while and is not allowed to be executed simultaneously to the audio rendering.  
Some tasks that interfere with the audio rendering (eg. adding / removing modules, swapping samples) have to make sure that the audio thread is not running in parallel. Therefore HISE has a "suspended task" system which kills all voices, waits until the voices have gracefully faded out (including FX tails for reverb effects), then suspends the audio rendering until the task has been completed on a background thread with a minimal amount of locking.  
In HISE, this system is used for each one of these events:  
- Compilation of scripts  
- Hot swapping of samplemaps  
- Loading User Presets  
- Adding / Removing Modules  
  
You can see this system in action if you do one of these things in HISE while playing notes.  
In order to use that system from your own C++ code, just create a lambda that follows the [hise::SafeFunctionCall](/cpp_api/hise/structhise_1_1_safe_function_call) definition and pass it to the [call()](/cpp_api/raw/classhise_1_1raw_1_1_task_after_suspension#call) function:  

```cpp
auto f = [mySampleMap](hise::Processor* p)
{
    // You know it's a sampler, so no need for a dynamic_cast
    auto sampler = static_cast<hise::ModulatorSampler*>(p);

    // Call whatever you need to do.
    // (Actually this call makes no sense, since it's already wrapped in a suspended execution)
    sampler->loadSampleMap(mySampleMap);

    // The lambda definition requires you to return this.
    return hise::SafeFunctionCall::OK;
};

TaskAfterSuspension::call(mc, f);
```

  
This makes sure that the lambda will be executed on the given thread after all voices are killed. However this doesn't necessarily mean asynchronous execution: if you're calling this on the target thread and all voices are already killed, it will be executed synchronously. You can check this with the ReturnType enum passed back from the [call()](/cpp_api/raw/classhise_1_1raw_1_1_task_after_suspension#call) method. This reduces the debugging headaches of asynchronous callbacks wherever possible.   

## Public types
### enum ReturnType
| Name | Description |
| -- | ------ |
| `ExecutedSynchronously` | If the audio was already suspended and the method was called from the same thread as the desired target thread, this will be returned from the call. |
| `DeferredToThread` | If the audio needs to be suspended and / or the method was called from another thread than the target thread, this will be returned in order to indicate that the function was not yet executed. |
