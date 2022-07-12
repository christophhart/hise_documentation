Call this function if the user has resolved the error. It will then check for other errors and call the error callback again if there is another error pending.

> The errors are prioritized automatically, so eg. an invalid license error will always supercede a missing samples error or a audio driver initialisation issue