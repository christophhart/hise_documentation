

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1);

	g.setColour(Colours.grey);
	g.fillRect(this.getLocalBounds(0));
	g.applyGradientMap(Colours.withBrightness(Colours.blue, 0.5), Colours.withBrightness(Colours.red, 0.7));
	
	g.endLayer();

});
```