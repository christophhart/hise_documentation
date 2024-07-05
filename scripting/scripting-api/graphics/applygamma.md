
```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1);
	g.setGradientFill([Colours.black, 0, 0,
				   Colours.white, this.getWidth(), 0,
				   false]);
	g.fillRect(this.getLocalBounds(0));
	
	g.applyGamma(1.5); // baseline 1
	
	g.endLayer();
});
```