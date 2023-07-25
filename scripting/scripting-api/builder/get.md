Sometimes you want to perform additional operations on the modules you created and for this you can use this method to get a script reference of a certain type that you can use. So if you have created a sampler that you then want to load a samplemap into, you can do it like this:

```
// create a typed reference from the build integer index
var asSampler = builder.get(sampler, builder.InterfaceTypes.Sampler)

asSampler.loadSampleMap("MySampleMap");
```

As you can see, we're using the contants found in the `InterfaceTypes` object - it contains all available types (eg. MidiPlayer, TableProcessor, RoutingMatrix, etc). 