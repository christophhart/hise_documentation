
### Example

```javascript
const var Panel1 = Content.getComponent("Panel1");
Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1);
	
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.applyVignette(10, 1, 0.5); // 
	
	g.endLayer();

});
```