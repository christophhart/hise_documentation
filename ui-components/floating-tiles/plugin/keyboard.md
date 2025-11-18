---
keywords: Keyboard
summary:  A highly customizable virtual MIDI keyboard. To change the key colours, see [Engine.setKeyColour()](/scripting/scripting-api/engine#setkeycolour).
weight:   50
index:    01
author:   Christoph Hart
properties:
- Font: Set the font type.
- FontSize: Set the font size. 
- KeyWidth: Set the width of the keys.
- LowKey: The lowest visible key as MIDI note number (C2 = 48).
- HighKey: The highest visible key
- MPEKeyboard: If the MPE mode is enabled, this keyboard will show a MPE style keyboard with multi touch support.
- BlackKeyRatio: Change the relative height of the black keys
- UseVectorGraphics: Toggle between the (old) filmstrip and the new vector based keyboard
- UseFlatStyle: If VectorGraphics are activated you can change this value for a flat keyboard 
- DisplayOctaveNumber: Show the OctaveNumbers C-2 - C7 on each C key 
- MPEStartChannel: Set the MPE Start Channel
- MPEEndChannel: Set the MPE End Channel
- CustomGraphics: If true, it looks in the{IMAGE_FOLDER} Images/keyboard/ for keyboard imagefiles called up_0.png ... to up_11.png and down_0.png to down_11.png. The files have to be present to render the whole keyboard.
- DefaultAppearance: Set this to false to use custom graphics
- HiKey: Set the highest key to display - no need to change that actually :)
- MidiChannel: Connect the keyboard to a MidiChannel, defaults to 1
- ToggleMode: Set to true, to let the keys stick down.
---

## CSS Styling

The MIDI keyboard can also be styled using the new CSS renderer in HISE. You can use animations, shadows & all nice CSS things to make a pretty keyboard. If you want to do so:

1. Make sure the `CustomGraphics` property is set to false.
2. Disable `DefaultAppearance` to be able to resize the keys.
3. Setup the `KeyWidth` and `BlackKeyRatio` properties to match your desired proportions
4. Assign a CSS LookAndFeel to this floating tile and define the style.

This is an example JSON property set which looks good with CSS.

```javascript
{
  "KeyWidth": 18.0,
  "DisplayOctaveNumber": false,
  "LowKey": 24,
  "HiKey": 127,
  "CustomGraphics": false,
  "DefaultAppearance": false,
  "BlackKeyRatio": 0.6,
  "ToggleMode": false,
  "MidiChannel": 1,
  "UseVectorGraphics": true,
  "UseFlatStyle": false,
  "MPEKeyboard": false,
  "MPEStartChannel": 2,
  "MPEEndChannel": 16
}
```

> Note that the CSS renderer will apply an additional margin of 10px to the black key area. This is so that you can render shadows properly that would otherwise be truncated by the bounding box.

### Class Selectors

In CSS, the following class selectors are available:

- `.keyboard` - use this to draw the background behind the keys.
- `.whitekey` - this is used to render every white key.
- `.blackkey` - this is used to render every black key.

### Pseudo Elements & States

You can use the `::before` and `::after` pseudo elements for additional customizations for each key. It also supports these pseudo states:

- `:hover` - this is used when the user hovers over the key
- `:active` - this is used when a key is pressed down

### Variables

There are a few additional variables that you can use in the CSS stylesheet:

- `keyColour` - this will be either `transparent` or the colour defined with [Engine.setKeyColour()](/scripting/scripting-api/engine#setkeycolour) for each key.
- `noteName` - this will be a non-empty string containing the label for each C note (eg. "C2").

### CSS Example

![](/images/custom/csskeyboard.png)

This is an example stylesheet for a noice keyboard that you can use as starting point for your custom CSS. Make sure you use the JSON property set from above to make it look as shown in the screenshot - all dimension properties should be relative so this should scale OKish with different proportions, but you might adapt it a bit.

```css
/** CSS Stylesheet for the MIDI keyboard. */

/** Render the background. */
.keyboard
{
	background: red;
}

/** The class for the white key. */
.whitekey
{
	/** noteName will contain the C name if applicable. */
	content: var(--noteName);
	background: #eef;
	margin: 5% 5%;
	margin-bottom: 10%;
	border-radius: 2px;
	transition: margin 0.1s;
	transition: border-color 0.1s;
	box-shadow: none;
	vertical-align: bottom;
	font-size: 10px;
	padding-bottom: 3px;
	color: #666;
	border: 1px solid rgba(255,255,255,0.7);
}

/** This renders the key color overlay. */
.whitekey::after
{
	content: '';
	background-color: color-mix(in rgb, var(--keyColour) 60%, transparent);
	border-radius: 2px;
}

/** The hover state for the white key. */
.whitekey:hover
{
	background: white;
}

/** This renders the bottom element of the white key. */
.whitekey::before
{
	content: '';
	background: linear-gradient(to bottom, #333, #000);
	position: absolute;
	bottom: 0px;
	height: 8%;
	margin: 5%;
	border-radius: 15%;
	transition: bottom 0.05s;
}

/** The pressed state. */
.whitekey:active
{
	margin-bottom: 5%;
	background-color: linear-gradient(to bottom, #eef, #dde);
	box-shadow: inset 0px 2px 10px rgba(0, 0, 0, 0.3);
	border-color: transparent;
}

/** The first key. Could be used for additional shadows, but doesn't work. */
.whitekey:first-child
{
	background: red !important;
}

/** When pressed, the side element should be pushed down too. */
.whitekey::before:active
{
	bottom: -5%;
	background-color: #111;
}

/** Now the black keys. */
.blackkey
{
	background: #222;
	border-radius: 5%;
	
	border-width: 10px 4px;
	border-color: red;
	border-style: solid;
	
	transition: margin-top 0.1s;
	margin: 10px;
	box-shadow: 0px 3% 10% rgba(0, 0, 0, 0.5);
}

.blackkey:active
{
	margin-top: 12px;
}

/** This renders the "top surface" of the black key. */
.blackkey::before
{
	content: '';
	margin: 20%;
	/** Move it up to create a pseudo 3D effect. */
	margin-bottom: 20%;
	margin-top: 3%;
	transition: margin-bottom 0.1s;
	transition: background-color 0.1s;
	background: linear-gradient(to top, #363636, #282828);
	border-radius: 5%;
}


/** When pushed down we brighten it up and remove the bottom margin
    Note that this isn't 100% realistic but it enhances the visibility
    of the pressed black state. 
*/
.blackkey::before:active
{
	background: linear-gradient(to top, #404040, #363636);
	margin-bottom: 6px;
	
}

/** We'll use the after element for the colour overlay again. */
.blackkey::after
{
	content: '';
	margin: 1px;
	background-color: color-mix(in rgb, var(--keyColour) 20%, transparent);
	border-radius: 2px;
}
```



