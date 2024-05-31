This method uses the awesome [melatonin blur](https://github.com/sudara/melatonin_blur) library for a fast text shadow rendering. It has the similar parameters as the `drawAlignedText` function, but expects a JSON object with the shadow parameters as additional last argument. The JSON object can have these properties that will define the appearance of the shadow:

| Property | Type | Description |
| - | --- | ------ |
| `Colour` | int or String or constant | the colour of the shadow. |
| `Offset` | `[x, y]` | A point array indicating the offset of the shadow. |
| `Radius` | int | the amount of blur in pixels. 0 means no blur at all. |
| `Spread` | int | the scaling of the shadow. Using positive values will make the shadow bigger. |
| `Inner` | bool | Whether to render a outer shadow (drop shadow) or an inner shadow (inner glow). |

Here's some funk for y'all:

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{
	g.setFontWithSpacing("Comic Sans MS", 40.0, 0.05);
	g.drawAlignedTextShadow("funky", this.getLocalBounds(0), "centred", { "Colour": Colours.red, "Offset": [0, 4], "Radius": 10});
	g.drawAlignedTextShadow("funky", this.getLocalBounds(0), "centred", { "Colour": Colours.green, "Offset": [2, 2], "Radius": 0});
	g.setColour(Colours.white);
	g.drawAlignedText("funky", this.getLocalBounds(0), "centred");
});
```