If you assign an array object  reference to another constant or variable, you're only setting the reference. Making any changes to the array B by referencing it will also make changes to array A. If you need a separate set of data to work on, you need to clone it. 

```javascript
const arr1 = [0, 1];

var arr2 = arr1;

// Changing any element in arr2 will also change it in arr1
arr2[0] = 22;
Console.print(trace(arr1)); // [22, 1]

// Reset the element 0 back to 0
arr1[0] = 0;

// Cloning the array creates a new dataset in memory, separate from the original array
arr2 = arr1.clone();
Console.print(trace(arr1)); [0, 1]
arr2[0] = 22;
Console.print(trace(arr2)); [22, 1]
```

Because arrays in HISE are effectively objects (which is hinted at by them having a bunch of class methods we're looking at here), this method will also work with any other object, including JSON objects, component references etc.