This sends a message to all registered (and enabled) listeners. The first argument must be either

1. An array, if the listener functions have multiple parameters. Then it will distribute the array elements to the function parameters.
2. A single value if the registered functions and the default values have only one parameter. 

The second parameter will control whether the message is being sent out synchronously or if it should be deferred and called a little bit later. This might be helpful if you want to coallascate calls to sendMessage so that it doesn't hammer the queue.

Be aware that it only sends the message to the listeners if any of the values is different than before.