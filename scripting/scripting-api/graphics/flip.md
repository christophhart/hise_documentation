
Flips the Panel horizontally. Set the boolean to  0 to flip. 

```javascript
const var p = Content.createPath();

p.startNewSubPath(0.0, 0.0);
p.lineTo(0, 0);
p.lineTo(0.8, 1);
p.lineTo(1, 0);

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.withAlpha(Colours.white, 0.5));	
	g.flip(0, this.getLocalBounds(0));
	g.fillPath(p, this.getLocalBounds(0));
});
```