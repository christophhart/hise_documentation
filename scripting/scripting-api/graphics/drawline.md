
```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawLine(0, 100, 50, 100, 1.2); // x1,x2,y1,y2,linewidth
});
```