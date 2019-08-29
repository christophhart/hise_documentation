If you know that you are going to add multiple elements, you can call [`Array.reserve()`](/scripting/scripting-api/array#reserve) to preallocate the amount of elements and improve performance:

```!javascript
const var a = [];

// Uncomment this to see the performance improvement:
//a.reserve(100);

Console.start();
for(i = 0; i < 100; i++)
{
    a.push(5);
}
Console.stop()
```