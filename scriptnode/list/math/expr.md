---
keywords: expr
summary:  A dynamic expression node that uses a SNEX math formula for processing the signal.
author:   Christoph Hart
modified: 01.06.2024
parameters:
  - Value: an additional input parameter that can be used in the expression.
---
  
This node evaluates a expression formula and calculates the output for every sample in the signal. This makes it the swiss-army knife of the math operators - every other math operator as well as more complex waveshaping algorithms can be implemented with this node.

It uses the SNEX JIT compiler, which means that in order to use this node in a compiled plugin, you will have to compile the network to a hardcoded effect. Therefore it is recommended to stick to the inbuilt math operator nodes until it gets inconvenient or impossible, then use this node instead.

> Some inbuilt math nodes also use vectorized operations (eg. SIMD multiplication / addition) so it might also increase the CPU performance when you stick to the inbuilt operators.

The `expr` node focuses on simplicity so there are a few limitations:

1. you can't declare variables, everything must be a single line of code
2. you have only a single value parameter that can be used for changing the output of the node.

If one of these limitations prevent the usage of this node in your use case, take a look at the fully-fledged SNEX nodes.

- [core.snex_shaper](/scriptnode/list/core/snex_shaper): A node with an API suitable for implementing (stateful) waveshapers
- [core.snex_node](/scriptnode/list/core/snex_node): A general purpose node with the full API for every callback

### How to use the expr node


You can enter a formula (aka one line of code) using the SNEX language syntax (which in this subset is very similar to HiseScript) and if there is no error, the node will evaluate that expression and process every audio sample with the given formula. 

The code you put in always has this form:

```javascript
output = something * input + possibleUse * value
```

As you can see, you get a single parameter that you can use for changing the formula that needs to be addressed as `value` (note the lower case).

Here are a few examples:

```javascript
// clipper (same as math.clip)
output = Math.range(input, -1.0f * value, 1.0f * value)

// sig2mod
output = 0.5f * input + 0.5f;

// sine waveshaper with dry wet mixer
output = (1.0f - value) * input + value * Math.sin(Math.PI * 2.0 * value * input);

// rectifier
output = input > 0.0f ? value : -1.0f * value;
```

There is a variant of this node that can be used to evaluate cable connections called [control.cable_expr](/scriptnode/list/control/cable_expr)

### SNEX Syntax

SNEX is a subset of C / C++ and the syntax for the expression node is a subset of SNEX - basically anything that can be put into a single line. You will most likely use these operators:

- predefined variable names: `input` for the sample that is processed and `value` for the current value of the single parameter
- binary math operators (`+ - * /`)
- comparison operators (`> == >= != !`)
- more complex math functions. Just like in SNEX, the math function library exactly mirrors the [Math](/scripting/scripting-api/math) API class syntax in HiseScript, so you can use stuff like `Math.max(Math.random(), Math.tanh(value))`
- ternary operators: `x ? y : z`

### Value types

There is one thing that causes some hiccups for many people coming from HiseScript and want to write their first expression: SNEX is a strictly typed language with three different numeric types: `int`, `float` and `double`. It's important to know that the `input` and `value` variables are single precision (32 bit) floating point numbers. This is because that's how an audio signal is represented in HISE. 

> Be aware that when using the [cable_expr](/scriptnode/list/control/cable_expr) node, the `value` variable is a double precision floating point number. This is because all parameter connections are using double precision (there are a few use cases where single precision might not be enough).

Usually the compiler will figure out if it has to implicitely cast (=convert) one floating point type to the other, so

```javascript
output = input * 3.0;
```

will work and the compiler will implicitely convert `3.0` to a `float`, then perform the multiplication. It still complains about this by setting the compiler state to yellow so if you're a good boy you're going to write the cast explicitely:

```javascript
// no warning, green light
output = input * (float)3.0;

// or if you're not completely delusional:
output = input * 3.0f;
```

Also, all `Math.xxx()` functions exist in two (or if suitable even three) versions:

```javascript
//       float <= float    double <= double
output = Math.abs(input) + Math.abs(-3.0);
```

so the first function call will call the function `float Math.abs(float input)` and the second will call `double Math.abs(double input)`. However, if the compiler cannot clearly deduce which function it should use, it will throw an error:

```javascript
//       ???? <=  float, double
output = Math.min(input, 3.0);
```

There are only two suitable functions (`float Math.min(float, float)` and `double Math.min(double, double)`), but since one argument is `float` and the other one is `double` the compiler has no way to know which function to pick. In order to solve this compilation error, you will have to explicitely cast again:

```javascript
//       float <=  float, float
output = Math.min(input, 3.0f);
```

### User interface

The expression node has a user interface with multiple functions

The input field for the expression formula:
![](/images/custom/scriptnode/expr1.png:50%)

A button to enable Debug mode:
![](/images/custom/scriptnode/expr2.png:50%)

A status indicator for checking the compilation state (green = OK, yellow = some warnings, red = error):
![](/images/custom/scriptnode/expr3.png:50%)

A visualisation of the input to output curve.
![](/images/custom/scriptnode/expr4.png:50%)

### Debug mode

You can click on the debug button on the top right in order to enter debug mode. Depending on the compile state, it will do one of the following:

1. If the compile state is yellow, it will show you the compiler warning that you can then fix
2. If the compile state is green, it will print the input -> output value pairs so you can see exactly what the function is doing.



