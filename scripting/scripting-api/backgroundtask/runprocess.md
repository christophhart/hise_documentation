This function will use a child process to run any command line application on this background thread. Just pass in the command you want to execute, the command line arguments (either as an array of strings or as a single string which will be split up at unquoted whitespace characters) and a logger function that will periodically read the programs output and called whenever a new line was printed to the standard output. The function needs to have three arguments which will contain:

1. A reference to the background task object (so you can set the progress)
2. a `bool` value that is true when the program has finished
3. An integer containing the exit code (if the program has finished and the second argument is `true`) or a string for each line from the program output.

> Be aware that in order to allow a graceful exit, you have to set the timeout of this background task to be higher than the longest interval between the output of your program, otherwise the thread might be killed with undefined behaviour.

This example here uses CURL to download a 100MB test file and put it on the Desktop. It should work on both macOS and Windows (10).

```javascript
// Create a background task and give it a name that's descriptive
const var b = Engine.createBackgroundTask("DownloadTest");

// Let's forward the status and progress to the official HISE progress system
// (this will show the status in the main top bar in HISE and you can hook up
//  Panels to a preload callback on your UI)
b.setForwardStatusToLoadingThread(true);

// CURL will spit out a new line roughly every second, so setting the timeout to 2 seconds will ensure 
// that it can be cancelled gracefully.
b.setTimeOut(2000);

// We can use the finish callback to show / hide some elements
b.setFinishCallback(function(isFinished, wasCancelled)
{
	b.setProgress(0.0);

	Console.print("Finished: " + isFinished);
	Console.print("Cancelled: " + wasCancelled);
});

function downloadLogger(thread, isFinished, data)
{
	if(isFinished)
		return;

	// Now let's hack around and format the CURL output to something
	// that we can show in HISE
	
	// Begin of nasty hacking procedure...
	var v = data.split(" ");
	for (i = 0; i < v.length; i++) 
	{
	    if (v[i].length == 0)
	        v.removeElement(i--);
	}
	
	var progress = parseInt(v[0]) / 100.0;
	var m = "Downloading " + v[3] + "B of " + v[1] + "B";
	
	if (progress < 0.01) 
		m = "Start Downloading...";
	// ...End of nasty hacking procedure
	
	thread.setProgress(progress);	
	thread.setStatusMessage(m);
}

// This button will just start and cancel the download
const var button = Content.addButton("Run", 0, 0);
button.set("saveInPreset", false);

inline function onButton(component, value)
{
	if(value)
	{
		local f = FileSystem.getFolder(FileSystem.Desktop).getChildFile("testfile.dat");
		
		// Use CURL to download a test file of 100MB
		b.runProcess("curl", ["https://speed.hetzner.de/100MB.bin",
							  "--output", 
							  f.toString(0)], 
							  downloadLogger);
	}
	else
	{
		// This should gracefully cancel the download
		b.sendAbortSignal(false);
	}
};

Content.getComponent("Run").setControlCallback(onButton);
```