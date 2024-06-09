This is useful for managing sequential input that you're keeping track of: history of played notes, velocities, custom undo history etc.

You might want to use it in conjunction with [Array.push()](/scripting/scripting-api/array#push) in order to implement a stack logic with the array.

> Note that there's a [special container type](/scripting/scripting-api/unorderedstack) if you need a stack that doesn't care about the order of elements.

```javascript
const arr1 = [1, 2, 3];
arr1[4] = 5;

Console.print(arr1.pop()); // 5

// we didn't set the 4th element (index 3) so it'll be undefined
Console.print(arr1.pop()); // error: API call with undefined parameter 

arr1[3] = 22;
Console.print(trace(arr1)); // [1, 2, 3, 22]

// we can check ourselves for errors in our logic in this case
if (isDefined(arr1.pop() 
{
    // do stuff
}
```