This method will start a download in the background and periodically executes the callback that can be used to track the progress.

The `target` parameter has to be a valid [`File`](/scripting/scripting-api/file) object that points to a file (not a directory).

> Be aware that this file will be deleted and overwritten!

Unlike the other methods, the function you pass in as `callback` just requires a single parameter which will hold the download information. These properties will be supplied:

| Property | Type | Description |
| == | = | ====== |
| `finished` | bool | `false` as long as the file is being downloaded. It will be executed exactly once with 'true'  at the end of the download. |
| `success` | bool | at the end of the download (when `finished` is true), this can be used to check whether the download was successful, or if it was interrupted by something. |
| `numTotal` | int | the total download size in bytes. This will not change during download. |
| `numDownloaded` | int | the number of bytes that have been downloaded until now. |

```javascript
Server.setBaseURL("http://hise.audio");
const var target = FileSystem.getFolder(FileSystem.Documents).getChildFile("HISE_1_1_1.exe");

Server.downloadFile("download/HISE_1_1_1.exe", {}, target, function(info)
{
    var message = "";
    
    message += Engine.doubleToString(info.numDownloaded / 1024.0 / 1024.0, 1);
    message += "MB / " + Engine.doubleToString(info.numTotal / 1024.0 / 1024.0, 1) + "MB";
    
     Console.print(message);
     
     if(info.finished)
         Console.print(info.sucess ? "Done" : "Fail");
});


inline function onButton1Control(component, value)
{
	if(value)
        Server.stopDownload("download/HISE_1_1_1.exe", {});
};

Content.getComponent("Button1").setControlCallback(onButton1Control);
```

Also be aware that if you call this method again with the same URL and parameters, it will not add another download, but just replace the callback in the already pending download.