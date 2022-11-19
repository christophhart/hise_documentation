This function is very similar to the normal addListener function, but you can supply a millisecond value that will be used to delay the function.

> Be aware that the execution of this function is not queued, so whenever you send a new message in the interval, it will just reset the timer and discard the pending function call.