While `area` is measured in usual HISE screen-space pixels, xOffset and yOffset are measured in pixels in the source image before any scaling is applied.

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.loadImage("{PROJECT_FOLDER}image.png", "image"); // Load image.png from the "Images" folder

Panel1.setPaintRoutine(function(g)
{	
	g.drawImage("image", this.getLocalBounds(0), 0, 0); // draw the image in the Panel boundaries.
	
});
```
