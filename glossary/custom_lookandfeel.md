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



