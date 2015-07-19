# Processor Reference

This is a list of all available Processors in **HISE**. This page is designed as reference guide. For a detailed explanation on how to use them, go to the [Backend Manual](index.php).

## Sound Generators

All Sound Generators share a few parameters:

ID | Parameter  | Default | Description
-- | ---------  | ------- | ----     
0  | Volume		| -12 dB  | The volume of the Sound Generator.
1  | Balance	| 0 (C)	  | The stereo balance of the Sound Generator.
2  | Voice Amount | 64 | This is the amount of voices that can be played simultaneously. If all voice slots are used and a new note is triggered, it will kill the oldest note.
3  | KillTime   | 20 ms   | If a note must be killed, this is the fade time between the old and the new voice. If you set this to 0 ms, you will hear a click noise.

### Sine Wave Generator
<p class="processor">![](images/listSine.PNG)</p>

A simple and lightweight sine wave generator. It can be used to drive a FM Synthesiser, or stacked together for Additive Synthesis or used as simple enhancement of another sound.

It has two operating modes for the pitch definition:

- **Musical** - in octaves / semitones.
- **Harmonics** - as harmonics compared to the root frequency. Use this mode for additive synthesis (it will allow to define the harmonic structure of the resulting sound more clearly.)

> It also has a internal Wave-Shaper effect, that allows to quickly add some harmonics to dirten up the sound.

#### Parameters

ID | Parameter  | Default | Description
-- | ---------- | ------- | -----------
4  | Octave | 0  | If the mode is set to `Musical`, this defines the coarse frequency.
5  | Semitones | 0 | If the mode is set to `Musical`, this defines the fine frequency in semitones
6  | Use Frequency Ratio | Off | Toggles between the two modes for the pitch definition.
7  | Coarse Ratio | 1.0 | If the mode is set to `Harmonics`, this defines the harmonic index (1 being the root frequency).
8  | Fine Ratio | 0.0 | If the mode is set to `Harmonics`, this defines the fine frequency (as factor from 0.0 to 1.0).
9  | Saturation | 0% | the amount of the wave shaping saturation

If you change one of the frequency parameters, the pitch will be updated at the next note on, so for realtime modulation of the pitch, use the Modulator chain `Pitch Modulation`. 

### Waveform Generator
<p class="processor">![](images/listWaveform.PNG)</p>

The Waveform Generator is a basic synthesizer module with two oscillators and the most popular waveforms: Sine, Triangle, Saw, Square, Noise.
The sine and triangle waves are computed cheaply and naive, and the Saw and the Square use some advanced anti aliasing (BLIT).

 The balance between the two oscillators (=the Mix) can be fully modulated. This is the module of choice for subtractive synthesis.

> Pan and detune the oscillators for that thick **Detuned Stereo Sound**

#### Hallo

### Noise Generator

### Wavetable Synthesiser

### Audio Loop Player

### Sampler

### Container

### Synthesiser Group

## Midi Processors

## Voice Start Modulators

## Time Variant Modulators

## Envelope Modulators


### AHDSR Envelope
<p class="processor">![](images/listAHDSR.PNG)</p>

A pretty common envelope type with 5 states. (Go to http://en.wikiaudio.org/ADSR_envelope for a general description on how an envelope works)

The Modulator has five states: Attack, Hold, Decay, Sustain and Release and allows modulation of 
the attack time and level, the decay time and the release time with VoiceStartModulators.

> Unlike the [SimpleEnvelope](#simple_envelope), this envelope has a exponential curve, so it sounds nicer (but is a little bit more resource-hungry).

#### Parameters

ID | Parameter | Default | Description
-- | --------- | ------- | ----
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

This modulator is the most simple envelope (only attack and release).

It has an attack and release time that can be modified by an internal modulator chain, which are calculated at the note-on (attack) and note-off (release) time.
You have to specify a sampleRate using the prepareToPlay method or the modulator will not be working!

> This envelope uses linear ramping. Since we perceive loudness logarithmically, it sounds a bit odd. Consider using another envelope if this bothers you. (The Simple envelope was designed to remove clicks and make some other rather technical tasks).

#### Parameters

ID | Parameter | Description
-- | --------- | -----------
0 | Attack | the attack time in milliseconds
1 | Release | the release time in milliseconds


## Polyphonic Effects

## Monophonic Effects

## Master Effects