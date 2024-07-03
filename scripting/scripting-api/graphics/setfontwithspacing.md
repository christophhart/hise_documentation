
```javascript
Engine.loadFontAs("{PROJECT_FOLDER}fonts/Nunito-Regular.ttf", "nunito");

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setFontWithSpacing("nunito", 36, 0.08); // from 0 to 1 over the whole width of the panel.
	g.setColour(Colours.white);
	g.drawAlignedText("hello", this.getLocalBounds(0), "top");
});
```