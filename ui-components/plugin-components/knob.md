---
keywords: Slider
summary:  The knob / slider element can be used to set values with dragging.
author:   Dominik Mayer
index: 01
properties: 
- min: The min value of the slider
- max: The max value of the slider
- stepSize: Select the resolution of the value display
- mode: Select between, Linear, Frequency, Decibel, Time... to adjust the sliders value display to its connected modules domain type. 
- scaleFactor: if you use a filmstrip, this scalefactor will be used to resize the image. You can use this to support Retina displays.
- style: Display the Slider as a knob, vertical or horizontal slider.
- middlePosition: Set the value of the sliders middle position. If this value is skewed, the scale of the values will adapt accordingly.
- suffix: Set a custom suffix
- filmstripImage: Select a filmstrip to replace the default slider skin. See more below
- numStrips: Set the amount your filmstrips strips.
- isVertical: Set to false if not vertical (depreciated)
- mouseSensitivity: Adjust this value to finetune how quick/slow you can drag the slider.
- dragDirection: Select a drag direction
- showValuePopup: Displays a Value Popup that shows the sliders value
- showTextBox: If in horizontal or vertical mode: show slider value or not.
---

## Filmstripping

## Scripting API
[ScriptSlider](/scripting/scripting-api/scriptslider)

## CSS Styling

Styling a slider / knob with [CSS](/glossary/css) is a bit more complex than using CSS for other UI elements because there is no 1:1 representation in a "standard" CSS context. However you can still get pretty far if you combine it with some HISE scripting. 

In order to define the look of a slider or knob, you can use either the class selector `.scriptslider` or the ID selector `#Knob1`. The following [pseudo states](/glossary/css#pseudo-states) are available:

- `:hover` for hovering over the slider
- `:active` when you click on (and drag) the slider
- `:disabled` when the slider's `enabled` property is set to false

In almost any case you will need to use the two [pseudo elements](/glossary/css#pseudo-elements) `::before` and `::after` to implement the different parts of the slider:

- in a horizontal slider the `::before` element will be used to render the "track" and the `::after` element for the thumb of the slider
- in a knob the `::before` element will be used to render the full arc of the knob circle and the `::after` element the path of the value
- in order to calculate how the slider should display its value, you will need to use the [CSS variable](/glossary/css#variable-handling) `var(--value)` that will contain the normalized value from 0...1.

### Example Stylesheet

Let's start with a horizontal slider example first:

```javascript
const var s = Content.addKnob("Knob1", 10, 10);

s.set("showTextBox", false);
s.set("style", "Horizontal");
s.set("height", 24);

const var laf = Content.createLocalLookAndFeel();

laf.setInlineStyleSheet("
.scriptslider
{
	background: #333;
	margin: 0px;
	border: 2px solid #555;
	border-radius: 5px;
	box-shadow: inset 0px 2px 5px black;
}

/** This is used for the value rectangle. */
.scriptslider::before
{
	/** Required so that it will be rendered. */
	content: '';	
	background: #555;
	margin: 4px;
	/** we can use the --value variable for calculating the width
	    of the value rectangle. Note that the calc() implemention
	    in HISE does not support multiple operators so you have to
	    use one calc expression per operator!) */
	width: max(10px, calc(5px + calc(100% * var(--value))));
	border-radius: 3px;
}

/** Define some hover & active states. */
.scriptslider::before:hover { background: #666; }
.scriptslider::before:active { background: linear-gradient(to bottom, #777, #666); }
");

s.setLocalLookAndFeel(laf);
```

In order to implement a knob with a radial value display, we need to create a path in HISE that we pass onto the slider. We'll use a broadcaster attached to the [component value](/scripting/scripting-api/broadcaster#attachtocomponentvalue) for this (so you can easily add multiple sliders by just attaching the broadcaster to more than one component.

```javascript
const var s = Content.addKnob("Knob1", 10, 10);

s.set("showTextBox", false);
s.set("style", "Knob");
s.set("height", 50);
s.set("width", 50);

const var laf = Content.createLocalLookAndFeel();
const var vp = Content.createPath();
const var ARC_POS = 2.4;

/** This function is called from the broadcaster whenever the slider value changes. */
inline function updateSliderPath(component, value)
{
	// We can reuse the same path since it is not stored as reference. */
	vp.clear();
	vp.startNewSubPath(0.0, 0.0);
	vp.startNewSubPath(1.0, 1.0);
	vp.addArc([0.1, 0.1, 0.8, 0.8], 
	           -1.0 * ARC_POS, 
	           -1.0 * ARC_POS + 0.2 +  component.getValueNormalized() * (2.0 * ARC_POS - 0.2));
	           
	// We want it to render the "outline" of the arc so we need to transform it to a 
	// stroked path
	local sp = vp.createStrokedPath(0.2, []);
	
	// Now we pass in the stroked path using the "path" conversion type to create a Base64
	// string that is stored to the stylesheet of the component.
	// Note that this must not use laf.setStyleSheetProperty() because that would send the path
	// to all registered sliders!
	component.setStyleSheetProperty("valuePath", sp, "path");
}


// Now we add the broadcaster and attach it to our slider.
const var sliderPathUpdater = Engine.createBroadcaster({
  "id": "sliderPathUpdater",
  "args": ["component", "value"]
});

// If you want more sliders, just pass them into this array here
sliderPathUpdater.attachToComponentValue(["Knob1"], "");
sliderPathUpdater.addListener(0, "\"update the slider path\"", updateSliderPath);

laf.setInlineStyleSheet("
.scriptslider
{
	color: white;
	vertical-align: bottom;
	font-size: 0.8em;
}

/** Draw the circle in the middle. */
.scriptslider::after
{
	content: '';

	/** Needs to set to absolute so that the area won't be 
	    sliced away from the normal slider area which prevents the
	    text from showing up. */
	position: absolute;
	
	border-radius: 50%;
	margin: 15px;
	background: #555;
}

/** Draw the value path that we calculated in HISE script. */
.scriptslider::before
{
	content: '';
	position: absolute;
	background-color: #555;
	
	/** Use the path from HISE script as background shape. */
	background-image: var(--valuePath);
	margin: 4px;
}

.scriptslider::before:hover { background: #666; }
.scriptslider::before:active { background: linear-gradient(to bottom, #777, #666); }
");

s.setLocalLookAndFeel(laf);
```

### Additional UI elements

In order to style the value popup that you enable with the `showValuePopup` property, you can use the HTML tag selector `label`. This is consistent with the popup label for Tables and SliderPack elements.

```javascript
label
{
	background: red;
	padding: 3px 10px;
	margin: 5px;
	border-radius: 50%;
	box-shadow: 0px 2px 3px black;
}
```

In order to style the text input box that is opened with a shift-click, you can use the HTML tag selector `input`. Styling the text selection is the same as with the text input on a label. This is consistent with the styling of [Label](/ui-components/plugin-components/label) elements.

```javascript
input
{
	background: green;
	text-align: center;
	border-radius: 50%;
}

::selection
{
	background: red;
	color: green;
}
```


