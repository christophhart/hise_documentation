The loading of samples will be executed asynchronously on a background thread (in fact the same thread used for streaming the samples).

If you call `Sampler.loadSampleMap()` or any other function that changes the sample content, it will kill all voices, load it on the background thread.

If you want your UI to reflect this behaviour, you can use a ScriptPanel as "loading indicator". Just register a function with this method and change the appearance accordingly:

```!!javascript
// Example: Preloading callback
// this code will add a panel which will flash white during the preloading of new samples.

const var panel = Content.addPanel("Panel", 0, 0);

panel.data.colour = Colours.grey;

panel.setPaintRoutine(function(g)
{
	g.fillAll(this.data.colour);
});

// This function will be executed whenever the preload state changes
panel.setLoadingCallback(function(isPreloading)
{
	if(isPreloading)
        this.data.colour = Colours.white;
    else
        this.data.colour = Colours.grey;
        
    // Update the UI
    this.repaint();
});
```

> Note that there is now a better way of handling events of a samplemap. This function is suited for displaying progress bars and other "soft" targets, but if you want to implement some kind of data logic that depends on the correct order of execution, take a look at [Broadcaster.attachToSampleMap()](/scripting/scripting-api/broadcaster#attachtosamplemap) for a much more fine-grained tool for the job.
