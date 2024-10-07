This function will register a callable object (either a inline function, a function or a broadcaster) to the cable. It expects a single argument that will contain the value of the cable. You can either register it as synchronous callback or as asynchronous callback (by using either the `SyncNotification` or `AsyncNotification` constants). The latter will filter out repetitions and will be called on the UI thread at the next timer interval:

![](images/custom/cablecallback.svg)

Be aware that if you've set a range then the value that will be passed into the callback will be converted from the normalised 0...1 range to whatever range you need.

If you're using a synchronous callback then the function you pass in must be an inline function as this might be executed on the audio thread and normal functions are not realtime safe.
