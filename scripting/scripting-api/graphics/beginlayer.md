
Create a new layer with beginLayer() and endLayer() and fill with the code in between.

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(true); 
	
	g.endLayer();
});
```