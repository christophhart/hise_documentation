
### AudioLooper Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
AudioLooper.setAttribute(AudioLooper.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
AudioLooper.setAttribute(AudioLooper.Balance, value);

/* The number of voices that this synth can play.. */
AudioLooper.setAttribute(AudioLooper.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
AudioLooper.setAttribute(AudioLooper.KillFadeTime, value);

/* Syncs the looper to the host tempo. */
AudioLooper.setAttribute(AudioLooper.SyncMode, value);

/* Enables looped playback. */
AudioLooper.setAttribute(AudioLooper.LoopEnabled, value);

/* Repitches the sample based on the note and the root note.. */
AudioLooper.setAttribute(AudioLooper.PitchTracking, value);

/* Sets the root note when pitch tracking is enabled. */
AudioLooper.setAttribute(AudioLooper.RootNote, value);

/* Modulates the sample start. */
AudioLooper.setAttribute(AudioLooper.SampleStartMod, value);

/* Reverses the sample. */
AudioLooper.setAttribute(AudioLooper.Reversed, value);

```

### SynthChain Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
SynthChain.setAttribute(SynthChain.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
SynthChain.setAttribute(SynthChain.Balance, value);

/* The number of voices that this synth can play.. */
SynthChain.setAttribute(SynthChain.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
SynthChain.setAttribute(SynthChain.KillFadeTime, value);

```

### GlobalModulatorContainer Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
GlobalModulatorContainer.setAttribute(GlobalModulatorContainer.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
GlobalModulatorContainer.setAttribute(GlobalModulatorContainer.Balance, value);

/* The number of voices that this synth can play.. */
GlobalModulatorContainer.setAttribute(GlobalModulatorContainer.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
GlobalModulatorContainer.setAttribute(GlobalModulatorContainer.KillFadeTime, value);

```

### MacroModulationSource Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
MacroModulationSource.setAttribute(MacroModulationSource.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
MacroModulationSource.setAttribute(MacroModulationSource.Balance, value);

/* The number of voices that this synth can play.. */
MacroModulationSource.setAttribute(MacroModulationSource.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
MacroModulationSource.setAttribute(MacroModulationSource.KillFadeTime, value);

```

### Noise Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
Noise.setAttribute(Noise.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
Noise.setAttribute(Noise.Balance, value);

/* The number of voices that this synth can play.. */
Noise.setAttribute(Noise.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
Noise.setAttribute(Noise.KillFadeTime, value);

```

### StreamingSampler Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
StreamingSampler.setAttribute(StreamingSampler.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
StreamingSampler.setAttribute(StreamingSampler.Balance, value);

/* The number of voices that this synth can play.. */
StreamingSampler.setAttribute(StreamingSampler.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
StreamingSampler.setAttribute(StreamingSampler.KillFadeTime, value);

/* The preload size in samples for all samples that are loaded into the sampler. If the preload size is `-1`, then the whole sample will be loaded into memory.. */
StreamingSampler.setAttribute(StreamingSampler.PreloadSize, value);

/* The buffer size of the streaming buffers (2 per voice) in samples.  The sampler uses two buffers which are swapped (one is used for reading from disk and one is used to supply the sampler with the audio data). */
StreamingSampler.setAttribute(StreamingSampler.BufferSize, value);

/* The amount of voices that the sampler can play. . */
StreamingSampler.setAttribute(StreamingSampler.VoiceAmount, value);

/* The number of groups that are cycled in a round robin manier. This is effectively just another dimension for mapping samples and can be used for many different purposes (handling round robins is just the default).. */
StreamingSampler.setAttribute(StreamingSampler.RRGroupAmount, value);

/* Determines how the sampler treats repeated notes.  . */
StreamingSampler.setAttribute(StreamingSampler.SamplerRepeatMode, value);

/* Enables pitch ratio modification for different notes than the root note. Disable this for drum samples.. */
StreamingSampler.setAttribute(StreamingSampler.PitchTracking, value);

/* Plays the whole sample (ignores the note off) if set to enabled.. */
StreamingSampler.setAttribute(StreamingSampler.OneShot, value);

/* If enabled, the groups are played simultanously and can be crossfaded with the Group-Fade Modulation Chain.. */
StreamingSampler.setAttribute(StreamingSampler.CrossfadeGroups, value);

/* If *Enabled*, it will unload all preload buffers and deactivate the sample playback to save memory. The **Lazy load** option unloads all preload buffers and delays the preloading of a sample until it is triggered for the first time.. */
StreamingSampler.setAttribute(StreamingSampler.Purged, value);

/* If this is true, the samples will be fully loaded into preload buffer and reversed. */
StreamingSampler.setAttribute(StreamingSampler.Reversed, value);

/* If this is true, then the routing matrix will not be resized when you load a sample map with another mic position amount.. */
StreamingSampler.setAttribute(StreamingSampler.UseStaticMatrix, value);

/* -. */
StreamingSampler.setAttribute(StreamingSampler.LowPassEnvelopeOrder, value);

/* -. */
StreamingSampler.setAttribute(StreamingSampler.Timestretching, value);

```

### ScriptSynth Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
ScriptSynth.setAttribute(ScriptSynth.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
ScriptSynth.setAttribute(ScriptSynth.Balance, value);

/* The number of voices that this synth can play.. */
ScriptSynth.setAttribute(ScriptSynth.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
ScriptSynth.setAttribute(ScriptSynth.KillFadeTime, value);

```

### SendContainer Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
SendContainer.setAttribute(SendContainer.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
SendContainer.setAttribute(SendContainer.Balance, value);

/* The number of voices that this synth can play.. */
SendContainer.setAttribute(SendContainer.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
SendContainer.setAttribute(SendContainer.KillFadeTime, value);

```

### SilentSynth Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
SilentSynth.setAttribute(SilentSynth.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
SilentSynth.setAttribute(SilentSynth.Balance, value);

/* The number of voices that this synth can play.. */
SilentSynth.setAttribute(SilentSynth.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
SilentSynth.setAttribute(SilentSynth.KillFadeTime, value);

```

### SineSynth Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
SineSynth.setAttribute(SineSynth.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
SineSynth.setAttribute(SineSynth.Balance, value);

/* The number of voices that this synth can play.. */
SineSynth.setAttribute(SineSynth.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
SineSynth.setAttribute(SineSynth.KillFadeTime, value);

/* If the mode is set to Musical, this defines the coarse frequency.. */
SineSynth.setAttribute(SineSynth.OctaveTranspose, value);

/* If the mode is set to Musical, this defines the fine frequency in semitones.. */
SineSynth.setAttribute(SineSynth.SemiTones, value);

/* Toggles between the two modes for the pitch definition.. */
SineSynth.setAttribute(SineSynth.UseFreqRatio, value);

/* If the mode is set to Harmonics, this defines the harmonic index(1 being the root frequency).. */
SineSynth.setAttribute(SineSynth.CoarseFreqRatio, value);

/* If the mode is set to Harmonics, this defines the fine frequency(as factor).. */
SineSynth.setAttribute(SineSynth.FineFreqRatio, value);

/* The saturation amount for the internal wave shaper.Use this to quickly add some harmonics.. */
SineSynth.setAttribute(SineSynth.SaturationAmount, value);

```

### SynthGroup Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
SynthGroup.setAttribute(SynthGroup.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
SynthGroup.setAttribute(SynthGroup.Balance, value);

/* The number of voices that this synth can play.. */
SynthGroup.setAttribute(SynthGroup.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
SynthGroup.setAttribute(SynthGroup.KillFadeTime, value);

/* Enables FM synthesis for this group.. */
SynthGroup.setAttribute(SynthGroup.EnableFM, value);

/* the index for the FM carrier.. */
SynthGroup.setAttribute(SynthGroup.CarrierIndex, value);

/* the index for the FM Modulator. */
SynthGroup.setAttribute(SynthGroup.ModulatorIndex, value);

/* the number of unisono voices. */
SynthGroup.setAttribute(SynthGroup.UnisonoVoiceAmount, value);

/* The detune amount for the unisono voices. */
SynthGroup.setAttribute(SynthGroup.UnisonoDetune, value);

/* the spread amount for the unisono voices. */
SynthGroup.setAttribute(SynthGroup.UnisonoSpread, value);

/* if enabled, the voices will be rendered as mono voice. */
SynthGroup.setAttribute(SynthGroup.ForceMono, value);

/* kills the second voices. */
SynthGroup.setAttribute(SynthGroup.KillSecondVoices, value);

```

### WaveSynth Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
WaveSynth.setAttribute(WaveSynth.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
WaveSynth.setAttribute(WaveSynth.Balance, value);

/* The number of voices that this synth can play.. */
WaveSynth.setAttribute(WaveSynth.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
WaveSynth.setAttribute(WaveSynth.KillFadeTime, value);

/* The octave shift for the first oscillator. */
WaveSynth.setAttribute(WaveSynth.OctaveTranspose1, value);

/* the waveform of the first oscillator. */
WaveSynth.setAttribute(WaveSynth.WaveForm1, value);

/* Detunes the first oscillator. */
WaveSynth.setAttribute(WaveSynth.Detune1, value);

/* Pans the first oscillator. */
WaveSynth.setAttribute(WaveSynth.Pan1, value);

/* The octave shift for the second oscillator. */
WaveSynth.setAttribute(WaveSynth.OctaveTranspose2, value);

/* the waveform of the second oscillator. */
WaveSynth.setAttribute(WaveSynth.WaveForm2, value);

/* Detunes the second oscillator. */
WaveSynth.setAttribute(WaveSynth.Detune2, value);

/* Pans the second oscillator. */
WaveSynth.setAttribute(WaveSynth.Pan2, value);

/* The balance between osc1 and osc2. */
WaveSynth.setAttribute(WaveSynth.Mix, value);

/* Turn the second OSC on and off. */
WaveSynth.setAttribute(WaveSynth.EnableSecondOscillator, value);

/* Changes the pulse of the OSC1 Square and Trapezoid oscillator. */
WaveSynth.setAttribute(WaveSynth.PulseWidth1, value);

/* Changes the pulse of the OSC12 Square and Trapezoid oscillator. */
WaveSynth.setAttribute(WaveSynth.PulseWidth2, value);

/* -. */
WaveSynth.setAttribute(WaveSynth.HardSync, value);

/* -. */
WaveSynth.setAttribute(WaveSynth.SemiTones1, value);

/* -. */
WaveSynth.setAttribute(WaveSynth.SemiTones2, value);

```

### WavetableSynth Parameter API

```javascript
/* The volume of the synth. It is stored as gain value from `0...1` so you need to use the conversion functions when using decibel ranges. */
WavetableSynth.setAttribute(WavetableSynth.Gain, value);

/* The stereo balance of the synth. The range is `-100...100`. */
WavetableSynth.setAttribute(WavetableSynth.Balance, value);

/* The number of voices that this synth can play.. */
WavetableSynth.setAttribute(WavetableSynth.VoiceLimit, value);

/* If you play more than the number of available voices this determines the fade out time of the voice that is going to be killed in ms. */
WavetableSynth.setAttribute(WavetableSynth.KillFadeTime, value);

/* Toggles between linear and cubic interpolation for the wavetable rendering. */
WavetableSynth.setAttribute(WavetableSynth.HqMode, value);

/* This will store the index of the wavetable in the current list.. */
WavetableSynth.setAttribute(WavetableSynth.LoadedBankIndex, value);

/* The table index from 0...1 that will be used as start value for the table index modulation. */
WavetableSynth.setAttribute(WavetableSynth.TableIndexValue, value);

/* -. */
WavetableSynth.setAttribute(WavetableSynth.RefreshMipmap, value);

```

### ChokeGroupProcessor Parameter API

```javascript
/* -. */
ChokeGroupProcessor.setAttribute(ChokeGroupProcessor.ChokeGroup, value);

/* -. */
ChokeGroupProcessor.setAttribute(ChokeGroupProcessor.LoKey, value);

/* -. */
ChokeGroupProcessor.setAttribute(ChokeGroupProcessor.HiKey, value);

/* -. */
ChokeGroupProcessor.setAttribute(ChokeGroupProcessor.KillVoice, value);

```

### Arpeggiator Parameter API

```javascript
/* Bypasses the arpeggiator. You can call this from other MIDI callbacks to stop it from running.. */
Arpeggiator.setAttribute(Arpeggiator.BypassButton, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.ResetButton, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.NumStepSlider, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.StepReset, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.StepSkipSlider, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.SortKeysButton, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.SpeedKnob, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.SequenceComboBox, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.OctaveRange, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.Shuffle, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.CurrentValue, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.EnableTie, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.packBg, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.SemiToneSliderPack, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.VelocitySliderPack, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.LengthSliderPack, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.ChannelSelector, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.OutputChannelSelector, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.MPEStartChannel, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.MPEEndChannel, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.Hold, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.NoteLabel, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.VeloLabel, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.LengthLabel, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.MIDILabel1, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.MIDILabel2, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.MIDILabel3, value);

/* -. */
Arpeggiator.setAttribute(Arpeggiator.MIDILabel4, value);

```

### CCSwapper Parameter API

```javascript
/* -. */
CCSwapper.setAttribute(CCSwapper.FirstCC, value);

/* -. */
CCSwapper.setAttribute(CCSwapper.SecondCC, value);

```

### ChannelFilter Parameter API

```javascript
/* -. */
ChannelFilter.setAttribute(ChannelFilter.channelNumber, value);

/* -. */
ChannelFilter.setAttribute(ChannelFilter.mpeStart, value);

/* -. */
ChannelFilter.setAttribute(ChannelFilter.mpeEnd, value);

```

### ChannelSetter Parameter API

```javascript
/* -. */
ChannelSetter.setAttribute(ChannelSetter.channelNumber, value);

```

### LegatoWithRetrigger Parameter API

```javascript
```

### MidiPlayer Parameter API

```javascript
/* -. */
MidiPlayer.setAttribute(MidiPlayer.CurrentPosition, value);

/* -. */
MidiPlayer.setAttribute(MidiPlayer.CurrentSequence, value);

/* -. */
MidiPlayer.setAttribute(MidiPlayer.CurrentTrack, value);

/* -. */
MidiPlayer.setAttribute(MidiPlayer.LoopEnabled, value);

/* -. */
MidiPlayer.setAttribute(MidiPlayer.LoopStart, value);

/* -. */
MidiPlayer.setAttribute(MidiPlayer.LoopEnd, value);

/* -. */
MidiPlayer.setAttribute(MidiPlayer.PlaybackSpeed, value);

```

### MidiMuter Parameter API

```javascript
/* If this is true, then all incoming note on messages (and controller events) will be ignored. If this parameter is activated when notes are being played, it will let the "open" note-off messages pass in order to avoid stuck notes.. */
MidiMuter.setAttribute(MidiMuter.ignoreButton, value);

/* this is a deprecated parameter (it forces ignoring of all events), but you shouldn't need it anymore.. */
MidiMuter.setAttribute(MidiMuter.fixStuckNotes, value);

```

### ReleaseTrigger Parameter API

```javascript
/* -. */
ReleaseTrigger.setAttribute(ReleaseTrigger.TimeAttenuate, value);

/* -. */
ReleaseTrigger.setAttribute(ReleaseTrigger.Time, value);

/* -. */
ReleaseTrigger.setAttribute(ReleaseTrigger.TimeTable, value);

```

### ScriptProcessor Parameter API

```javascript
```

### Transposer Parameter API

```javascript
/* Transposes the incoming MIDI signal up or down 24 semitones.. */
Transposer.setAttribute(Transposer.TransposeAmount, value);

```

### ArrayModulator Parameter API

```javascript
```

### Constant Parameter API

```javascript
```

### EventDataModulator Parameter API

```javascript
/* the index of the data slot from 0 to 16. */
EventDataModulator.setAttribute(EventDataModulator.SlotIndex, value);

/* the value that should be used when the event data hasn't been written yet. */
EventDataModulator.setAttribute(EventDataModulator.DefaultValue, value);

```

### GlobalStaticTimeVariantModulator Parameter API

```javascript
/* Can be used to change the incoming value using a [Table](/ui-components/plugin-components/table). */
GlobalStaticTimeVariantModulator.setAttribute(GlobalStaticTimeVariantModulator.UseTable, value);

/* inverts the output value with the formula `1.0 - value` (after it is sent through the table if `UseTable` is enabled).. */
GlobalStaticTimeVariantModulator.setAttribute(GlobalStaticTimeVariantModulator.Inverted, value);

```

### GlobalVoiceStartModulator Parameter API

```javascript
/* -. */
GlobalVoiceStartModulator.setAttribute(GlobalVoiceStartModulator.UseTable, value);

/* -. */
GlobalVoiceStartModulator.setAttribute(GlobalVoiceStartModulator.Inverted, value);

```

### KeyNumber Parameter API

```javascript
```

### Random Parameter API

```javascript
/* Use a Table to attenuate the randomness. */
Random.setAttribute(Random.UseTable, value);

```

### ScriptVoiceStartModulator Parameter API

```javascript
```

### Velocity Parameter API

```javascript
/* -. */
Velocity.setAttribute(Velocity.Inverted, value);

/* -. */
Velocity.setAttribute(Velocity.UseTable, value);

/* -. */
Velocity.setAttribute(Velocity.DecibelMode, value);

```

### LFO Parameter API

```javascript
/* Changes the frequency of the LFO from 0.5 - 10Hz. */
LFO.setAttribute(LFO.Frequency, value);

/* Time to Fade the LFO to full intensity in ms. Be aware: not linear.. */
LFO.setAttribute(LFO.FadeIn, value);

/* Choose a LFO Waveform. */
LFO.setAttribute(LFO.WaveFormType, value);

/* Turn Legato on/off. */
LFO.setAttribute(LFO.Legato, value);

/* Syncs the LFO to the Main Tempo. */
LFO.setAttribute(LFO.TempoSync, value);

/* Smooth the LFO. */
LFO.setAttribute(LFO.SmoothingTime, value);

/* . */
LFO.setAttribute(LFO.NumSteps, value);

/* . */
LFO.setAttribute(LFO.LoopEnabled, value);

/* Offsets the phase of the oscillator. @ 0% down from 1 (top of sinus-hill), 25% down from 0.5, 50% up from 0, 75% up from 0.5 .. */
LFO.setAttribute(LFO.PhaseOffset, value);

/* -. */
LFO.setAttribute(LFO.SyncToMasterClock, value);

/* -. */
LFO.setAttribute(LFO.IgnoreNoteOn, value);

```

### GlobalTimeVariantModulator Parameter API

```javascript
/* -. */
GlobalTimeVariantModulator.setAttribute(GlobalTimeVariantModulator.UseTable, value);

/* -. */
GlobalTimeVariantModulator.setAttribute(GlobalTimeVariantModulator.Inverted, value);

```

### Hardcoded Timevariant Modulator Parameter API

```javascript
```

### MacroModulator Parameter API

```javascript
/* the index of the macro control that is used by this module. If you're using the module UI, just select one in the drop down box, but if you're manually setting this parameter be aware that it starts with 1.. */
MacroModulator.setAttribute(MacroModulator.MacroIndex, value);

/* smoothes the parameter changes (just like with the Control Modulator).. */
MacroModulator.setAttribute(MacroModulator.SmoothTime, value);

/* you can enable a Table to process the incoming macro value to add extra control over the range.. */
MacroModulator.setAttribute(MacroModulator.UseTable, value);

/* this just holds the current value so you can grab it if you want to display it in some kind.. */
MacroModulator.setAttribute(MacroModulator.MacroValue, value);

```

### MidiController Parameter API

```javascript
/* -. */
MidiController.setAttribute(MidiController.Inverted, value);

/* -. */
MidiController.setAttribute(MidiController.UseTable, value);

/* -. */
MidiController.setAttribute(MidiController.ControllerNumber, value);

/* -. */
MidiController.setAttribute(MidiController.SmoothTime, value);

/* -. */
MidiController.setAttribute(MidiController.DefaultValue, value);

```

### PitchWheel Parameter API

```javascript
/* -. */
PitchWheel.setAttribute(PitchWheel.Inverted, value);

/* -. */
PitchWheel.setAttribute(PitchWheel.UseTable, value);

/* -. */
PitchWheel.setAttribute(PitchWheel.SmoothTime, value);

```

### ScriptTimeVariantModulator Parameter API

```javascript
```

### AHDSR Parameter API

```javascript
/* -. */
AHDSR.setAttribute(AHDSR.Monophonic, value);

/* -. */
AHDSR.setAttribute(AHDSR.Retrigger, value);

/* -. */
AHDSR.setAttribute(AHDSR.Attack, value);

/* -. */
AHDSR.setAttribute(AHDSR.AttackLevel, value);

/* -. */
AHDSR.setAttribute(AHDSR.Hold, value);

/* -. */
AHDSR.setAttribute(AHDSR.Decay, value);

/* -. */
AHDSR.setAttribute(AHDSR.Sustain, value);

/* -. */
AHDSR.setAttribute(AHDSR.Release, value);

/* -. */
AHDSR.setAttribute(AHDSR.AttackCurve, value);

/* -. */
AHDSR.setAttribute(AHDSR.DecayCurve, value);

/* -. */
AHDSR.setAttribute(AHDSR.EcoMode, value);

```

### EventDataEnvelope Parameter API

```javascript
/* -. */
EventDataEnvelope.setAttribute(EventDataEnvelope.Monophonic, value);

/* -. */
EventDataEnvelope.setAttribute(EventDataEnvelope.Retrigger, value);

/* The data slot that should be used to read the value. */
EventDataEnvelope.setAttribute(EventDataEnvelope.SlotIndex, value);

/* The value that should be used when there is no data written to the respective slot. */
EventDataEnvelope.setAttribute(EventDataEnvelope.DefaultValue, value);

/* The smoothing that will be applied to the envelope signal. */
EventDataEnvelope.setAttribute(EventDataEnvelope.SmoothingTime, value);

```

### GlobalEnvelopeModulator Parameter API

```javascript
/* -. */
GlobalEnvelopeModulator.setAttribute(GlobalEnvelopeModulator.Monophonic, value);

/* -. */
GlobalEnvelopeModulator.setAttribute(GlobalEnvelopeModulator.Retrigger, value);

/* -. */
GlobalEnvelopeModulator.setAttribute(GlobalEnvelopeModulator.UseTable, value);

/* -. */
GlobalEnvelopeModulator.setAttribute(GlobalEnvelopeModulator.Inverted, value);

```

### MPEModulator Parameter API

```javascript
/* -. */
MPEModulator.setAttribute(MPEModulator.Monophonic, value);

/* -. */
MPEModulator.setAttribute(MPEModulator.Retrigger, value);

/* -. */
MPEModulator.setAttribute(MPEModulator.GestureCC, value);

/* -. */
MPEModulator.setAttribute(MPEModulator.SmoothingTime, value);

/* -. */
MPEModulator.setAttribute(MPEModulator.DefaultValue, value);

/* -. */
MPEModulator.setAttribute(MPEModulator.SmoothedIntensity, value);

```

### ScriptEnvelopeModulator Parameter API

```javascript
/* -. */
ScriptEnvelopeModulator.setAttribute(ScriptEnvelopeModulator.Monophonic, value);

/* -. */
ScriptEnvelopeModulator.setAttribute(ScriptEnvelopeModulator.Retrigger, value);

```

### ScriptnodeVoiceKiller Parameter API

```javascript
/* -. */
ScriptnodeVoiceKiller.setAttribute(ScriptnodeVoiceKiller.Monophonic, value);

/* -. */
ScriptnodeVoiceKiller.setAttribute(ScriptnodeVoiceKiller.Retrigger, value);

```

### SimpleEnvelope Parameter API

```javascript
/* -. */
SimpleEnvelope.setAttribute(SimpleEnvelope.Monophonic, value);

/* -. */
SimpleEnvelope.setAttribute(SimpleEnvelope.Retrigger, value);

/* -. */
SimpleEnvelope.setAttribute(SimpleEnvelope.Attack, value);

/* -. */
SimpleEnvelope.setAttribute(SimpleEnvelope.Release, value);

/* -. */
SimpleEnvelope.setAttribute(SimpleEnvelope.LinearMode, value);

```

### TableEnvelope Parameter API

```javascript
/* -. */
TableEnvelope.setAttribute(TableEnvelope.Monophonic, value);

/* -. */
TableEnvelope.setAttribute(TableEnvelope.Retrigger, value);

/* -. */
TableEnvelope.setAttribute(TableEnvelope.Attack, value);

/* -. */
TableEnvelope.setAttribute(TableEnvelope.Release, value);

```

### SlotFX Parameter API

```javascript
```

### Dynamics Parameter API

```javascript
/* -. */
Dynamics.setAttribute(Dynamics.GateEnabled, value);

/* -. */
Dynamics.setAttribute(Dynamics.GateThreshold, value);

/* -. */
Dynamics.setAttribute(Dynamics.GateAttack, value);

/* -. */
Dynamics.setAttribute(Dynamics.GateRelease, value);

/* -. */
Dynamics.setAttribute(Dynamics.GateReduction, value);

/* -. */
Dynamics.setAttribute(Dynamics.CompressorEnabled, value);

/* -. */
Dynamics.setAttribute(Dynamics.CompressorThreshold, value);

/* -. */
Dynamics.setAttribute(Dynamics.CompressorRatio, value);

/* -. */
Dynamics.setAttribute(Dynamics.CompressorAttack, value);

/* -. */
Dynamics.setAttribute(Dynamics.CompressorRelease, value);

/* -. */
Dynamics.setAttribute(Dynamics.CompressorReduction, value);

/* -. */
Dynamics.setAttribute(Dynamics.CompressorMakeup, value);

/* -. */
Dynamics.setAttribute(Dynamics.LimiterEnabled, value);

/* -. */
Dynamics.setAttribute(Dynamics.LimiterThreshold, value);

/* -. */
Dynamics.setAttribute(Dynamics.LimiterAttack, value);

/* -. */
Dynamics.setAttribute(Dynamics.LimiterRelease, value);

/* -. */
Dynamics.setAttribute(Dynamics.LimiterReduction, value);

/* -. */
Dynamics.setAttribute(Dynamics.LimiterMakeup, value);

```

### PolyshapeFX Parameter API

```javascript
/* How much you want to drive the input signal into the shaper.. */
PolyshapeFX.setAttribute(PolyshapeFX.Drive, value);

/* Select a shaper function.. */
PolyshapeFX.setAttribute(PolyshapeFX.Mode, value);

/* Select if you want to oversample the shaper to get rid of artefacts.. */
PolyshapeFX.setAttribute(PolyshapeFX.Oversampling, value);

/* The bias amount.. */
PolyshapeFX.setAttribute(PolyshapeFX.Bias, value);

```

### Analyser Parameter API

```javascript
/* The index of the visualisation type.. */
Analyser.setAttribute(Analyser.PreviewType, value);

/* The buffer size of the internal ring buffer.. */
Analyser.setAttribute(Analyser.BufferSize, value);

```

### Chorus Parameter API

```javascript
/* The rate of the chorus. */
Chorus.setAttribute(Chorus.Rate, value);

/* The stereo width of the chorus. */
Chorus.setAttribute(Chorus.Width, value);

/* The feedback amount of the chorus. */
Chorus.setAttribute(Chorus.Feedback, value);

/* The delay amount of the chorus. */
Chorus.setAttribute(Chorus.Delay, value);

```

### Convolution Parameter API

```javascript
/* the gain value for the unprocessed signal (in dB).. */
Convolution.setAttribute(Convolution.DryGain, value);

/* the gain value for the convoluted signal (in dB).. */
Convolution.setAttribute(Convolution.WetGain, value);

/* the latency between input and output.. */
Convolution.setAttribute(Convolution.Latency, value);

/* (deprecated, use the sample range instead).. */
Convolution.setAttribute(Convolution.ImpulseLength, value);

/* mutes if `false`, the input for the reverb with a small fade to prevent clicks.. */
Convolution.setAttribute(Convolution.ProcessInput, value);

/* if `true`, then the convolution will be executed on a background thread.. */
Convolution.setAttribute(Convolution.UseBackgroundThread, value);

/* The predelay in milliseconds. */
Convolution.setAttribute(Convolution.Predelay, value);

/* Applies a high cut filter on the impulse response. This recalculates the IR so you can't use it during rendering.. */
Convolution.setAttribute(Convolution.HiCut, value);

/* Applies a decaying envelope on the impulse response. This recalculates the IR so you can't use it during rendering.. */
Convolution.setAttribute(Convolution.Damping, value);

/* -. */
Convolution.setAttribute(Convolution.FFTType, value);

```

### Delay Parameter API

```javascript
/* -. */
Delay.setAttribute(Delay.DelayTimeLeft, value);

/* -. */
Delay.setAttribute(Delay.DelayTimeRight, value);

/* -. */
Delay.setAttribute(Delay.FeedbackLeft, value);

/* -. */
Delay.setAttribute(Delay.FeedbackRight, value);

/* -. */
Delay.setAttribute(Delay.LowPassFreq, value);

/* -. */
Delay.setAttribute(Delay.HiPassFreq, value);

/* -. */
Delay.setAttribute(Delay.Mix, value);

/* -. */
Delay.setAttribute(Delay.TempoSync, value);

```

### EmptyFX Parameter API

```javascript
```

### PolyphonicFilter Parameter API

```javascript
/* Set the filter gain.. */
PolyphonicFilter.setAttribute(PolyphonicFilter.Gain, value);

/* Set the filter frequency. */
PolyphonicFilter.setAttribute(PolyphonicFilter.Frequency, value);

/* Set the bandwidth of the filter curve.. */
PolyphonicFilter.setAttribute(PolyphonicFilter.Q, value);

/* -. */
PolyphonicFilter.setAttribute(PolyphonicFilter.Mode, value);

/* -. */
PolyphonicFilter.setAttribute(PolyphonicFilter.Quality, value);

/* Set the intensity if the filter supports bipolar frequency.. */
PolyphonicFilter.setAttribute(PolyphonicFilter.BipolarIntensity, value);

```

### Hardcoded Master FX Parameter API

```javascript
```

### HardcodedPolyphonicFX Parameter API

```javascript
```

### HarmonicFilter Parameter API

```javascript
/* -. */
HarmonicFilter.setAttribute(HarmonicFilter.NumFilterBands, value);

/* -. */
HarmonicFilter.setAttribute(HarmonicFilter.QFactor, value);

/* -. */
HarmonicFilter.setAttribute(HarmonicFilter.Crossfade, value);

/* -. */
HarmonicFilter.setAttribute(HarmonicFilter.SemiToneTranspose, value);

```

### HarmonicFilterMono Parameter API

```javascript
/* -. */
HarmonicFilterMono.setAttribute(HarmonicFilterMono.NumFilterBands, value);

/* -. */
HarmonicFilterMono.setAttribute(HarmonicFilterMono.QFactor, value);

/* -. */
HarmonicFilterMono.setAttribute(HarmonicFilterMono.Crossfade, value);

/* -. */
HarmonicFilterMono.setAttribute(HarmonicFilterMono.SemiToneTranspose, value);

```

### MidiMetronome Parameter API

```javascript
/* -. */
MidiMetronome.setAttribute(MidiMetronome.Enabled, value);

/* -. */
MidiMetronome.setAttribute(MidiMetronome.Volume, value);

/* -. */
MidiMetronome.setAttribute(MidiMetronome.NoiseAmount, value);

```

### CurveEq Parameter API

```javascript
/* The gain in decibels if supported from the filter type.. */
CurveEq.setAttribute(CurveEq.Gain, value);

/* The frequency in Hz.. */
CurveEq.setAttribute(CurveEq.Freq, value);

/* The bandwidth of the filter if supported.. */
CurveEq.setAttribute(CurveEq.Q, value);

/* the state of the filter band.. */
CurveEq.setAttribute(CurveEq.Enabled, value);

/* the filter type of the filter band.. */
CurveEq.setAttribute(CurveEq.Type, value);

/* the offset that can be used to get the desired formula.. */
CurveEq.setAttribute(CurveEq.BandOffset, value);

```

### PhaseFX Parameter API

```javascript
/* the bottom frequency. */
PhaseFX.setAttribute(PhaseFX.Frequency1, value);

/* the upper frequency. */
PhaseFX.setAttribute(PhaseFX.Frequency2, value);

/* the amount of feedback. */
PhaseFX.setAttribute(PhaseFX.Feedback, value);

/* the wet amount. */
PhaseFX.setAttribute(PhaseFX.Mix, value);

```

### PolyScriptFX Parameter API

```javascript
```

### RouteFX Parameter API

```javascript
```

### Saturator Parameter API

```javascript
/* -. */
Saturator.setAttribute(Saturator.Saturation, value);

/* -. */
Saturator.setAttribute(Saturator.WetAmount, value);

/* -. */
Saturator.setAttribute(Saturator.PreGain, value);

/* -. */
Saturator.setAttribute(Saturator.PostGain, value);

```

### ScriptFX Parameter API

```javascript
```

### SendFX Parameter API

```javascript
/* -. */
SendFX.setAttribute(SendFX.Gain, value);

/* -. */
SendFX.setAttribute(SendFX.ChannelOffset, value);

/* -. */
SendFX.setAttribute(SendFX.SendIndex, value);

/* -. */
SendFX.setAttribute(SendFX.Smoothing, value);

```

### ShapeFX Parameter API

```javascript
/* -. */
ShapeFX.setAttribute(ShapeFX.BiasLeft, value);

/* -. */
ShapeFX.setAttribute(ShapeFX.BiasRight, value);

/* -. */
ShapeFX.setAttribute(ShapeFX.HighPass, value);

/* -. */
ShapeFX.setAttribute(ShapeFX.LowPass, value);

/* -. */
ShapeFX.setAttribute(ShapeFX.Mode, value);

/* -. */
ShapeFX.setAttribute(ShapeFX.Oversampling, value);

/* -. */
ShapeFX.setAttribute(ShapeFX.Gain, value);

/* -. */
ShapeFX.setAttribute(ShapeFX.Reduce, value);

/* -. */
ShapeFX.setAttribute(ShapeFX.Autogain, value);

/* -. */
ShapeFX.setAttribute(ShapeFX.LimitInput, value);

/* -. */
ShapeFX.setAttribute(ShapeFX.Drive, value);

/* -. */
ShapeFX.setAttribute(ShapeFX.Mix, value);

/* -. */
ShapeFX.setAttribute(ShapeFX.BypassFilters, value);

```

### SimpleGain Parameter API

```javascript
/* -. */
SimpleGain.setAttribute(SimpleGain.Gain, value);

/* -. */
SimpleGain.setAttribute(SimpleGain.Delay, value);

/* -. */
SimpleGain.setAttribute(SimpleGain.Width, value);

/* -. */
SimpleGain.setAttribute(SimpleGain.Balance, value);

/* -. */
SimpleGain.setAttribute(SimpleGain.InvertPolarity, value);

```

### SimpleReverb Parameter API

```javascript
/* -. */
SimpleReverb.setAttribute(SimpleReverb.RoomSize, value);

/* -. */
SimpleReverb.setAttribute(SimpleReverb.Damping, value);

/* -. */
SimpleReverb.setAttribute(SimpleReverb.WetLevel, value);

/* -. */
SimpleReverb.setAttribute(SimpleReverb.DryLevel, value);

/* -. */
SimpleReverb.setAttribute(SimpleReverb.Width, value);

/* -. */
SimpleReverb.setAttribute(SimpleReverb.FreezeMode, value);

```

### StereoFX Parameter API

```javascript
/* -. */
StereoFX.setAttribute(StereoFX.Pan, value);

/* -. */
StereoFX.setAttribute(StereoFX.Width, value);

```
