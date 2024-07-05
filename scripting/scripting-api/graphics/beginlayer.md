
### Example

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1); 
	
	g.endLayer();
});
```