

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(true);
	
	g.setColour(Colours.white);
	g.fillRoundedRectangle(this.getLocalBounds(10), 50);
	g.gaussianBlur(12);
	
	g.endLayer();
});
```