By default a path's bounding box is defined by its shapes and set to the maximal rectangle area that covers all shapes in the path. In most path rendering functions this bounding box will be taken into account when scaling the path to the requested drawing dimensions.

In some cases (eg. when rendering a knob ring) this might lead to an unwanted skewing of the path, because the arc shape might not cover the entire area that it was painted on. In order to solve this, you would have to start two empty subpaths with the corners of your desired bounding box so that the scaling will ignore the actual shape of the arc.

This function is just a shortcut to this procedure and can be called with a [Rectangle](/scripting/scripting-api/rectangle) object for the ultimate code beauty:


```javascript
const var Panel1 = Content.getComponent("Panel1");
const var ARC = -2.4;

Panel1.setPaintRoutine(function(g)
{
	g.fillAll(0x22FFFFFF);

	var p = Content.createPath();
	var r = Rectangle(this.getLocalBounds(5));
	var n = Rectangle(1.0, 1.0);
	
	// this adds an arc to the path AND sets the bounding box
	// to the exact dimensions of the arc shape
	p.addArc(n, -ARC, ARC);
	g.setColour(Colours.white);
	
	// drawing the path will now scale the bounding box to the
	// panel's bounds and skew the shape along the process
	g.drawPath(p, r, 10);
	g.drawAlignedText("UGGO!", r, "centred");
});

const var Panel2 = Content.getComponent("Panel2");

Panel2.setPaintRoutine(function(g)
{
	g.fillAll(0x22FFFFFF);

	var p = Content.createPath();
	var r = Rectangle(this.getLocalBounds(5));
	var n = Rectangle(1.0, 1.0);
	
	// now we set the bounding box to the normalised area
	p.setBounds(n);
	
	// this function basically does this, but shorter and leaner:
	//p.startNewSubPath(0.0, 0.0);
	//p.startNewSubPath(1.0, 1.0);
	
	// the bounding box is no longer dependent on the actual shape
	// of the arc
	p.addArc(n, -ARC, ARC);
	g.setColour(Colours.white);
	
	// now we can scale the bounding box correctly without skewing
	// the arc shape
	g.drawPath(p, r, 10);
	g.drawAlignedText("NOICE!", r, "centred");
});
```