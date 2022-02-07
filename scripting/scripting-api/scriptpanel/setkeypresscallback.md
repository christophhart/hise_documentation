If you want the Panel to react on key strokes (from the computer keyboard, not the MIDI controller), you can attach a function with this method.  
The function you pass in must have a single parameter which will contain the details of the key that was pressed (see below) and must return `true` or `false` depending on whether the key is supposed to be "consumed" by the panel. If it is not consumed, the key press will trickle down the parent hierarchy until it finds a suitable target, so in order to avoid multiple actions with a single key press, make sure to return `true` if appropriate.

The function that you pass in will be synchronously executed on the message thread (because it needs to know the return value), so there might be a few synchronisation edge cases that you need to be aware of (since everything else will be executed in a dedicated scripting thread).

> Also be aware that this function can be used with each component type (Labels, Buttons, etc), it's not limited to ScriptPanels

In addition to the event of a key press, this function will also be called when the keyboard focus shifts towards or from this component. This can be used to refresh the appearance and indicate in some way that the Panel is focused (or not).

| Property | Type | Description |
| --- | -- | ----------- |
| `isFocusChange` | `bool` | whether this callback was invoked because of a focus change (or a key press) |
| `hasFocus` | `bool` | if the callback was invoked because of a focus change, this will indicate whether it has the focus or not. |
| `character` | `String` | a character representation for the given key press. This is case sensitive, so pressing Shift+A will result in `A`, while pressing `A` without the shift modifier will result in `a`. |
| `keyCode` | `int` | the ASCII code for the key press. This can be also used to check for special keys. |
| `specialKey` | `bool` | this is true if the key press is not a printable character, eg. `F5` or `backspace`. You can still fetch the key codes to distinguish the events. |
| `description` | `String` | A textual representation of the key press, which is helpful during debugging. |
| `shift` | `bool` | whether the shift key was held down. |
| `cmd` | `bool` | whether the command (or ctrl) key was held down. |
| `alt` | `bool` | whether the alt key was held down. |

If you want to "complete" the text input, you might want to call [ScriptPanel.loseFocus()](/scripting/scripting-api/scriptpanel#losefocus) from inside the callback.

This example snippet will turn a Panel into a very simple Label:

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{
	g.fillAll(0x22FFFFFF);
	g.setColour(0x55FFFFFF);

	if(this.data.hasFocus)
		g.drawRect(this.getLocalBounds(0), 1.0);

	g.setColour(Colours.white);
	g.drawAlignedText(this.data.text, this.getLocalBounds(0), "centred");
});

Panel1.setKeyPressCallback(function(obj) 
{
	// Take a look at this in the console
	Console.print(trace(obj));
	
	if(obj.isFocusChange)
	{
		this.data.hasFocus = obj.hasFocus;
	}
	else
	{
		switch(obj.keyCode)
		{
			// ESCAPE: Delete the text
			case 27: this.data.text = ""; 
				     break;
			// RETURN KEY: just lose the focus
			case 13: this.loseFocus();  
					 break;
			// BACKSPACE: Remove the last character
			case 8:  this.data.text = this.data.text.substring(0, this.data.text.length-1);
					 break;
			// Append any non-special character
			default: if(!obj.specialKey)
						this.data.text += obj.character;				
		}
	}
		
	this.repaint();
});
```