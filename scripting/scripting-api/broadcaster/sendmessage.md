This sends a message to all registered (and enabled) listeners. The first argument must be either

1. An array, if the listener functions have multiple parameters. Then it will distribute the array elements to the function parameters.
2. A single value if the registered functions and the default values have only one parameter. 

The second parameter will control whether the message is being sent out synchronously or if it should be deferred and called a little bit later. This might be helpful if you want to coallascate calls to sendMessage so that it doesn't hammer the queue.

Be aware that it only sends the message to the listeners if any of the values is different than before.

> Note: this function is deprecated and replaced by two other functions, `sendAsyncMessage()` and `sendSyncMessage()`. The rationale behind this is that the boolean parameter wasn't clear enough to indicate whether a message is being sent out synchronously or not (`true` means sync or async?). So using this message will write an error message to the console but the functionality keeps working so you can migrate it more easily.

