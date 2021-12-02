This can be used to create a custom tooltip implementation if the TooltipPanel does not suit your needs.

This will return the "raw" tooltip (as in the tooltip from the UI element where the mouse is hovering over). For most applications you might want to introduce a custom delay, so that if you move the mouse away from the element, it will "stick" a little bit longer.

This example will display the current tooltip on a label with a delay of a second.

```javascript
const var t = Engine.createTimerObject();
const var Label1 = Content.getComponent("Label1");
reg isPending = false;

t.setTimerCallback(function()
{
	var tooltip = Content.getCurrentTooltip();
	
	if(tooltip == "")
	{
		// Now the mouse is over a component without a tooltip
	
		if(Label1.get("text") != "" && !isPending)
		{
			// The tooltip label was not empty so we set the isPending flag
			// and reset the internal counter of the timer object
			isPending = true;
			this.resetCounter(); // [1]
		}
		else if (this.getMilliSecondsSinceCounterReset() > 1000)
		{
			// Now a second has passed since [1] without a new tooltip being
			// set, so we clear the label and reset the isPending flag
			isPending = false;
			Label1.set("text", "");
		}
	}
	else
	{
		// We update the label with the new tooltip and
		// clear the isPending flag
		isPending = false;
		Label1.set("text", tooltip);
	}
});

// We don't need it to be super fast, so 100ms should be fine
t.startTimer(100);
```