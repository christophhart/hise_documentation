
```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setOpacity(0.3);
	g.drawImage("{PROJECT_FOLDER}image.png", this.getLocalBounds(0), 0, 0);
});
```

