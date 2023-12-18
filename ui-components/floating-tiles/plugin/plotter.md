---
keywords: Plotter
summary:  A visualiser for modulation values
author:   Christoph Hart
modified: 27.11.2023
properties:
- Font: Select a font
- FontSize: Set the fontsize
- ProcessorId: The ID of the modulator that this plotter should connect to
---
  
The plotter is a special visualiser that shows an oscilloscope of a modulation signal.

> If you want to display the spectrum / goniometer or oscilloscope of an audiosignal, take a look at the [Audio Analyser](/ui-components/floating-tiles/plugin/audioanalyser) instead.

Be aware, that unlike the analyser floating tile, the plotter will only read the modulation values if the interface is visible (because there are many modulators in a project and this keeps the overhead low).

You can customize the plotters appearance by setting the colours and font or, if you want more control, by assigning a LookAndFeel object to it. It uses the same callbacks as the other analysers, so you need to register these functions:

```javascript
const var laf = Content.createLocalLookAndFeel();

laf.registerFunction("drawAnalyserBackground", function(g, obj)
{
	 g.fillAll(Colours.red);
});

laf.registerFunction("drawAnalyserGrid", function(g, obj)
{
	// this is never called, there's no grid here...
	Console.assertTrue(false);
});

laf.registerFunction("drawAnalyserPath", function(g, obj)
{
	 g.setColour(Colours.white);
	 g.fillPath(obj.path, obj.area);
});

const var FloatingTile1 = Content.getComponent("FloatingTile1");

FloatingTile1.setLocalLookAndFeel(laf);
```

The text overlay is not customizable using the look and feel, however you can deactivate it by assigning a transparent colour as `textColour`. Another nice feature of the plotter is its context menu: if you right click on the plotter you can set the timespan for the displayed modulation values as well as temporarily freeze the display if you want to take your time and analyse the signal.