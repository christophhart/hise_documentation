This method allows you to set the current brush to a gradient. The parameter you pass in must be an array that has at least 6 elements:

1. The first colour
2. The x-position of the first colour
3. The y-position of the first colour
4. The second colour
5. The x-position of the second colour
6. The y-position of the second colour
7. whether the gradient is radial: `true` or `false` (optional)
8. An additional colour (optional)
9. The normalised position for the additional colour (eg. `0.5` if it should be in the middle) (optional)
10. The next additional colour (optional)
11. The normalised position for the second additional colour (optional)
12. ...

### Examples

```javascript
// A blurry white ball in the middle
g.setGradientFill([Colours.white, 100.0, 100.0,
				   Colours.black, 50.0, 50.0,
				   true]);

// A top down gradient with a black bar in the middle and white at the edges
g.setGradientFill([Colours.white, 0.0, 0.0,
				   Colours.white, 0.0, 100.0,
				   false,
				   Colours.black, 0.5]);
```