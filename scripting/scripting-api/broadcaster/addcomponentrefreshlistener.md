This function adds a listener to the broadcaster that will send a refresh message of the given type to all components defined by `componentId` parameter. 
The `refreshType` parameter defines the type and must be one of the following strings:

- `repaint`: sends a repaint message and will also cause any ScriptPanel to run its paint routine
- `changed`: causes the control callback to fire with the last value again
- `updateValueFromProcessorConnection`: if the control is connected to a processor attribute using `processorId` and `parameterId`, it will update the value of the control to reflect the module's parameter state
- `loseFocus`: if the component is currently focused, it will make it lose its focus
- `resetToDefault`: will cause the control to be resetted to its `defaultValue` (just like double clicking on it)

This function is more or less equivalent to something like

```javascript
bc.addListener(componentList, "repaint components", function(index)
{
	for(c in this)
		c.sendRepaintMessage();
});
```

but is less to type, a bit faster (because it doesn't have to evaluate the script function) and more versatile. And you get a nice visualisation in the Broadcaster map that blinks everytime the refresh messages are sent.

### Example

This example will send a message when you click a button and causes a list of Panels to repaint themselves.

![](/images/custom/broadcaster/refreshlistener.png)

```javascript
const var button = Content.addButton("Button1", 0, 0);

const var PanelArray = [Content.addPanel("Panel4", 0, 50),
                        Content.addPanel("Panel3", 100, 50),
                        Content.addPanel("Panel2", 200, 50),
                        Content.addPanel("Panel1", 300, 50)];

for(p in PanelArray)
{
	p.setPaintRoutine(function(g)
	{
		g.setColour(Colours.withAlpha(Colours.white, Math.random()));
		g.fillRect(this.getLocalBounds(0));
		
	});
}

const var bc = Engine.createBroadcaster({
	"id": "RepaintBroadcaster",
	"colour": -1,
	"args": ["index"]
});


bc.addComponentRefreshListener(PanelArray, "repaint", "Repaint Panels");

inline function onButton(component, value)
{
	// just send out any value to trigger the broadcaster
	bc.index = Math.random(); 
}

button.setControlCallback(onButton);
```