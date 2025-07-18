---
keywords: CSS Tutorial for HISE
summary:  A short tutorial for using CSS in HiSE
author:   Christoph Hart
modified: 19.06.2024
---

Cascading Style Sheets (CSS) is a powerful tool for controlling the look and feel of HISE UI elements. It is also the tool for styling the multipage dialog system - either for building customized installers or styling a [Multipage Dialog](/ui-components/plugin-components/multipagedialog) within HISE. This extends the options for UI customization with a very standardized and (almost) no-code option.

If you want to use it in HISE, take a look at [ScriptLookAndFeel.setStyleSheet()](/scripting/scripting-api/scriptlookandfeel#setstylesheet).

> Note that this feature is very experimental at this point and there will definitely be breaking changes and glitches for the foreseeable future!

This tutorial will guide you through the general syntax of CSS and its various features. The CSS render engine in HISE tries to be as standard compliant as possible but if there are deviations they will be listed here too.

## General Syntax of CSS

A CSS file is a collection of style rules. Each style rule consists of a selector and a declaration block. The selector points to the HISE UI Element you want to style. The declaration block contains one or more declarations separated by semicolons.

```css
selector 
{
	/* this is a comment. */
    property: value;
}
```

> Quick tip: If you're editing the CSS file in the HISE code editor, use `Ctrl+#` for toggling the comment of a line.

For example:

```css
button 
{
    color: blue;
    font-size: 14px;
    font-size: 18px; /* this will override the previous line. */
}
```

Note that you can define multiple selectors with the same type and they will be coallascated into a single style sheet in the order of appearance.

```css
button 
{
    color: green;
    /** this overrides the green property */
    color: blue;
}

button
{
	/** this overrides the blue property */
	color: red; 
}
```

## CSS Selectors

Selectors are used to select the elements you want to style. There are different types of selectors which can be used to select the UI components based on different criterias. Every component will pickup any property definitions whose selector apply to the component and create a combined set of properties.

### Universal Selector

Selects all elements. This selector is being overriden by any other selector and can be used as "fallback" selector or defining global properties like the font style etc. 

```css
* {
    margin: 0;
    padding: 0;
}
```

> Note that in HISE script you can still apply multiple different style sheets to different UI components which are completely independent, so this universal selector will only apply on the Components that you have assigned the CSS LookAndFeel to.

### Element Selector

Selects all elements of a given type. These are standard HTML tags which correlate to HISE UI elements. Available selectors in HISE are: 

- `button`: [Button](/ui-components/plugin-components/button)
- `select`: [ComboBox](/ui-components/plugin-components/combobox)
- `label`: [Label](/ui-components/plugin-components/label)
- `input`: the text editor of a [Label](/ui-components/plugin-components/label) (when you click on it to edit)
- `div`: a [Panel](/ui-components/plugin-components/panel) or [Floating Tile](/ui-components/plugin-components/floating-tile).

Element selectors will override the properties set by the universal selector, but are superceded by any other selector type.

### Class Selector

Class selectors have the `.classname` syntax and selects elements with a specific class. This is useful for all UI elements that do not have a standard HTML tag name:

- `.scriptslider`: [Slider](/ui-components/plugin-components/knob)
- `.popup-menu`: The context menu
- `.popup-item`: The item of a context menu

```css
.scriptslider 
{
    font-weight: bold;
}
```

You can also add one or multiple classes to any component using the [setStyleSheetClass()](/scripting/scripting-api/scriptbutton#setstylesheetclass) method.

```javascript
const var laf = Content.createLocalLookAndFeel();

laf.setInlineStyleSheet("

.greenbg { background: green; }
.redbg   { background: red; }
button   { background: yellow; }
");

const var b = Content.addButton("Button1", 0, 0);
b.setLocalLookAndFeel(laf);

const var b2 = Content.addButton("b2", 0, 30);

inline function onButton2Control(component, value)
{
	/** Dynamically change what classes are applied to the first button. */
	b.setStyleSheetClass(value ? ".greenbg" : ".redbg");
};

b2.setControlCallback(onButton2Control);
```

Class selectors will override the universal and type selectors (you can see that in the example the type selector is defined after the class selectors, but the higher priority of the class selectors will override the type selector).

> Note that the default class `.scriptxxx` will always be attached to the component, even if you pass in an empty string to remove all custom class selectors.

### ID Selector

ID selectors have the `#id` syntax and select an element with a specific ID. In HISE this is simply the Component ID. You can use this selector to single out a specific component that you want to style different than the other components. The properties in the ID selector will have the highest priority and always override the other selectors.

```css
#Knob1 
{
    text-align: center;
}
```

### Debugging selectors

You can inspect what classes are applied to a component with the right click **Show CSS debugger tool**. For the code example above, it will show something like this:

```css
/** Component stylesheet: */
button #Button1 .scriptbutton .greenbg {
  background-color[]: 0xFF008000
}

/** Inherited style sheets: */
.greenbg {
  background-color[]: 0xFF008000
}

button {
/*  background-color[]: 0xFFFFFF00*/
}
```

As you can see, the component has four selectors:

- the `button` type selector
- the `#Button1` ID selector
- the default `.scriptbutton` class
- the custom `.greenbg`

It will also list all style sheets in the reverse order of cascading (Inherited style sheets) so you can see what property is overwritten by what. In this case the default yellow colour of the type selector is overriden by the class selector (because class selectors always have a higher priority than type selectors according to the CSS standard). Hence the yellow definition is commented out so you can see that it's ignored. 

> You could force the yellow colour to show up if you use the `important!` keyword in the type selector definition.

## Pseudo-States

Pseudo-states are appended after a selector and can be used to define the special states of an element.

- `:hover`: Applies when the user hovers over the UI component without clicking it (like `event.hover` in the mouse callback)
- `:active`: Applies when the user clicks on an element (like `event.clicked` in the mouse callback)
- `:focus`: Applies when an element has the keyboard focus
- `:checked`: only used by Buttons, indicate that the value is true (from `setValue(true)`).
- `:disabled`: used when the element is not enabled (from `Knob1.set("enabled", false)`).

```css
button
{
 background-color: red;
}

button:hover {
    background-color: blue;
}

button:active {
    background-color: red;
}

button:checked {
      background-color: yellow;
}
```

## Pseudo-Elements

Style specific parts of an element. This can be used to draw an UI element that consists of multiple elements (eg. the drop-down menu arrow in the combobox). There are two special elements that can be accessed using the `::before` and `::after` pseudo state.

> Note that you always have to set the `content` property of the element so that it shows up.

```css
select
{
	background: blue;
}

select::before 
{
    content: '';
    color: red;
}
```


## Color Specifications

CSS allows you to specify colors in several ways:

```css
button
{
	color: red; /* Predefined color names. */
	color: #ff0000; /* Represent colors with a hex code */
	color: rgb(255, 0, 0); /* Specify colors using the RGB model */
	color: rgba(255, 0, 0, 0.5) /* RGB with an alpha channel for opacity. */
	color: hsl(50, 100, 100); /* Hue, Saturation, Lightness. */
	
	/** interpolate between colors (in this case red with 25% alpha) */
	color: color-mix(in rgb, red 25%, transparent); 
}
```

## Color Gradients

Gradients allow you to create smooth transitions between two or more colors.

### Linear Gradients

Linear gradients transition colors along a straight line.

```css
button 
{
    background: linear-gradient(to right, red, yellow);
}
```

## Padding, Margin, and Border

In CSS, the box model describes the rectangular boxes generated for elements in the document tree. Understanding the box model is essential for controlling layout and design. Three fundamental properties within this model are padding, margin, and border.


### Padding

`padding` is the space between the content of an element and its border. It creates space inside the element.

#### Examples

```css
button {
    padding-top: 20px;
    padding-right: 15px;
    padding-bottom: 20px;
    padding-left: 15px;
}

/* Shorthand for the same padding values */
button {
    padding: 20px 15px;
}

/* Shorthand for different padding values */
button {
    padding: 20px 15px 10px 5px; /* top, right, bottom, left */
}
```

### Margin

`margin` is the space outside the border of an element. It creates space between elements.

> Note that in HISE there is a big difference to how the CSS Standard uses the margin - usually it extends the layout and makes room between the elements. However since the positioning in HISE is fixed, this will not work, therefore the margin is defined as the distance between the component bounds and the background you draw (including border-radius, custom paths, etc)

```css
button {
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    margin-left: 20px;
}

/* Shorthand for the same margin values */
button {
    margin: 10px 20px;
}

/* Shorthand for different margin values */
button {
    margin: 10px 20px 15px 5px; /* top, right, bottom, left */
}
```

### Border

The border is the area between the padding and the margin. It surrounds the padding and content of an element.


```css
/* Specifying border width, style, and color */
button {
    border-width: 2px;
    border-style: solid;
    border-color: black;
}

/* Shorthand for border properties */
button {
    border: 2px solid black;
}

/* Border radius for rounded corners */
button {
    border-radius: 10px;
}

/* Applying different radii to each corner */
button {
    border-radius: 10px 20px 30px 40px; /* top-left, top-right, bottom-right, bottom-left */
}

/* Making a circular element */
button {
    border-radius: 50%;
}
```

## Transitions

CSS transitions allow you to change property values smoothly over a given duration and is the easiest way to achieve some animations in HISE.

```css
button {
	background-color: red;
    transition: background-color 0.5s ease;
}

button:hover {
    background-color: yellow;
}
```

In this example, when you hover over the button, its background color will change from red to yellow over half a second.

## Font-Handling

CSS provides several properties for managing fonts:

- `font-family` defines the font to be used
- `font-weight` defines the weight (bold or not)
- `font-size` defines the size of the font
- `letter-spacing`: change the space between characters
- `text-transform`: change to uppercase etc.
- `text-align` and `vertical-align` will define the alignment of the text

Note that the fonts must be loaded into HISE and then can be accessed with the same string as used in `g.setFont()`. If you're using the system fonts then you can directly use the font name in the `font-family` property, but for custom fonts that you have loaded with `Engine.loadFontAs()`, you will need to import the font using the at rule defined by the `@font-face` selector:

```css
@font-face {
    /* imports the font as FunkyFont */
    font-family: FunkyFont;
    /* This is optional if you haven't already called Engine.loadFontAs
       but it will load the font with the given path.
     */
    src: url('{PROJECT_FOLDER}Fonts/DigitalNormal.ttf');
}

select {
    /* now we can use our custom font. */
    font-family: FunkyFont;
}

button {
    /* system fonts are also available. */
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
}
```

## Variable Handling

CSS Variables (Custom Properties) allow you dynamically change the appearance of the UI component. By default any UI component will have its colour properties available as variable:

- `itemColour`
- `itemColour2`
- `bgColour`
- `textColour`

To use a variable, use the `var()` function.

```css
button {
    background-color: var(--bgColour);
    color: var(--textColour);
}
```

You can also set custom variables that you can pick up by the CSS code using either

- [ScriptLookAndFeel.setStyleSheetProperty()](/scripting/scripting-api/scriptlookandfeel#setstylesheetproperty) for setting a global value to all components that use the style sheet or
- [ScriptButton.setStyleSheetProperty()](/scripting/scripting-api/scriptbutton#setstylesheetproperty) for setting a value for a specific component (useful if you want to use the same style sheet for multiple components which have eg. a different icon to display).



## Shadows

Shadows can be applied to text and elements to create depth and emphasis.

### Text Shadows

The `text-shadow` property adds shadow to text.

```css
button {
    text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
}
```

### Box Shadows

The `box-shadow` property adds shadow to elements.

```css
button {
    box-shadow: 5px 5px 15px rgba(0,0,0,0.3);
}
```

## Keyword reference

Below is a autogenerated list of all supported keywords of the CSS renderer in HISE. For a detailed explanation of each property / keyword take a look at the official CSS documentations.


### Supported type ids:

`button`, `body`, `div`, `select`, `img`, `input`, `hr`, `label`, `table`, `th`, `tr`, `td`, `p`, `progress`, `scrollbar`, `h1`, `h2`, `h3`, `h4`

### Supported pseudo-class ids:

`:hover`, `:active`, `:focus`, `:disabled`, `:hidden`, `::before`, `::after`, `:root`, `:checked`, `:first-child`, `:last-child`, `::selection`

### Supported expression ids:

`calc`, `clamp`, `min`, `max`

### Supported property ids

`align-items`, `align-content`, `align-self`, `background`, `background-color`, `background-size`, `background-position`, `background-image`, `border`, `border-width`, `border-style`, `border-color`, `border-radius`, `border-top-left-radius`, `border-top-right-radius`, `border-bottom-left-radius`, `border-bottom-right-radius`, `bottom`, `box-shadow`, `box-sizing`, `color`, `content`, `caret-color`, `cursor`, `display`, `flex-wrap`, `flex-direction`, `flex-grow`, `flex-shrink`, `flex-basis`, `font-family`, `font-size`, `font-weight`, `font-stretch`, `gap`, `height`, `justify-content`, `left`, `letter-spacing`, `margin`, `margin-top`, `margin-left`, `margin-right`, `margin-bottom`, `min-width`, `max-width`, `min-height`, `max-height`, `opacity`, `object-fit`, `order`, `overflow`, `padding`, `padding-top`, `padding-left`, `padding-right`, `padding-bottom`, `position`, `right`, `text-align`, `text-transform`, `text-shadow`, `transition`, `transform`, `top`, `vertical-align`, `width`

### Supported property constants

- `align-content`:`stretch flex-start flex-end center`
- `align-items`: `stretch flex-start flex-end center`
- `align-self`: `auto flex-start flex-end center stretch` 
- `background-size`: `fill contain cover none scale-down`
- `box-sizing`: `initial content-box border-box`
- `cursor`: `default pointer wait crosshair text copy grabbing`
- `flex-direction`: `row row-reverse column column-reverse`
- `flex-wrap`: `nowrap wrap wrap-reverse`
- `font-style`: `normal italic`
- `font-weight`: `default normal unset 400 bold bolder 500 600 700 800 900` 
- `justify-content`: `flex-start flex-end center space-between space-around`
- `object-fit`: `fill contain cover none scale-down`
- `position`: `initial relative absolute fixed`
- `text-transform`: `none capitalize uppercase lowercase` 
- `transition`: `linear ease ease-in ease-in-out`

### Supported property expressions
 
- `color`: `rgba rgb hsl linear-gradient`  
- `transform`: `none translate translateX translateY scale scaleX scaleY rotate rotateX rotateY skew skewX skewY`
