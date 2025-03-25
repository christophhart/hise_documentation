This method is useful if you have a path that you want to render somewhere while keeping it's aspect ratio the same.

```javascript
{
	.sample("withAspectRatioLike");
	
	var r = Rectangle(20, 10, 300, 300]);
	var other = Rectangle(500, 80, 100, 50);
	
	Console.sample("target", r);
	Console.sample("other", other);	
	Console.sample("fitted", r.withAspectRatioLike(other));
}
```

Result:

![](/images/custom/rectangle-sample.png)