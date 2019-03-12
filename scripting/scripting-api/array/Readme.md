---
keywords: Array
summary:  An Array is a object that can hold multiple other objects and can be indexed using a sequential number.
---

# Array Class Reference

## Basic usage

```!javascript
const var a = [];         // Declare an array
a[0] = 12;                // Set the element at position 0 to 12
a[1] = "Hello";           // Set the element at position 1 to "Hello"
Console.print(a.length);  // Print the length (in this case 2)
a.clear();                // Deletes all items from the array
```
  
If you have used another programming language before, this might look pretty familiar. Be aware that you can add / delete items from the array despite having it declared as `const var`. The "constness" just refers to the assignment, so you can't reassign this variable to another value.

## Iterating over an array

Basically there are two ways of iterating (= going over each element in the array):

| Range-based Loop | Index-based** Loop |
| --- | --- |
| `for(element in array)` | `for(i = 0; i < array.length; i++)` |
|  This is the preferred method, because it has a clearer syntax (and is faster). As long as you don't need to know the index of the element, it's recommended to use this method. | If you need the index of the current item in the loop (eg. because you iterate over multiple arrays at once), use this loop. |

The index based loop construct is the only place where you can define anonymous variables (so that `for(i = 0...` doesn't throw a compile error).

## Ownership & lifetime

An array is reference counted, which means that if you assign an array to another variable, it will use the same array.

```!javascript
const var a = [1, 5, 6];
const var b = a;

a[0] = 10;           // set the first element of a
Console.print(b[0]); // the first element of b will also be 10
```

