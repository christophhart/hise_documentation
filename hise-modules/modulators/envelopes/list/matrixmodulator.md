---
keywords: Matrix Modulator
summary:  A modulator that can connect to multiple modulation sources with dynamic assignments
author:   Christoph Hart
modified: 15.07.2025
parameters:
 - Monophonic: The matrix modulator can be set to monophonic like all other modulators, but it's highly recommended to leave this enabled in a polyphonic modulation context (and rather set the modulation sources to be monophonic if you want that behaviour).
 - Value: This parameter acts as base value for the modulation calculation and is supposed to be connected to your UI.
 - SmoothingTime: This will apply smoothing on the value change to remove zipper noises. The smoothing will be applied to the modulation signal itself.
---

This modulator is the backbone of the new modulation system in HISE 5.0 and allows you to build a complex modulation architecture found in modular synths. 

> A feature complete example of the matrix modulation system can be found here: [Modulation Matrix Tutorial](/tutorials/scripting#modulation-matrix-tutorial)

It is similar to the [Global Modulators](/hise-modules/modulators/envelopes/list/globalenvelopemodulator) in the sense that it can be dynamically assigned and pick up the modulation signal from a modulator in a [Global Modulator Container](/hise-modules/sound-generators/list/globalmodulatorcontainer), but it comes with a significant feature enhancement compared to those modules:

### Connectability

1. You can connect multiple modulation sources to a single MatrixModulator.
2. The connection is type-agnostic, which means you can connect a LFO, a Envelope and a Velocity modulator to the same MatrixModulator. The global modulators were limited to the same type as the source (so eg. you could connect a velocity modulator which is a voice start modulator only to a [GlobalVoiceStartModulator](/hise-modules/modulators/voice-start-modulators/list/globalvoicestartmodulator))
3. You can also connect modulation sources to any UI knob by adding it as a modulation target through the `matrixTargetId` property. This essentially gives you the ability to modulate anything with anything (within some limitations like polyphonic and buffer update rate).

> This highly reduces the complexity of your module tree - before you had to create as many global modulators as you want modulation slots for every modulation target and modulation type which exponentially grew the module tree. Now it's a single modulator for every modulation target.

### Flexibility

For each modulation connection you can:

- control the intensity (how much the modulation source affects the target)
- control the modulation mode (how the modulation source is applied to the target)
- add an auxilliary modulation source that will apply its modulation signal to the intensity of this connection
- invert the modulation signal

Essentially, this replicates most of the functionality of a modulation chain within a single modulator. The rationale for this is that there are some cases where the default behaviour of the modulation chain is a bit weird (Filter frequency modulation, I'm looking at you here), but cannot be changed for backwards compatibility reasons.

> For a mathematical description of each property take a look below.

### Data model

Storing & restoring modulation connections is now handled entirely in HISE and all you have to do is to create a [ScriptModulationMatrix](/scripting/scripting-api/scriptmodulationmatrix) and it will automatically attach itself to the preset system and store / restore the current modulation connections with user presets. You also get out-of-the-box full undo support for all operations on modulation connections

### UI Integration

When it comes to interacting with a modulation system on the UI, there are a fairly established set of standard UI workflows / visualisations that people expect and a considerable amount of effort has flown into offering ready to use building blocks that offer most of the expected UI features. You can:

- visualise modulation values on the [Knob](/ui-components/plugin-components/knob) alongside its value - completely stylable with [LAF](/glossary/custom_lookandfeel#drawrotaryslider).
- drag & drop modulation sources on a UI knob to add a connection - [ModulationMatrixController](/ui-components/floating-tiles/plugin/modulationmatrixcontroller)
- display & edit all modulation connections in a big matrix - [ModulationMatrix](/ui-components/floating-tiles/plugin/modulationmatrix)

## Connection Properties

Now that we established what the matrix modulator can do, let's take a look at the inner workings. Each connection to a source modulator has the following properties that affect the modulation signal.

> Changing / editing these properties can be done with various inbuilt UI tools (see above) or programmatically through the ModulationMatrix object

Note that the place where this gets stored is the associated Global Modulation Container, which stores each connection as XML element like this:

```xml
<MatrixData>
  <Connection TargetId="OSC1 Pitch" Mode="2" SourceIndex="1" Intensity="0.5853658536585367"
              AuxIndex="-1.0" AuxIntensity="0.0" Inverted="0"/>
</MatrixData>
```

### `Source`, `Target`

These properties are related to the source / target modulators and define what modulation signal is picked up and where it's sent to. A source is one of the modulators in the Global Modulator container and a target is either the ID of a matrix modulator or a UI knob with a non-empty `matrixTargetId` property (in this case it's the exact string you put in there).

> note that internally the source & aux property is stored as and index while the target is stored as a string for internal reasons, but that is shielded away in any interaction with the data model so you always refer to the sources through their string (which is the ID of the modulator in the global modulator container)

### `Inverted`, `Intensity`, `Mode`

These properties define how the modulation signal is applied. In the default HISE modulation system, the `Mode` is somewhat hardcoded in each modulation chain, depending on the context:

- Gain modulation is always scaled
- Pitch / Pan modulation is always added

However this static limitation might be the cause of most frustration from users trying to implement a more flexible modulation system. This has changed now with the matrix modulation system (also there's a new **Combined** mode for traditional modulation chains but that's another topic). Any modulation connection can now be either used to scale (=multiply) the original value or add a unipolar or bipolar offset to the value. 

| Mode | Range | Operator | Description |
| - | - | - | ------- |
| Scaled | 0.0 - 1.0 | `*` | multiplies the original value taking into account the intensity. |
| Unipolar | -1.0 ... 1.0 | `+` | adds a modulation value to the original value. |
| Bipolar | -1.0 ... 1.0 | `+` | adds a bipolar modulation value to the original value. |

> Note that every connection that scales the modulation value is applied **before** any unipolar / bipolar offset connections, otherwise a scale multiplication to zero would "deactivate" any offset multiplication because of operator precedence.

### `AuxIndex` / `AuxIntensity`

This is an additional feature of the modulation system and allows you to apply another modulation signal to the intensity of this modulation connection. This can be used for nested modulation setups, eg:

- LFO controls pitch, modulation controls LFO pitch amount: Source - LFO, Target - Pitch, Aux: Modwheel, AuxIntensity: 100%
- Envelope controls filter, velocity controls envelope amount: Source - Envelope, Target - Filter, Aux: Velocity, AuxIntensity: 100%

> note that the aux intensity is always applied using the scaled mode

### Pseudocode

The best way of getting a feel for these properties is to play around with the ModulatorMatrix Tutorial, but for the nerds out there, this is a Frankensteiny-HiseScript translated replication of the mathematics behind the system. 

```javascript
// We take the "actual" parameter value from the UI
var parameterValue = Knob.getValue();

// first go through all scale connections
for(c in scaleConnections)
{
	// grab the modulation value (always between 0...1) from the source mod
	var mv = c.getModValue();
	
	if(c.isInverted())
		mv = 1.0 - mv;
	
	// grab the intensity
	var intensity = c.getIntensity();
	
	// If we have a aux connection, apply it to the intensity
	if(c.getAuxIndex() != -1)
	{
		// apply the scale formula to the modulation intensity
		var auxIntensity = c.getAuxIntensity();
		var av = c.getAuxModSignal();
		intensity *= (1.0 - auxIntensity + auxIntensity * av)
	}
	
	// apply the scale formula
	parameterValue *= (1.0 - intensity + intensity * mv);
}

// now we go through all unipolar / bipolar connections
for(c in offsetConnections)
{
	var mv = c.getModValue();
	
	if(c.isInverted())
		mv = 1.0 - mv;
		
	var intensity = c.getIntensity();
	
	// If we have a aux connection, apply it to the intensity
	if(c.getAuxIndex() != -1)
	{
		// apply the scale formula to the modulation intensity
		var auxIntensity = c.getAuxIntensity();
		var av = c.getAuxModSignal();
		intensity *= (1.0 - auxIntensity + auxIntensity * av)
	}
		
	// if it's bipolar we scale it around the mid position and then add it;
	// multiplied with the intensity, otherwise we just multiply the mod signal
	// with the intensity
	if(c.isBipolar())
		parameterValue += intensity * 2.0 * (mv - 0.5);
	else
		parameterValue += intensity * mv;
}
```

## Modulation and UI Range

When you connect a matrix modulator to a UI knob of your interface, it will control the **Value** parameter of this modulator:

> Note that this is agnostic of how you connected the modulator: if you assign it through the `matrixTargetId` property, it will still internally call the **Value** parameter change when the target is a matrix modulator.

This value parameter will control the **base offset** of the modulation signal so the target parameter will be modulated using this parameter as "starting point" (eg. if you have no modulation connections present, the target modulation value will correlate 1:1 with the value parameter).

Now with this direct connection there comes a problem: in some cases you want to modify the modulation range and customize it to your project. However if you do so, the UI knob looses the ability of converting the modulation range to its displayed range and all the nice UI features with the modulation visualization go out of the window. Since all modulation in HISE boil down to a control signal between 0.0 and 1.0, the only option you would have is to set every knob to the `"NormalizedPercentage"` mode from 0 to 1.

That would be a very limiting feature, and this is where the Modulation / UI Range comes in: you can define two ranges, one for the UI knob and one for the modulation output and the matrix modulator will use this to figure out the connection between the UI and the modulation signal:

- whenever you change a value on your UI, it will use the UI Range (aka **InputRange**) to convert it to a normalised signal, then use this value as the **base offset** for the modulation signal. Then you just have make sure to set the knob range of your UI knob to the same range and you're good.
- after all modulation signals have been calculated, it will use the Modulation Range (aka **OutputRange**) to convert the signal to the modulation output. This is required so that the UI value will actually match the outcome of the modulation signal.

You can modify these ranges in three ways:

1. Editing the ranges directly in the editor of the matrix modulator. Click on the **Edit value range** knob and modify the values.
2. Use the [Modulator.setMatrixProperties()](/scripting/scripting-api/modulator#setmatrixproperties) function to modify them via script.
3. [ScriptModulationMatrix.setMatrixModulationProperties()](/scripting/scripting-api/scriptmodulationmatrix#setmatrixmodulationproperties) to change them for all target modulators at once (alongside with other properties).

Now making sure that the input and output ranges are setup correctly is a bit tricky and there are a few ready-made presets for most modulation target styles, but first let's take a look at a simple example on how to do this the "hard" way.

### Example

Let's take a look at a simple example: a matrix modulator in the Gain modulation chain of a sound generator. Now by default the normalized range from 0...1 means that the gain modulation output range will be from -100dB to 0dB with a -6dB midpoint (0.5 = -6dB). This is how all gain modulation in HISE works. On the UI we want to display a knob that controls the volume of the sound generator and represents the gain modulation, but we want:

1. the gain value being displayed as Decibel.
2. the range to be extended so that you can push the volume above unity gain. 

For the example to remain as math-free as possible, we pick +6dB as max gain and 0dB as mid point (you'll see soon why that is the simplest example). So we set these values to be the input range:

```javascript
InputRange = {
	min: -100.0,
	max: 6.0,
	middlePosition: 0.0,
	stepSize: 0.0
	mode: "Decibel"
}
```

> Note that this is the proper syntax for the scripting calls and the range definitions use the same key names as the Slider range properties.

We can now set our UI knob to the same range and now we can control the volume correctly, as the matrix modulator knows how to convert that incoming weird decibel value to a nice lean number between 0.0 and 1.0. However that's only part 1 of the system, because if you go completely insane and crank that bad boy up to +6dB like there is no tomorrow, the modulation output will still only be 1.0 (aka 0dB) because that is the default maximum modulation output value. 

In order to reflect the desire for absolute mayhem and destruction we need to tell the modulator output that +6dB actually means +6dB. Now our idea of keeping the math as simple as possible pays off big time: +6dB just means a gain factor of 2.0, so what we need to do is to change the output range to:

```javascript
OutputRange = {
	min: 0.0,
	max: 2.0,
	middlePosition: 1.0,
	stepSize: 0.0
}
```

This range will now be used to scale the output modulation value and now the UI knob does control the actual volume of that sound generator exactly how you would expect. No you might think that this was very complicated for such a basic function, but the idea here is to allow basically every input to output range conversion possible. 

Now for most use cases you will never have to think about this concept, because there are a few ready made presets that you can simply select with the Presets dropdown 

> if you call one the scripting methods, you can just supply a String that matches one of the presets described below instead of the Range JSON.

### Range Presets

These presets will setup the values of the input and output range automatically and should cover almost all use cases (and if not, you can easily start from a preset and modify it to match your requirements). Currently these presets are available:

| Preset | Expected Target | Zero Position | Description |
| === | == | = | ===== |
| `NormalizedPercentage` | Anything | 0% | The default raw modulation from 0...1. |
| `Gain0dB` | Gain Modulation | 0% | The default raw modulation from 0...1 but with a UI display in "Decibel" mode |
| `Gain6dB` | Gain Modulation | 0% |A modulation from -100dB to +6dB (exactly what we have in our example). |
| `Pitch1Octave` | Pitch Modulation | 50% | The default pitch modulation from -12 to +12 semitones. The step size is 1 semitone. |
| `Pitch2Octaves` | Pitch Modulation | 50% | The default pitch modulation with an extended -24 to +24 semitone range. The step size is 1 semitone. |
| `Pitch1Semitone` | Pitch Modulation | 50% | This will use the full modulation range to apply a +-1 semitone modulation so you can connect this to something like a "Fine Detune" knob. |
| `FilterFreq` | Filter Frequency | 0% | The frequency modulation from 20Hz to 20kHz without any skewing (the mid-modulation position will be 10kHz). This is the default HISE filter frequency modulation behaviour and might not be the best sounding one. |
| `FilterFreqLog` | Filter Frequency | 0% | The frequency modulation range from 20Hz to 20kHz but with a 2kHz midpoint. |
| `Stereo` | Stereo Modulation | 50% | A modulation range from -100L to 100R. |

### ZeroPosition

As you can see, there is an additional property **Zero Position** (or `UseMidPositionAsZero` when you set this programatically) that defines how the intensity is calculated: For all targets that are bipolar in nature (eg. stereo balance or pitch modulation) you want the modulation to scale agains the mid point: if the modulation output signal is zero, the stereo position should be dead center and not hanging on the left speaker like a modulation signal of 0.0 would sound like. This is precisely what this property sets: it applies the modulation scaling to the middle of the input / output range.

> Obviously this only affects modulation connections in the `"Scale"` mode, as unipolar or bipolar modulation connections are simply adding their value to the modulation signal and will not be affected by this setting.

### Performance considerations

The modulation output range will be used to convert the calculated modulation signal directly in the audio thread before it's sent to the target parameter. If that conversion needs to apply a skew factor (because the `middlePosition` is not exactly in the middle between `min` and `max`, this might come with a non-significant overhead so I highly suggest to evaluate whether this justifies the performance:

1. for a filter frequency modulation slot it makes sense because we perceive frequency logarithmically so modulating around a 10kHz mid point feels off.
2. for a gain modulation slot to scale every single voice with a non-default skew factor might not worth the performance overhead, as people are used to a linear modulation of gain (and the "logarithmic" scaling often happens already on the modulation source side, eg. "Linear" vs. "Exponential" envelope curves etc).




