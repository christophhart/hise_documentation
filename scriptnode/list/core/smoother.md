---
keywords: smoother
summary: Smoothes the input signal using a low pass filter to reduce zipper noise and create smoother transitions.
author: Christoph Hart
modified: 30.05.2024
parameters: 
  - SmoothingTime: The time constant of the low pass filter in milliseconds.
  - DefaultValue: The initial value of the smoother when reset.
---

The `smoother` node applies a low pass filter to the input signal, reducing rapid changes and creating smoother transitions. This is particularly useful for reducing zipper noise in audio signals. The node is polyphonic, allowing for multiple voices to be processed with independent smoothing states. 

Additionally, the `DefaultValue` parameter sets the starting point of the smoother when it is reset (eg. when a new voice is started or when the effect is unbypassed), providing control over its initial state.