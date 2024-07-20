---
keywords: Panel
summary:  A generic Panel component that can subgroup other components and be customized with Mouse-, Paint- and Timer-Callbacks.
author:   Christoph Hart
---

The ScriptPanel is the most powerful UI component because you can customize it and turn it into almost anything you want. A detailed description
can be found here:

[ScriptPanel reference guide](/scripting/scripting-in-hise/scriptpanel)


## Scripting API
[ScriptPanel](/scripting/scripting-api/scriptpanel)


## CSS Styling

The Panel is certainly the most flexible component but in some cases you just want to modify its appearance a little bit beyond what's possible without adding a custom paint routine. In this case, you can just use CSS to style the panel. In order to change the appearance, you can either use the generic HTML tag selector `div`, the class selector `.scriptpanel` or the ID selector `#Panel1`.

It supports hover & active states (if the `allowCallbacks` property is set accordingly).

```javascript
const var p = Content.addPanel("Panel1", 10, 10);

p.set("allowCallbacks", "Clicks & Hover");

const var laf = Content.createLocalLookAndFeel();

laf.setInlineStyleSheet("
div
{
	/** set this property to render a text. */
	content: var(--titleText);
	
	vertical-align: top;
	padding: 5px;
	color: white;
	margin: 10px;
	box-shadow: 0px 0px 5px yellow;
	font-weight: bold;
	border-radius: 3px;
	background: red;
}

div:hover
{
	background: blue;
}

div:active
{
	background: black;
	margin: 10px;
	transition: all 0.5s ease-out;
	box-shadow: none;
}

");

p.setLocalLookAndFeel(laf);

/** Pass in a text that we want to render on the panel. */
p.setStyleSheetProperty("titleText", "Title", "");
```