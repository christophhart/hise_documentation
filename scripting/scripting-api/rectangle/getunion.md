

```javascript
{
	.sample("getUnion");
	
	var r1 = Rectangle(10, 50, 90, 65);
	var r2 = Rectangle(300, 200, 10, 55);
	
	Console.sample("r1", r1);
	Console.sample("r2", r2);
	Console.sample("union", r1.getUnion(r2));
}
```

Result:

![](/images/custom/rect/getUnion.png)