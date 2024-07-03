
```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.pink);
	g.fillEllipse([0,0,this.getWidth(), this.getHeight()]);
});
```