This function should be called as often as possible to figure out whether the thread needs to be cancelled, which might happen because of two reasons:

1. You have called `sendAbortSignal()`
2. This object is being deleted (either because your app is terminated or the script is recompiled inside HISE)

If you're doing things in a loop it's highly advised to call it once per loop and the time between two calls to `shouldAbort()` must never exceed the thread timeout (in fact the execution will time out if you fail to do so which is a safe check that should prevent you from forgetting to call this).