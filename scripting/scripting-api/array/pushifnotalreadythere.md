The method will not add an element to an array if a matching element already exists inside the array.  
If the argument is an element that already exists, the return will still be the first index beyond the end of an array (not an index of a first/any matching element).

It is basically a short version of typing:

```javascript
if(myArray.indexOf(someElement) == -1)
	myArray.push(someElement);
```

```javascript
const arr1 = [0, 1];

arr1.pushIfNotAlreadyThere(2);
Console.print(trace(arr1)); // [0, 1, 2]

// It won't add an element if it already exists in the array
arr1.pushIfNotAlreadyThere(2);
Console.print(trace(arr1)); // [0, 1, 2]

arr1.pushIfNotAlreadyThere(1);
Console.print(trace(arr1)); // [0, 1, 2]

Console.print(arr1.pushIfNotAlreadyThere(1)); // 3
```