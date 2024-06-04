---
keywords: ahdsr
summary: An AHDSR envelope generator for shaping audio signals.
author: Christoph Hart
modified: 30.05.2024
parameters: 
  - Attack: Sets the time it takes for the envelope to rise from 0 to the Attack Level. This is the initial phase of the envelope.
  - AttackLevel: Determines the level the envelope reaches at the end of the attack phase.
  - Hold: Specifies the time the envelope stays at the Attack Level before entering the decay phase.
  - Decay: Sets the time it takes for the envelope to fall from the Attack Level to the Sustain level.
  - Sustain: Defines the level at which the envelope holds during the sustain phase until the key is released.
  - Release: Sets the time it takes for the envelope to fall from the Sustain level to 0 after the key is released.
  - AttackCurve: Adjusts the curvature of the attack phase, affecting the shape of the ramp-up.
  - Retrigger: Enables or disables retriggering of the envelope when a new note is played.
  - Gate: Controls the gate signal that triggers the envelope.
---

The `ahdsr_base` node is an AHDSR (Attack, Hold, Decay, Sustain, Release) envelope generator used to shape the dynamics of an audio signal over time. This node is a 1:1 replicate of the stock HISE AHDSR envelope modulator.

## MIDI Processing

If the envelope is in a MIDI processing context, it will trigger the gate based on the MIDI messages. The envelope can be configured to retrigger when a new note is played (in a monophonic context, as polyphonic envelopes will be rendered for each voice).

## Modulation Outputs

- **CV**: An audio-rate modulation output that sends out the envelope value at each audio buffer. The output range is 0 to 1.
- **GT**: An audio-rate modulation output that sends out a pulse whenever the gate value changes. The output range is 0 to 1. Note that this is not the actual Gate parameter, but will remain open for the release phase too. The purpose of this modulation output is to control the voice management logic in HISE so that you can tell when a voice should stop being rendered by connecting it to a [voice_manager](/scriptnode/list/envelope/voice_manager) node.

In addition to providing modulation outputs, the envelope node also processes the audio signal by applying the envelope to the amplitude of the signal. This allows you to use the envelope node to modulate the gain of the signal directly, without the need to use the modulation outputs.
