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
