---
keywords: Graphics
summary:  Panel drawing functions
author:   Do Mayer
modified: 17.07.2024
---

The `Graphics` API gives you access to the [Panel Components](/ui-components/plugin-components/panel) [PaintRoutine](/scripting/scripting-api/scriptpanel#setpaintroutine). You can use it for the graphical drawing of a [ScriptPanel](/scripting/scripting-in-hise/scriptpanel).

Access it with the `g` keyword inside the PaintRoutine function and start drawing. 


```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawRect([0,0,100,50], 2);
});
```
