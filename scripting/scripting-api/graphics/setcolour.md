


Set a color for an element to draw. For many elements you first have to set a color to visualise the draw or fill call. 

After typing the "Colours." handle you can select a colour by name of a predefined list.
 
Take a look at the [Colours API](/scripting/scripting-api/colours) for more colours options.

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.fillEllipse([0,0,50,50]);
	
	g.setColour(Colours.grey);
	g.fillEllipse([55,0,50,50]);
	
	g.setColour(Colours.black);
	g.fillEllipse([110,0,50,50]);
	
	g.setColour(Colours.red);
	g.fillEllipse([0,55,50,50]);
	
	g.setColour(Colours.green);
	g.fillEllipse([55,55,50,50]);
	
	g.setColour(Colours.dodgerblue);
	g.fillEllipse([110,55,50,50]);		
});
```