---
keywords: Threads
summary:  A class that provides information about threading
author:   Christoph Hart
modified: 29.11.2023
---

# Threads

The Threads API class provides information about various threads and some helper functions regarding multithreaded actions. This is an extremely advanced topic but it allows you to control and synchronize the different threads in a complex HISE project.

Basically you have 4 main thread types running simultaneously in HISE:

1. the **Audio thread** which renders the audio buffers coming from the DAW. This is the thread with the highest priority and making sure that this isn't interrupted or stalled should be your top priority. The utilisation of this thread will show up as CPU usage in your DAW meter.
2. the **Scripting thread**, which executes all non-synchronous scripting callbacks
3. the **Message thread** which renders the interface using either OpenGL or the software renderer. If you're using OpenGL, the rendering will be done on a separate thread than the rest of the UI stuff (handling mouse callbacks, etc), however this thread will hold the Message Thread lock so from our point of view, it's the same thread.
4. the **Loading thread** which performs various tasks. In normal operation mode this is used to fetch the samples from the disk, but if you initialise the plugin or load user presets / swap samplemaps, it will be executed on this thread 

These threads are available as constant of this class and it's **HIGHLY** recommended to never use magic numbers but these constants.

```javascript
Threads.Audio; 		// Audio Thread
Threads.UI;    		// Message Thread
Threads.Scripting; 	// Scripting Thread
Threads.Loading;	// Loading Thread
Threads.Unknown;	// Any other thread (eg. a custom background task)
Threads.Free; 		// Idle Thread (mostly used when querying lock states)
```

Now you might ask yourself: if every script callback is executed on the **Scripting Thread**, why should I need this class at all? Well, there are a few exceptions to that rule:

- non-deferred MIDI callbacks are executed on the **Audio Thread**
- custom LAF methods are executed on the **Message Thread**
- when you load a user preset (or initialise the plugin), control callbacks are executed on the **Loading Thread**

With the exception of the latter, all these multithreaded use cases are not synchronised by default (with the rationale of preferring data race conditions over deadlocks and priority inversions). The exception is the user preset load, which locks the scripting thread by default during the operation. However if you start doing complex operations or even using a BackgroundTask object to perform a heavyweight task on a dedicated background thread, you might want to start thinking about proper synchronisation options and this is where this class comes in handy.

Be aware that there are no methods for locking any thread in this class, it only offers constants for thread identification as well as querying methods for checking the lock state of a given thread or getting information about the current thread.

If you want to lock the threads, you will have to use the scoped statement `.lock(Threads.xxx)`, which ensures that the lock is guaranteed to be released after the scope even in a case of a script error (or if you simply forget to release it). This is consistent with the RAII concept that is used for locking threads in JUCE (and subsequently HISE).

## Inspector Perfetto

Multithreading is maybe one of the most complex topics in programming, so let's take a look at [an example](/ui-components/floating-tiles/hise/perfettowebviewer) that shows how the threads are interacting with each other. We're using the Perfetto Viewer to get a timeline of all events and investigate the details.




