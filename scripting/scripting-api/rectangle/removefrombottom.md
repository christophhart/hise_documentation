This function (and it's siblings `removeFromLeft(), removeFromRight()` and `removeFromTop()` are incredibly useful to divide a rectangle into different areas for layout purposes (eg. rendering a text label beyond a slider knob). Note that calling this method modifies the rectangle, slices off and returns the part.

```javascript
{
	.sample("slicing");
	
	var r = Rectangle(20, 20, 500, 400);
	
	Console.sample("full", r);
	
	var top = r.removeFromTop(50);
	
	Console.sample("topLeft", top.removeFromLeft(50));
	Console.sample("top", top);
	Console.sample("remaining", r);
};
```

Result:

![](/images/custom/rect/removeFromBottom.png)