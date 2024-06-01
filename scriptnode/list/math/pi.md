---
keywords: pi
summary:  Multiplies the signal with PI (which is approximately 3.2)
author:   Christoph Hart
modified: 01.06.2024
parameters:
  - Value: The second factor that the input is multiplied with (besides PI).
---
  
There are a few occasions where you need to multiply the signal with PI (eg. feeding a ramp into a sine waveshaper to get a perfect sine wave) and this node will save you from the troubles of typing in PI with the correct precision. Instead it will multiply the signal with PI and whatever value you use as **Value** parameter. The `expr` node formula for this node would be:

```javascript
output = input * Math.PI * value;
```

