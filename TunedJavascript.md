# JUCE::Javascript++

The Javascript engine in JUCE is extremely well written and directly connects to the native data type in JUCE, the `var` class. It was intended to be a (more or less) standard compliant Javascript interpreter which means things in there are as generic as possible. 

The scripting engine in HISE is supposed to customize instrument behaviour by running little pieces of scripted code on certain events that must be executed synchronously in the audio thread. But this is a problem according to Julian Storer, the creator of JUCE:

> Ouch.. not sure about real-time use! Even if no parsing gets done, there are still loads of strings and objects being constructed and passed around during execution, with plenty of allocator use, so running it in e.g. an audio thread would be at your own risk!  
> <small>Julian Storer in the JUCE form</small>

However this shouldn't stop us from using it anyway. Instead we can morph the Javascript engine to a "real time safe" (as real time safe as it gets on Win/OSX) script interpreter by introducing concepts and getting rid of some Javascript specifications that are not needed for our use.

A small example: dynamic typing is a key feature of Javascript that allows stuff like this

```javascript
var x = 5; // Whooho, I am  a number
x = "5"; // Now I am a string
x = [5, 5]; // Now I am an array
x = {}.prototype(new function(5); // I don't have no idea what I am now...
```

## Enter the DSP world

If we are at it, why stop at control rate? 

It is pretty ambitious for a scripted interpreter to enter the world of digital signal processing. Compiled machine code is impossible to beat and set the bar of expected performance that no scripted language ever will match unless it introduces JIT compiling.

While the main purpose of scripting in HISE is to perform callbacks in a much lower frequency than sample rate (a note on message comes in every 10 ms if played really really fast), it still makes sense to add a scriptable DSP effect to HISE:

### Profiling the engine

The occasional callback for incoming midi messages is not really suitable to measure the performance of the script engine. But by throwing 44100 samples per second to the engine and see how many operations it can perform is a really nice way to improve its speed for things like control structures, variable look ups and function calls.


> All the optimizations presented in this article are profiled by running only this particular operation a few times per sample and compare the audio thread CPU load to its original implementation. The tests are done on a Macbook 2012 i7 on Windows / OSX.

### Operate on buffer level with acceptable performance

As long as we don't need to get down to sample level to write our special zero delay feedback filter with 8x oversampling and ripple-free spectrum, the engine could be suitable for scripting fx by using hardcoded C++ modules that operate on a whole buffer. Lets assume this code can be executed with acceptable performance:

```javascript
delay = Modules.create("delay");
delay.setDelayTime(441); 

function processBlock(channels)
{
	channels >> delay; // using the >> operator to shovel data into a dsp module;
	channels += 0.5 * delay.buffer // 50% wet amount
}
```

By providing modules for common DSP tasks, like FFTs, convolution, delays & filters it should be possible to create pretty nice effects that perform good enough to avoid compiling them into a binary.

### Prototype new effects before transferring to C++.

Even if we need a processing per sample, we can still use the engine to prototype the algorithm and then transfer it to `C++` code. Due to the similiary of the two languages this is not a complicated operation and by adding a dynamic module system you can load the compiled C++ dsp modules back into the engine to create a nice cyclic development workflow.

On the `C++` side the amount of work needed for porting Javascript code can be reduced by using the objects that are exposed to Javascript natively. This would be the corresponding `C++` code for the example above:

```javascript
// C++ 

class SimpleDelay: public DspModules::Base
{
public:
	SimpleDelay()
    {
		delay.setDelayTime(441);
        addModuleToSetupList(delay)
    }

	void processBlock(var channels) override
    {
        channels >> delay; // the operator is also overloaded on the C++ side
        channels >> delay; // using the >> operator to shovel data into a dsp module;
        channels += 0.5 * delay.buffer // 50% wet amount
    }
    
    DspModules::Ptr delay = new DspModules::Delay();
};
```

As you can see, the actual dsp code found in the `processBlock` method can be transferred almost without modifications (of course this example is trivial, but you get the point).

A template project for the Introjucer that compiles either a static library or a dynamic library is supplied to save most of the boring typing work.


## Memory management

## No allocations

## Preallocated registers for fast variable access

## Enhanced control structures

There are some missing control structures in the original Javascript Engine that can be used to branch more efficiently. By introducing the `for(a in b)` iterator loop as well as the `switch` statement to branch quicker when having multiple options we can optimize the performance of the script logic.

### Iterator loops

The iterator loop `for(a in b)` can be used to iterate over a data type containing elements:

```javascript
a = [[1,2],[3,4],[5,6]];

for(i in a)
{
	for(j in i)
	{
		print(j);
	}
}

// Output: 1 2 3 4 5 6
```

The implementation for the `VariantBuffer` allows to access the samples without having to evaluate a look up expression to improve the speed for the inner loop of a dsp routine:

```javascript
b = Buffer.create(100);

for(i in b)
{
	i = 1.0; // fills everything with 1.0
}

numSamples = l.length;

for(i = 0; i < numSamples; i++)
{
	l[i] = 1.0;
}
```

The traditional `for` loop has these performance penalties:

1. perform the increment operation in Javascript
2. evaluate the Javascript break condition for each loop iteration.
3. access the buffer by evaluating the rather slow `[]` operator on 

while the `for .. in ` loop for `VariantBuffers` is a hardcoded C++ loop that puts the actual sample value in the iterator variable `i` until the buffer end is reached.

> **Profiling results**
> Testing the iterator loop by iterating over a buffer 7 times and filling it with 1.0 vs. running 7 for loops with assigning 1.0 to each sample in the buffer using the `[]` operator yields a **performance gain of 85% **bringing down the CPU usage from **20% to 3%**

### `switch` statement

## Custom data types

### Native Buffer type `VariantBuffer`

A new data type was introduced: the `VariantBuffer`. It is a container for a float array typically used for dsp calculations.



### Overloading operators

## Compile Time Improvements

### Native API call type

Native API calls are an extremely important concept when using a scripting language to control native code. The scripts in HISE are heavily based on making API calls to either set engine values or retrieve them for further calculation:

```javascript
if(numPressedKeys && (Message.getNoteNumber() != lastNote))
{
    Synth.sendNoteOff(lastNote);
}
lastNote = Message.getNoteNumber();
numPressedKeys -= numPressedKeys > 0 ? 1 : 0;

```

This little code snippet that kills notes to simulate monophonic instrument behaviour has these operations:

- 3 calls to API functions
- two conditional expression
- one assignment
- a conditional assignment using the `a ? b : c` operator

While there is very little we can do to improve the performance on the other operations(and the performance overhead is really small anyway), we do can improve the performance of the API calls.

An API call is a function and functions in Javascript come with a large overhead as these steps are required:

1. **Resolve the function name in the global scope**
2. Evaluate all arguments
3. **Create a new scope**
4. **Push the called-upon object as `this` and all arguments into the scope**
5. Call the function
6. **Check the number of parameters in the function code and handle wrong parameter amounts.**
7. Return the value
7. **Delete the scope **

All bold steps are actually unnecessary for API calls, because we know the number of parameters on runtime and the object it operates on when we compile the script, so we can simplify this process to:

1. Resolve the whole expression on Compile time and store the object it operates on (the C++ API class)
2. Evaluate all arguments. This is still necessary, but it won't allocate anything because the storage for the results is allocated on compile time (because we know the number of arguments)
3. Call the function. This is as fast as calling a C++ member function, because we know the object and the parameter amount. It even spares the `dynamic_cast` to the derived class because we can be sure the object can be casted from the base `ApiObject` class (otherwise the Javascript compiler would throw an error because he can't resolve the function call)
4. No parameter amount checking is needed in the C++ function because it is checked on compile time. You still need to check the type of the `var`object, since we still have dynamic typing.
5. Return the value.

> **Profiled Results**
> 
> Tests using a API call to calculate a sine wave vs. calling the `Math.sin` function (with fixed allocation) yielded **a perfomance gain of ~70%**, reducing the CPU load from 21% to 7% for calculating 10 sine waves per samples which scales to a ratio of **6.3 MFlops / second**

### Native API constant type



Javascript does not know the concept of constants, which leads to weird situations sometimes.  
By introducing predefined API constants (the dynamically typed C++ aquivalent of class enums) you can be sure that stuff like this code will never happen:


```javascript
Math.PI = 3.3; // Now that is pure evil.

// Good luck with your calculations...

```

By adding constants that are recognized by the parser, this code won't compile:

```javascript
Math.PI = 3.3; // ERROR: cannot assign to this expression
```


It will also resolve the values on compile time, so these two lines are equally fast:

```javascript
var x = Math.PI;
var y = 3.1415927;

```

While calling the original `Math.PI` function has this overhead:

1. Resolve the `Math` object in the global namespace
2. Resolve the `PI` property for the object

> **Profiled Results**
> 
> Tests using the API constant vs `Math.PI` property yielded **a perfomance gain of ~70%**, reducing the CPU load from 30% to 9% for accessing the property 90 times per sample. The literal value statement `3.1415927;` performs equally to the API constant expression. This scales to a ratio of **40 Million operations per second**


### Inlining function calls

Another way of reducing the overhead of function calls is to inline them, which means instead of calling the function, the function body is inserted at the code position and executed like a normal block of statements.

This is achieved with the keyword `inline` before the function definition:

```javascript
inline function multiply(a, b)
{
    return a * b;
};

var x = multiply(2,multiply(2,2));
print(x);
```

It should behave like a normal function, however it checks the number of arguments at compile time and complains if there is a mismatch. On runtime, the parameter expressions block of the inlined function are evaluated and stored into a special place in global scope (with faster access than normal variable lookup). The body of the function will be executed like a normal statement block and return its value.

It has one caveat: because the inline parameter storage in the global scope is static, recursive function calls will not work using these inline functions (but recursive functions have no use in dsp anyway...)

> **Profiling Results**  
> Tested with 7 function calls per sample of an inlined function vs. a standard function. The **performance gain is 80%**, reducing the CPU load from 26% to 3%


