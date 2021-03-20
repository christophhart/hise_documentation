This method will start a download in the background and periodically executes the callback that can be used to track the progress.

The `target` parameter has to be a valid [`File`](/scripting/scripting-api/file) object that points to a file (not a directory).

> Be aware that this file will be deleted and overwritten!

Unlike the other methods, the function you pass in as `callback` must not have any parameters. Instead you can query the state of the download via the `this.data` object, which always points to the current download.  
The object has these properties:

| Property | Type | Description |
| == | = | ====== |
| `finished` | bool | `false` as long as the file is being downloaded. It will be executed exactly once with 'true' at the end of the download (or if you pause the download). |
| `success` | bool | at the end of the download (when `finished` is true), this can be used to check whether the download was successful, or if it was interrupted by something. If you pause the download, this will also be `false`. |
| `numTotal` | int | the total download size in bytes. This will not change during download. |
| `numDownloaded` | int | the number of bytes that have been downloaded until now. |

> In addition to these properties, you can use the `this` object in the function with all the API methods available in the [Download](/scripting/scripting-api/download) class.

```javascript
Server.setBaseURL("http://hise.audio");
const var target = FileSystem.getFolder(FileSystem.Documents).getChildFile("HISE_1_1_1.exe");

Server.downloadFile("download/HISE_1_1_1.exe", {}, target, function()
{
    var message = "";
    
    message += Engine.doubleToString(this.data.numDownloaded / 1024.0 / 1024.0, 1);
    message += "MB / " + Engine.doubleToString(this.data.numTotal / 1024.0 / 1024.0, 1) + "MB";
    
    Console.print(message);
     
    if(this.data.finished)
         Console.print(this.data.sucess ? "Done" : "Fail");
});


inline function onButton1Control(component, value)
{
	if(value)
        Server.stopDownload("download/HISE_1_1_1.exe", {});
};

Content.getComponent("Button1").setControlCallback(onButton1Control);
```

Also be aware that if you call this method again with the same URL and parameters, it will not add another download, but just replace the callback in the already pending download. If you call this method with a file that already exists, the method assumes that it's a previously stopped download and resumes the download at the position (delete the file before calling the method if you don't want this behaviour).

