---
keywords: Button
summary: Off/On button (0/1)
author:   Christoph Hart
modified: 18.03.2019
properties:
- radioGroup: Set to 1 to makes this button part of a radioGroup 1. Multiple buttons in a common radioGroup will toggle between each other.
- scaleFactor: if you use a filmstrip, this scalefactor will be used to resize the image. You can use this to support Retina displays.
- filmstripImage: Select a filmstrip to replace the default button skin.
- numStrips: Set the correct amount of the strips in the filmstrips
- isVertical: Set to false if not vertical (depreciated)
- isMomentary: in Momentary mode a button switches its value to 1 when clicked, and back to 0 on mouse release.
---

A classic Button. Switch it on to set its value to 1. Press it again to turn it off (0).


## Scripting API
[ScriptButton](/scripting/scripting-api/scriptbutton)

## CSS Styling

Styling a button with the new [CSS](/glossary/css) renderer is a very straightforward process. You can define a stylesheet with the generic `button` HTML selector, the class id `.scriptbutton` or using the specific button name as ID selector (`#Button1`).

It supports the following CSS [pseudo states](/glossary/css#pseudo-states):

- `:hover`: when hovering over the button
- `:active`: when pressing the button
- `:checked`: when the button value is true
- `:disabled`: when the `enabled` property is set to false

### Example Stylesheet

```javascript
const var b = Content.addButton("Button1", 10, 10);

const var laf = Content.createLocalLookAndFeel();

laf.setInlineStyleSheet("
button
{
	background: blue;
	border-radius: 3px;
	color: white;
	transition: background-color 0.5s ease-in;
}

button:hover
{
	font-weight: bold;
}

button:active
{
	margin: 2px;
}

button:checked
{
	background: white;
	color: black;
}
");

b.setLocalLookAndFeel(laf);
```

