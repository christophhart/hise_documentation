If you are going to populate this array in a realtime callback, you need to make sure that there is enough storage allocated in order to avoid reallocation. This method can be used to preallocate slots that can be filled later.

Be aware that this method will not change the `Array.length` property:

```javascript
const var array = [];       // create a new array
array.reserve(128);         // allocate 128 items
Console.print(array.length) // will output 0;
array[64] = 190;            // this will not allocate
Console.print(array.length) // will print 65
```
  
> This method will allocate enough memory to hold primitive values, but if you are going to store complex objects (arrays or objects), calling `Array.reserve()` will not prevent reallocation.