

### Example

```javascript
const var Panel1 = Content.getComponent("Panel1");
Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{	
	g.beginBlendLayer("Phoenix", 1);
	
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.endLayer();
});
```

## Modes

- "Normal",
- "Lighten",
- "Darken",
- "Multiply",
- "Average",
- "Add",
- "Subtract",
- "Difference",
- "Negation",
- "Screen",
- "Exclusion",
- "Overlay",
- "SoftLight",
- "HardLight",
- "ColorDodge",
- "ColorBurn",
- "LinearDodge",
- "LinearBurn",
- "LinearLight",
- "VividLight",
- "PinLight",
- "HardMix",
- "Reflect",
- "Glow",
- "Phoenix"