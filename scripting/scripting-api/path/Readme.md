---
keywords: Path
summary:  The Path object 
author:   Christoph Hart
modified: 31.07.2024
---

The `Path` object with which you can define a path that can be drawn to a [Panel](/ui-components/plugin-components/panel). 
You can create a new path object with [Content.createPath()](/scripting/scripting-api/content#createpath) and draw it with [Graphics.drawPath()](/scripting/scripting-api/graphics#drawpath).


```javascript
const var p = Content.createPath();

p.startNewSubPath(0.0, 0.0);
p.lineTo(0.2, 1.0);
p.lineTo(1.0, 0.2);
p.lineTo(0.7, 1.0);

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{
    g.setColour(Colours.white);
    
    var path_data = {}; // pathStrokeStyle object  
    path_data.Thickness = 3.0;
    
	g.drawPath(p, this.getLocalBounds(10), path_data);
});
```

