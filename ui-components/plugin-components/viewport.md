---
keywords: Viewport
summary:  A Viewport with a scrollbar, that can hold (and scroll) a single component.
author:   Christoph Hart
modified: 18.03.2019
---
  
## CSS Styling

If you are using the table as a item list, you can style its appearance using the `scriptviewport` class selector (or the ID selector `#ScriptViewport1`). With this selector, you can style the background of the entire component. In order to customize the individual components you can use these additional selectors:

- for styling the items in the list, use the HTML tag selector for table rows `tr`. It supports `:hover`, `:active` and `:checked` pseudo states with the same concept as the Buttons (`:active` is pressed and `:checked` is selected)
- for styling the scrollbar use the HTML tag selector `scrollbar`. It also supports `:hover` and `:active` states.

### Example Stylesheet

```javascript
const var vp = Content.addViewport("Viewport1", 10, 10);

// set the properties so that it shows up as item list
vp.set("useList", true);
vp.set("height", 200);
vp.set("bgColour", 0);
vp.set("items", "Item1\nItem2\nItem3\nItem1\nItem2\nItem3\nItem1\nItem2\nItem3\n");

const var laf = Content.createLocalLookAndFeel();

laf.setInlineStyleSheet("
/** Style the items in the list. */
tr
{
	background-color: orange;
	color: black;
	text-align: left;
	padding: 10px;
	margin: 2px;
	border-radius: 5px;
	box-shadow: 0px 0px 2px black;
}

tr:hover
{
	background-color: color-mix(in rgba, orange 60%, white);
	transition: background-color 0.3s ease-in-out;
}

/** On mouse down. */
tr:active
{
	background: color-mix(in rgba, orange 40%, white);
	margin: 3px;
}

/** If the row is selected. */
tr:checked
{
	background: red;
	font-weight: bold;
	border: 3px solid rgba(255, 255,255, 0.4);
}

/** Style the scrollbar. */
scrollbar
{
	background-color: orange;
	
	/** Defining the width overrides the scrollbarThickness property. */
	width: 16px;
	margin: 3px;
	border-radius: 5px;
}

scrollbar:hover
{
	background-color: color-mix(in rgba, orange 60%, white);
	transition: background-color 0.3s ease-in-out;
}
");

vp.setLocalLookAndFeel(laf);
```

