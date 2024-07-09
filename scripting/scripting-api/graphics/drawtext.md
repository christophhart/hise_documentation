
This will draw a text string to the center of the panel. If you don't specify your own font it will use the HISE default font.


```javascript
Engine.loadFontAs("{PROJECT_FOLDER}fonts/Nunito-Regular.ttf", "nunito");

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setFont("nunito", 32);
	g.setColour(Colours.white);
	g.drawText("Hello World", this.getLocalBounds(0));
});
```

