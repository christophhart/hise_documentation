This function can be used to programatically start the profiling session. It expects two arguments:

1. either a number (a duration in milliseconds) that will directly start the profiling session for the given amount of time or a JSON object that sets up the profiler with the given settings. 
2. A function with a single parameter that will contain the base64 encoded profiling session as argument and can be used to write this to a file (or copy it to the clipboard).

The recommended way to get this JSON object is to use the profiling options popup in the profiler toolkit and then click **Export as JSON** to create the current state as a JSON object. Note that in order to keep the amount of data small it's recommended to limit the profiler settings to the threads & event types you actually want to inspect.

> Note that if you're passing in a JSON object it will respect the trigger type, so if you eg. have selected Mouse click, it will not start the recording right away but only at the next time you move a control.

Here's an example with some random settings exctracted from the profiler popup and a function that dumps the profile file on the user's desktop.



```javascript
// Grab your current settings from the profiling options popup
// Just click Export as JSON as paste it in your script. */
const var PROFILE_OPTIONS = {
  "threadFilter": [ "UI Thread" ],
  "eventFilter": [ "Lock", "Script", "Scriptnode", "Callback",
    			   "Broadcaster", "Paint", "DSP", "Trace", "Server", 
    			   "Background Task", "Undefined", "Threads" ],
  "recordingLength": "300 ms",
  "recordingTrigger": 0
};

// Pick whatever file you like
const var PROFILE_TARGET = FileSystem.getFolder(FileSystem.Desktop).getChildFile("profile.dat");

// dumps the profile to the desktop
Threads.startProfiling(PROFILE_OPTIONS, x => PROFILE_TARGET.writeString(x));
```

> Important: This function can also be used in the compiled plugin, however you will have to explicitely include the profiling toolkit in your compile process by adding `HISE_INCLUDE_PROFILING_TOOLKIT=1` to your ExtraDefinitions field. In HISE it will print a warning if that flag isn't added to your ExtraDefinitions and try to call this method.