---
keywords: Crash reporting
summary:  Ensure that you get meaningful crash reports
author: Christoph Hart
---

If your plugin experiences a crash, it will create a crash report that might contain useful information. The process differs between the operating systems, but in any case you will have to enable the HISE project setting [CompileWithDebugSymbols](/working-with-hise/settings/project#compile-with-debug-symbols). This will ensure that the crash reports are properly symbolicated, otherwise all you'll get is a bunch of gibberish hex values.

### Windows

The best way of handling a crash on windows is to use a tool call `procdump` to monitor your system state and write dump files whenever an application crashes.

1. Download and extract the binary from [here](https://learn.microsoft.com/en-us/sysinternals/downloads/procdump)
2. Extract the zip archive somewhere
3. Open the command prompt as administrator and start the app to run as local just in time debugger. Navigate to the path where you extracted the archive and enter `procdump -ma -i C:\dumps`. This will store the dump files in `C:\dumps`, but you can of course use any other directory - just make sure that the directory exists before calling this line or it will complain. Each dump file is quite large (~500MB) so make sure to clean that up regularly.
4. Start using your project, either as a plugin or a standalone app.
5. If you experience a crash, it should dump the crash file into the location you specified. 
6. You can then double click on it to open the crash log in Visual studio (inside there, click on "Debug native only", then it will show the line where it crashed)

If this happens on the system of a tech-savy end user, you need to instruct the user to perform steps 1-5 and send you (or let's be honest, me) the dump file (protip: if you compress the file, it will be reduced significantly).

### macOS

On macOS there is a inbuilt crash report system that dumps .ips files (plain text files with the dump data). If the app crashes you'll be asked whether you want to see the crash report, but if you click on no, you can still get them from this directory: 

```
~/Library/Logs/DiagnosticReports/
```

The information provided is a little less verbose than on Windows, but it will still show you the exact stack trace of each thread at the time of the crash.

## Testdrive your setup

As first thing you might want to check whether you get a properly symbolicated report (or test the `procdump` workflow under Windows). For this you can build a simple test project that deliberately crashes, then compile it and check if you can get a proper crash report. I've added a API call `Settings.crashAndBurn()` which has the sole purpose of causing a crash for this very use case. So in order to test the procedure, load up this snippet:

```
HiseSnippet 782.3ocsUs0SaCCE1tzfV61PCo8CHimJRHT6F6hzdXPusUsUnhvPaOgLNtMVjXGY6.TMw+g8Sc+C1NNIkjBUboRKODkyU+ky46b7HkjxzZoBgqczzXFB+LGuoBSPm.BWfFzEgWyYHQaXJ2LUsmFSzZlOBiW4yVE3ZUQoO+4SsIgDAkUnBgNVxoruwi3lBsi18q7vv9De1Q7nRduytCnRQGYnLAvyJNMQwD5YjIr8IV2p3fvq1ymajJOCwvzfOsk9S8BjWHx7+XtleZHyJzB4AIJSMpS.Ozezr+UMBgqNp3Oekr+7W5Lj6yuVeQE3EoFbKhnbM.W4tfTqGAjvkfT0LHstiGUwiMEVr34oNCDPCYLAJ0kgRlunJAXmNRvCgY6HxYr9JP35HZ7tlM2xEds4GqWuNWDxEL2wIBpgKEtRQ6DiQJZYSfRF1fJihkBHUa4dNILgsY8eUuFebibgZ07XFCWLQuMUQzA6I7amnDMfjeEj+YvXByzYVhZrQ9Qrwlaqs5SOnNjvvSgtciah.HSkP29RC6.H8VTT+p5t2zz3wKzVdtBYpEZ1RCU2UfMDIQmxTkqAVGg9z7M+UeXMeZVYojiRw.A2bPLKWtuLz21TseeapBJutBe88AcIFhk8jqC7KloLbKbvcYmCieYboZNcY5yLx3TeyaFfZSp00xYZYEeD22FPdm.cYwL5O2cZYgK39l.D1A+aLBEv3SBLyjzjyYCDiTLnIaYmb8PYDbjDEjAbEC6RikJ24v879xqfGXuvs3+vjmzOIjXlebzt2I2.zllaFvxyEZtYZ48ROhYzl24L5CEhq6LhanAKFiUV.FgF3+CLluY64N8FOlQME.rpS+errqwtmi+PYhcgvPhQwAhiy9IQdvBcJCNcgfEpsDjJVRblbSqrsB3wD9oB+EdxM1xJiyM1ZlQTDgpjmPyFNs6NeRpF.ShzqJpA2YAxtsPoCrkqyQvp7Snz4S0sB70KafuYYCbmkMv2trA9tkMv2urA9g6OP6Ms6kXjQYiMHzvQ8R2vgw8DDfAlxVQ+CzoArgE
```

Now if you click that button, you'll most likely will see this error message:

> You need to enable CompileWithDebugSymbols for your project to get a meaningful stack trace

which means that you haven't setup your project correctly to include debug symbols. Head over to the project settings, smash that **CompileWithDebugSymbols** button, apply the settings and retry. If everything worked, HISE will terminate immediately and we know we're in the game.

> HISE should automatically have the debug symbols enabled, so you should be able to perform this step with the resulting crash log too.

Now you can test your setup like this:

1. restart HISE, load that snippet again (but don't click the button!), then export the project as app or plugin. 
2. When it's compiled, perform the steps described above, then click that button to cause the crash. 
3. Open the crash log and take a look at the stack trace in the `Javascripting Thread`. As last function you should see the name `Settings::crashAndBurn`. If you can read this, then the symbolication works (otherwise you would just see some gibberish like `0x0000TestProject:0+248` in the stack trace.

