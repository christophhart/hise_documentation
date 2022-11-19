
This function will change component properties (like `visible`, `enabled`, `itemColour2` etc.) when the broadcaster sends a message. It basically is the same as adding a function call with `addListener()` and changing the properties inside this call, however there are a few advantages over this approach:

- the broadcaster map will display the actual property in a meaningful way (eg. colours are rendered as colours and not as `124A438990`).
- the amount of code you need to write is much less and if you only want to forward a property to other components you don't need to write any function at all
- the ability of customizing the value you'll send through a custom function allows a very concise function definition.

```javascript
Content.addKnob("Knob1", 0, 0);
Content.addKnob("Knob2", 0, 50);
Content.addKnob("Knob3", 0, 100);
Content.addKnob("Knob4", 0, 150);

/** Create a broadcaster. We need 3 arguments to attach it to component properties. */
const var pb = Engine.createBroadcaster({
	"id": "Property Syncer",
	"colour": -1,
	"args": ["component", "property", "value"]
});

/** Attach it to react on changes of the `x` property of `Knob1`. */
pb.attachToComponentProperties("Knob1", "x", "X-Position Watcher");

/** This function just syncs the `x` property by returning the value but you could calculate any custom value if you need to. */
inline function updateFunction(indexInList, component, property, value)
{
	Console.print(trace({
		"indexInList": indexInList,
		"component": component.get("id"),
		"property": property,
		"value": value
	}));
	
	// something to play around with...
	//return value * (indexInList + 2);
	
	return value ;
};


/** You could also just pass in this instead of the updateFunction, then it will use the "default" behaviour. */
const var defaultUpdateFunction = 0;

/* Add a listener that changes properties when the broadcaster sends out a message. */
pb.addComponentPropertyListener(["Knob2", "Knob3", "Knob4"], // The array of knobs that should be synced
                                "x",                         // the properties that you want to sync
                                "update X position", updateFunction);


/* this will do the same thing but not as elegant. */
pb.addListener([Content.getComponent("Knob2"),
				Content.getComponent("Knob3"),
				Content.getComponent("Knob4")],
				"update X position manually",
function(component, property, value)
{
	//for(c in this)
	//	c.set(property, value);
});
```

This is the visualisation of the code above. You can see that the context awareness of the first listener item yields much more information to be displayed which gives you a quick way to ensure the correct functionality:

![](/images/custom/broadcaster/addcomponentpropertylistener.png)

This will add a target to the broadcaster that will change component properties when the broadcaster receives a message. It can be used for synchronising properties, changing multiple properties of a list of components with all the benefits of the broadcaster system. The function expects these arguments:

| Argument | Type | Description |
| -- | --- | ---- |
| object | Single value or list of strings (component IDs) or script references | the target components which properties are supposed to be changed. |
| propertyList | Single value or list of property IDs | the target properties that are supposed to be changed. |
| metadata | String or JSON object | a metadata object that contains some information for the broadcaster map. |
| optionalFunction | Callable object | An optional function that determines the value that should be sent to each component property (see below). If this argument is not a function, the broadcaster needs to have three properties (component, property, value) and will just send out the incoming value to the targets (which is an easy way of synchronizing properties. |

### The optional function

If you supply a function as last argument, it will be called for every target component and property to figure out which value to send. The function signature needs to have all parameters of the broadcaster and a integer index at the first position that will contain the index of the component in the list that was passed in.

```javascript
const var bc = Engine.createBroadcaster({
	"id": "MyBroadcaster",
	"args": { "firstArg": undefined, "secondArg": undefined, "thirdArg": undefined }
});

// This function needs to have an index parameter and then as much parameters as
// the broadcaster is using (in our case three).
// It will then be called for each property and component with the knobIndex argument
// containing the index of the component to change. The function's return value will 
// be sent as property.
inline function setKnobColours(knobIndex, a1, a2, a3)
{
	if(knobIndex == 0)
	{
		return calculateTheColourForTheFirstKnob();
	}
	if(knobIndex == 1)
	{
		return calculateTheColourForTheSecondKnob();
	}
	// ...
}

bc.addComponentPropertyListener(["Knob1", "Knob2", "Knob3"],      // targets
								["itemColour", "itemColour2"],    // properties
								{ "id": "set both itemColours"}), // metadata
								setKnobColours);				  // optionalFunction
```

> Be aware that the value returned by the function will be sent to all properties but if you want to send different values to different properties, you can call this function again with another function for each property.
