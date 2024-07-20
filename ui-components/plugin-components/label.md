---
keywords: Label
summary:  A text input label
author:   Christoph Hart
properties:
- fontName: Select a Font 
- fontSize: set the size of the Font
- fontStyle: Select one of the font styles
- alignment: choose where you want to align the text in its box. 
- editable: Turn this off to make the text consistent.
- multiline: Enable this to turn on the multiline mode, that automatically breaks the text into multiple lines.
---


The value of the Label returns its current `text` property as a String.

```javascript
const var Label1 = Content.getComponent("Label1");
Console.print(Label1.getValue());
```

## Scripting API
[ScriptLabel](/scripting/scripting-api/scriptlabel)

## CSS Styling

You can use CSS to style the label beyond the possibilities of the default HISE properties. The selector for the label is `label`, but there are other selectors for additional styling:

- style the text input using the `input` selector (while typing text)
- style the selection (text colour and background colour) with the `::selection` selector

> Note that the `input` selector will also style all text input elements (eg. when shift-clicking on a [Slider](/ui-components/plugin-components/knob)). The `label` selector is also used for styling the popup labels for all components (Sliders, Tables & SliderPacks).

### Stylesheet Example

```javascript
const var l = Content.addLabel("Label1", 10, 10);

l.set("textColour", 0xFFEEEEEE);
l.set("bgColour", Colours.darkgoldenrod);

const var laf = Content.createLocalLookAndFeel();

laf.setInlineStyleSheet("

*
{
	letter-spacing: 2px;
	font-weight: bold;
}

/** Render the default appearance. */
label
{
	background-color: var(--bgColour);
	color: var(--textColour);	
	border-radius: 3px;
}

/** If you edit the text, it will use this selector. */
input
{
	background: red;
	text-align: center;
	padding-top: 0.5px;
	padding-left: 2px;
	caret-color: blue;
}

/** Style the text selection with this selector. */
::selection
{
	background: green;
	color: white;
}
");

l.setLocalLookAndFeel(laf);
```