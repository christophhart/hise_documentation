---
keywords: ModulationMatrix
summary:  A UI component to control matrix modulation connections
author:   Christoph Hart
modified: 18.07.2025
properties:
 - ProcessorId: The ID of the module that is used for showing the modulation connections.
 - Index: unused
 - Font: unused
 - FontSize: unused
 - TargetFilter: overrides the processor ID as filter of which modulation connections should be displayed.
 - SliderType: if `MatrixType` is `"SliderMatrix"`, then this defines the slider style `["Knob", "Horizontal", "Vertical"]`.
 - MatrixType: there are two different modulation matrix types and this property chooses which mode to use. If you set this to `"SliderMatrix"`, then it will display a matrix with sliders for all available connections, in all other cases it will show a matrix with one row per active connection as default.
---
  
This floating tile offers a ready-made UI component that represents the connections of the HISE 5.0 modulation system powered by the [Matrix Modulator](/hise-modules/modulators/envelopes/list/matrixmodulator). It is a feature-packed reproduction of the common element found in most synthesiser plugins with a complex modulation architecture that comes in two different modes.

> Check out the [Modulation Matrix Tutorial](/tutorials/scripting#modulation-matrix-tutorial) snippet for an example use case & customization.

## How to use it

In order to use this floating tile in your project, you need to:

1. Add a [Global Modulator Container](/hise-modules/sound-generators/list/globalmodulatorcontainer) and all the modulation sources you want to provide.
2. For every modulation target you want to offer, add a [Matrix Modulator](/hise-modules/modulators/envelopes/list/matrixmodulator) to the respective modulation chain. If you want to add a modulation target that is not represented by a modulation chain (eg. the wet level of the simple reverb as in the example above), use the `matrixTargetId` property of the respective UI knob that is controlling the parameter.
3. Add this floating tile on your UI and set the `ProcessorId` to the ID of the global modulator container. This will show all connections of the system
4. If you only want to show the connections for a given modulation target, you can set the `ProcessorId` property to the ID of the Matrix modulator or use the `TargetFilter` property to override that value.
5. If you want to programmatically add / remove connections, attach script callbacks to connection events and store the connections in the user preset system, create a [ScriptModulationMatrix](/scripting/scripting-api/scriptmodulationmatrix) which will offer this functionality out of the box.
6. If you want to offer the user the ability of adding connections by dragging something on UI knobs, take a look at the [Modulationmatrixcontroller](/ui-components/floating-tiles/plugin/modulationmatrixcontroller) floating tile which offers this functionality.

## Matrix Types

This floating tile comes in two variants which can be set using the `MatrixType` property:

1. The default appearance which shows one row with UI components for each active connection.
2. The Slider matrix which shows a matrix of sliders for **every** connection. Changing the value of one of the sliders from zero to non zero will add the connection (and double clicking to reset the slider will remove the connection).

The modulation matrix tutorial shows how both types work - they also work next to each other as the connections are managed on an underlying data model that is synchronized between each matrix.

## UI Elements

Now let's take a look at all the available UI elements and what they do. We'll start from top to bottom.

> Note that you can always hide any of these elements by looking up its CSS selector and adding the `display:none;` property.

### Search Bar

If you have a complex modulation setup, keeping the overview of the connections might be a bit tricky. The searchbar allows you to filter which connections are displayed by matching either the source or the target ID against the search term. It is case insensitive and as soon as you enter a search term it will only show the matching connections.

### Table Header

Before the rows are displayed, there is a table header that shows what each column is representing. It automatically adjusts the column width to whatever is required by the UI component.

> Note that every element of the table header shares the id CSS selector with its UI components, so in order to hide any column you can use the `#columnid` CSS selector.

### Connection Row

Now comes the most important part of this matrix: for every connection you get a row with UI components to edit all properties - as well as a mod plotter that displays a histogram of the modulation signal coming in.

> For a functional description of every property, take a look [here](/hise-modules/modulators/envelopes/list/matrixmodulator#connection-properties), as this chapter will only contain a brief overview as well as some UI related information.

1. Source: a combobox that controls the modulation source of this connection. 
2. Target: a combobox that controls the modulation target of this connection. Setting either of these to **No connection** will remove the row.
3. Mode: a combobox controlling the modulation mode (Scaled, Unipolar or Bipolar) for the given connection.
4. Inverted: whether the modulation signal should be inverted or not
5. Intensity: A knob (or slider) that will control how much the modulation signal is applied to the target. The type of this is defined by the `SliderType` property of this floating tile.
6. Aux: a combobox that controls the aux connection to any modulation source
7. Aux Intensity: if Aux is connected, this will be enabled and control how much the aux modulation signal is affecting the modulation intensity.

## Customization

While the functionality of this UI component is almost the same on every plugin, there is obviously a high demand for a full customizability of the appearance. Due to the complexity of this element and the required flexibility over styling / layout, I've picked a **CSS-only** approach to the customization as this is much more flexible when it comes to positioning.

> Of course the various UI elements in the connections rows like Knobs & comboboxes can also be styled with a scripting LAF.

The most straightforward way of skinning the matrix is to use the CSS debugger that you can find below the Component properties in the interface designer. Activate the debug hover mode and when you hover over your UI (in the non-edit mode) it will highlight the hovered UI element and display every selector that is associated with the currently hovered UI element. 

![](/images/custom/cssdebugger.png)

So instead of listing all CSS selectors, I'll just add a few remarks & notable exceptions:

1. If the matrix has no connections, the background will be rendered with the `:empty` pseudo class selector, so you can add a placeholder text with `.matrix:empty{ content: 'My Placeholder';}`.
1. The rows are using the CSS flex box system so you can change the width / spacing of each element using [this cheatsheet](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). It comes with some properties set to a reasonable but non-intuitive default (eg. the plotter has `flex-grow` set to fill the remaining space) so you might have to fight against the finnickiness of this system but there will come a point where it looks like you want it to so you can move on and never touch that code again.  
2. There are a few inbuilt path variables (eg. the search icon or the delete icon for the clear button). The CSS debugger will show them as CSS variable properties if you click on the hovered element in question.
3. If the connection's intensity is zero, the intensity sliders will have the `:empty` pseudo class set in addition to all other pseudo classes.
4. The plotter cannot be styled with CSS - the reason is that the path needs to be converted to a base64 and for the signal path this comes with a significant performance overhead so in this case it's recommended to stick to the common scripting LAF tools for skinning a display buffer element.



