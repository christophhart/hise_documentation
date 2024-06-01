---
keywords: sig2mod
summary:  Converts an audio signal to a modulation signal
author:   Christoph Hart
modified: 24.06.2019
---
  
This node is just mapping a signal with negative values (from -1 to 1) to the normalized range of (0 ... 1). The prime use case for this (hence its name) is to convert an audio signal coming from an oscillator or anywhere else into the range that the modulation peak node is picking up.

```javascript
output = 0.5 * input + 0.5
```

There is also a counterpart called [mod2sig](/scriptnode/list/math/mod2sig).
