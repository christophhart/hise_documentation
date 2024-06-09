There are a number of occasions where you want to manually cause a listener callback to be fired again.

This function will send the content change message to all listeners (so if you have assigned a callback using [Audiofile](/scripting/scripting-api/audiofile#setcontentcallback), this will call it again even if the content hasn't changed).

```javascript
audioFile.loadFile("");

var counter = 0;

// Set the callback
audioFile.setContentCallback(function()
{
	Console.print(++counter);
});

// load the first asset
audioFile.loadFile(firstAsset);

// The content callback is asynchronous
// so the counter is still 0
Console.print(counter); // 0

// Send the listener again
audioFile.update();

// still zero
Console.print(counter); // 0

// The full console output will show that
// the content callback has been executed twice:
// Interface: 0
// Interface: 0
// Interface: 1
// Interface: 2
```