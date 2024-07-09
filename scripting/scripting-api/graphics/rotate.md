
Use this with a path object.

```javascript
const var Panel1 = Content.getComponent("Panel1");

const var p = Content.createPath();

p.startNewSubPath(0.0, 0.0);
p.lineTo(0, 0);
p.lineTo(0.8, 1);
p.lineTo(1, 0);

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.withAlpha(Colours.white, 0.5));	
	g.rotate(Math.toRadians(180), [this.getWidth()/2,this.getHeight()/2]);
	g.fillPath(p, this.getLocalBounds(0));
});
```