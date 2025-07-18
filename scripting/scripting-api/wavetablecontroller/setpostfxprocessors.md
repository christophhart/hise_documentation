This function can be used to add post-processing steps to the wavetable synthesiser. These are simple math functions with a single parameter that are applied on every wavetable after they have been loaded and can be used to customize the shape of the waveform:

```javascript
wavetable_out = f(wavetable_in, parameter)
```

> The functions are baked into the wavetables and are properly band limited using the same mip-map technique as when loading a normal wavetable, so these functions are not subject to realtime-manipulation, but will yield a alias-free sound.

### Post processing function definition

You can use multiple post processing steps at once and they will be serially processed in order of definition. This function expects an array of JSON objects that describe every function. These are the supported properties:

| Property | Type | Description |
| --- | --- | -------- |
| `Type` | String | The type of FX from a predefined list (see below). |
| `min` | double | the parameter value for the lowest table index. |
| `max` | double | the parameter value for the highest table index. |
| `middlePosition` | double | the parameter value for the middle table index. |
| `TableProcessor` | String | The name of the HISE module that provides the Table (see below) |
| `TableIndex` | int | the index of the table that should be used for the parameter lookup table. |

As you can see, with the exception of the `Type` parameter that defines the function, all other properties are related to how the single `parameter` will change for different table indexes, which allows you to create a dynamic function curve that you then can modulate through the `TableIndex` parameter of the wavetable synth: for each cycle in the wavetable it will:

1. normalize the cycle position (so that if the wavetable has 100 cycles, the 50th cycle will have the position `0.5`)
2. Apply the [Table](/ui-components/plugin-components/table) (if defined) so that you can fully customize the curve if desired.
3. Scale it to the range provided by the `min`, `max` and `middlePosition` attributes
4. Apply the function to the entire cycle of the wavetable with the calculated `parameter` value

Here are a few examples that demonstrate the different use cases:

```javascript
// A wavefold FX with a constant parameter of 0.8
{
	Type: "Fold",
	min: 0.8,
	max: 0.8
}

// A hard sync effect with a parameter of 0 at the first table 
// and a parameter value of 0.5 at the last table
{
	Type: "Sync",
	min: 0.0,
	max: 0.5
}

// A FM effect using a sine wave with the same frequency as carrier
// and the first table of the main UI defining the curve from 0.0 to 16.0
{
	Type: "FM1",
	min: 0.0,
	max: 16.0,
	TableProcessor: "Interface",
	TableIndex: 0
}
```

### Available post processing functions

These are the available post processing functions. They are all shown with a basic sine wave as starting point.

### "Sin"

This is a sinusoidal waveshaper that multiplies the amplitude with a sine wave. It can be used to quickly add harmonics without introducing too much distortion. The `parameter` defines the amplitude of the sine wave (a value of `0.0` will not change the waveform)

![](/images/custom/postfx/sin.png)

### "Warp"

This function skews the waveform to the start or end of the cycle and introduces very harsh harmonics. The `parameter` defines how much the waveform is skewed towards either end (`0.0` = left, `1.0` = right, `0.5` no change)

![](/images/custom/postfx/warp.png)

### "Fold"

This function folds the amplitude of the waveform at the `parameter` value (so that every value that lies above the `parameter` value is folded back).

![](/images/custom/postfx/fold.png)

### "Clip"

This function hard clips the waveform to the given amount. Note that this does not scale up the waveform, so if you want to clip it at 1.0, use the `"Normalise"` step afterwards.

![](/images/custom/postfx/clip.png)

### "Tanh"

This function applies a soft-clipping waveshaper (the standard tanh function) to the waveform. 

![](/images/custom/postfx/tanh.png)

### "Bitcrush"

This function applies a amplitude quantisation (aka bitcrusher) FX on the waveform

![](/images/custom/postfx/bitcrush.png)

### "SampleAndHold"

This function applies a amplitude quantisation (aka samplerate downsampler) FX on the waveform

![](/images/custom/postfx/sampleandhold.png)

### "Sync";

This function will apply a hard-sync effect to the waveform. The parameter will define how much of the original period length should be used (0.0 = no effect, 1.0 = almost zero length)

![](/images/custom/postfx/sync.png)

### "Phase"

This function shifts the phase of the waveform. This will not change the harmonics of the cycle, but it will introduce phaseshifts when you start modulating the table index which will translate into subtle pitch changes.

![](/images/custom/postfx/phase.png)

### "FM1" / "FM2" / "FM3" / "FM4"

These functions will apply a frequency modulation with a sinewave as carrier oscillator. The amount will define the amplitude of the carrier oscillator. The frequency of the carrier will be a multiple of the base frequency:

`"FM1"` will use the root frequency of the waveform:

![](/images/custom/postfx/fm1.png)

`"FM2"` will use the first harmonic frequency of the waveform:

![](/images/custom/postfx/fm2.png)

`"FM3"` will use the second harmonic frequency of the waveform:

![](/images/custom/postfx/fm3.png)

`"FM4"` will use the third harmonic frequency of the waveform:

![](/images/custom/postfx/fm4.png)

### "Root"

This function simply adds a sine wave with the base frequency and zero phase to the waveform so that you can change the ratio between the root frequency and the harmonics. 
The `parameter` is the amplitude of the root frequency that's added to the waveform (and by supplying a negative value you can subtract the root frequency from the waveform granted that the phase is zero).

The example now uses a saw wave as adding a sine wave to a sine wave would not yield an interesting graph:

![](/images/custom/postfx/root.png)

## "Normalise"

This function normalises the waveform to flatten out gain changes between the tables. Note that the final wavetable set is again normalised but this can be used to change the dynamics between the cycles. The `parameter` value is a percentage of how strong the normalisation should be applied (`0.0`= no change, `1.0` = full normalisation).

For the example, we'll use a sine wave with a `"Clip"` post processor and a clip value of `0.8` so that you can see the difference:

![](/images/custom/postfx/normalise.png)



