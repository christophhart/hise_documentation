Calling this method will create a single object with the supplied data layout. The returned object is **NOT** a JSON object, but a custom object type with these properties:

- predefined, typed and preallocated properties based on the JSON prototype of the factory
- no methods, just data

However from a workflow perspective, it behaves just like a JSON object:

- you can access (read & write) properties using the dot operator: `obj.key = value` and `value = obj.key`
- you can even call `trace()` to create a string representation that looks like it's JSON equivalent (useful for debugging)

You can of course put these objects into a JS array or JSON object, however it's highly recommended to use one of the special data containers instead. If you do so, you will most likely need to create a single object alongside the data container and then use this as "interface object" for shuffling data in and out of the container:

```javascript

const var f1 = Engine.createFixObjectFactory({
	"myValue": 17,
	"someOtherValue": 42.0
});

// Creates a preallocated array with the given size
const var list = f1.createArray(64);

// Creates an object for interacting with the array above
const var obj = f1.create();

Console.print(trace(obj));

// Now we want to push an object with both values zero
// into the list. 
obj.myValue = 0;
obj.someOtherValue = 0.0;

// This will not insert a reference into the array but copy the 
// data values from the current state of obj
list.push(obj);

// You can also call trace with a FixObjectArray and it will dump it like a JSON
Console.print(trace(list));

// this function will perform a bitwise comparison of the data
const var idx = list.indexOf(obj);
Console.print(idx); // => 0

obj.myValue = 90;

// Now it won't find the element because we changed it.
// Note that that's different from the default JS behaviour
// because we are not storing a reference to the object in the 
// array but a copy!
const var idx2 = list.indexOf(obj);

Console.print(idx2); // => -1
```