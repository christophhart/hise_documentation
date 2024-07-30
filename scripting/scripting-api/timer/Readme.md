---
keywords: Timer
summary:  A general purpose UI timer object
author:   Christoph Hart
modified: 07.02.2024
---
  
The `Timer` class will run a periodic callback with a customizable interval in order to implement UI interactions / animations. Be aware: The refresh rate of the callbacks will not be super precise because it will be scheduled by a background process to be approximately the time that you want it to be. This means that you better not use this for any kind of MIDI processing logic (use the inbuild [onTimer callback](/hise-modules/midi-processors/list/scriptprocessor#the-ontimer-callback) for this, as the callback is sample accurate).

## Suspending the TimerObject

Contrary to the timer callback of a ScriptPanel, this callback will not be suspended when the interface is not shown, which means it keeps running when the interface is hidden. Depending on how your project is using these objects, this might create a significant overhead when using multiple instances. If you want to suspend the callbacks of this object to, you have to use the [Content.setSuspendTimerCallback](/scripting/scripting-api/content#setsuspendtimercallback) method and start / stop the timer manually.

```javascript
// Let's use a broadcaster for this
const var suspendBroadcaster = Engine.createBroadcaster({
	"id": "suspendBroadcaster",
	"args": [ "isSuspended" ]
});

// If you comment out this line, you'll see that the timer callback is
// still being executed while the panel callback is suspended properly.
Content.setSuspendTimerCallback(suspendBroadcaster);

const var to = Engine.createTimerObject();

to.setTimerCallback(function()
{
	Console.print("to" + Math.random());
});

// by using a broadcaster, we can attach each timer object exactly where we define it,
// so you don't have to keep track of all your timers at a global location
suspendBroadcaster.addListener(to, "suspend timer object", function(isSuspended)
{
	if(isSuspended)
		this.stopTimer();
	else
		this.startTimer(400);
});


to.startTimer(400);

const var panel = Content.addPanel("Panel1", 0, 0);

panel.setTimerCallback(function()
{
	Console.print("panel" + Math.random());
});

panel.startTimer(500);
```