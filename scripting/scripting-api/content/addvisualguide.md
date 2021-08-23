This function creates visual guide lines or rectangles that appear on the interface (not in the compiled plugin). They are useful for debugging or layout alignments.

It expects two arguments, the first must be an array with either two or four elements and the second must be a colour (it's recommended to use the `Colours` constants for this).

If the array has two elements, it will add a horizontal or vertical line, depending on which element is non-zero. If the array has four elements it will be a rectangle (with the same format that you pass into eg. `Graphics.fillRect()`). 

> Anything else will cause the visual guides to be cleared, so if you want to delete all lines, just pass in `0`.

```javascript
Content.addVisualGuide([0, 200], Colours.white);       // adds a horizontal line at 200px
Content.addVisualGuide([100, 0], Colours.red);         // adds a vertical line at 100px
Content.addVisualGuide([10, 10, 100, 50], 0xFF00FF00); // adds a rectangle

Content.addVisualGuide(0, 0);                          // clears all visual guides
```

The lines will always be rendered on top of all UI elements so that they are always visible. 