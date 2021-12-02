You can set a custom timeout period that the thread will wait until it will force-kill the task (which might leave things in a bad place). The default time is 500 milliseconds, but you can change this value if you need. The best way to get an estimate for how long you need the timeout is the period between calls to `shouldAbort()`. So if you have a task like this:

```javascript
function myTask(thread)
{
	for(i = 0; i < 1000000; i++)
	{
		if(thread.shouldAbort())
			break;
			
		subFunctionThatTakes900MillisecondsPerRun();
	}
}
```

you should set the timeout to something like 1000ish milliseconds - including some headroom for computers that are slower obviously and I would rather suggest to break down the function in the loop into multiple parts and call `shouldAbort()` more often to avoid any freezing. 