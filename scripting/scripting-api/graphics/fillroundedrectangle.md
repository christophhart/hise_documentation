
```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.fillRoundedRectangle(this.getLocalBounds(10), 25); // area, rounded 0 - 100+
});
```