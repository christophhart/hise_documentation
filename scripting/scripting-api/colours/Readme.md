---
keywords: Colours
summary:  Generate and modify colours.
author:   Christoph Hart
modified: 04.06.2019
---

The `Colours` keyword gives you access to predefined colour and functions to interpolate and modify colours in a [ScriptPanels](/scripting/scripting-in-hise/scriptpanel) [g](/scripting/scripting-api/graphics) context.

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.fromVec4([0.7,0,1,1])); // [r,g,b,a] float array.
	g.fillEllipse([0,0,50,50]);
	
	g.setColour(Colours.mix(Colours.blue, Colours.red, 0.7)); // interpolates between two colors
	g.fillEllipse([55,0,50,50]);
	
	g.setColour(Colours.withHue(Colours.saddlebrown, 0.1)); // interpolates through the whole hue cycle from 0-1
	g.fillEllipse([110,0,50,50]);
	
	
	g.setColour(Colours.withAlpha(0xAAAAAAAA, 0.2)); // sets the colours alpha transparency 
	g.fillEllipse([0,55,50,50]);
	
	g.setColour(Colours.withBrightness(0xAAAAAAAA, 0.6)); // sets the brightness
	g.fillEllipse([55,55,50,50]);
	
	g.setColour(Colours.withSaturation(0xAAAAAAAA, 0.6)); // set the saturation
	g.fillEllipse([110,55,50,50]);	
	
	g.setColour(Colours.withMultipliedAlpha(0xAAAAAAAA, 0.2)); // sets a multiplied alpha value
	g.fillEllipse([0,110,50,50]);
	
	g.setColour(Colours.withMultipliedBrightness(0xAAAAAAAA, 0.6)); // sets a multiplied brightness
	g.fillEllipse([55,110,50,50]);

	g.setColour(Colours.withMultipliedSaturation(0xAAAAAAAA, 0.6)); // sets a multiplied saturation.
	g.fillEllipse([110,110,50,50]);	
});
```