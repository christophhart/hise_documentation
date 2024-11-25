---
keywords: Console
summary:  The Console object for Code Editor feedback.
author:   Christoph Hart, Bill Evans
modified: 04.06.2019
---
  
The `Console` object allows you to print any value to the console of **HISE**.

```javascript
Console.print("Hello World " + 3.4); // Prints "Hello World + 3.4 to the console.

Console.assertEqual(x, y); // You could write assertion tests to check your code. 

Console.start(); // You can benchmark your scripts Compile-time with:
Console.stop(); // wrapping these two Console commands around your code.
```
There are reserved characters to alter the text's colour in a line. (Note that a colon character ends the formatting.)
- Exclaimation mark as first character: Red.
- Curley brackets (bounding): Light grey.
- Greater-Than: Blue.
