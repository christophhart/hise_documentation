This function can be used to enabled multiple groups at once. By default, only one RR group is active at the same time - as long as the Group XF property is disabled, then it will play all groups.

You can define a custom RR behaviour using [`Sampler.setActiveGroup()`](/scripting/scripting-api/sampler#setactivegroup), but this function still gives you one exclusively active group.

However there are a few legitimate edge cases where you need multiple, but not all groups enabled - the most common one might be if you want to implement round robin behaviour in combination with Group XF samples.

In order to do so, you can use this function to tell the sampler to allow multiple groups at the same time - you also need to call [`Sampler.enableRoundRobin(false)`](/scripting/scripting-api/sampler#enableroundrobin) before using this function. The function accepts different types as `groupIndex` argument:

- an integer (be aware that it's one based to match the other RR functions).
- an array with integers (also one-based). This can be used to predefine static ranges at initialisation and then just pass those arrays in the function to avoid writing loops in HiseScript
- a [MidiList](/scripting/scripting-api/midilist). In that case, the `enabled` argument will be discarded and it will enable all groups where the MidiList has a valid entry (`!= -1`).

> Be aware that as soon as you activate this feature by calling this method, the table index used for defining the crossfade gain will be capped to the number of active groups (`groupIndex %= numActiveGroups`). The rationale behind this is that if you have 4 dynamic layers and 3 round robin repetitions, you still want only 4 tables to be active (instead of 12). However this means that as soon as you use this feature **the amount of dynamic layers must be consistent across RR repetitions**.

```javascript
// A simple example for 2 dynamic layers with 2 RR repetitions.
Sampler.enableRoundRobin(false);

const var g1 = [1, 2, 3];
const var g2 = [4, 5, 6];

reg on = false;

function onNoteOn()
{
    // Calling this function tells the sample to just use
    // the first 3 tables for crossfading
    Sampler.setMultiGroupIndex(g1, on);
	Sampler.setMultiGroupIndex(g2, !on);
	
    on = !on;
}
```

> Note: if you're using this function in the `onNoteOn` callback and must ensure that the correct group index state is applied to the current note on message, you will need to use the [Sampler.setMultiGroupIndexForEventId()](/scripting/scripting-api/sampler#setmultigroupindexforeventid) method which takes in the event ID of the current note. More information about this issue can be found [here](/scripting/scripting-api/sampler#setactivegroup).