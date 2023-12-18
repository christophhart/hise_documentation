A lot of operations and methods of the data containers will require some kind of comparison operation: indexing, sorting, etc. all need to decide whether an element is supposed to be equal (or greater or less). The default comparison compares every single property of the object, but this might not what you need in your logic. 

This is where this function comes in handy as it allows you to define different comparison functions. There are three options available:

1. Compare a single property. This can be achieved by passing in the ID of the property as a string into the function. It will then ignore all other properties and just factor in this property for sorting, indexing, etc.
2. Compare multiple properties. This can be achieved by passing up to 4 IDs separated by a comma. It will then compare all those the properties
3. Define a custom JS function by passing in a callable object into the method. The function you pass in needs to have two parameters and must return either `-1`, `1` or `0` depending on the relation between the two objects (this is similar to `Engine.sortWithFunction()`)

```javascript
const var f1 = Engine.createFixObjectFactory({
	"eventId": 0,
	"noteNumber": 0
});

// This will make all indexing functions only look for the eventID
f1.setCompareFunction("eventId");
```

> Be aware that using the third option has a noticeable performance impact so only use this as last resort.