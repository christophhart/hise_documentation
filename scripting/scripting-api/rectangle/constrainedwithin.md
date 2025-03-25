This function moves the rectangle into the given target area while keeping the size the same. This is useful if you eg. want to display a text at the hover position but make sure that the entire text is visible when you hover at the edges.

```javascript
{
	.sample("constrainedWithin");
	
	var textPos = Rectangle(200, 20);
	var bounds = Rectangle(100, 100, 400, 300);
	
	Console.sample("bounds", bounds);
	Console.sample("textBounds", textPos);
	Console.sample("fitted", textPos.constrainedWithin(bounds));
}
```

Result:

![](/images/custom/rect/constrainedWithin.png)