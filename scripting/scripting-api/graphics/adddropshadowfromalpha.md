
```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{		
	g.drawImage("image", this.getLocalBounds(0), 0, 0); 
	g.addDropShadowFromAlpha(Colours.black, 100); // borderShadow from 1 - 100
});
```