This is useful if you want to draw something with a centered alignment.

```javascript
{
	.sample("withSizeKeepingCentre");
	
	var x = Rectangle(10, 10, 300, 300);
	
	Console.sample("bounds", x);
	Console.sample("smaller", x.withSizeKeepingCentre(50, 50));
}
```

![](/images/custom/rect/withSizeKeepingCentre.PNG)