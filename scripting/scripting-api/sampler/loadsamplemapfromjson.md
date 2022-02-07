This function will take an array of JSON objects describing a sample and load it as samplemap. So the days of dragging around a AudioLoop Player just for the user sample import are finally over.
The data you need to pass in must have the following format:


```javascript
[
{
	"FileName": "C:\\MyFileName.wav",
	"Root": 64
},
{
	"FileName": "C:\\AnotherSample.wav",
	"SampleStart": 64
}];
```

You can use every property ID that is used in a standard XML samplemap (take a look at one of your samplemaps for inspiration).

> If you want to leverage the relative file format using the `{PROJECT_FOLDER}` wildcard when you are trying to load a sample that is in the actual sample folder of your plugin take a look at [File.getReferenceString()](/scripting/scripting-api/file#toreferencestring)

Be aware that you are responsible to store and restore this data in a user preset. The most practical way to do this is to use [Sampler.getSampleMapAsBase64()](/scripting/scripting-api/sampler#getsamplemapasbase64) as this will also take into account if you drag the sample range in an audiowaveform - you could also just save and restore that JSON array that you pass in, but then you will lose all changes you might to to the samplemapping afterwards.