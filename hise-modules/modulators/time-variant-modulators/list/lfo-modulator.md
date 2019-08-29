---
keywords: LFO Modulator
summary: A LFO Modulator modulates the signal with a low frequency
parameters:
- Frequency: the frequency in Hz of the LFO. This value can be set to any value, although the internal modulation system will truncate frequencies above ~500Hz with nasty aliasing.
- FadeIn: the fade in time for the modulator
- WaveFormType: the oscillator's shape
- Legato: If enabled, it will not retrigger the envelope if another key is already pressed.
- TempoSync: If enabled, the frequency of the LFO will be synced to the host tempo.
- SmoothingTime: a low pass filter that smoothes the edges of the signal.
- NumSteps: The number of steps of the step sequencer
- LoopEnabled: if disabled, the LFO will only run once. This is can be used in combination with the Custom waveform type and extremely low frequencies (< 0.1Hz) to create slowly evolving textures.
---
