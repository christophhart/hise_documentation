---
keywords: Button
summary: Off/On button (0/1)
author:   Christoph Hart
modified: 18.03.2019
properties:
- radioGroup: Set to 1 to makes this button part of a radioGroup 1. Multiple buttons in a common radioGroup will toggle between each other.
- scaleFactor: if you use a filmstrip, this scalefactor will be used to resize the image. You can use this to support Retina displays.
- filmstripImage: Select a filmstrip to replace the default button skin.
- numStrips: Set the correct amount of the strips in the filmstrips
- isVertical: Set to false if not vertical (depreciated)
- isMomentary: in Momentary mode a button switches its value to 1 when clicked, and back to 0 on mouse release.
---

A classic Button. Switch it on to set its value to 1. Press it again to turn it off (0).


## Scripting API
[ScriptButton](/scripting/scripting-api/scriptbutton)