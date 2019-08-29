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