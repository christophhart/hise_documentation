---
keywords: Array
summary:  An Array is a object that can hold multiple other objects and can be indexed using a sequential number.
author:   Christoph Hart
modified: 13.03.2019
---

The array is the default container type in HiseScript for holding multiple elements that can be accessed by their index. 
There are a few other container types which are better suited for particular workflows (see the section about Alternatives below), but for general data processing this is one of the most important concepts to know about.

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

## Alternatives

The Array is a very dynamic container type and can be resized at any time to make room for more elements. For UI and data processing this is an incredibly useful feature. However this flexibility makes it a very poor choice for whenever you want to do some MIDI processing logic which usually runs in the audio callback where allocating new memory is a no go. 

In order to mitigate this problem, there are a bunch of other container types similar to the stock Array but with an emphasis on certain tasks within the realtime callback:

- [Buffer](/scripting/scripting-api/buffer) is a densely packed, floating point array that represents audio signals
- [MidiList](/scripting/scripting-api/midilist) is a object that holds 128 integer numbers and is particularly useful for holding MIDI information (eg. note numbers)
- [FixObjectArray](/scripting/scripting-api/fixobjectarray) is a preallocated list of elements with a predefined memory structure and can be the most efficient solution for many tasks
- [Unorderedstack](/scripting/scripting-api/unorderedstack) is a stack that offers fast insertion / removal by ignoring the order of elements and is particularly useful for storing the information about currently played notes (where the order doesn't matter).

If you don't want to use those containers, you can of course use the Array in the MIDI processing context as long as you don't resize the container (which is why the [Array.reserve()](/scripting/scripting-api/array#reserve) function is so importanta).


