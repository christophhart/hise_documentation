---
keywords: Sliderpack
summary:  Displays a Sliderpack with adjustable sliderAmount.
author:   Christoph Hart
modified: 18.03.2019
---

## Scripting API
[ScriptSliderPack](/scripting/scripting-api/scriptsliderpack)

## CSS Styling

The Sliderpack can be fully styled with CSS. It uses the following selectors for styling the individual elements:

- the entire UI element background can be styled using either the class selector `.scriptsliderpack` or the ID selector (eg. `#SliderPack1`)
- the individual sliders can be styled using the class selector `.packslider`. The styling of those sliders is exactly the same as using the `.scriptslider` class selector for styling Sliders in horizontal [Slider](/ui-components/plugin-components/knob) mode. You can use the `var(--value)` CSS variable to calculate the displayed value. In addition, the `var(--flash)` variable contains the alpha value of the currently active step.
- the text value label can be styled using the generic HTML tag selector `label` (this is consistent across all complex UI elements like table & audio waveforms). Note that the alignment using `text-align` and `vertical-align` will not align the text within the label, but define the actual position in the slider pack (leaving the default alignment within the label as centered).
- the right click line can be styled using the class selector `.sliderpackline`. In order to draw the line path, use the `var(--linePath)` CSS variable as `background-image` property.

### Stylesheet Example

```javascript
const var laf = Content.createLocalLookAndFeel();

const var sp = Content.addSliderPack("SliderPack1", 10, 10);

sp.set("itemColour", 0xFF5911A9);

laf.setInlineStyleSheet("

.scriptsliderpack
{
	background-color: color-mix(in srgb, var(--itemColour) 50%, black);
	border-radius: 3px;
}

/** Style the individual sliders. */
.packslider
{
	margin: 0.5px;
	background-color: rgba(0, 0, 0, 0.1);
}

/** The ::before element will be used to display the value rectangle. */
.packslider::before
{
	content: '';
	background-color: var(--itemColour);
	
	/** We'll use the CSS variable with the normalised slider value to calculate the 
	    height of the value rectangle. */
	height: calc(100% * var(--value));

	width: 100%;
	border-radius: 2px;
	box-shadow: 0px 0px 3px black;
	
	/** This sticks it to the bottom so that the slider behaves like a normal
	    vertical slider. 
	*/
	bottom: 0%;
	
	/** Leave some space for the step sequencer display. */
	margin-bottom: 9px;
}

/** Now add some state customizations using a transition for smooth hover effects. */
.packslider::before:hover
{
	background-color: color-mix(in srgb, var(--itemColour) 90%, white);
	transition: background-color 0.2s;
}

.packslider::before:active
{
	background-color: color-mix(in srgb, var(--itemColour) 80%, white);
}

/** The ::after element is used for drawing the small step sequencer at the bottom. */
.packslider::after
{
	content: '';
	height: 7px;
	
	/** We'll calculate the color using the CSS flash property which contains the 
	    alpha value for the flash state of each slider. */
	background-color: color-mix(in rgba, white var(--flash), #444);
	border-radius: 1px;
	margin-bottom: 2px;
	box-shadow: 0px 0px 3px black;
	
	bottom: 0px;
}

/** Style the text overlay. */
label
{
	color: black;
	background-color: #ddd;
	margin: 3px;
	padding: 2px;
	text-align: right;
	vertical-align: top;
	border-radius: 3px;
	box-shadow: 0px 0px 4px black;
}

/** Style the right click line. */
.sliderpackline
{
	background-image: var(--linePath);
	border: 2px solid white;
	box-shadow: 0px 0px 5px black;
	border-radius: 50%;
}");

sp.setLocalLookAndFeel(laf);
```