Note that this will search and remove the value you pass in as argument - if you want to remove an element at a certain index, use [Array.removeElement()](/scripting/scripting-api/array#removeelement) instead.

```
const var arr1 = [1, 2, 3, 4, 2, 5,];
arr1.remove(2);

Console.print(trace(arr1)); // [1, 3, 4, 5]
```