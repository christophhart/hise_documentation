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

## List of customizable functions


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

### `drawToggleButton`

> How to draw the stock HISE button.

| Object Property | Description |
| - | ---- |
| `obj.area` | the area (`[x, y, w, h]` of the button. |
| `obj.over` | true if the mouse hovers over the button. |
| `obj.down` | true if the mouse clicked on the button. |
| `obj.text` | the button text. |
| `obj.value` | the toggle state. |

In addition to these properties, all the colour properties from the interface designer are available to:

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

In addition to these properties, all the colour properties from the interface designer are available to:

- `obj.bgColour`
- `obj.itemColour1`
- `obj.itemColour2`
- `obj.textColour`


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
