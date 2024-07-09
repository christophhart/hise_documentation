
```javascript
Engine.loadFontAs("{PROJECT_FOLDER}fonts/Nunito-Regular.ttf", "nunito");

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setFont("nunito", 32);
	g.setColour(Colours.white);
	g.drawAlignedText("Hello World", this.getLocalBounds(0), "top");
	
});
```

### Alignment positions

- "left"
- "right"
- "top"
- "bottom"
- "centred"
- "centredTop"
- "centredBottom"
- "topLeft"
- "topRight"
- "bottomLeft"
- "bottomRight"