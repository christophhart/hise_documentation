It puts arrays first in index order (doesn't sort them), followed by a mix of int, double and string variables. If a string starts with a number, it'll get thrown in the mix.

JSON objects go last.

```javascript
const var arr1 = [5.2, 3, "1", "17", 
				  [4, 2], [1, 12], 
				  "word", "with2", "3LittlePigs", 
				  {"prop1": 12, "prop2": 55}];
				  
arr1.sortNatural();

// [[4, 2], [1, 12], "1", 3, 
// "3LittlePigs", 5.2, "17", 
// {"prop1": 12, "prop2": 55} ]
Console.print(trace(arr1)); 
```

> You can also customize the sorting by supplying a custom sort function with [Engine.sortWithFunction()](/scripting/scripting-api/engine#sortwithfunction).