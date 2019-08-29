---
keywords: Waveform Generator
summary:  A waveform generator based on BLIP synthesis of common synthesiser waveforms.
parameters:
 - OctaveTranspose1: The octave shift for the first oscillator
 - WaveForm1: the waveform of the first oscillator 
 - OctaveTranspose2: The octave shift for the second oscillator
 - WaveForm2: the waveform of the second oscillator 
 - Detune1: Detunes the first oscillator
 - Detune2: Detunes the second oscillator
 - Pan1: Pans the first oscillator
 - Pan2: Pans the second oscillator
 - Mix: The balance between osc1 and osc2
 - PulseWidth1: Changes the pulse of the OSC1 Square and Trapezoid oscillator
 - PulseWidth2: Changes the pulse of the OSC12 Square and Trapezoid oscillator
 - EnableSecondOscillator: Turn the second OSC on and off
chains:
 - Mix: the balance between the first and the second oscillator. This can be modulated polyphonically.
---

The waveform generator is a virtual analog synthesiser with two oscillators that can be detuned and modulated. It uses a BLIP syntesis algorithm to reduce the aliasing artifacts.

## Oscillator types

| Index | Name | Waveform | Description |
| - | --- | -- | ----------- |
| 1 | Sine | ![](/images/icon_sine:64px) | a sinusoidal curve |
| 2 | Triangle | ![](/images/icon_triangle:64px) | a triangular waveform |
| 3 | Saw | ![](/images/icon_saw:64px) | a sawtooth waveform (only odd harmonics). |
| 4 | Square | ![](/images/icon_square:64px) | a square waveform. You can adjust the pulse with with the `PulseWidthX` attributes |
| 5 | Noise | ![](/images/icon_noise:64px) | white noise |
| 6 | Triangle 2 | ![](/images/icon_triangle:64px) | a variation of the triangle waveform |
| 7 | Square 2 | ![](/images/icon_square:64px) | a variation of the square waveform |
| 8 | Trapezoid 1 | ![](/images/icon_saw:64px) | a variation of the saw waveform |
| 9 | Trapezoid 2 | ![](/images/icon_saw:64px) | a variation of the saw waveform |

## Example snippet

This snippet contains a Waveform generator with a LFO modulating the mix between the two oscillators making it change from sine to saw wave.

```snippet
HiseSnippet 914.3oc6W0saaaCElzNbnAacnaMCXW5K5tJnEQooYqWE23XWDT6Zgnf1ErKJ3jN1lqTjZRTYy6p8rsmf8HzGgdytd8PIaKpTOO6g0eP2jALz4OxOd9kxOUGBYY5TBc6yml.D5mvBlpLS5LgKTjSOgP+T1.dlARaUx53oI7rLHhPoMenkAc6sHEOu7ni4RtJDpXQHOQKBg9hXgohqe6GIjxd7H3bQri1Gz9zPspiVpyQ7zjsGIgG9b9X3wbqZMXD5G0MRXzoAFtAxHzsNVGMMXh9mTk5+DQl36kfkviDfKTI6dZYjEw12IclHjQ9yO2YDBk4W4EZV5E1gMPDIVvuxabiBAsprv0eParJ344Bu8VJ77VB7HNnaqRzgfPGkK4l5HyFNlIPnqGoNUY.UlvL0Mb8NEteFyWXBmrb71XI3ECTuow6rf+0YcGMBBMUfcKVuu8sajdmRn7wrmxuDJpHK.xWTPORmF25gfBRs9TuUTS96qaMYxZWSNLzfP37TtJKQmAdtq7UjsuqrS.Stpt5krpok830COddtIpyY5n40Z6yU0VLjt1JMP7yUju3ntJNFPB.7zDMLKDOrVem6t3mKyfmJhLS7bMrh89troMW6L.2VQ0qQcz++6K8W1Wp45A2k3Ao9u17savBDwIRnq5RPpQNVL94rSfQ7boYN250TCzJcxDsRD5lfcFXREiGC0RhV5A5AFCNHqhyNsOCj.OyoN6Vs6KT.OE8Sv+Peg256KVU75KYkvsksQPqOLlmz7+7ySVcEJ1q7MUjdCtGlaF50KwKi0u2vYfDeq0Bz682CxdovOlCpv4L+0e6OdwQ1Ibmpt5DG6.0xMrZ9ReXLtQtK34PbhFmEWqKPPrValHTiqO2bm1805jxgNQtKRm7LiNd9lRneEa+CtS8mKGh+MZW6q2uSAMIv.ImvMbB86XGVn+ncUWHu3dS6i+FNXZ+f6+K3qGHjWH0V6uytEzAn3evJeZg7Csq2cux5Oml7uWylFqYp2MKhpKBe136648YJQ7hbq2kH9LctAS7Fvw4P3ccXONON.ulVHfnUo.ItQLZCh0zB58rzE4rfJpf3OwmYB8rzzYB8lK7sxdDyCS0OCuXlIUKsYOWqfCdtUEe3213Wfhzs7HWxk4y7Rw30cdVXnsW5sQuyxsX+M1h6twVbvFaw81XKNbis3q2XK9lUXg8tkOHG6aUNe.Y32srcDcQKNZSxq.9pz7.
```