---
keywords: haas
summary:  Applies Haas stereo processing to the signal
author:   Christoph Hart
modified: 04.07.2022
parameters:
  - Attack: determines how quickly the output signal responds to increases in the input signal's amplitude. 
  - Release: determines how quickly the output signal responds to increases in the input signal's amplitude. 
  - ProcessSignal: a boolean value that determines whether the input signal should be processed by the enveloper follower. If the value is set to true (above 0.5), the input signal will be processed and the output signal will follow the envelope of the input signal. If the value is set to false (below 0.5), the input signal will not be processed and the output signal will remain unchanged. This can be useful if you just want to create a modulation signal from the input audio.
---

The enveloper_follower node tracks the amplitude of a signal and produces an output that follows the shape of the signal's envelope. The attack and release parameters allow the user to control the speed at which the output signal follows the input signal's envelope.

There are several use cases for an envelope follower in an audio effect:

- Compression: An envelope follower can be used to implement a compressor, which reduces the dynamic range of a signal by increasing the gain of quieter parts and decreasing the gain of louder parts. This can help to even out the overall volume of a signal and make it more consistent.
- Amplitude modulation: An envelope follower can be used to modulate the amplitude of a signal, by using the output of the envelope follower to control the gain of the signal. This can create a wide range of effects, from subtle volume swells to more extreme distortions.
- Sidechaining: An envelope follower can be used to trigger effects based on the amplitude of a signal. For example, a sidechain compressor can be implemented by using an envelope follower to detect the amplitude of a signal and trigger a compressor to reduce the gain of another signal.
- Amplitude-based effects: An envelope follower can be used to create effects that are based on the amplitude of a signal. For example, a tremolo effect can be implemented by using an envelope follower to modulate the gain of the signal at a low frequency, or an auto-wah effect can be implemented by using an envelope follower to sweep a filter frequency based on the signal's amplitude.