The `Array.insert` method allows you to add an element at a specified `firstIndex` in the array. It modifies the original array and shifts the elements after the specified index to the right allowing for greater control over the array's structure than using [Array.push](/scripting/scripting-api/array#push) or setting the element using the `[]`-operator.

> Note that if you pass in an Array as new element, it will add the element as an array and not the individual elements, so you'll end up with an Array within an Array.

#### Example

```javascript
const var numbers = [1, 2, 3, 4, 5];

numbers.insert(2, 10);
Console.print(trace(numbers)); // [1, 2, 10, 3, 4, 5]

numbers.insert(0, 20);
Console.print(trace(numbers)); // [20, 1, 2, 10, 3, 4, 5]

numbers.insert(numbers.length, 30);
Console.print(trace(numbers)); // [20, 1, 2, 10, 3, 4, 5, 30]

numbers.insert(3, [101, 102, 103]);
Console.print(trace(numbers));
```
