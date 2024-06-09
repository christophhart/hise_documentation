A simple bool check whether the argument variable is an Array. **Note that this function is not a method that you call on the object itself (because calling it on a non-array would not find the function).** Instead you'll call it with the generic syntax `Array.isArray()`

```javascript
const var trustMeIAmAnArray = 0;
const var notAnArrayTooButNiceTryString = "[1, 2, 3, 4, 5]";
const var list = [1, 2, 3, 4];

Console.print(Array.isArray(notAnArrayTooButNiceTryString)); // false;
Console.print(Array.isArray(trustMeIAmAnArray)); // false
Console.print(Array.isArray(list)); // true (finally)
```