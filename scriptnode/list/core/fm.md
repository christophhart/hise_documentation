---
keywords: fm
summary:  A FM operator that applies the incoming signal as frequency modulation to a sine wave.
author:   Christoph Hart
modified: 03.09.2019
parameters:
- Frequency: the root frequency of the oscillator. It processes MIDI messages, so in a Synthesiser environment, you don't need to change this.
- Modulator: a simple gain stage of the incoming signal (=modulator), which results in the FM amount.
- FreqMultiplier: a pitch multiplier. You can use it to create different harmonics or connect it to a node for pitch modulation.
---
  
This node can be used to build up FM synthesisers. It takes the incoming signal and interprets it as frequency modulation, so you can stack them together to create more complex FM algorithms.

The node is producing a sine wave as output and if you want to create custom waveforms, please use the [phasor_fm](/scriptnode/list/core/phasor_fm) node as generator of the base waveform.
