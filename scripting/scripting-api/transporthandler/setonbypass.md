This can be used to register a callback that will react on bypass changes of the plugin.

Almost every DAW has the ability to bypass plugins so they will not process the incoming audio. Unfortunately [none](https://forum.juce.com/t/hosts-not-calling-processblockbypassed/15307) of the plugin architectures have a clear API to detect the [bypass](https://forum.juce.com/t/current-state-of-bypass-management/54662) state and my initial test show a success rate of 0% trying to catch this event across multiple hosts. Also there are multiple concepts of bypassing, some are called disabling, some rely on a hidden plugin parameter and in total it's complete crazy town over there.

So the solution I went for is a simple watchdog: at every audio buffer that is rendered, it will bump a watchdog timer and if that timer is not bumped for the duration of 10 audio buffers, then it will assume that the plugin was bypassed in whatever way the host decide it would be best. This is not a 100% accurate solution (because the bypass event will be detected with a delay of about 100 ms at 512 buffer size) but it let's you implement some UI features like [clearing out peak meters](https://forum.hise.audio/topic/8739/scriptnode-external-display-buffer-when-plugin-bypassed) etc.

The function will simply expect a single parameter that should be a function with a single argument that will indicate whether the plugin is bypassed or not. The function will not be called on the audio thread but on the UI thread so you don't need to be cautious about realtime safety here.

```javascript
const var th = Engine.createTransportHandler();

th.setOnBypass(function(isBypassed)
{
	if(isBypassed)
	{
		PeakMeter.clear(); // whatever...
		someTimer.stopTimer();
	}
	else
	{
		// resume the timer that detects the peak
		someTimer.startTimer(30);
	}
});
```

> If you want to simulate the behaviour of bypassing the plugin during development, you can use the new bypass button at the top left of the HISE controller popup (next to the master clock controls).