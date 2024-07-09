
```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.drawDropShadow(this.getLocalBounds(12), Colours.black, 20);
	g.setColour(Colours.grey);
	g.fillRect(this.getLocalBounds(12));
});
```