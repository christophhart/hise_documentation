The test function you pass in can have up to 3 parameters:

- the first parameter will be the element you need to perform the check on
- the second parameter will be the index
- the third parameter will be the array itself

```javascript
const var list = [ "Hello", "world", "HISE", "rules" ];

Console.print(list.find(function(element){ return element.contains("H");})); // Hello
Console.print(list.find(function(element){ return element.contains("HI");})); // HISE
```

Using this function can vastly decrease the amount of code you need to write. This is the same logic of the first call with a loop and a custom function to achieve the same thing.

```javascript
const var list = [ "Hello", "world", "HISE", "rules" ];

function findH()
{
	for(element in list)
	{
		if(element.contains("H"))
			return element;
	}
	
	return undefined;
}

Console.print(findH()); // Hello
```