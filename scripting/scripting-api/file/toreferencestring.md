This function tries to parse this file as relative path string depending on the folder type. If you want to import a custom sample into a samplemap and want to make sure that it is as portable as possible you can use this:

```javascript
inline function dropCallback(f)
{
	local samplePath = f.getReferenceString("Samples");
	
	Sampler.loadSampleMapFromJSON([
	{
		"FileName": samplePath
	}]);
};
```

If the file that was dropped was in the sample folder of the plugin, `samplePath` will be `{PROJECT_FOLDER}MySample.wav` (otherwise it will just be the absolute path). Having it as project reference will allow the user to port the data across systems which might be a bit more convenient.