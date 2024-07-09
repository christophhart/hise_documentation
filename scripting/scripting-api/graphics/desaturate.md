
Completely desaturates the image to grayscale.

```javascript
const var Panel1 = Content.getComponent("Panel1");
Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{	
	g.beginBlendLayer("Phoenix", 1);
	
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.desaturate();
	
	g.endLayer();
});
```