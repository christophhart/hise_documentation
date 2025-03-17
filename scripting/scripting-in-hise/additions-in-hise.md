---
keywords: HISE Additions
summary:  A summary of all additions made to standard Javascript
author:   Christoph Hart
---

The scripting language of **HISE** is in fact not Javascript. It has its origin in the non-standard implementation of JUCEs codebase and was extended and customized to fit the requirements of scripting in **HISE**.

This may lead to a few irritations for people who already know Javascript and expect to directly apply their knowledge, acquired from writing .js for the web, to HISE.

You might get some head start compared to novices for sure; but there are a few things that you need to know - and more annoying: **many things you need to forget**.

This chapter provides an overview over every single customisation added to 
the scripting engine in **HISE**. From now on, the scripting language in **HISE** will be 
referred to as **HiseScript** as opposed to standard **Javascript**. We will take a look at the concepts that have been stripped from Javascript first and then go through the additions.

## Object-oriented programming

**Javascript** acquired its popularity in the web development ecosystem because it allows powerful data processing using a lean syntax. Yet it was never designed to be a real object-oriented language - it happened to grow and people were doing more and more complex applications so the language reacted and  object-oriented things were added over the time. 

If you have used a proper object oriented language like Java or C++ before, everything related to object-oriented programming in Javascript looks a bit quirky.

The desire for object-oriented language features grows with the complexity of the app because it reduces the complexity and redundance. Proper encapsulation ensures the maintainability of the code. 

This is only partly true for **HiseScript**, though: the tree structure of **HISE** already breaks down the complexity into **one script for each task** and the UI data model tries to keep the code free from declarative boilerplate code as much as possible. More importantly, there are almost no scenarios in **HISE** where dynamically creating objects is desired:

- UI elements and references to HISE modules have to be created upfront at initialisation.
- You can't allocate in realtime callbacks. Creating objects is out of the question here.

Therefore, most of the language concepts associated with object orientated programming have been removed and replaced with paradigms that suit the two restrictions mentioned above.


## No `new` operator

The `new` operator, which clones an object using the prototype has been removed. 
This code:

```javascript
function Car(make, model, year) 
{
  this.make = make;
  this.model = model;
  this.year = year;
}

var car1 = new Car('Eagle', 'Talon TSi', 1993);

Console.print(car1.make);
// expected output: "Eagle"
```

will not compile in HISE. Instead, you'll need to create an object wrapped in a function, do something with it and return it:

```!javascript
function Car(make, model, year) 
{
  var obj = {};        // Create an object
  obj.make = make;     // Set the object properties
  obj.model = model;
  obj.year = year;  
  
  return obj;          // return the object.
}

var car1 = Car('Eagle', 'Talon TSi', 1993);

Console.print(car1.make);
// expected output: "Eagle"
```

This concept is known as **Object Factory**. In this example, the code looks more verbose, but it has a big advantage: **You can use existing objects and turn them into the thing you want**. If you take a look at the [ScriptPanel documentation](/ui-components/plugin-components/panel), you'll notice that every single code example uses this form:

```javascript
function createFunkyPanel(name, x, y)
{
    var p = Content.getComponent(name);   // grab a reference to the panel
    p.set("something", 5.0);              // do something with it
    return p;
}

var myPanel = createFunkyPanel("MyPanel", 0, 0);
```

## No anonymous variable definitions

This code is valid Javascript:

```!javascript
var MyDatabaseEntry = "Hello";

// 500.000 lines later

MyDataBaseEntry = "Hello again";

// Another 500.000 lines later

if(MyDatabaseEntry == "Hello again")
{
    somethingReallyImportant();
}
```

but `somethingReallyImportant()` will not be executed despite its self-explanatory name. The reason was the typo that defined a new variable `MyDataBaseEntry` (with a capital `B`) thus leaving the original variable in its previous state. 

Debugging this kind of error is one of the most frustrating experiences, so this code will not compile in **HiseScript**, but throw an error at the line where you want to define `MyDataBaseEntry`. The solution is simple: If you want to create a new variable, use `var` - or even better, one of the custom variable types like `reg`, `local` or `const var`, which will be explained later.

There is only one exception to this rule: if you use a `for` loop, you may declare the counter variable without the `var` keyword:

```javascript
for(i = 0; i < length; i++)
    doSomething(i);
```

This is just for convenience and if you're using `i` as global variable for anything meaningful, you most certainly will have other things to bother about.

## Additions

Reading this page until now might have been a little bit frustrating, but it will get better from now on, because now we will take a look at all the additions that have been added to **HiseScript**. If you have some experience in *C++*, you might recognize some of them, as I have taken a few concepts that I like and transferred it to **HiseScript**.

Most of them are implemented deeply inside the Javascript Parser (or compiler) and offer performance improvements because they can be resolved at compile time.

## Custom variable types / function calls

The default `var` variable will allocate a new variable in the current scope and is therefore not recommended to use in a realtime environment. However in UI code (or data processing) where you don't have these hard realtime requirements, it is a useful tool and things like recursive function calls or the above mentioned factory function would not be possible otherwise.

Another problem is the standard function call in Javascript which creates a new scope that can be filled with variables. If you read carefully until now, you should know by now that this is a deal-breaker in the audio thread.

In order to make **HiseScript** realtime-safe, a few new variable types and a new function type were added. If you are going to write code that will end up running in the audio thread, you definitely need to be aware of these concepts and use them over the standard **Javascript** options:

> If you read this inside the HISE documentation window, the following code examples can be executed to show the performance gains. In this case, just comment out the other function and run the script again.

## inline functions

Since the `function` in Javascript isn't realtime safe but we need the flexibility of it in other areas, a new function type has been introduced: the **inline function**. There are some limitations for the usage of inline functions:

- no constructor (if your function definition is a prototype)
- no recursion 
- no more than 5 parameters

If this is the case (which should actually be with 99% of all functions you write in scripts, prepend the function definition with `inline` and it will be faster (and more predictable):

```!javascript
var a = 0;
var b = 1;

function slowFunction(param1, param2)
{
	var sum = param1 + param2;
	return sum;
}

inline function fastFunction(param1, param2)
{
	local sum = param1 + param2;
	return sum;
}

Console.start();
while(a < 200000) a = slowFunction(a, b); // 140 ms
//while(a < 200000) a = fastFunction(a, b); // 45 ms
Console.stop();
```

Inline functions can't be members of Objects, so it might clutter your global scope if you overdo it. You can use them inside namespaces though.

If you read the code example above, you might stumble over the `local` keyword. This indicates a local variable definition (which can be used in inline functions as well as callbacks). Since it preallocates the storage, it will not affect realtime performance - however this is obviously only true as long as you use primitive types.

## Explicit capturing of locally scoped variables

There are many occasions where you will assign callbacks to certain events in HiseScript and in some cases this will happen inside a function. However if you want to use either a parameter from the outside function or a locally defined variable, the inner function will fail to resolve that variable:

```
inline function someFunction(input)
{
	Engine.showYesNoWindow("Title", "Message", function(ok)
	{
		Console.print(input);
	});
};

someFunction(90);
```

> It doesn't matter whether you're using an inline function or a normal function here - the inline function will throw a compile error though so that's a bit clearier than the `undefined` value that will be used in the standard JS function call...

The solution is again borrowed from C++ (and namely from C++11 lambdas that allow capturing of local variables). The syntax is pretty simple: just put every variable or parameter reference that you want to access in the inner function in a bracket list between the `function` keyword and the parameter list:

```
inline function someFunction(input)
{
	//                                 This right here: <----->
	Engine.showYesNoWindow("Title", "Message", function [input](ok)
	{
		Console.print(input);
	});
};

someFunction(90);
```

## `const` variables

Prepending `const` to a variable declaration tells the interpreter that this variable will not be changed and will throw a compile error if you try to do so:

```javascript
const var v = 2; // declare a constant integer value
v = 7;           // ERROR: will not compile
```

It differs from the `const` keyword in C++ in the way that it doesn't make the variable immutable, but just the reference so you can't reassign it to something else. However this means you can still change properties of objects and pass it to functions that change something:

```javascript
const var a = []; // Declares a const reference
a[0] = 12;        // Stores something in the array
```

Beside the advantages regarding maintainability (you don't have to watch out to not accidently overwrite these variables), using `const` in conjunction with API calls yields a huge performance boost. This is because it can resolve the function call on 
compile time:

```!javascript
const var Knob = Content.addKnob("Knob", 0, 0);
var slowKnob = Knob;
var i = 0;

Console.start();
while(++i < 200000)
{
	// Knob.getValue();
	slowKnob.getValue();
}
Console.stop();
``` 

So to sum it up: there is absolutely no reason to not declare UI widgets, references to modules (via `Synth.getModulator()` etc.) not as `const`, so I strongly recommend you make this your habit.

And if you use magic numbers in your code, declare them as const variables at the beginning, it has literally no performance overhead compared to using literal values:

```javascript
const var MY_MAGIC_NUMBER = 42;


if(MY_MAGIC_NUMBER == 42)
{
    // ...
}
```

## `reg` variables

If you use globally allocated `var` variables inside a realtime function, you won't get any problems regarding runtime predictability. However the interpreter has to resolve the variable at runtime, which comes with a little performance overhead. The solution is to use `reg` instead of `var` when declaring temporary variables which are accessed in the MIDI (or audio) callbacks. It tells the interpreter to store this in a fixed size container with faster access times:

```!javascript
var f1 = 120000;
var i1 = 0;

reg f2 = 120000;
reg i2 = 0;

Console.start();
while(i1 < f1) i1 = i1 + 1;
//while(i2 < f2) i2 = i2 + 1;
Console.stop();
```

If you have a script with lots of variables, the interpreter must search the entire array for every variable access (so the `23 - 40 ms` are depending on how many other variables are defined in the script while the access time to `reg` slots stay the same).

> You only have **32** reg storage slots in the global namespace, but it should be enough for most tasks. If you need more, you get additional 32 slots inside each namespace you declare.


## `Globals.x` variables

The Globals object does not contain any methods but acts as preset wide value container for cross-script communication.

```javascript
// In Script Processor 1
Globals.x = 5.72; // Define this in one script

// In Script Processor 2
Console.print(Globals.x) // 5.72
```

> This does exactly the same as using the `global` keyword for variable definition, so you can use whatever syntax you prefer.

## Namespaces

In a ideal world, scripts are little code snippets that fulfill a single purpose and the design of HISE tries to enforce this paradigm as much as possible. However this isn't always the case, especially interface scripts tend to grow pretty quickly and reach a size where you have to think about organizing the structure of your code. A solution for this task in C++ are namespaces which can be used to avoid naming conflicts and to group things that belong together.

In Javascript there is nothing like a namespace concept. Instead you need to create a Object and fill its properties:

```javascript
var MyStuff = {};

MyStuff.property1 =  2;
MyStuff.function1 = function(){ return 2;};

Console.print(MyStuff.property1); // 2
Console.print(MyStuff.function1()); // 2
```

However this has some performance implications (every access needs to resolve the Object name first) as well as some limitations: almost every custom enhancement I added to the scripting engine of HISE like inline functions or `const` variables can't be members of objects and must be cranked into the global namespace.

In my spirit of taking things from C++ that I like and port it to Javascript, I decided to add the namespace concept to the scripting engine. It is a valuable addition because you get a way of grouping functions and variables without any performance penalty like you do when using objects for it (the parser resolves the namespaces at compile time):

```javascript
const var property1 = 5;

namespace MyStuff
{
    const var property1 = 2;
    
    inline function function1()
    {
        return property1; //within namespaces you can either use the prefix or not)
    };
}

namespace Other
{
	const var property1 = Mystuff.function1(); // works between namespaces
}

MyStuff.function1(); // 2
```


You can see how not having to resolve the object property at runtime affects the performance:

```!javascript
namespace MyNamespace
{
    reg x = 5;
}

var MyObject =
{
    "x" : 5
};

reg a = 0;

Console.start();
while(a++ < 200000)
{
    //MyNamespace.x = 2;
    MyObject.a = 2;
}
Console.stop();

```

So far so good. However there are a few things to consider which might seem a bit unintuitive if you're familiar with C++ namespaces.

#### Leaking of global namespace

Every namespace is a superset of the global namespace. That means that you can access global variables through the namespace prefix even if it is not defined within the global namespace:

```javascript
reg property1 = 5;

namespace Empty
{

}

Console.print(Empty.property1); // 5
```

This is a side effect of allowing the access to the variable within its namespace with the namespace prefix as well as without (the autocomplete will always spit out the full namespace so it would be pretty stupid to autocomplete faulty stuff).

#### No nesting of namespaces

You can't nest namespaces (define namespaces within other namespaces). One level of grouping should be enough even for complex scripts.

#### No standard `var` definitions within namespace

Namespaces currently work only for `const var` and `reg` variables (you'll get another 32 `reg` slots with every namespace) as well as `inline` functions. The standard `var` type implementation doesn't allow the namespace concept so for compatibility reasons it was removed from the namespace parser:

```javascript
namespace Problem
{
    var property1 = 5;
}

Console.print(Problem.property1); // 5 (is actual a side effect of the leaking described above)
Console.print(property1); // 5 (should be undefined)
```

#### No namespace wrapping of `include()`

A common (but not really recommended) practice in C++ is to wrap `#include` statements into a namespace definition (this way you don't need to define the namespace in every header file). However this isn't supported in HISE so this won't work:

```javascript
// External File (externalFile.js)
const var property1 = 2;

// Script
namespace External
{
    include("externalFile.js");
}

Console.print(External.property1); // undefined
```

Of course you can use namespaces in external files (it would pretty much defeat the purpose of the whole thing if this wasn't possible).

#### No extension of namespace

Every namespace must be defined once. In C++ you can take up existing namespaces and add your variables to it, but this isn't supported in **HISE**.

## Scoped Statements

One of the most powerful concepts of C++ is [RAII](https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization) which means that you have precise control over a lifetime of an object. This is used in various situations to ensure that state changes are always being reverted, even if you forget a branch or the execution throws an error. Let's take a look at this code and how the utilisation of the scoped statement concept will increase both the safety as well as clarity of the code:

```javascript

reg someWorkIsBeingDone = false;

inline function doSomeWork()
{
    someWorkIsBeingDone = true;
	
	if(Engine.getDate().isMonday())
		return;
	
	if(Engine.getDate().isThursday())
		Console.print(undefined);
	
	someWorkIsBeingDone = false;
}

inline function someOtherFunction()
{
	while(someWorkIsBeingDone)
		; // do nothing, busywait
}
```

We have a function `doSomeWork()` and another function `someOtherFunction()` which is executed on a different thread and must ensure that it's never being executed while `doSomeWork` is running. Now there are two severe problems with `doSomeWork()`:

1. If you call that function on a Monday, it will return early and forget to set that variable back to `false` so that `someOtherFunction` can resume its task.
2. If you call that function on a Thursday, it will throw a script error leaving the variable `someWorkIsBeingDone` in the `true` state.

Now solving problem 1 can just be solved by not being sloppy and forget to clean up the variable at each branch, however with more complex functions this might be very easy to overlook and also increase the amount of useless boilerplate code because we have to sprinkle that `someWorkIsBeingDone = false;` line before every return or break statement. Problem 2 is even harder to solve as you somehow have to guarantee that everything always works perfectly and will never cause an issue, which is a bold claim to make.

This is precisely where the scoped statements come in handy as they guarantee a "cleanup" operation whenever the scope (aka `{}` brackets) is finished. The cause of the cleanup doesn't matter, so a compile error will still perform the cleanup as well as any kind of `return` or `break` / `continue` statement - and even a compile error in the cleanup stage will resume the cleanup of other statements giving you the absolute guarantee that you'll never leave anything in a intermediate state which is essential for any kind of thread synchronization (and thread synchronization is the main driver behind why I've implemented this concept at all).

### General Syntax

This is a non-standard language addition, so I came up with these syntax rules for a scoped statement. First of all let's define scope as a list of statements that are executed serially. In HiseScript they are easy to spot: whenever you see brackets, you see a scope with the sole exception of brackets defining a JSON object:

```javascript
inline function dudel()
{ // SCOPE!
	if(x == 0)
	{ // SCOPE!
		for(i = 0; i < 1290; i++)
		{ // SCOPE!
		}
	}
	
	if(x == 90)
		Console.print(x); // NOT A SCOPE, no brackets!
	
	{// SCOPE! 
		{ // SCOPE!
		}
	}
}

namespace dudel
{ // SCOPE!
}

{ // SCOPE!
	const var obj =
	{ // NOT A SCOPE !!!!
		"myValue": 12
	};
}
```

Now we can define the syntax of a scoped statement

1. Scoped statements must be the first statements of a scope. If you add a scoped statement after you've added a normal statement (anything else except for comments and preprocessor conditions), it will throw an error.
2. A scoped statement is preceded by a dot followed by the statement name and its arguments: `.statement(args...)`. The statement name must be one of the inbuilt statement types which are listed below.
3. Scoped statements can be chained together to combine multiple scoped statements in one scope: `.statement1(args).statement2(args)` Important: the cleanup phase will be executed in reverse, so the last scoped statement will be cleaned up first
4. A semicolon must be put at the end of a scoped statement chain (or even a single statement) to tell the parser to stop parsing scoped statements : `.statement1(args).statement2(args);`
5. A scoped statement can be excecuted conditionally by using the `if(condition):statement(args)` syntax. The condition is a usual HiseScript expression and the operation as well as the cleanup phase will only be executed if the expression is true.

Here are a few example use cases of these rules:

```javascript

// Hello world:
{
	.print("hello";
	Console.print("world");
}
// => Output: enter hello, world, exit hello

// Inverse order at cleanup:
{
	.print("hello")
	.print("world";
}
// => Output: enter hello, enter world, exit world, exit hello

// Conditional execution
{
	.if(Math.random() > 0.5):print("50% chance that this happens");
}
// => Output (maybe): enter 50% chance that this happens exit 50% chance that this happens

/* Illegal syntax:
{
	.print("wrong")
	Console.print("forgot a semicolon");
}

{
	Console.print("wrong order");
	.print("must come before the other statement"
}
*/
```

Now before we take a look at all the available statements, let's go back to that example from the start. What we want to achieve is to make sure that the `isWorkBeingDone` variable is guaranteed to be set back to false, no matter how we leave that function. For this we use the `set` statement, which takes two arguments, a variable and a value which will be set temporarily. When the scope is finished, it will be set back to whatever value was before (this allows you to chain different set statements and make sure that at the end it will be in the original state:

```javascript
inline function doSomeWork()
{
	.set(someWorkIsBeingDone, true);
	
	if(Engine.getDate().isMonday())
		return;
	
	if(Engine.getDate().isThursday())
		Console.print(undefined);
}

inline function someOtherFunction()
{
	while(someWorkIsBeingDone)
		; // do nothing, busywait
}
```

As you can see, the function code is both clearer (because we can omit the last line) and 100% more safe, which is a double win for the scoped statements. I've also went the extra mile of indicating any scope with scoped statements in the code editor fold display (so the foldable ranges of a scoped statement will be coloured as well as the background of a scoped statement) which you will see if you paste these example into the HISE code editor.

### List of scoped statements

Now that we've defined the general syntax and purpose, let's take a look at the list of all available scoped statements. In general there are two different types of statements: debug statements and logic statements. Debug statements will perform a task that is usually used during development: measuring the time, logging something or dumping a value of some variables. These statements will be **removed** in the exported plugin (same as with all `Console.xxx()` calls). Logic statements will have a real impact on the program logic and thus will be executed in both cases.

#### Debug statements

| Statement | Arguments | Description |
| -- | ---- | ------- |
| `.print` | `(expression)` | Prints `enter expression` and `exit expression` when entering and leaving the scope. |
| `.profile` | `(ID)` | Starts a profiling session (if `HISE_INCLUDE_PROFILING_TOOLKIT` is enabled) of the scope including all child statements. |
| `.trace` | `(ID)` | Creates a named item for the given scope when profiling. Use this to quickly find the code in a complex profiling session. |
| `.dump` | `(e1, e2, ...)` | Dumps whatever variables you put in there at the beginning and the end of the scope. |
| `.count` | `(ID)` | Counts the number of times that this scope is executed (reset at compilation). |
| `.before` | `(actual, expected)` | Checks the equality of the two expressions **at the beginning of the scope** and throws a compile error if they don't match. |
| `.after` | `(actual, expected)` | Checks the equality of the two expressions **at the end of the scope** and throws a compile error if they don't match. |

In general, all these statements do not bring something revolutionary new to the table (with the exception of `.trace()`, which is a unique feature that only makes sense with a scoped statement), but can rather be considered as quality of live improvements over their `Console.xxx()` counterparts that makes coding in HISE a little bit more pleasant. Some remarks:

- most of the statements produce a console output that includes a gibberish string containing an encoded location, so you can double click on it and it will take you directly to the statement that caused the console output. The days of searching leftover Console.print() statements which clog up the console are finally over...
- the `dump` method manages to resolve the variable names (without the namespace) if you put in an expression that resolves to a single variable, which is nice so you don't have to do weird string concatenations to get a meaningful console output. Also it dumps every argument on a single line which looks a bit nicer than the `trace()` function.
- the `before` and `after` statements can be used to make fixed assumptions of what the function is supposed to do and can act as both documentation and error check at once.

```javascript
//! DUMP EXAMPLE ============================================

var x = 125;
var obj = { "id": 12 };

{
	.dump(x, obj);
	x = 900;
	obj.id = "funky";
	
	// this would be the equivalent which is much more annoying to type
	Console.print("obj: " + trace(obj) + "x: " + trace(x));
}

/* Console Output:

// 			       double click here to get to the code
// 									|
//									V
Interface: dump before: {SW50ZXJmYWNlfHw5M3wxNXw3} 
> x = 125
> obj = {"id": 12}

Interface: dump after: {SW50ZXJmYWNlfHw5M3wxNXw3}
> x = 900
> obj = {"id": "funky"}
*/

//! BEFORE / AFTER EXAMPLE ==================================

// If this condition isn't true, the function will 
// throw an error
reg someCondition = true;
reg someOtherCondition = false;

inline function getDoubleValue(x)
{
	// these statements at the top tell us exactly
	.before(someCondition, true) // what the function is expecting and
	.after(someOtherCondition, true); // what the function is supposed to do
	
	// If you fail to set the other condition in the 
	// function (which you can simulate by commenting
	// out that line, it will throw an error).
	someOtherCondition = true;
	
	return x * 2;
}
```

#### Logic statements

Now we get to the real juicy stuff. The guaranteed cleanup operation gives us the ability to add some powerful functions to HiseScript which I was a bit hesitant to offer before because the consequences of forgetting the cleanup would be too severe including dead locks and UI freezes. The functionality basically boils down to two reasons:

1. Controlling the event notification system
2. Synchronizing the data access between threads

| Statement | Arguments | Description |
| -- | ---- | ------- |
| `.set` | `(variable, tempValue)` | temporarily sets the given variable to the temp value and resets it after the scope. |
| `.call` | `(callable, args...)` | calls the given object (either function or broadcaster) with the given arguments at the beginning and end of the scope. |
| `.lock` | `(Threads.XXX)` | Locks the given thread for the duration of the scope. This performs additional safe checks to avoid common mistakes that lead to deadlocks. |
| `.defer` | `("path")` | This suspends all notifications for the given path until the scope is done. |
| `.bypass` | `(broadcaster, send)` | temporarily deactivates the given broadcaster and sends a message after the scope when `send` is true. |

We already know our little buddy `set` in our example, however in a real world project we wouldn't roll our own solution for multithreaded synchronisation but rather rely on its powerful friend, the `lock` statement. Since this is a language guide, describing the concepts behind `lock` and `defer` is out of the scope of this document (hihihi), so if you want to know more about that, keep reading here:

- Read up on the [Threads](/scripting/scripting-api/threads) API class for a detailed explanation of the threading model in HISE and how to apply it.
- Read up on the `Event Notification` chapter of the HISE documentation (tbd) for a detailed description of the `defer` statement.

## Type safety

Javascript (and therefore HiseScript) is a so-called dynamic language. This means that variables can change their type during the lifetime of the program:

```javascript
var x = "I'm a string";
x = ["Now", "I'm", "a", "Array"];
x = { "Did": "somebody", "say": "JSON????" };
x = 42;
```

This flexibility makes it extremely easy to write programs because you even don't need to know what types are in order to create the logic you're after. It also removes a lot of boilerplate code of converting the types to match the expected type. 

However there are also a few examples of how the automatic type conversion produces glitches and issues (eg. seen [here](https://forum.hise.audio/topic/8270/confusing-issue-with-scripting-simple-knob-for-ahdsr-envelope-knob?_=1695985708890))

I'm not onto a revolutionary new approach to programming here - there is actually a typesafe variant of Javascript around called TypeScript - but I thought a bit about how to add some optional type-safety to HiseScript. So I've made a few additions to the HiseScript language which are completely optional and backwards compatible.

> In fact there is one breaking change, but this is because I realized that under certain circumstances (calling a API call on an object that is stored in a list) the check for undefined parameters for the function call was bypassed, so if you're scripts stop compiling or throw an error during runtime, you'll most likely had a undetected undefined parameter in a function call.

The type-safety is applied to these concepts:

- API calls so you can't call `Message.setNoteNumber()` with a String or a JSON object (implenting this for the full HISE API will be a longer process because it requires to change all wrapper code definitions so I'll add the type safety over time)
- `reg` variables.
- `const var` variables do not need to be type-safe as they are already typesafe because they are initialised with a fixed type.
- `inline functions` can have a return type and a well-defined type for each parameter. These types will be then evaluated during runtime (only in HISE, there is not a single CPU cycle overhead in your compiled project)

For the syntax of defining types, I've tried to stick as much as possible to the type script syntax (with the exception of defining return types of inline functions).

```javascript
// a reg variable that must always be an integer
reg:int myVariable = 90; 
h
myVariable = 125; // OK
myVariable = "Didn't get the memo"; // Will not compile
myVariable = undefined; // this will compile as special case
						// to allow resetting values

// making a function parameter typesafe by prepending a type token
// You can only declare selected parameters as typesafe
inline function doSomething(x: int, unsafe)
{
	Console.print(typeof(unsafe)); // this can be anything
}

doSomething(90, 1); // OK
doSomething(90, [1, 2, 3]); // Still OK
//doSomething("Didn't get the memo", [1, 2, 3]); // Will not compile

// Define a static return type by adding a type token before the function name
inline function: int getSomeInteger()
{
	return 124; // OK
	//return "Didn't get the memo"; // Will not compile
}
```

Below is a list of all available type identifiers you can use. There are two types of type IDs: elementary types and composite types which define a combination of elementary types so that you can allow multiple types to be passed into the function.

| ID | Type | Description |
| === | == | ========= |
| `int` | elementary | an integer number |
| `double` | elementary | a floating point number |
| `string` | elementary | a string variable |
| `Array` | elementary | the Javascript array |
| `Buffer` | elementary | The inbuilt float array type in HISE to represent audio signals |
| `ObjectWithLength` | composite| Anything that has the `length` property (So a string, an array or a buffer) |
| `JSON` | elementary | a JSON object |
| `ScriptObject` | elementary | a object that was created with the API to interact with HISE (eg. the TransportHandler or a File object) |
| `Function` | elementary | A callable object (either a function or a broadcaster) |
| `number` | composite | either a int or a double number. Note: it's highly advised to use this over the elementary types because of the very loose type
| `object` | composite | either a JSON object or a ScriptObject |
| `Colour` | composite | either a string ("0xFFRRRGGBB") oder a integer number (0xFFRRGGBB). It's called Colour because the most likely use case for this will be colour variables but you can use it whenever you need either a number or a string. |
| `ComplexType` | composite | Anything that is not a number |
| `NotUndefined` | composite | Anything but not undefined | 

> If the mixing of uppercase and CamelCase triggers your OCD, rest assured that this is not a case of me being sloppy but trying to use the existing type IDs from Java/Typescript (eg `number`) but for the complex types like `Array` and `Buffer` I have to stick to the existing HiseScript identifiers.

## C Preprocessor

All C-based languages have a preprocessor that will process the code files before they are send to the compiler. They are usually performing simple replace operations and conditional compilation of files.

Adding this concept to HiseScript gives a few advantages:

- you can "physically" exclude scripting code from being included in the plugin (eg. if you have a plugin with some kind of demo functionality and want to avoid unlocking the demo by changing a simple flag in the embedded scripting code)
- you can define global constants which will be replaced in every script
- you can query the extra definitions that are passed to the C++ compiler on export and modify your scripts
- you can quickly deactivate parts of the code without resorting to commenting out the code
- the code editor in HISE will grey out code that will not be compiled which is pretty helpful

The preprocessor implementation in HISE is not fully standard compliant and these directives are not supported:

```
#ifdef
#undef
#pragma
#include
```

so that leaves these directives that are implemented:

```
#if
#elif
#else
#endif
#define
#error
```

There is plenty of documentation available on how to use preprocessors, but a good overview is available here:

[https://www.tutorialspoint.com/cprogramming/c_preprocessors.htm](https://www.tutorialspoint.com/cprogramming/c_preprocessors.htm)

## Using the preprocessor

By default the preprocessor is disabled. This is because there is a slight overhead in compilation time so unless you really want to use it there's no need to add this overhead. In order to activate the preprocessor, you have two options:

1. Set the **EnableGlobalPreprocessor** flag in the Project Settings. This will enable the preprocessor for all scripts in the project
2. Add the custom directive `#on` at the beginning of each file that you want to process.

> If you haven't activated the preprocessor, you're most likely will get an error message like `Found '#' when expecting a statement`.

## How the preprocessor is used in HISE

It's important to know when and how the preprocessor in HISE is used in order to take full advantage over the system. There are two important rules here:

1. Just like SNEX and FAUST, the preprocessor will never have to work in the exported plugin. During development it will be evaluated each time you recompile the script, but if you export the plugin, the preprocessor will process the script code that is about to be embedded in the binary **so that the processed code is embedded** with the current preprocessor definitions.

2. The preprocessor is global so any `#define` directive will be available in all other scripts. You can also use all preprocessor directives that you've added to the **ExtraDefinition** field (and also all compiler flags you pass in as command line argument `-D:NAME=VALUE` when you export a plugin from the command-line



 
