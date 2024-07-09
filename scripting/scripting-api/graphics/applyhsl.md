
```javascript
const var Panel1 = Content.getComponent("Panel1");
Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1);
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.applyHSL(270, 100, 0); // Hue: 0 - 360, Saturation: 0 - 100: Lightness: 0 - 100
		
	g.endLayer();
});
```

See [HSL on Wikipedia](https://en.wikipedia.org/wiki/HSL_and_HSV) for more about HSL.