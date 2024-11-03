---
keywords: SafeFunctionCall
summary:   C++ API Class reference
author:   Christoph Hart
---

A wrapper around a lambda that will get executed with the given processor as argument.  
This is used by the suspension system to execute functions asynchronously.  
Since the time between creating this and the actual execution can be long and all kinds of things might have happened in the mean time, it will check if the processor still exists and automatically cancels the function if the processor got deleted.  
You will never have to create one of these objects manually, the only thing you need to know is the Function prototype, since all lambdas you pass in have to meet its structure:  

```cpp
auto f = [](hise::Processor* p)
{
    bool success = p->doSomething();

    if(success)
        return SafeFunctionCall::OK;
    else
        return SafeFunctionCall::cancelled;
};
```

  

## Public types
### enum Status
| Name | Description |
| -- | ------ |
| `OK` | The default return type. |
| `cancelled` | Indicates if there is a abnormal event that prevents the successfull execution. For example for a sample preload task, switching the sample map in the mean time can cause this since the sample doesn't need to be loaded anymore. |
| `processorWasDeleted` | If a [Processor](/cpp_api/hise/classhise_1_1_processor) was deleted between the creation and execution of this method, this will be the return type. Normally you don't have to use it at all, since this will be taken care of automatically. |
| `nullPointerCall` | this is used when you try to call a SafeFunction call with a null pointer (the effective result is the same as processorDeleted, but it might give you a clue for debugging). |

## Class methods
