This registers a listener to the broadcaster which will be notified whenever the broadcaster's state changes.

The function expects three parameters. The second parameter needs to be either a function (or inline function) with the exact same amount of parameters as the broadcaster's default value amount (defined by the constructor).

The first parameter can be one of three things:

- a string (for simple identification)
- an JSON object
- a script object

the second parameter is a metadata parameter that is used to display the target and set other properties (eg. priority)

This will be used in order to identifiy the listener (so if you want to remove it, you need to use the same value). 

> As an additional feature, it will be also accessible using `this` in the function callback:

```javascript
const var b = Engine.createBroadcaster({
	"id": "My Broadcaster",
	"args": ["index", "isTrue"]
});

b.addListener({"id": "MY_ID"}, "some description about the target",
function(index, isTrue)
{
	Console.print(this.id); // "MY_ID"
});

b.addListener("funky_time", "some other target",
function(index, isTrue)
{
	Console.print(this); // "funky_time";
});


const var Knob = Content.addKnob("Knob1", 0, 0);

/** Here we are using a JSON object instead of a metadata string
	to set the priority. Note how the listener is at the top of the list
	despite being added as last target. 
*/
b.addListener(
Knob, 
{
  "id": "Print the knob value", 
  "colour": 0xFF3388AA, 
  "priority": 10 
},
function(index, isTrue)
{
	Console.print(this.getValue());
});
```

![](/images/custom/broadcaster/addlistener.png)

Note that the function will be called (synchronously) when you register it so that the listener is updated to the current value.