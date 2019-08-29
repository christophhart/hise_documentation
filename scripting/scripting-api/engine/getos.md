You can use this method to query the OS in order to implement some platform specific code. HISE tries to abstract as much OS specifics as possible,
but especially when it comes to font loading, there are some subtle differences between the different operating systems.

```!javascript
Console.print(Engine.getOS());
```
