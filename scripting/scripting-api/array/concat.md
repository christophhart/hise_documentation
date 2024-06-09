This method combines two or more arrays. You can pass in any number of arrays which will be put at the end of the array. It ignores non-array argument elements.

```javascript
const var arr1 = [0, 1, [2, 3, 4]];

// note how the array in the array is counted as a single element
Console.print(arr1.length); // 3    

const var arr2 = [5, 6, 7];
const var arr3 = [8, 9, 10];

arr1.concat(arr2);
Console.print(trace(arr1)); // [0, 1, [2, 3, 4], 5, 6, 7]

arr1.concat(arr3);

// the arr1 already contains arr2 
Console.print(trace(arr1)); // [0, 1, [2, 3, 4], 5, 6, 7, 8, 9, 10]     


// set type to array
const var arr4 = []; 
arr4.concat(arr2, arr3, 8726, [11, 12, 13]);

// non-array arguments get ignored // arguments can be arrays themselves
Console.print(trace(arr4)); // [5, 6, 7, 8, 9, 10, 11, 12, 13]   
```