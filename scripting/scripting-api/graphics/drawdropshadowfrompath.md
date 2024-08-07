This will draw a blurred version of the path that you can use to create a drop shadow effect.

```javascript

const var Panel = Content.addPanel("Panel", 0, 0);

const var p = Content.createPath();

// pass an array with numbers to load SVG images
p.loadFromData([110,109,0,245,207,67,128,217,36,67,108,0,236,189,67,128,89,69,67,108,0,
                245,207,67,128,217,101,67,108,192,212,207,67,128,53,81,67,98,217,93,211,
                67,51,180,80,67,123,228,219,67,2,123,91,67,128,144,224,67,0,149,101,67,
                98,39,209,224,67,29,247,89,67,79,60,223,67,36,224,61,67,0,245,207,67,0,
                12,54,67,108,0,245,207,67,128,217,36,67,99,109,128,33,193,67,0,168,88,
                67,108,0,66,193,67,0,76,109,67,98,231,184,189,67,77,205,109,67,69,50,
                181,67,126,6,99,67,64,134,176,67,128,236,88,67,98,154,69,176,67,99,138,
                100,67,49,218,177,67,174,80,128,67,128,33,193,67,192,58,132,67,108,128,
                33,193,67,0,212,140,67,108,192,42,211,67,0,40,121,67,108,128,33,193,67,
                0,168,88,67,99,101,0,0]);

Panel.setPaintRoutine(function(g)
{
    g.fillAll(Colours.grey);
    var area = [20, 20, 100, 100];
    
    g.drawDropShadowFromPath(p, area, 0x88000000, 5, [0, 5]);
    g.setColour(Colours.white);
    g.fillPath(p, area);
});
```

```javascript
const var Panel1 = Content.getComponent("Panel1");

// that's a poor circle, but the blur will save us...
var circlePath = Content.createPath();
circlePath.startNewSubPath(0.5, 0);
circlePath.quadraticTo(1.0, 0.0, 1.0, 0.5);
circlePath.quadraticTo(1.0, 1.0, 0.5, 1.0);
circlePath.quadraticTo(0.0, 1.0, 0.0, 0.5);
circlePath.quadraticTo(0.0, 0.0, 0.5, 0.0);

Panel1.set("width", Panel1.get("height"));

Panel1.setPaintRoutine(function(g)
{
	g.drawDropShadowFromPath(circlePath, this.getLocalBounds(50), Colours.black, 50, [0, 0]);
});


```

