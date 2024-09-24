This will set the options for the [ReleaseStart](/hise-modules/sound-generators/list/streamingsampler#release-start) playback mode. Usually you will combine this call with [getReleaseStartOptions](/scripting/scripting-api/sampler#getreleasestartoptions) which returns a JSON object with all properties:

```javascript

const var obj = Sampler.getReleaseStartOptions();

obj.FadeGamma = 0.5;

Sampler.setReleaseStartOptions(obj);
```

