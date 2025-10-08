This function can be used to add a text input label to any component. You can define the appearance of the text box and supply a callback that will be executed when the user dismisses the input box.

The function expects two arguments:

1. A JSON object with the properties for the textbox
2. A callable object with two arguments that will be executed when the text input is closed. The first argument will contain the state of the text input: `0` if the input was dismissed by pressing Escape or moving the keyboard focus away and `1` if the user pressed enter to submit the value. The second argument will be the string that the user typed into the box.

> Be aware that you will have to convert the string to a number if you want to store it as value. You can use either `parseInt()`, `parseFloat()` or [`Engine.getValueForText()`](/scripting/scripting-api/engine#getvaluefortext) for a custom mode parser (like Frequency or Tempo names).

Note that this text box will appear mutually exclusive, so there will only be a single text input box visible at all times.

The JSON object can have these properties to define the appearance / behaviour of the input box:

| Property | Type | Default | Description |
| --- | - | -- | ------ |
| `parentComponent` | String | none | the ID of the UI component that you want to show the editor for. |
| `text`| String | none | The text value that will be shown in the editor when its opened. |
| `x, y, width, height` | int | none | the dimensions of the text input relative to the parent component. If the area defined by these properties is empty, then the text editor will use a default positioning in the centre of the UI component. |
| `bgColour` | Colour | `0x88000000` | The default background colour for the text editor. |
| `itemColour` | Colour | `0` | The item colour (currently unused) |
| `textColour` | Colour | `0xAAFFFFFF` | The default text colour used by the text editor. |
| `alignment` | String | `"centred"` | the alignment of the text editor. |
| `fontName` | String | `"Lato"` | The font name. |
| `fontStyle` | String | `"plain"` | The font styling (bold or italic or plain). |
| `fontSize` | Number | `13.0` | The font size. |

### Example

This example shows how to use this function with a ScriptPanel. Shift clicking on the panel opens the text box and sets the Panel's value.

```javascript
// Attaches a text input box to the given panel.
inline function make(n)
{
	local p = Content.getComponent(n);
	
	p.set("allowCallbacks", "Clicks Only");
	
	p.setPaintRoutine(function(g)
	{
		g.setColour(Colours.white);
		g.drawText(this.getValue(), this.getLocalBounds(0));
	});
	
	p.setMouseCallback(function(event)
	{
		if(event.clicked && event.shiftDown)
		{
			// Since we want to pass that into the textbox callback as lambda ;
			// we need to store it as local variable before.
			var tp = this;
			
			var textBoxProperties = {
				parentComponent: this.get("id"),
				x: 10,
				y: 10,
				width: 80,
				height: 20,
				bgColour: Colours.red,
				textColour: Colours.black
			};
			
			Content.showModalTextInput(textBoxProperties, function[tp](status, value)
			{
				tp.setValue(parseInt(value));
				tp.changed();
				tp.repaint();
			});
		}
	});
	
	return p;
}

// Call this multiple times. If you click on the second panel while the
// first input box is active you'll see that it works exclusively.
make("Panel1");
make("Panel2");
```