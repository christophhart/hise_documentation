During some operations (eg. sample map loading, user preset switch etc), the audio thread is suspended and the loading thread is performing the operation. During that time, this method will return true so you can check if the current function is part of a heavyweight task.

