---
keywords: pma
summary:  Scale and offset a parameter
author:   Christoph Hart
modified: 03.07.2022
parameters:
- Value: The input value (supposed to be modulated)
- Multiply: The multiplication factor that is applied to the input
- Add: The constant offset that is applied to the multiplied input value
---
  
The pma node (stands for **P**arameter **M**ultiply **A**dd) is one of the most versatile tools in the scriptnode environment and allows you to scale and offset any modulation value. It's used for controlling modulation intensity, combining multiple input parameters to control a single target etc.

> Be aware that there's also a unscaled version which allows you to add an unscaled offset to the value (the multiplication parameter is still scaled).

