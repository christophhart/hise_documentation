
```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	Console.print(g.getStringWidth("Hello"));
});
```