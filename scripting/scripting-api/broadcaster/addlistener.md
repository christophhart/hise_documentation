This registers a listener to the broadcaster which will be notified whenever the broadcaster's state changes.

The function expects two parameters. The second parameter needs to be either a function (or inline function) with the exact same amount of parameters as the broadcaster's default value amount (defined by the constructor).

The first parameter can be one of three things:

- a string (for simple identification)
- an JSON object
- a script object

This will be used in order to identifiy the listener (so if you want to remove it, you need to use the same value). 

> As an additional feature, it will be also accessible using `this` in the function callback:

```javascript
// If you supply an array to this method 
// it will expect multiple parameters in the listener functions:
const var b = Engine.createBroadcaster([0, false]);

b.addListener({"id": "MY_ID"}, function(index, isTrue)
{
	Console.print(this.id); // "MY_ID"
});

b.addListener("funky_time", function(index, isTrue)
{
	Console.print(this); // "funky_time";
});

const var Knob = Content.addKnob("Knob1", 0, 0);
b.addListener(Knob, function(index, isTrue)
{
	Console.print(this.getValue()); // == Knob.getValue()
});
```

Note that the function will be called (synchronously) when you register it so that the listener is updated to the current value.