

```javascript
const var Panel1 = Content.getComponent("Panel1");

const var text = "Lorem ipsum HISEorium explanadum in excelsis christophorum non delandam improprium contenatio cimex."

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawMultiLineText(text, [0,20], this.getWidth(), "left", 2.); // text, width, alignment, lineHeight
});
```
