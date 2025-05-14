---
keywords: fft
summary:  A spectrum analyser
author:   Christoph Hart
modified: 18.07.2023
---
  
This node will analyse the spectrum of the audio signal and display a FFT graph. If you want to show the spectrum on your main user interface, you need to register it as an external DisplayBuffer, then grab a [reference](/scripting/scripting-api/displaybuffersource) to it and render the output.

### Changing FFT properties

You can change the FFT properties (window type, FFT size, decibel range etc) by supplying a JSON object and passing it to [this method](/scripting/scripting-api/displaybuffer#setringbufferproperties).  
The default FFT property object is:

```javascript
{
  "BufferLength": 8192,
  "WindowType": "Blackman Harris",
  "DecibelRange": [
    -50.0,
    0.0
  ],
  "UsePeakDecay": false,
  "UseDecibelScale": true,
  "YGamma": 1.0,
  "Decay": 0.699999988079071,
  "UseLogarithmicFreqAxis": true
}
```

> You can also edit the properties if you click on the button at the bottom right and edit the JSON in the popup but be aware that there is currently no persistency for these modifications (so when you reload your HISE patch, it will revert to the default).