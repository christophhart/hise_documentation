---
keywords: Rectangle
summary:  A helper class that represents a rectangle
author:   Christoph Hart
modified: 24.03.2025
---
  
This object type is a native type in HiseScript and represents a two dimensional rectangle. The functionality was "inspired" (read stolen) from the [JUCE class](https://docs.juce.com/master/classRectangle.html) and is a helpful tool for all UI tasks.

> Note that most methods create and return a new rectangle object which makes it unsuitable for any realtime thread operations, but that should not be a serious limitation as 99% of the use cases will be within paint routines or other UI related functions.

Until now, the representation of rectangles in HiseScript was a plain ol' JS array with four elements (`[x, y, width, height]`). This was fine (and for backwards compatibility you can still use JS arrays to represent rectangles), but there are a few advantages of having a dedicated type for rectangles:

1. better debugging: print in one line, inspect multiple rectangles with the rectangle viewer
2. inbuilt methods for common tasks like scaling, translating and slicing rectangles

You can create a Rectangle using the inbuild function `Rectangle()`. This function accepts a variety of arguments to create a rectangle:

```javascript
// creates an empty rectangle
var r0  = Rectangle();                   

// accepts a JS array and converts it to a Rectangle
var r1  = Rectangle([x, y, w, h]);       

// creates a rectangle at the origin position [0, 0] 
var r2a = Rectangle(width, height);      

// creates a rectangle from two points.
var r2b = Rectangle([x1, y1], [x2, y2]); 

// creates a rectangle with the given dimensions.
var r4  = Rectangle(x, y, w, h);         
```

The rectangle can then be used / modified like a JS array but has some additional QOL methods:

```javascript
Panel1.setPaintRoutine(function(g)
{
	// Create a rectangle
	var rect = Rectangle(100, 100);
	
	// Access / change members
	Console.print(rect[0]); // use the [0, 1, 2, 3] indexes like before
	Console.print(rect.x); // or use x, y, width, height
	
	rect.width = 90;
	
	// Pass that object into API calls that expect a rectangle
	g.fillRect(rect.reduced(10));
});
```

> Note that for backwards compatibility, HISE will still use the JS arrays for all methods or callbacks that return a rectangle (eg. `ScriptComponent.getLocalBounds()` or the `obj.area` property in LAF functions). In order to change that you can enable the preprocessor `HISE_USE_SCRIPT_RECTANGLE_OBJECT=1`, then it will return a Rectangle object for the full experience.

### Inspect rectangles using sampling

A neat feature of the Rectangle class is that it allows you to quickly inspect the rectangles using a sampling session. These are the steps you have to take:

1. Enable sampling for a scope using the `.sample("id")` scoped statement
2. Use [`Console.sample()`](/scripting/scripting-api/console#sample) to add data points
3. Click on the inspect icon next to the `.sample()` scoped statement to open the rectangle viewer.

```javascript
{
	.sample("withAspectRatioLike");
	
	var r = Rectangle(20, 10, 300, 300);
	var other = Rectangle(500, 80, 100, 50);
	
	Console.sample("target", r);
	Console.sample("other", other);	
	Console.sample("fitted", r.withAspectRatioLike(other));
}
```

If you now click on the icon at the top, it will open a popup that shows all items of the sampling session, in this case three rectangles that are a perfect visualisation of what the [withAspectRatioLike](/scripting/scripting-api/rectangle#withaspectratiolike) method is doing:

![](/images/custom/rectangle-sample.png)
