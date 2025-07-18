---
keywords: FilterDisplay
summary:  Displays the Filter Curve on the interface
author:   Christoph Hart
modified: 18.03.2019
properties:
- ProcessorId: The ID of the module that connects to the filter graph
- Index: this is the display index slot that is assigned to the filter coefficents you want to display
---

This UI elements displays the frequency / magnitude response of any module that provides FilterCoefficients.

> If you want a interactive element that allows you to drag the filter parameters, take a look at the   [DraggableFilterPanel](/ui-components/floating-tiles/plugin/draggablefilterpanel) floating tile.

### CSS styling
  
You can style the filter display with the `filtergraph` class selector. In order to draw the frequency response, you can use the path supplied with the variable `var(--filterPath)` as `background-image` property.



