---
keywords: cable_expr
summary:  Create a custom expression using SNEX
author:   Christoph Hart
modified: 04.07.2022
parameters:
  - Value: the input value
---
  
This node can be used to create a custom function using a one-liner SNEX code. The code you enter here must be a valid SNEX expression. Internally this code will be put into a return statement and surrounded by some boilerplate function code so that whatever you enter here as (XXX) it will be compiled as

```cpp
double getInput(double value)
{
	return XXX;
}
```

This means that you can use any Math function or custom formula using the `value` variable as input.

> Be aware that if you use this node, you will have to compile your network in order to use it in an exported plugin

