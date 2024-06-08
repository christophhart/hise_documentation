This is a quick operation (the allocated storage space will not be freed), so you can use it in a realtime callback.

```javascript
const var arr = []; // Declare an array

// preallocate 10 elements, do this if you
// know how many elements you are about to insert
arr.reserve(10); 

for(i = 0; i < 10; i++)
{
	// Add an element to the end of the array
	arr.push(Math.randInt(0, 1000);
}

Console.print(trace(arr)); // [ 523, 5, 76, 345, 765, 45, 977, 223, 44, 54]

arr.clear();

Console.print(trace(arr)); // []
```