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



