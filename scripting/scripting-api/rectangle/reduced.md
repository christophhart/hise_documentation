This function can be called with either one or two arguments. If you call it with two arguments, it will be reduced with different X / Y values, if you call it with one argument, it will reduce all sides equally:

```javascript
{
	.sample("reduced");
	
	var x = Rectangle(20, 20, 400, 200);
	
	Console.sample("before", x);
	Console.sample("afterTwoArgs", x.reduced(50, 20));
	Console.sample("afterOneArg", x.reduced(30));
}
```

![](/images/custom/rect/reduced.png)