The size of the display buffer is not static and depends on the source signal. If your visualisation depends on a fixed buffer length, you can use this method to automatically rescale the buffer content.  
This will create a copy of the buffer with the given sample amount and use a sensible default algorithm to do the resampling.

> If you want to pass the buffer to a shader as uniform make sure to resample it to be below 1024.