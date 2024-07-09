

```javascript
const var Panel1 = Content.getComponent("Panel1");
Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

const var c = Content.createPath();

c.startNewSubPath(0.0, 0.0);
c.lineTo(1.0, 1.0);
c.lineTo(1.0, 0.0);

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1);
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.applyMask(c, this.getLocalBounds(0), 0); // 1 to invert the mask. 
	
	g.endLayer();

});
```