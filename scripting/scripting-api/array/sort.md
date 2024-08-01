This will sort the array using a sensible sort algorithm:

- Numbers will be sorted naturally, 
- Strings will be sorted alphabetically
- Objects and arrays will not be sorted.

```javascript
const var a = [1, 6, 4, 2, 1];
a.sort();

for(i in a)
    Console.print(i); 

// Result: 1, 1, 2, 4, 6
```

> You can also customize the sorting by supplying a custom sort function with [Engine.sortWithFunction()](/scripting/scripting-api/engine#sortwithfunction).