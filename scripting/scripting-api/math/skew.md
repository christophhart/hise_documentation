The raw usage of this function allows you to simulate the range behaviour from the [Math.from0to1()](/scripting/scripting-api/math#from0to1) method:

```javascript
const var skewFactor = Math.skew(0.0, 20000.0, 1000.0);
const var midPoint = Math.pow(0.5, 1.0 / skewFactor) * 20000.0; // => 1000
```

However the most interesting use case for this would be if you want to convert a range object from a mid point to a skew factor based range definition for increased performance:

```javascript
// This is a range how it would come from a UI component
// it defines the curve with a middle position
const var p1 = {
	min: 20.0,
	max: 20000.0,
	middlePosition: 1000.0
}

// Using a skew-based range avoids an additional log calculation
// in the conversion functions
const var p2 = {
	MinValue: p1.min,
	MaxValue: p1.max,
	SkewFactor: Math.skew(p1.min, p1.max, p1.middlePosition)
};

// We're caring about performance here so we use fix objects:
const var f1 = Engine.createFixObjectFactory(p1);
const var f2 = Engine.createFixObjectFactory(p2);
const var o1 = f1.create();
const var o2 = f2.create();

{
	.profile(" - mid point with JSON");

	for(i = 0; i < 100000; i++)
		Math.from0To1(0.5, p1);
}

{
	.profile(" - skew factor with JSON");

	for(i = 0; i < 100000; i++)
		Math.from0To1(0.5, p2);
}

{
	.profile(" - mid point with fix object");

	for(i = 0; i < 100000; i++)
		Math.from0To1(0.5, o1);
}

{
	.profile(" - skew factor with fix object");

	for(i = 0; i < 100000; i++)
		Math.from0To1(0.5, o2);
}

/* Results:
- mid point with JSON: 83.185 ms
- skew factor with JSON: 29.896 ms
- mid point with fix object: 27.032 ms
- skew factor with fix object: 24.955 ms
*/
```

As you can see, the performance can be drastically improved from 83ms to 25ms by using both the `skew()` function and a fix object.