If you call this method, it will look in the pending downloads and if there is a download that matches both URL and parameters, it will cancel the remaining download and delete the file.

> It is guaranteed that the callback is executed at the end of a download (even if you abort it manually like this), but the `success` property will be false in this case.