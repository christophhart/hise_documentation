The stroke style can be either just a number (then it determines the stroke thickness), 
or a JSON object that allows a more fine grained control over the stroke behaviour:

```javascript
const var c = Content.createPath();

c.startNewSubPath(0.0, 0.0);
c.lineTo(0.0, 1.0);
c.lineTo(1.0, 0.0);
c.lineTo(0.5, 1.0);

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{
    g.fillAll(0x22FFFFFF);
    g.setColour(Colours.white);
    
    var p = {};               // Pick one of these:
    p.EndCapStyle = "butt";   // ["butt", "square", "rounded"]
    p.JointStyle = "rounded"; // ["mitered", "curved","beveled"]
    p.Thickness = 12.0;
    
	g.drawPath(c, this.getLocalBounds(p.Thickness), p);
});
```

For a detailed explanation of these properties, take a look at the JUCE API documentation here:

> [JUCE PathStrokeStyle API](https://docs.juce.com/master/classPathStrokeType.html#af1cf21018ccb9aa84572c1da4ae513b8)