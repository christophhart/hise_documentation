This allows you to send a dynamic value to all components that use the LookAndFeel object. Just call this method with a valid ID, a value and supply an optional type conversion and then query the value in CSS using the standard [CSS syntax for variables](/glossary/css#variable-handling):

```javascript
// HiseScript:
// Set myProperty as a pixel value
laf.setStyleSheetProperty("myProperty", "10", "px");

// CSS side
button
{
	/** read the property and use it as border radius. */
	border-radius: var(--myProperty);
}
```

> Note that calling this method will automatically repaint the components so you don't have to explicitely repaint them with `sendRepaintMessage()` or friends.

### Inbuilt colour properties

Be aware that HISE will automatically send changes to any of the colour properties from an UI component to the CSS, so if you eg. want to update the background color based on the `bgColour` property, you don't need to use this method, but just use the variable in your CSS code like this:

```javascript
button
{
	background-color: var(--bgColour);
}
```

### Value converters

The third argument in the function call is a string that can be used to convert the value into a CSS value domain.

| Type | Expected Value | Description |
| = | == | === |
| `""` | any string | does no conversion and just passes the raw string over to CSS |
| `"px"` | a number | uses the number as pixel value |
| `"%"` | a float number between 0.0 and 1.0 | converts the number to a percentage value. |
| `"color"` | a colour value (either int or string) | converts any colour from HiseScript (eg. `Colours.red` or `0xFF00FF00` into a propert CSS string ('#FF00FF00') |
| `path` | a [Path](/scripting/scripting-api/path) object. | Converts the given path into a base64 string which then can be used as `background-image` property to replace the standard background rectangle path. |
| `class` | a string | writes one or multiple class selectors into the component. |

```javascript
// HiseScript:
// Raw string
laf.setStyleSheetProperty("rawString", "bold", "");

// Pixel value (25px)
laf.setStyleSheetProperty("pixelVariable", 25, "px");

// Relative value (80%)
laf.setStyleSheetProperty("percentageVariable", 0.8, "%");

// Colour value (#FF0000FF)
laf.setStyleSheetProperty("colorVariable", Colours.blue, "color");

// Path object (some Base64 gibberish)
const var p = Content.createPath();
p.addEllipse([12, 12, 30, 30]);
laf.setStyleSheetProperty("pathVariable", p, "path");

// set the CSS class
const var b = Content.getComponent("button");
b.setStyleSheetProperty("class", ".someclass", "class");

// CSS side
button
{
	font-weight: var(--bold);
	padding-left: var(--pixelVariable);
	transform: scale(var(--percentageVariable));
	background-color: var(--colorVariable);
	background-image: var(--pathVariable);
}

.someclass 
{
	/* will be applied to the `b` Button only. */
	background: red;
}
```

The last conversion allows you to pass any path in HISE over to CSS and render it with box shadows & different stroke types. 

### Precedence

Using this method from the LAF object will send the value to all objects that use the LAF, however there is another [method](/scripting/scripting-api/scriptbutton#setstylesheetproperty) that you can call on individual UI components in order to use different properties for different components. 

In that case, the properties set by the component method will always override the properties set by this method, even if they are executed in reversed order:

```javascript
const var b1 = Content.addButton("b1", 0, 0);
const var b2 = Content.addButton("b2", 130, 0);

const var laf = Content.createLocalLookAndFeel();

b1.setLocalLookAndFeel(laf);
b2.setLocalLookAndFeel(laf);

/** Set the inline style sheet that just colours the button. */
laf.setInlineStyleSheet("button{
	background-color: var(--c);
}");

/** Set the component specific property. */
b1.setStyleSheetProperty("c", Colours.blue, "color");

/** Set the "global" property for all components. */
laf.setStyleSheetProperty("c", Colours.red, "color");
```

In this code example, the first button will be blue, even if the property for the component was set before setting the global component.

### Debugging properties

In order to check the value of each property for individual components, you can right click on any UI component in the Interface designer that has assigned a CSS LookAndFeel and then choose `Show CSS debugger` in the context menu. Doing so for the second button will show this:

```javascript
Current variable values:
{
  "c": "#FFFF0000",
  "bgColour": "#00000000",
  "itemColour": "#00000000",
  "itemColour2": "#00000000",
  "textColour": "#00000000"
}
==============================

/* CSS for component hierarchy: */

button #b2 .scriptbutton

/** Component stylesheet: */
button #b2 .scriptbutton {
  background-color[]: var(--c)
}


/** Inherited style sheets: */
button {
  background-color[]: var(--c)
}
```

