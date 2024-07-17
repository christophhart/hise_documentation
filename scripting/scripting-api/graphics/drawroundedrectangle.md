

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	
	// area, float value (0-50) for all corners or object with {Cornersize:15, Rounded:[1,1,1,1]}, lineWidth
	g.drawRoundedRectangle([8,8,90,60], {CornerSize:15, Rounded:[0,1,1,0]}, 1.5); 
});
```