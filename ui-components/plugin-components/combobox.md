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