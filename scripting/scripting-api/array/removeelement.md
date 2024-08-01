Note that the argument you pass into this function is supposed to be the (zero-based) index in the array, in order to remove a(ll) element(s) by value, use [Array.remove()](/scripting/scripting-api/array#remove) instead

```
const var arr1 = [1, 5, 3];
Console.print(arr1[1]); // 5

arr1.removeElement(1);
Console.print(arr1[1]); // 3
```