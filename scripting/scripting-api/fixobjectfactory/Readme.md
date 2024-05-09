---
keywords: FixObjectFactory
summary:  A factory for creating data structures with a predefined memory layout
author:   Christoph Hart
modified: 18.12.2023
---

This class allows you to create a custom data structure that can be used to build different containers with a very dense data layout. This can be very useful in a MIDI processing context where you need to define a custom data model to fit your algorithm: In most scenarios that require a custom MIDI processing script, you will need to create a data container that stores varying kind of data. With this class you can tailor the memory layout to your exact requirement and then use one of the available data containers for a convenient implementation.

The data layout will be defined by a JSON prototype object that you need to pass into [`Engine.createFixObjectFactory()`](/scripting/scripting-api/engine#createfixobjectfactory). This will return a factory object that can be used to instantiate containers or single objects.

> A notable feature of this class is that you can supply a custom comparison function that will be used by the data containers for the `indexOf()`, `contains()` methods.

## Advantages

On the first look this doesn't look particularly interesting, as anything here can also be implemented *somehow* using the stock data structures of HiseScript. Howewer there are a few advantages that make this a bit (or a lot) more convenient:

- you don't need to care about proper initialisation of default values, this will be done automatically by copying the values from the prototype JSON object. Also all the "clearing" functions will reset the object to this default state, if this is non-trivial (every = zero) this becomes be very convenient.
- you don't need to care about allocation & realtime safety: it's always preallocated.
- the ability of using the unordered stack data container can drastically simplify a lot of scripts.
- the data layout will be picked up by the IDE tools (scriptwatch table & autocomplete). There's also a handy StackViewer that shows the full data rangee in a table layout (Right-click on the entry of the stack in the ScriptWatchTable and choose **View in Popup**)
- the performance might be faster depending on your algorithm (because searching & indexing can be done on C++ level). The expected speedup is not always ground-breaking, but since the use case of this class is in the MIDI processing callback, every saved CPU cycle is a good CPU cycle.
- you can pass a fix object as a data structure to an eventnode network which will treat it as one item across the signal graph (spoiler alert 2024...)
- going forward there will be more and more applications with other scriping API calls that benefit from the fixed layout to improve the performance (eg. [Math.from0to10()](/scripting/scripting-api/math#from0to1)).

## The Prototype

The prototype JSON object will define the object data layout. Every property (key) you define here will create a "data member" of the fix object with the key as member identifier and the value as initial default value. However there are a few limitations for the layout and data:

- the only allowed data types are numbers. No strings, no nested JSON, no object references
- the only exception is that you can define arrays, but the array have to be one-dimensional and only contain numbers.

The fix object is typed, that means that if you pass in an integer value, it will create an integer member. If you pass in an array, it will use the first element to figure out what type to use.

The values of the property will be used as "default" values and every object will be initialised with these.

Here are a few (real world) examples of JSON objects that can be used as prototype:

```javascript
// Use this to store the event IDs of a chord that is created
// from a single note
const var f1 = Engine.createFixObjectFactory({
	eventId: 0,
	chordIds: [0, 0, 0] // this assumes that the chord is a triad
});

// Use this to store the time and pitch factor of a note
const var f1 = Engine.createFixObjectFactory({
	eventId: 0,
	pitchFactor: 1.0,
	startUptime: 0.0
});

// Use this to store whether the note was played while a keyswitch
// was held down
const var f1 = Engine.createFixObjectFactory({
	eventId: 0,
	triggeredWithC1: false,
	triggeredWithD1: false
});
```

After you've created a factory, you can either create single instance objects or a data container with additional functionality.




