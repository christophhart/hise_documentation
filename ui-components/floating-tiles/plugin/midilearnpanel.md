---
keywords: MidiLearnPanel
summary:  A Panel that shows all MIDI-learned controls + adjustment possibilities
author:   Christoph Hart
modified: 18.03.2019
properties:
- Font: Set the font type.
- FontSize: Set the font size. 
---

A table that shows the MIDI-CC learned parameters and methods to adjust the min, max and to invert the range. If the UI-component has `enableMidiLearn` set to true, you can add it to the list. 

For more customizations please take a look at [CustomLookAndFeel](/glossary/custom_lookandfeel#midi-dropper).

## CSS Styling

The MIDI Learn Panel can also be styled using the CSS renderer. This allows a far more in-depth customization than the scripted look and feel. In order to use the CSS renderer, register a LookAndFeel with a stylesheet to the FloatingTile and define the following selectors:

| Selector | Description |
| = | ===== |
| `table` | Draws the background of the entire table. It also uses the `margin` and `padding` properties for positioning |
| `th` | Draws the cells of the table header. Use the pseudo states `:first-child` and `last-child` to style the edges |
| `tr` | Draws the background of a table row. |
| `td` | Draws the content of a table cell (in this case the text of the first two columns). |
| `button` | Renders the Inverted button. Use the `width` property to change the size of the button column. |
| `.range-slider` | Renders the range sliders. Use the `width` property to change the size of the button column. |
| `scrollbar` | Render the scrollbar that appears when the number of rows exceed the table height. |

### Layouting

In addition to the UI rendering, the CSS stylesheets will also be used for determining the positions & size of each element:

- the table header height is determined by the height of the `th` element which takes the font height & vertical margin / padding into account
- the table row height is determined by the height of the `td` element which takes the font height & vertical margin / padding into account
- the table column widths are determined by the width of the text of the header or cell and the horizontal margin / padding. Note that the second column (with the parameter target ID) is supposed to be stretched to fill the remaining size while the other columns are fix-sized depending on the width of the text or the UI element

> Note that the styling of this component is 100% identical to the styling of the [FrontEndMacroPanel](/ui-components/floating-tiles/plugin/frontendmacropanel).