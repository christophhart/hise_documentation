---
keywords: Look and Feel Customization
summary:  Tweak the global appearance of your plugin
author:   Christoph Hart
modified: 13.10.2019
---
  
A significant amount of feature requests in the HISE forum are more or less about the same subject: UI customization of the stock HISE stuff. Until now, the options were rather limited:

1. Go into C++ and hack around until you like what you see
2. Try to convince me to make the appearance of feature XYZ more customizable. This is a rather tedious procedure and will never stop, because the next request for customization is already lurking around the corner.

But now, there is a shiny new third method: Just **customize the heck out of everything** using the same toolset you might know from the ScriptPanel's paint routine.

> Disclaimer: **everything** doesn't mean everything **NOW**, but since it's extremely easy to add new wrappers, the chances for suceeding with option 2 have vastly increased. During the next days, I'll add more wrappers for popup windows, alert boxes (maybe even the preset browser)...

## Getting started

All you need to do is tell HISE to use a custom scripted LookAndFeel class with the magic spell

```javascript
const var laf = Engine.createGlobalScriptLookAndFeel();
```

From then on, this object will be used to render the UI. Currently you can do two things with it:

1. Change the global font. Just call `laf.setGlobalFont("Comic Sans MS", 24.0)` to improve the visual appearance of everything.
2. Overwrite functions with a customized paint routine. Just pass in a function like this:

```javascript
laf.registerFunction("drawFunctionToOverride", function(g, obj)
{
    // Draw it like a Panel...
});
```

and it will use this paint routine instead of the stock HISE rendering functions for the given task. 

> Be aware that unlike the ScriptPanel's paint routine, this function has two parameters. The second parameters `obj` is an object that contains all important properties that you might want to use during rendering.

That's it. Below you can find a comprehensive list of all functions along with a list of their properties and an example that can be customized.

## Popup menu

### `drawPopupMenuBackground`

> Draws the background of any context menu - combobox popups, right click popups etc.

#### Object properties

| Object Property | Description |
| - | ---- |
| `obj.width` | the width of the context menu |
| `obj.height` | the height of the context menu. |

#### Example

```javascript

// laf is the global look and feel object

laf.registerFunction("drawPopupMenuBackground", function(g, obj)
{
    g.fillAll(0xFF222222);
    g.setColour(Colours.red);
    
    g.drawRect([0, 0, obj.width, obj.height], 1);
});
```

### `drawPopupMenuItem`

> Draws an item in the popup menu. This will be called for each item.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the item within the context menu |
| `obj.isSeparator` | true if the item is a separator. |
| `obj.isActive` | true if the item can be clicked on. |
| `obj.isHighlighted` | if the item is hovered. |
| `obj.isTicked` | if the item is currently ticked. |
| `obj.hasSubMenu` | if the item has a submenu this will be true. |
| `obj.text` | the text that is being displayed. |

#### Example

```javascript
laf.registerFunction("drawPopupMenuItem", function(g, obj)
{
    var a = obj.area;
    var h = a[3];
    
    if(obj.isSeparator)
    {
        g.setColour(Colours.white);
        g.drawLine(a[0]+10, a[0] + a[2]-10, a[1] + a[3]/2, a[1] + a[3]/2, 1.0);
        return;
    }
    
    if(obj.isTicked)
    {
        g.setColour(Colours.white);
        g.fillEllipse([a[0] + h/3, a[1] + h/3, h/3, h/3]);
    }
    
    if(obj.isHighlighted)
    {
        g.setColour(0x22FFFFFF);
        g.fillRect(obj.area);
    }
    
    g.setFont("Times New Roman", 13.0);
    g.setColour(Colours.white);
    g.drawAlignedText(obj.text, [a[0] + h, a[1], a[2] - h, a[3]], "left");
});
```

### `getIdealPopupMenuItemSize`

> Sets the height of the item in the popup menu. This will be called for each item.

Be aware that unlike most other functions listed here, this function only has one argument (`obj`).
The function expects you to return either a 2 element array containing the width and height or a single number for the height only.

| Object Property | Description |
| - | ---- |
| `obj.isSeparator` | true if the item is a separator. |
| `obj.text` | the text that is being displayed. |
| `obj.standardMenuHeight` | the default height of the menu item |

#### Example

```javascript
laf.registerFunction("getIdealPopupMenuItemSize", function(obj)
{		 
	// this will set the width to 200 and height to 50
	//return [200, 50];
	 
	// sets the height to 30
	return 30;
});
```

## Generic UI elements

### `drawToggleButton`

> How to draw the stock HISE button.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the button. |
| `obj.over` | true if the mouse hovers over the button. |
| `obj.down` | true if the mouse clicked on the button. |
| `obj.text` | the button text. |
| `obj.value` | the toggle state. |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`

#### Example

```javascript
laf.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(obj.bgColour);   
    g.fillRoundedRectangle(obj.area, 4.0);
    
    if(obj.over)
        g.fillRoundedRectangle(obj.area, 4.0);
    
    if(obj.down)
        g.fillRoundedRectangle(obj.area, 4.0);
        
    g.setColour(Colours.withAlpha(obj.textColour, obj.value ? 1.0 : 0.3));
    g.setFont("Arial Bold", 12.0);
    g.drawAlignedText(obj.text, obj.area, "centred");
});
```

### `drawRotarySlider`

> How to draw the stock HISE rotary slider (Knob style).

| Object Property | Description |
| -- | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the button. |
| `obj.id` | the ID of the component. |
| `obj.text` | the text property. |
| `obj.value` | the slider value. |
| `obj.valueNormalized` | the normalized slider value. |
| `obj.valueSuffixString` | the slider value plus the suffix. |
| `obj.valueAsText` | The prettified string representation of the slider value. |
| `obj.suffix` | the suffix property. |
| `obj.skew` | the skew factor. |
| `obj.min` | the min value property. |
| `obj.max` | the max value property. |
| `obj.clicked` | the mouse clicked state of the slider. |
| `obj.hover` | the mouse hover state of the slider. |

If the slider is connected to a modulation target, the following properties will also be available:

| Object Property | Description |
| -- | ---- |
| `obj.scaledValue` | the normalized slider value after it has been scaled by all modulation connections with the "Scale" mode. |
| `obj.addValue` | the normalized slider value after all unipolar / bipolar modulation connections have been added to the value. |
| `obj.modulationActive` | whether any modulation connection is active. |
| `obj.modMinValue` | the (normalized) minimal value of the modulated range. |
| `obj.modMaxValue` | the (normalized) maximal value of the modulation range. |
| `obj.lastModValue` | a smoothed value of the last modulation value. |
| `obj.modulationDragState` | indicates if a mod source component is currently being dragged. The value is an integer: 0 = no drag, 1 = drag is active, 2 = drag is active and the mod source is currently hovered over this knob. |

> Note that in order to get the "actual" modulation value that you want to display, you will need to sum up and clip the `scaledValue` and `addValue` properties with `Math.range(obj.scaledValue + obj.addValue, 0.0, 1.0)`.

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`

This is a full example of how to style a modulated rotary knob:

```javascript
const var knobLaf = Content.createLocalLookAndFeel();

const var ARC = 2.4;
const var START = -ARC;
const var ARC_WIDTH = 2.0 * ARC;
const var THICKNESS = 14.0;

var p = {};              
p.EndCapStyle = "rounded"; 
p.JointStyle = "beveled"; 
p.Thickness = THICKNESS;

inline function drawModSlider(g, obj)
{
	local a = Rectangle(obj.area).reduced(THICKNESS/2);
	local n = Rectangle(0.0, 0.0, 1.0, 1.0);

	local track = Content.createPath(); track.setBounds(n);
	track.addArc(n, START-0.05, START + ARC_WIDTH+0.05);
	
	g.setColour(0x77000000);
	g.drawPath(track, a, THICKNESS);
	
	local modRange = Content.createPath(); modRange.setBounds(n);
	modRange.addArc(n, START + obj.modMinValue * ARC_WIDTH,
					   START + obj.modMaxValue * ARC_WIDTH);
					   
	g.setColour(0x22FFFFFF);
	g.drawPath(modRange, a, THICKNESS - 2);
	
	local value = Content.createPath(); value.setBounds(n);
	value.addArc(n, START + obj.valueNormalized * ARC_WIDTH,
					START + Math.range(obj.scaledValue + obj.addValue, 0.0, 1.0) * ARC_WIDTH);
					
	g.setColour(obj.itemColour1);
	g.drawPath(value, a, THICKNESS - 4);
	
	local thumb = Content.createPath(); thumb.setBounds(n);
	thumb.addArc(n, START + obj.valueNormalized * ARC_WIDTH - 0.01,
					START + obj.valueNormalized * ARC_WIDTH + 0.01);
	
	g.setColour(Colours.white);
	g.drawPath(thumb, a, p);
	
	g.drawAlignedText(obj.valueAsText, a, "centred");
	g.setColour(0x55FFFFFF);
	g.drawAlignedText(obj.text, a, "centredBottom");
}

knobLaf.registerFunction("drawRotarySlider", drawModSlider);
```

### `drawLinearSlider`

> How to draw the stock HISE slider (linear and range style).

#### All linear style

| Object Property | Description |
| -- | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the button. |
| `obj.id` | the ID of the component. |
| `obj.text` | the text property. |
| `obj.valueSuffixString` | the slider value plus the suffix. |
| `obj.suffix` | the suffix property. |
| `obj.skew` | the skew factor. |
| `obj.syle` | return the Juce slider style code (Horizontal:2, Vertical:3, Range:9). |

#### Vertical and horizontal style addition

| Object Property | Description |
| -- | ---- |
| `obj.min` | the min value property. |
| `obj.max` | the max value property. |
| `obj.value` | the slider value. |
| `obj.valueNormalized` | the normalized slider value. |

#### Range style addition

| Object Property | Description |
| --- | ---- |
| `obj.valueRangeStyleMin` | the min value property. |
| `obj.valueRangeStyleMax` | the max value property. |
| `obj.valueRangeStyleMinNormalized` | the min normalized slider value. |
| `obj.valueRangeStyleMaxNormalized` | the max normalized slider value. |
| `obj.clicked` | the mouse clicked state of the slider. |
| `obj.hover` | the mouse hover state of the slider. |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`


### `drawComboBox`

> How to draw the stock HISE combobox


| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the button. |
| `obj.text` | the combobox text. |
| `obj.active` | true if an item is selected |
| `obj.enabled` | true if the combobox is enabled and contains items |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`

#### Example

```javascript
s.registerFunction("drawComboBox", function(g, obj)
{
    g.setColour(obj.bgColour);
    g.fillRoundedRectangle(obj.area, 5.0);
    g.setColour(Colours.withAlpha(obj.textColour, (obj.enabled && obj.active) ? 1.0 : 0.2));
    g.setFont("Arial Bold", 11.0);
   
    var a = obj.area;
    g.drawAlignedText(obj.text, [a[0] + 10, a[1], a[2]-10, a[3]], "left");
    var h = a[3];
    g.fillTriangle([a[0] + a[2] - h/3 - 10, a[1] + h/3, h/3, h/3], Math.PI);
});
```

### `drawDialogButton`

> How to draw the text-only buttons that appear on the dialogues and preset browser.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the button. |
| `obj.over` | true if the mouse hovers over the button. |
| `obj.down` | true if the mouse clicked on the button. |
| `obj.text` | the button text. |
| `obj.value` | the toggle state. |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.textColour`

#### Example

```javascript
laf.registerFunction("drawDialogButton", function(g, obj)
{
    g.fillAll(0x22000000);
    
    if(obj.over)
        g.fillAll(0x22000000);
        
    if(obj.down)
        g.fillAll(0x22000000);
       
    g.setFont("Comic Sans MS", 18.0);
        
    g.setColour(Colours.white);
    g.drawAlignedText(obj.text, obj.area, "centred");
});
```

## Alert Windows

An alert window is a popup window that will ask the user a question or show an message. There are a few occasions where these windows appear, but you can use the new API call `Engine.showYesNoWindow()` to use these for yourself.

### `drawAlertWindowIcon`

> Sets custom icons for the different message types.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the button. |
| `obj.type` | The message type. |

The `type` property is guaranteed to be one of those strings:

- `"Question"` for any query that the user has to answer with yes or no. The original icon is a `?`
- `"Info"` any non-error information. The original icon is a `i`
- `"Warning"` indicates that something might go wrong. The original icon is a `!`
- `"Error"` indicates that something went wrong. The original icon is a `X`.

Be aware that you can't load images because these look and feel functions have to be self-containing, but you can load
a SVG-path like shown in the example.

#### Example

```javascript
laf.registerFunction("drawAlertWindowIcon", function(g, obj)
{
    if(obj.type == "Question")
        p.loadFromData([110,109,41,92,60,66,104,145,109,61,98,209,34,78,66,152,110,18,62,18,3,94,66,160,26,127,64,47,93,94,66,170,241,8,65,98,45,178,94,66,63,53,171,65,45,178,94,66,219,249,8,66,47,93,94,66,16,88,60,66,98,37,6,94,66,31,5,78,66,96,229,78,66,244,253,93,66,41,92,
60,66,16,88,94,66,98,244,253,8,66,20,174,94,66,113,61,171,65,20,174,94,66,12,2,9,65,16,88,94,66,98,109,231,131,64,6,1,94,66,117,147,24,62,145,237,78,66,37,6,129,61,10,87,60,66,98,49,8,172,188,219,249,8,66,49,8,172,188,63,53,171,65,37,6,129,61,170,241,
8,65,98,6,129,21,62,10,215,131,64,90,100,123,64,43,135,22,62,37,6,9,65,104,145,109,61,98,113,61,171,65,227,165,155,188,244,253,8,66,227,165,155,188,41,92,60,66,104,145,109,61,99,109,72,225,10,65,8,172,116,64,98,156,196,196,64,45,178,117,64,98,16,120,
64,252,169,193,64,244,253,116,64,70,182,9,65,98,20,174,111,64,6,129,171,65,143,194,101,64,135,22,9,66,86,14,117,64,109,103,60,66,98,14,45,122,64,16,88,70,66,150,67,195,64,141,23,79,66,168,198,9,65,180,72,79,66,98,55,137,171,65,178,157,79,66,160,26,9,
66,143,66,80,66,133,107,60,66,168,70,79,66,98,35,91,70,66,195,245,78,66,166,27,79,66,27,47,70,66,205,76,79,66,233,38,60,66,98,209,162,79,66,248,211,8,66,168,70,80,66,231,251,170,65,199,75,79,66,57,180,8,65,98,231,251,78,66,231,251,193,64,57,52,70,66,
217,206,119,64,2,43,60,66,106,188,116,64,98,31,5,9,66,119,190,111,64,106,188,171,65,8,172,116,64,72,225,10,65,8,172,116,64,99,109,207,247,199,65,6,129,56,66,98,113,61,194,65,6,129,56,66,98,16,189,65,61,138,55,66,164,112,184,65,184,158,53,66,98,242,210,
179,65,51,179,51,66,18,131,177,65,59,95,49,66,18,131,177,65,215,163,46,66,98,18,131,177,65,160,154,42,66,240,167,179,65,188,244,38,66,182,243,183,65,51,179,35,66,98,168,198,188,65,86,14,32,66,195,245,194,65,100,59,30,66,18,131,202,65,100,59,30,66,98,
12,2,215,65,100,59,30,66,137,65,221,65,111,18,34,66,137,65,221,65,137,193,41,66,98,137,65,221,65,4,86,45,66,104,145,219,65,92,143,48,66,27,47,216,65,139,108,51,66,98,25,4,212,65,217,206,54,66,166,155,206,65,6,129,56,66,207,247,199,65,6,129,56,66,99,109,
70,182,210,65,90,100,19,66,98,66,96,205,65,90,100,19,66,33,176,200,65,53,94,18,66,227,165,196,65,229,80,16,66,98,178,157,192,65,150,67,14,66,141,151,190,65,164,240,11,66,141,151,190,65,4,86,9,66,98,141,151,190,65,16,216,4,66,145,237,198,65,178,157,254,
65,141,151,215,65,201,118,241,65,108,209,34,3,66,223,79,206,65,98,55,137,11,66,35,219,191,65,106,188,15,66,215,163,178,65,106,188,15,66,252,169,166,65,98,106,188,15,66,92,143,151,65,33,48,12,66,190,159,137,65,141,23,5,66,94,186,121,65,98,18,131,252,65,
244,253,96,65,244,253,237,65,190,159,84,65,190,159,222,65,190,159,84,65,98,139,108,214,65,190,159,84,65,12,2,204,65,37,6,93,65,66,96,191,65,217,206,109,65,98,119,190,178,65,166,155,126,65,158,239,170,65,6,129,131,65,158,239,167,65,6,129,131,65,98,154,
153,162,65,6,129,131,65,12,2,158,65,41,92,129,65,2,43,154,65,172,28,122,65,98,248,83,150,65,31,133,113,65,115,104,148,65,84,227,103,65,115,104,148,65,76,55,93,65,98,115,104,148,65,215,163,72,65,53,94,158,65,39,49,52,65,186,73,178,65,84,227,31,65,98,197,
32,196,65,227,165,13,65,109,231,210,65,68,139,4,65,190,159,222,65,68,139,4,65,98,205,204,248,65,68,139,4,65,174,71,8,66,219,249,24,65,188,244,18,66,59,223,65,65,98,209,162,29,66,131,192,106,65,213,248,34,66,178,157,140,65,213,248,34,66,252,169,166,65,
98,213,248,34,66,8,172,185,65,121,233,31,66,55,137,202,65,193,202,25,66,125,63,217,65,98,227,37,22,66,160,26,226,65,66,96,15,66,92,143,237,65,225,122,5,66,190,159,251,65,98,61,10,247,65,55,9,5,66,14,45,233,65,96,229,10,66,41,92,225,65,84,99,15,66,98,
205,204,220,65,92,15,18,66,133,235,215,65,90,100,19,66,70,182,210,65,90,100,19,66,99,101,0,0]);

    g.setColour(Colours.white);
    g.fillPath(p, [10, 10, obj.area[2]-20, obj.area[3]-20]);
});
```

### `drawAlertWindow`

> How to draw the background and the title of the alert window

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the button. |
| `obj.title` | The title of the message. |

Be aware that the actual text content is being rendered as markdown, so in order to customize the text appearance, use the next method `getAlertWindowMarkdownStyleData`

#### Example

```javascript
laf.registerFunction("drawAlertWindow", function(g, obj)
{
    g.fillAll(0xFF333333);
    
    var a = [0, 0, obj.area[2], 30];
    g.setColour(0x44000000);
    g.fillRect(a);
    g.setColour(Colours.white);
    g.drawRect(obj.area, 0.3);
    g.setFont("Comic Sans MS", 18);
    g.drawAlignedText(obj.title, a, "centred");
});
```

### `getAlertWindowMarkdownStyleData`

> Define the properties for the markdown rendered text in the alert window.

| Object Property | Description |
| - | ---- |
| `obj.font` | the font name for the paragraph text. |
| `obj.headlineFont` | the font name for the headline text. |
| `obj.codeFont` | the font name for the inplace `code` text. |
| `obj.textColour` | the colour for the paragraph text. |
| `obj.headlineColour` | the colour for the headlines. |
| `obj.codeColour` | the colour for the inplace `code`. |
| `obj.linkColour` | the colour for the links. |
| `obj.fontSize` | the basic font size used for all texts. The headlines get scaled automatically depending on their level. |

Be aware that unlike most other functions listed here, this function only has one argument (`obj`) containing an object that you need to modify. The function expects you to return this `obj` (of course you can create this from scratch, but the best practice is to just modify the object passed in like shown in the example).

#### Example

```javascript
laf.registerFunction("getAlertWindowMarkdownStyleData", function(obj)
{
    obj.font = "Comic Sans MS";
    obj.fontSize = 24;
    obj.headlineColour = Colours.crimson;
    
    return obj;
});
```

## PresetBrowser

### `drawPresetBrowserBackground`

> How to draw the background of the preset browser.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the button. |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`

```javascript
laf.registerFunction("drawPresetBrowserBackground", function(g, obj)
{
    g.fillAll(obj.bgColour);
});
```

### `drawPresetBrowserColumnBackground`

> How to draw the background of a preset browser column.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the column relative to the entire preset browser. |
| `obj.text` | the text that is being displayed if the column is empty (eg. "Add a Category"). |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`

### `drawPresetBrowserListItem`

> How to draw a item in a preset browser column. This will be called for each visible item.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the column relative to the entire preset browser. |
| `obj.text` | the item text (either the folder or preset name). |
| `obj.columnIndex` | the index of the column (0-2) Be aware that the preset column always has the index 2 regardless whether you show the category or bank column. |
| `obj.rowIndex` | the index of the item in the list starting with 0. |
| `obj.selected` | whether the item is active or note. |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`

#### Example

```javascript
laf.registerFunction("drawPresetBrowserListItem", function(g, obj)
{
    if(obj.selected)
    {
        g.setColour(0x22FFFFFF);
        g.fillRoundedRectangle(obj.area, 5.0);
    }
   
    g.setColour(obj.textColour);
    g.drawAlignedText(obj.text, obj.area, "centred");
});
```

### `drawPresetBrowserDialog`

> How to draw the modal dialogue that pops up if you are trying to overwrite or delete a preset.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the dialog box within the preset browser. |
| `obj.text` | The text message that is being displayed. |
| `obj.title` | The action that is about to be performed (usually shown as title). |
| `obj.labelArea` | the area which will be used for the text input (it's always inside `obj.area`. |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`

```javascript
// A little helper function nicked from JUCE...
inline function removeFromTop(area, amountToRemove)
{
    local a = [area[0], area[1], area[2], amountToRemove];
    
    area[1] += amountToRemove;
    area[2] -= amountToRemove;
    return a;
}

laf.registerFunction("drawPresetBrowserDialog", function(g, obj)
{
   g.fillAll(0x88000000) ;
   g.setColour(0xEE555555);
   g.fillRoundedRectangle(obj.area, 5.0);
   g.setColour(0xFF333333);
   g.fillRoundedRectangle(obj.labelArea, 5.0);
   g.setColour(0xFF000000);
   g.drawAlignedText(obj.title, removeFromTop(obj.area, 20), "right");
   g.drawAlignedText(obj.text, removeFromTop(obj.area, 30), "left");
    
});
```

### `drawPresetBrowserTag`

> How to draw a tag in the preset browser.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the tag. |
| `obj.text` | The name of the tag. |
| `obj.blinking` | If you're editing tags of a preset, they will blink. |
| `obj.selected` | If a tag is selected so that only the presets with that tag appear. |
| `obj.value` | Whether the currently loaded preset is tagged with this tag. |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`

#### Example

```javascript

// You need to create a list of tags before they show up...
Engine.setUserPresetTagList(["My Tag1", "Funky Tag", "Best Ones"]);

laf.registerFunction("drawPresetBrowserTag", function(g, obj)
{
    g.setColour(0x11FFFFFF);
    
    if(obj.selected)
        g.fillRoundedRectangle(obj.area, 3.0);
        
    if(obj.blinking)
        g.fillRoundedRectangle(obj.area, 3.0);
        
    g.fillRoundedRectangle(obj.area, 3.0);
    g.setColour(Colours.white);
    
    if(obj.value)
        g.drawRect(obj.area, 1.0);
    
    g.setFont("Comic Sans MS", 14.0);
    g.drawAlignedText(obj.text, obj.area, "centred");
});
```

### `drawNumberTag`

> How to draw the number tag that is displayed for a macro control assignment

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the entire component |
| `obj.macroIndex` | the index for the macro assignment starting with 0. |

#### Example

```javascript
laf.registerFunction("drawNumberTag", function(g, obj)
{
    obj.area[0] += obj.area[2] - 16;
    obj.area[1] += 2;
    obj.area[2] = 14;
    obj.area[3] = 14;
    
    g.setColour(0x88000000);
    g.fillRoundedRectangle(obj.area, 4);
    g.setColour(Colours.white);
    g.drawRoundedRectangle(obj.area, 4, 2);
    
    var letters = ["A", "B", "C"];
    
    g.drawAlignedText(letters[obj.macroIndex], obj.area, "centred");
});
```

### `drawPresetBrowserSearchBar`

> How to draw the search bar of the preset browser.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the search bar |
| `obj.icon` | the search bar icon as path ready to be painted using `g.fillPath(obj.icon, [5, 5, 20, 20]);`. |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`

#### Example

```javascript
laf.registerFunction("drawPresetBrowserSearchBar", function(g, obj)
{
    g.setColour(0x11FFFFFF); 
    g.fillRoundedRectangle(obj.area, 5.0);
    g.setColour(Colours.white);
    g.fillPath(obj.icon, [5, 5, 20, 20]);
});
```

### `createPresetBrowserIcons`

> Sets the paths for the favourite and search icons.

Be aware that unlike most other functions listed here, this function only has one argument (`id`).

The function expects you to return a path that will be used to draw the icon.

| Object Property | Description |
| - | ---- |
| `obj.id` | the icon's id |

#### Example

```javascript
laf.registerFunction("createPresetBrowserIcons", function(id)
{
    if (id == "favorite_on")
        return myFavoriteOnPath;

    if (id == "favorite_off")
        return myFavoriteOffPath;
        
    if (id == "searchIcon")
        return mySearchIconPath;
});
```

## Table Editor

Below are all functions that can be used to draw the table UI element. You can draw the curve as path, define how each point is being displayed and customize the ruler.

### `drawTablePath`

> How to draw the curve of the table function. You can use the path and the area supplied with the `obj` parameter to draw it like any other vector shape.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the table |
| `obj.path` | the curve as path ready to be painted using `g.fillPath(obj.path, obj.area);`. |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`

#### Example

```javascript
laf.registerFunction("drawTablePath", function(g, obj)
{
    g.setColour(obj.bgColour);
    g.drawPath(obj.path, obj.area, 0.5);
    g.setColour(Colours.withAlpha(obj.bgColour, 0.08));
    g.fillPath(obj.path, obj.area);
});
```

### `drawTablePoint`

> How to draw each (draggable) point in the table. This function will be called for each point

| Object Property | Description |
| - | ---- |
| `obj.tablePoint` | the area (`[x, y, w, h]` of the point relative to the table. |
| `obj.hover` | the hover state of the point. |
| `obj.clicked` | the mouse down state of the point. |
| `obj.isEdge` | whether the point is either the start or the end point (which is a bit bigger than the other points). |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`

#### Example

```javascript
saf.registerFunction("drawTablePoint", function(g, obj)
{
    g.setColour(Colours.withAlpha(obj.bgColour, 0.4));
    g.drawEllipse(obj.tablePoint, 0.5);
    
    if(obj.hover)
    {
        g.setColour(Colours.withAlpha(obj.bgColour, 0.4));
        g.fillEllipse(obj.tablePoint);
    }
});
```

### `drawTableRuler`

> How to draw the vertical ruler that displays the last input value.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the table. |
| `obj.position` | the normalised x-position of the ruler. |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`

#### Example

```javascript
saf.registerFunction("drawTableRuler", function(g, obj)
{
    g.setColour(Colours.withAlpha(obj.bgColour, 0.1));
    
    var x = obj.position * obj.area[2];
    
    g.drawLine(x, x, 0, obj.area[3], 10.0);
    g.setColour(obj.bgColour);
    g.drawLine(x, x, 0, obj.area[3], 0.5);
});
```

## Midi Dropper

The MIDI dropper is a field that can be used to drop MIDI files that are loaded to a connected MIDI Player or perform a drag operation of the current MIDI content to an external target (eg. DAWs).  
In order to use it, add a FloatingTile, set the `ContentType` to `MidiOverlayPanel`, then set the `ProcessorId` to the MIDI Player ID you want to connect to and the `Index` to `0`.

### `drawMidiDropper`

> How to draw the drop area

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the drop area |
| `obj.text` | the default text being displayed. |
| `obj.hover` | `true` if a drag operation is active (either an item hovers over the dropper or a external drag is performed |
| `obj.active` | `true` if a sequence is loaded into the connected MIDI Player |


In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour`
- `obj.textColour`

#### Example

```javascript
laf.registerFunction("drawMidiDropper", function(g, obj)
{
    if(obj.active)
        g.fillAll(obj.bgColour);
    
    if(obj.hover)
    {
        g.setColour(obj.itemColour1);
        g.drawRect(obj.area, 3);
    }
    
    g.setColour(obj.textColour);
    g.drawAlignedText(obj.text, obj.area, "centred");
});
```

## AHDSR Graph

How to render the envelope graph for a AHDSR envelope. There are two methods, one for rendering the path (and the active subsection) and one for the ball animation.


### `drawAhdsrPath`

> How to render the envelope graph. This function will get called on different occasions, take a look at the example for an explanation.

| Object Property | Description |
| - | ---- |
| `obj.path` | a reference to the path object that should be rendered. |
| `obj.area` | the area (`[x, y, w, h]` of the path that is being rendered |
| `obj.isActive` | true if this function call is supposed to render the active section |
| `obj.currentState` | the state of the envelope (attack, sustain, hold, etc.) |


In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour`
- `obj.itemColour2`
- `obj.itemColour3`

#### Example

```javascript
laf.registerFunction("drawAhdsrPath", function(g, obj)
{
	// This function will be called for the whole path
	// and once again for the currently active section

	if(obj.isActive)
	{
		// Just render the "active section of the path"
		g.setColour(obj.itemColour2);
		
		// the `area` property contains the original bounds 
		// of the path, so we need to pass it to the method
		g.fillPath(obj.path, obj.area);
	}
	else
	{
		// Render the entire path
		g.fillAll(obj.bgColour);
		g.setColour(obj.itemColour);
		g.drawPath(obj.path, obj.area, 2.0);
	}
});
```

### `drawAhdsrBall`

> How to render the ball animation

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the envelope |
| `obj.position` | the position (`[x, y]` of the ball |
| `obj.currentState` | the state of the envelope (attack, sustain, hold, etc.) |

In addition to these properties, all the colour properties from the interface designer are available too:

- `obj.bgColour`
- `obj.itemColour`
- `obj.itemColour2`
- `obj.itemColour3`

#### Example

```javascript
laf.registerFunction("drawAhdsrBall", function(g, obj)
{
	g.setColour(obj.itemColour3);
	g.fillRect([obj.position[0] - 5, obj.position[1] - 5, 10, 10]);
});
```


