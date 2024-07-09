
> under construction
```javascript
const var Panel1 = Content.getComponent("Panel1");

const var fft = Engine.createFFT();

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawFFTSpectrum(fft, this.getLocalBounds(0));

});
```