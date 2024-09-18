---
keywords: ComboBox
summary:  A ComboBox to select different items from an indexed `items` list
author:   Christoph Hart
modified: 18.03.2019
properties:
- items: Put in a list with the values that you want to select. Seperate the values with a newline.
- fontName: Select a font of your system fonts. 
- fontSize: Set the font size
- fontStyle: Set the font style
- popupAlignment: Controls where the popup menu will appear relative to the combobox
- enableMidiLearn: If `true` then you can right-click and assign this combobox to a MIDI controller / macro control.
- useCustomPopup: If `true`, then you can use the [advanced syntax](/scripting/scripting-in-hise/scriptpanel#context-menus) for creating complex popup menus with headers, submenus etc.
---

## Scripting

Each ComboBox-selection returns the selected items index value. 
> Attention: the index starts with 1.

`ComboBox1.getItemText()` returns the text of the item.

```javascript
const var ComboBox1 = Content.getComponent("ComboBox1");

inline function onComboBox1Control(component, value)
{
	Console.print(value);
	Console.print(ComboBox1.getItemText());
};

Content.getComponent("ComboBox1").setControlCallback(onComboBox1Control);

```
 
## Scripting API
[ScriptCombobox](/scripting/scripting-api/scriptcombobox)

## CSS Styling

You can define a stylesheet that customizes the look of the combobox with the generic `select` HTML tag selector, the class id `.scriptcombobox` or using the specific button name as ID selector (`#ComboBox1`).

It supports the following CSS [pseudo states](/glossary/css#pseudo-states):

- `:hover`: when hovering over the combobox
- `:active`: when pressing the combobox
- `:disabled`: when the `enabled` property is set to false

> In order to draw the arrow for the drop down you can use the `::before` / `::after` [pseudo elements](/glossary/css#pseudo-elements) and give them a path (as shown below in the example).

### Example Stylesheet

```javascript
const var cb = Content.addComboBox("ComboBox1", 10, 10);

cb.set("items", "Item1\nItem2\nItem3");

const var laf = Content.createLocalLookAndFeel();

laf.setInlineStyleSheet("

/** Style the appearance of the combobox. */
select
{
	background: #333;
	border-radius: 3px;
	color: white;
	letter-spacing: 1px;
	font-weight: bold;
	text-align: left;
	padding: 10px;
}

/** Draw the drop down arrow. */
select::before
{
	/** CSS requires that you specify a content property for
	    any pseudo element that is supposed to be shown. */
	content: '';
	
	/** Pass in a Base64 string for any path using the standard HISE Path converter. */
	background-image: \"84.t0lavsBQ76.tCwF..VDQX+9fCw1WJBDQnj.cCwFp5YBQ3NhqCwly0w.QzMCcCwF..d.QTV.gCwFD6YBQpsevCwVtvsBQn.AtCwlavsBQ76.tCMVY\";
	
	background-color: rgba(255,255,255, 0.4);
	
	/** Set the position to absolute so that it won't cut into the text area. */
	position: absolute;
	width: 100vh;
	margin: 8px;
	right: 0px;
}

/** Make the arrow light up at hover. */
select::before:hover
{
	background-color: white;
}
");

cb.setLocalLookAndFeel(laf);
```

### Styling the popup menu

The drop down menu that is shown when you click on the combobox can be styled with the `popup-menu` / `popup-item` classes. 

> Note that this will also apply to right-click menus of other components that you assign a CSS Look and Feel object.


```javascript
const var cb = Content.addComboBox("ComboBox1", 10, 10);

/** Let's use the advanced syntax to show off some of the special
    popup menu styles. 
*/
cb.set("useCustomPopup", true);
cb.set("items", "Item1\nItem2\n___\n~~Item3~~");

const var laf = Content.createLocalLookAndFeel();

laf.setInlineStyleSheet("
select
{
	background: #333;
	color: white;
}

/** This styles the entire background of the menu. */
.popup
{
	background: #333;
}

/** This styles the individual items in a menu. */
.popup-item
{
	background: transparent;
	color: #999;
	padding: 10px;
}

/** The currently hovered popup menu item. */
.popup-item:hover
{
	background: rgba(255,255,255, 0.2);
	
}

/** The currently selected popup menu item. */
.popup-item:active
{
	color: white;

	font-weight: bold;
}

/** A disabled popup menu item. */
.popup-item:disabled
{
	color: #555;
}

/** A separator item can be styled using the HTML tag for horizontal rulers. */
hr
{
	margin: -10px;
	border: 1px solid #444;
}

");

cb.setLocalLookAndFeel(laf);
```



