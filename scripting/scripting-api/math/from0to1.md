Converting between value ranges is a pretty common task when writing scripts. This function will scale a normalized input value from (0...1) to a given output range which allows you to switch between different domains without excessive math formula usage. The inverse process can be achieved with [Math.to0to1](/scripting/scripting-api/math#to0to1).

The second parameter will define a range and you can either use a JSON object or a fix object created by a [FixObjectFactory](/scripting/scripting-api/fixobjectfactory). The latter will significantly improve the performance of this function because it doesn't have to look up the dynamic properties but uses a internal LUT to create the C++ range object.

A range object has up to 5 properties:

- a minimum value
- a maximum value
- a factor that skews the curve (think gamma curve)
- an interval for making discrete steps
- a inversion

> Note that the interval and the skew factor property are mutually exclusive: you either want to skew the output or you want discrete steps .

Unfortunately there are multiple types of range definitions used across HISE so there is not a single property set, but it tries to cope with them all and automatically detects which range property set to use:

| Domain | Property Names | Additional information |
| --- | ----- | ----- |
| **scriptnode** | `MinValue`, `MaxValue`, `SkewFactor`, `StepSize`, `Inverted` | the range object from scriptnode parameters |
| **UI components** | `min`, `max`, `middlePosition`, `stepSize`, `Inverted` | the range object from a UI component's JSON. Note that it uses the middle position to calculate the skew factor (this introduces a small overhead so make sure to use another mode if performance is critical) |
| MIDI Automation | `Start`, `End`, `Skew`, `Interval`, `Inverted` | the range object from a MIDI automation connection [MIDI automation connection](/scripting/scripting-api/midiautomationhandler) 

> You can use Math.skew() in order to convert a mid position value to a skew factor.

Take a look at the example how to use it with a fix object factory:

```javascript
// define a prototype using the scriptnode syntax
reg prototype = {
	"MinValue": 20.0,
	"MaxValue": 20000.0,
	"SkewFactor": 0.6
};

// pass that into the factory to create a fix object
const var f1 = Engine.createFixObjectFactory(prototype);

// create a fix object (think JSON but faster)
const var range = f1.create();

// 9.5% slower than just calling Math.pow() (which is the baseline for this function)
const var x = Math.from0To1(0.5, range);

// 34% slower than just calling Math.pow
const var y = Math.from0To1(0.5, prototype);

// There's a small rounding error because of single precision vs. double precision
// but that shouldn't have a real world impact
Console.assertTrue(Math.abs(x - y) < 0.001);
```