---
keywords: DraggableFilterPanel
summary:  Please enter a brief description.
author:   Christoph Hart
modified: 30.05.2024
properties:
- Font: Set the font type.
- FontSize: Set the font size. 
- ProcessorId: The ID of the module that connects to this panel
- AllowFilterResizing: Set to false to disable deleting a node.
- AllowDynamicSpectrumAnalyser: Set this to false to disable the ability to toggle the spectrum analyser
- UseUndoManager: Set to false to disable using the Undo manager.
- ResetOnDoubleClick: Set to true to enable Reset on double click.
- AllowContextMenu: Set to false to disable the contect menu.
- GainRange: Set the range of the min and max gain. The displayed value is set to -6 db of the range value.
- ShowLines: Whether to display the grid in the background.
- PathType: the render style of the frequency graph.
- PathMargin: the margin of the frequency graph.
---

This FloatingTile expands on the [FilterDisplay](/ui-components/floating-tiles/plugin/filterdisplay) UI element and offers a drag functionality to change the filter parameters directly in the filter graph.

In order to use it connect is to a [Parametric EQ](/hise-modules/effects/list/curveeq) or [other types](/scripting/scripting-api/effect#setdraggablefilterdata) in order to display the editable filter curve in the floating tile. 

> If you want to use it in HISE 5.0+ with other modules than the Parametric EQ, you will need to supply a JSON definition with [this](/scripting/scripting-api/effect#setdraggablefilterdata) function.

Note that this UI element does not store any data so you have to take care of the parameter persistency otherwise - the most obvious option is to use [Engine.addModuleStateToUserPreset()](/scripting/scripting-api/engine#addmodulestatetouserpreset) which will save the entire module in the user preset.

### PathTypes

There are four different path type available that define how the filter response graph is constructed:

![](/images/custom/filterpathtypes.png)

You might want to try out different types and see what style fits best.

### Example Snippets

There are a few example snippets that demonstrate the usage of this floating tile in combination with different modules:

- [Custom Draggable EQ](/tutorials/scriptnode#custom-draggable-eq)
- [Drggable Filter Example](/tutorials/ui#draggable-filter-example)
- [PathType example](/tutorials/ui#filterdisplay-pathtype-example)

### CSS Styling

This element can also be styled using CSS. In order to do so, you can use the following selectors:

#### Styling the filter path

The filter background including the frequency response graph can be styled exactly like the [FilterDisplay](/ui-components/floating-tiles/plugin/filterdisplay) using the the `.filtergraph` class selector. In order to draw the frequency response, you can use the path supplied with the variable `var(--filterPath)` as `background-image` property.

> Note that if you use the `border` property to stroke the path, you have to set the `box-sizing` property to `border-box`, otherwise the path scaling will be off if you use any margin or padding property.

### Styling the filter handles

The `.filterHandle` class selector styles each filter handle (the thing that you can drag around). There are a few variable values available in case you want to display some text:

| Variable | Description |
| -- | -------- |
| `type` | the type string as provided by the `TypeList` property. |
| `frequency` | a prettified string with the frequency (eg. `"1.5kHz"`). |
| `q` | a string with the resonance (preformatted with a single decimal point). |
| `gain` | a prettified string with the gain value (`-14.5 dB`). |
| `index` | The (one-based) index of the drag handle. |

If you want to improve the mouse behaviour, these pseudoclasses are available for different states:

```javascript
/* when hovered. */
.filterHandle:hover {}

/* when the band is inactive. */
.filterHandle:disabled {}

/* when the band is selected. */
.filterHandle:focus {}

/* when the band is being dragged. */
.filterHandle:active {}
```
