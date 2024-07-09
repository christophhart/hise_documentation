

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawRoundedRectangle([8,8,90,60], 15, 1.5); // area, rounded 0-50, lineWidth
});
```