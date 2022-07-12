This method will register a callback that will be notified whenever an error event occurs. You can use this as starting point to setup your custom error handling that fits into your UI.

Be aware that this function is called only with the most important error and if you clear the error while an error with a lower priority is in the queue, it will fire that callback again.
