By default, the script has a compile time out to prevent something like this:

```javascript
const var eternity = 1;

while(eternity)
{
    Console.print("still eternity");
}
```

from freezing up your computer. The default value is ~5 seconds, however if you have a really old machine and a complex project or doing some batch processing of samples, you might want to increase this value in order to avoid running into this safety mechanism.

This is the same as the setting TODO