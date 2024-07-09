
> old multi-line text method

```javascript
Engine.loadFontAs("{PROJECT_FOLDER}fonts/Nunito-Regular.ttf", "nunito");

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setFont("nunito", 32);
	g.setColour(Colours.white);
	g.drawFittedText("Hello World", this.getLocalBounds(0), "topLeft", 2, 20);
});
```