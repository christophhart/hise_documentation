---
keywords: FixObjectFactory
summary:  A factory for creating data structures with a predefined memory layout
author:   Christoph Hart
modified: 18.12.2023
---

This class allows you to create a custom data structure that can be used to build different containers with a very dense data layout. This can be very useful in a MIDI processing context where you need to define a custom data model to fit your algorithm: In most scenarios that require a custom MIDI processing script, you will most likely need a data container that stores varying amounts of data. With this class you can tailor the data structure to your exact requirement and then use one of the available data structures for a convenient implementation.

The data layout will be defined by a JSON object (prototype) that you need to pass into [`Engine.createFixObjectFactory()`](/scripting/scripting-api/engine#createfixobjectfactory). This will return a factory object that can be used to instantiate containers or single objects.

> A notable feature of this class is that you can supply a custom comparison function that will be used by the data containers for the `indexOf()`, `contains()` methods.

## Advantages

On the first look this doesn't look particularly interesting, as anything here can also be implemented using the stock data containers of HiseScript. Howewer there are a few advantages that make this a bit (or a lot) more convenient:

- you don't need to care about proper initialisation of default values, this will be done automatically by copying the values from the prototype JSON object
- you don't need to care about allocation & realtime safety: it's always preallocated
- the ability of using the unordered stack data container can drastically simplify a lot of scripts
- the data layout will be picked up by the IDE tools (scriptwatch table & autocomplete). There's also a handy StackViewer that shows the full data range e in a table layout (Right-click on the entry of the stack in the ScriptWatchTable and choose **View in Popup**)
- the performance might be faster depending on your algorithm (because searching & indexing can be done on C++ level). The expected speedup is not super-huge, but since the use case of this class is in the MIDI processing callback, every saved CPU cycle is a good CPU cycle.
- you can pass a fix object as a data structure to an eventnode network which will treat it as one item across the signal graph (spoiler alert 2024...)

## The Prototype

The prototype JSON object will define the object data layout. It basically looks like any other JSON object and every property you define will be a data member of the fix object. However there are a few limitations:

- the only allowed data types are numbers. No strings, no JSON, no object references
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

// Use this to store the time of the note on
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




