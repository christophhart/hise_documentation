
Draws a differently colored background each time the panel is redrawn. This can be used to debug the paint routine.

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.drawRepaintMarker(""); 
});
```