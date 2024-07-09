
```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawVerticalLine(this.getWidth()/2, 0, this.getHeight()); // xStart, yStart, length
});
```