This function can be called in order to programmatically change the [Modulation / UI Ranges](/hise-modules/modulators/envelopes/list/matrixmodulator#modulation-and-ui-range)  of a matrix modulator.

> This obviously only works when called with a reference to a [Matrix Modulator](/hise-modules/modulators/envelopes/list/matrixmodulator).

The function expects a JSON object with this format:

```javascript
mod.setMatrixProperties({
	InputRange: // defines the range of the UI knob
	{
		min: 0.0,
		max: 1.0,
		middlePosition: 0.5,
		mode: "NormalizedPercentage",
		stepSize: 0.0,
	},
	OutputRange: // defines the range of the scaled modulation output signal
	{
		min: 0.0,
		max: 1.0,
		middlePosition: 0.5,
		stepSize: 0.0,
		UseMidPositionAsZero: false
	}
});
```

> Note that if you want to supply a text converter, it will only lookup the `mode` property in the input range. If you want to change the mid position to be used as zero position, then you need to set the `UseMidPositionAsZero` property of the output range