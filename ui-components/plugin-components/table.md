---
keywords: Table
summary:  An UI element that can be used to edit a curve.
author:   Christoph Hart
weight:   80
modified: 18.03.2019
properties:
- tableIndex: the table index (starting with 0) of the table that you want to control. In most cases it will just be zero, but eg. the Table Envelope has two tables (0 = Attack, 1 = Release). It might be possible that you have to [rebuild](/working-with-hise/hise-interface/interface-designer#canvas) the interface after changing this value to apply the changes.
- customColours: if true, it will use a flat design with customizable colours, otherwise it will look like the thing above.
---

The Table UI component is one of the most used complex components throughout HISE and can be used to change the curve of many things:

- velocity curves
- CC curves
- wave shaping

Each module that uses a table for anything can be referenced as [`TableProcessor`](/scripting/scripting-api/tableprocessor) which offers ways of changing the curve by scripting calls.

You can also use it on your compiled plugin with a lot of customization options.

## Using the Table

By default, each table has a line that starts at the bottom left and goes all the way to the top right. This is similar to the output function:

`y = x`

where input equals output. It has at least two points which are tied to the left and right edge of the table. You can click anywhere to create a new point, drag it around and change the curve by hovering over a point and moving the mousewheel. If you right click on a point it will be removed.

> If you're inside the main workspace, you need to use Cmd + Mousewheel to prevent accidently changing the curve if you scroll around


## Customization

If you want more control over the table please have a look at [CustomLAF #Table](/glossary/custom_lookandfeel#table-editor).


## Scripting API 
[ScriptTable](/scripting/scripting-api/scripttable)

## CSS Styling

You can also use CSS in order to style the table appearance. It uses the following selectors & additional properties:

- style the **background & the path** of the table using the `.scripttable` class ID (note that the HTML tag `table` is reserved for the Viewport in table mode)
- in order to draw the actual table path, you can use the CSS property `var(--tablePath)` as the `background-image` property, which will contain the Base64 representation of the path. 
- style the **text overlay** with the HTML tag selector `label`
- style the individual **table points** using the class selector `.tablepoint`. It supports the `:hover` and `:active` pseudo-selectors, as well as the `:first-child` and `:last-child` selectors for the first and last point at the left and right edges.
- style the **position indicator** using the class selector `.playhead`. You can calculate the position using the CSS property `var(--playhead)`, which contains the normalised x-position (note that this is consistent with the playhead rendering) of the AudioWaveform).

### Stylesheet Example

```javascript
const var t = Content.addTable("Table1", 10, 10);

t.set("width", 300);
t.set("height", 100);

const var laf = Content.createLocalLookAndFeel();

t.getTableValue(Math.random());


laf.setInlineStyleSheet("

.scripttable
{
	background: #444;
	border-radius: 3px;
	
	
}

.scripttable::before
{
	content: '';
	background-image: var(--tablePath);
	background-color: #aaa;
	box-shadow: inset 0px 2px 4px rgba(0,0,0, 0.5);
}

.tablepoint
{
	background: rgba(255,255,255, 0.5);
	border-radius: 50%;
	margin: 2px;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
}

.tablepoint:hover
{
	background: white;
}

label
{
	background: rgba(255, 255, 255, 0.9);
	color: #222;
	border: 1px solid #aaa;
	padding: 5px;
}

.playhead::before
{
	content: '';
	width: 2px;
	left: calc(calc(var(--playhead) * 100%) - 1px);
	background: white;
	box-shadow: 0px 0px 4px black;
}
");

t.setLocalLookAndFeel(laf);
```


