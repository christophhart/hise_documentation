
```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);	
	g.fillTriangle([0,0,this.getWidth(), this.getHeight()], Math.toRadians(90));
});
```