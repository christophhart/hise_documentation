
Unlike its sibling [`fmod()`](/scripting/scripting-api/math#fmod), this function will not behave weird with negative values, so if you rely on it to loop around correctly with negative numbers, use this instead.

```javascript
// fmod will not wrap around zero
Console.print(Math.fmod(-1.0, 19.0)); // -> -1.0

// wrap will... wrap around zero
Console.print(Math.wrap(-1.0, 19.0)); // -> 18.0
```
