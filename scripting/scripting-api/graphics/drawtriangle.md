
```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawTriangle(this.getLocalBounds(0), Math.toRadians(180), 2);
});
```