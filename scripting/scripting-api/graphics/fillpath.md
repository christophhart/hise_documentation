
```javascript
const var p = Content.createPath();

p.startNewSubPath(0.0, 0.0);
p.lineTo(0, 0);
p.lineTo(0.5, 1);
p.lineTo(1, 0);

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.withAlpha(Colours.white, 0.5));	
	g.fillPath(p, this.getLocalBounds(0));
});
```