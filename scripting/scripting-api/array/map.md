
This is useful if you want to perform an operation for every single element of an array by passing in a premade function. An alternative would be to use a `for(x in array)` loop, but the map method allows for cleaner multidimensional processing.

You need to pass in a function to be executed on each element of the array and an (optional) object that will be used as `this` in the function call.

The function can have up to three parameters:

1. the element
2. the index of the element
3. the full array

and is supposed to return a value that will be added to the newly created array that is returned by the function:

```javascript
function(element, index, array)
{
	return someValue;
}
```

But you can omit the second and third parameter if you don't need it.

```javascript
const arr1 = ["hello", 2, 3];

arr1.map(function(element, index)
{
	Console.print(index + ": " + element);
});

// Output: 
// Interface: 0: hello
// Interface: 1: 2
// Interface: 2: 3
```
The method returns an array of individual function returns. If no return exists, the element will be undefined/null.

```javascript
const arr1 = [0, 1];

const arr2 = arr1.map(function(element)
{
	return element + 10;
});

Console.print(trace(arr2)); // [10, 11]
```

In order to supply a object that you can reference through `this` in the function call, use the second argument:

```javascript
const test = 10;
const arr1 = [0, 1];

arr1.map(function(element)
{
	Console.print(test); // 10
}, test);
```