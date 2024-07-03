
Set a font, a color and draw some text.

Load a font from the Image folder with [Engine.setFontAs](/scripting/scripting-api/engine#loadfontas). Then you can set the font by its given fontID.

```javascript
Engine.loadFontAs("{PROJECT_FOLDER}Nunito-Regular.ttf", "nunito");

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setFont("nunito", 48);
	g.setColour(Colours.white);
	g.drawAlignedText("hello", this.getLocalBounds(0), "top");
});
```