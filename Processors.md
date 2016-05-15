Every module has a set of parameters, which will be listed for every module:

Parameter Name
:	<small>Range: *min ... **default value** ... max*</small>  
Parameter Description  
`Index: 2`

You can use the `Index` to change the parameter with a ScriptProcessor:

```Javascript
ModuleId.setAttribute(Index, value)
```

If you do so, you are not limited to the listed range, but be careful or you crash the application when used with wild values.

> All parameters (including integer and boolean data) are internally stored as 32 bit float value for compatibility with host automation.

## Sound Generators

All Sound Generators share a few parameters:

ID | Name | Range | Description 
--- | ---- | ----- | -----------
0 | Volume | *-inf ... **-12dB** ... 0dB.* | The volume of the Sound Generator.
1 | Balance | *-100L ... **(C)** ... 100R* | The stereo balance of the Sound Generator.  
2 | Voice Amount | *0 ... **64** * | This is the amount of voices that can be played simultaneously. If all voice slots are used and a new note is triggered, it will kill the oldest note.  
3 | KillTime | *Range: 0 ... **20 ms** ... 20s* | If a note must be killed, this is the fade time between the old and the new voice. If you set this to 0 ms, you will hear a click noise.  

#### Internal Modulation Slots

Modulated Parameter | Allowed Modulator Type | Description
------------------- | ---------------------- | -----------
<span style="color: #D9911E;">Gain Modulation</span> | All Modulators (Except Container & Synthesizer Groups) | Modulates the volume of each voice of the sound generator. By default, it uses linear gain scaling (0.5 = -6dB), so you might want to change the value curve.
<span style="color: #628214;">Pitch</span> | All Modulators (Except Container & Synthesizer Groups) | Modulates the pitch of each voice from -12 semitones to +12 semitones (modulation value `0.5` is 0 semitones.)

### Sine Wave Generator
![SineWave_Module.png](http://hart-instruments.net/hise/blog2/images/SineWave_Module.png)

A simple and lightweight sine wave generator. It can be used to drive a FM Synthesiser, or stacked together for Additive Synthesis or used as simple enhancement of another sound.

It has two operating modes for the pitch definition:

- **Musical** - in octaves / semitones.
- **Harmonics** - as harmonics compared to the root frequency. Use this mode for additive synthesis (it will allow to define the harmonic structure of the resulting sound more clearly.)

> It also has a internal Wave-Shaper effect, that allows to quickly add some harmonics to dirten up the sound.

#### Parameters

| ID | Name                | Range                    | Description                                                                                      |
|----|---------------------|--------------------------|--------------------------------------------------------------------------------------------------|
| 4  | Octave              | *-5 ... **0** ... 5*     | If the mode is set to *Musical*, this defines the coarse frequency.                              |
| 5  | Semitones           | *-12 ... **0** ... 12*   | If the mode is set to *Musical*, this defines the fine frequency in semitones.                   |
| 6  | Use Frequency Ratio | *On ... **Off***         | Toggles between the two modes for the pitch definition.                                          |
| 7  | Coarse Ratio        | ***1** ... 12*           | If the mode is set to *Harmonics*, this defines the harmonic index (1 being the root frequency). |
| 8  | Fine Ratio          | ***0.0** ... 1.0*        | If the mode is set to *Harmonics*, this defines the fine frequency (as factor).                  |
| 9  | Saturation          | Range: ***0%** ... 100%* | The saturation amount for the internal wave shaper. Use this to quickly add some harmonics.      |

> If you change one of the frequency parameters, the pitch will be updated at the next note on, so for realtime modulation of the pitch, use the Modulator chain *Pitch Modulation*. 

### Waveform Generator

![WaveSynth_Module.png](http://hart-instruments.net/hise/blog2/images/WaveSynth_Module.png)

The Waveform Generator is a basic synthesizer module with two oscillators and the most popular waveforms: Sine, Triangle, Saw, Square, Noise.
The sine and triangle waves are computed cheaply and naive, and the Saw and the Square use some advanced anti aliasing (BLIT).

 The balance between the two oscillators (=the Mix) can be fully modulated. This is the module of choice for subtractive synthesis.

> Pan and detune the oscillators for that thick **Detuned Stereo Sound**

#### Parameters
 
ID | Name | Range | Description 
--- | ---- | ----- | -----------
4 | Octave Transpose 1  | -5 ... **0** ... 5 | The octave transpose factor for the first Oscillator.
5 | Waveform 1 | Sine, Triangle, **Saw**, Square, Noise | the waveform type
6 | Detune 1 | -100ct ... **0.0ct** ... 100ct | The pitch detune of the first oscillator in cent (100 cent = 1 semitone).
7 | Pan 1 | -100 ... **0** ... 100 | the stereo panning of the first oscillator
8 | Octave Transpose 2 | -5 ... **0** ... 5 | the octave transpose factor for the first oscillator
9 | Waveform 2 | Sine, Triangle, **Saw**, Square, Noise | the waveform type
10 | Detune 2 | -100ct ... **0ct** ... 100ct | the pitch detune of the first oscillator in cent (100 cent = 1 semitone)
11 | Pan 2 | -100 ... **0** ... 100 | the stereo panning of the first oscillator
12 | Mix | 0 ... **50%** ... 100% | the balance between the two oscillators (0% = Left, 100% = Right)


#### Internal Modulation Slots

Modulated Parameter | Allowed Modulator Type
------------------- | ----------------------
Oscillator Mix | All Modulators (polyphonic)

### Noise Generator

A simple white noise generator. It has no additional parameters (it simply generated white noise).

> White Noise is loud, so be careful!

### Wavetable Synthesiser

This is a wavetable synthesiser with a hardcoded clarinet wavetable. (only for internal use).

### Audio Loop Player

This is a basic audio file player which supports looping & pitch tracking.

### Sampler

![Sampler_Module.png](http://hart-instruments.net/hise/blog2/images/Sampler_Module.png)

The main sampler module. For a detailed reference, go to the dedicaded manual chapter

ID | Name | Range | Description 
--- | ---- | ----- | -----------
4 | PreloadSize | -1 ... **11000** ... | The preload size in samples for all samples that are loaded into the sampler. If the preload size is `-1`, then the whole sample will be loaded into memory.
5 | BufferSize | 0 ... **4096** ... | The buffer size of the streaming buffers (2 per voice) in samples. The sampler uses two buffers which are swapped (one is used for reading from disk and one is used to supply the sampler with the audio data)
6 | VoiceAmount | 0 ... **64** | The amount of voices that the sampler can play. This is not the same as voice limit.
7 | RRGroupAmount | **0** ... x | The number of groups that are cycled in a round robin manier.
8 | SamplerRepeatMode | **Kill Note**, Note off, Do nothing | determines how the sampler treats repeated notes.
9 | PitchTracking | **On**, Off | Enables pitch ratio modification for different notes than the root note. Disable this for drum samples.
10 | OneShot | On, **Off** | plays the whole sample (ignores the note off) if set to enabled.
11 | CrossfadeGroups | On, **Off** | if enabled, the groups are played simultanously and can be crossfaded with the X-Fade Modulation Chain
12 | Purged | On, **Off** | If this is true, all samples of this sampler won't be loaded into memory. Turning this on will load them.

#### Internal Modulation Slots

Modulated Parameter | Allowed Modulator Type
------------------- | ----------------------
Sample Start Modulation | Voice Start Modulators
Group Fade Modulation | All modulators

> The Sample Start Modulation checks the maximal range of the sample start modulation for each sample, so in order to make this work, you have to define a Sample Start Modulation area for each sample (this loads the area into memory, this is why it isn't enabled by default.)

### Container

### Synthesiser Group

## Midi Processors

## Voice Start Modulators

### Velocity Modulator
<p class="processor">![](http://hartinstruments.net/hise/manual/images/images/listVelocity.PNG)</p>

This modulator uses the MIDI velocity to calculate its output.

#### Parameters

ID | Name | Range | Description 
--- | ---- |  ----- | -----------
0 | Inverted | On, **Off** | if `true`, then the modulator works inverted, so that high velocity values are damped.
1 | UseTable | On, **Off** | if `true` then a look up table is used to calculate the value. You can see the input velocity in the Table.

> It uses a linear range, so you might want to change the table (like the screenshot) to a more exponential one.

### Array Modulator

![Array_Module.png](http://hart-instruments.net/hise/blog2/images/Array_Module.png)

The Array modulator is a note number to value array. For itself, it has a limited usage but combined with scripting, it can be used to set values quite elegantly.

There are no parameters, instead the numbers `0 - 127` can be used to access the array data:

```javascript
arrayModulator.setAttribute(64, 0.5) // sets C4 to 0.5
```

## Time Variant Modulators

## Envelope Modulators


### AHDSR Envelope
![](http://hartinstruments.net/hise/manual/images/images/listAHDSR.PNG)

A pretty common envelope type with 5 states. (Go to http://en.wikiaudio.org/ADSR_envelope for a general description on how an envelope works)

The Modulator has five states: Attack, Hold, Decay, Sustain and Release and allows modulation of 
the attack time and level, the decay time and the release time with VoiceStartModulators.

> Unlike the [SimpleEnvelope](#simple_envelope), this envelope has a exponential curve, so it sounds nicer (but is a little bit more resource-hungry).

#### Parameters

ID | Parameter | Default | Description
--- | --------- | ------- | ----
0 | Attack | 20ms | the attack time in milliseconds
1 | AttackLevel | 0dB |  the attack level in decibel
2 | Hold | 20ms | the hold time in milliseconds
3 | Decay | 20ms | the decay time in milliseconds
4 | Sustain | -6dB | the sustain level in decibel
5 | Release | 20ms | the release time in milliseconds

---

#### Internal Modulation Slots

Modulated Parameter | Allowed Modulator Type
------------------- | ----------------------
Attack Level | Voice Start Modulators
Attack Time | Voice Start Modulators
Decay Time | Voice Start Modulators
Release Time | Voice Start Modulators

### Simple Envelope

![SimpleEnvelope_Module.png](http://hart-instruments.net/hise/blog2/images/SimpleEnvelope_Module.png)

This modulator is the most simple envelope: it has an attack and release time. The attack time can be modulated.

This envelope can use either linear ramping or an exponential curve. Since we perceive loudness logarithmically, it is recommended to use the exponential mode for the gain modulation (if the envelope is used as musical sound shaper. For pure technical tasks (removing clicks), the linear ramping should be sufficient.

#### Parameters

ID | Parameter | Description
--- | --------- | -----------
0 | Attack | the attack time in milliseconds
1 | Release | the release time in milliseconds
2 | Linear Mode | If `true`, the envelope uses a linear ramp or an exponential curve if `false`.

#### Internal Modulation Slots

Modulated Parameter | Allowed Modulator Type
------------------- | ----------------------
Attack Time Modulation | Voice Start Modulators


## Polyphonic Effects

## Monophonic Effects

## Master Effects
