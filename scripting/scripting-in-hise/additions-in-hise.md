---
keywords: HISE Additions
summary:  A summary of all additions made to standard Javascript
author:   Christoph Hart
---

The scripting language in HISE is in fact not Javascript. It has its origin in the non-standard implementation in the JUCE codebase and was extended and customized to fit the requirements in HISE.

This leads to a few irritations for people who already know Javascript and expect to 
transfer their knowledge they acquired from writing web-apps over to HISE. Unfortunately 
this is only partly possible: you get some head start compared to novices for sure, 
but there are a few things that you need to know - and more annoying: **many 
things you need to forget**.

This chapter provides a detailed overview over every single customisation added to 
the scripting engine in HISE. From now on, the scripting language in HISE will be 
referred to as **HiseScript** as opposed to standard **Javascript**. We will take a look at the concepts that have been stripped from Javascript first and then go through the 
additions.

## Object-oriented programming

**Javascript** acquired its popularity in the web development ecosystem because it 
allows powerful data processing using a lean syntax. Yet it was never designed 
to be a real object-oriented language - it happened to grow and people were 
doing more and more complex applications so the language reacted and  object-oriented 
things were added over the time. If you have used a proper object oriented language 
like Java or C++ before, everything related to object-oriented programming in 
Javascript looks a bit quirky.

The desire for object-oriented language features grows with the complexity of the 
app because it reduces the complexity and redundance. Proper encapsulation ensures 
the maintainability of the code. This is only partly true for **HiseScript**: the 
tree structure of HISE already breaks down the complexity into **one script for 
each task** and the UI data model tries to keep the code free from declarative 
boilerplate code as much as possible. More importantly, there are almost no scenarios 
in HISE where dynamically creating objects is desired:

- UI elements and references to HISE modules have to be created at initialisation.
- in realtime callbacks you can't allocate anything, so creating objects is out of the question.

Therefore, most of the language concepts associated with object orientated programming 
have been removed and replaced with paradigms that suit the two restrictions mentioned 
above.


### No `new` operator

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

will not compile in HISE. Instead, you need to create an object in a function, 
do something with it and return it:

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

This concept is known as **Object Factory**. In this example, the code looks 
more verbose, but it has a big advantage: **you can use existing objects and 
turn it into the thing you want**. If you take a look at the 
[ScriptPanel documentation](/ui-components/plugin-components/panel), you'll notice that every single code example 
uses this form:

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

but `somethingReallyImportant()` will not be executed despite its self-explanatory name. 
The reason was the typo that defined a new variable `MyDataBaseEntry` (with a 
capital `B`) thus leaving the original variable in its previous state. 

Debugging this kind of error is one of the most frustrating experiences, so this code 
will not compile in **HiseScript**, but throw an error at the line where you want 
to define `MyDataBaseEntry`. The solution is simple: If you want to create a new 
variable, use `var` - or even better, one of the custom variable types like `reg`, 
`local` or `const var`, which will be explained later.

There is only one exception to this rule: if you use a `for` loop, you may declare 
the counter variable without the `var` keyword:

```javascript
for(i = 0; i < length; i++)
    doSomething(i);
```

This is just for convenience and if you're using `i` as global variable for anything 
meaningful, you most certainly will have other things to bother about.

## Additions

Reading this page until now might have been a little bit frustrating, but it will get 
better from now on, because now we will take a look at all the additions that have 
been added to **HiseScript**. If you have some experience in *C++*, you might 
recognize some of them, as I have taken a few concepts that I like and transferred 
it to **HiseScript**.

Most of them are implemented deeply inside the Javascript Parser (or compiler) and 
offer performance improvements because they can be resolved at compile time.

## Custom variable types / function calls

The default `var` variable will allocate a new variable in the current scope and 
is therefore not recommended to use in a realtime environment. However in UI code 
(or data processing) where you don't have these hard realtime requirements, it is 
a useful tool and things like recursive function calls or the above mentioned factory 
function would not be possible otherwise.

Another problem is the standard function call in Javascript which creates a new 
scope that can be filled with variables. If you read carefully until now, you 
should know by now that this is a deal-breaker in the audio thread.

In order to make **HiseScript** realtime-safe, a few new variable types and a new 
function type were added. If you are going to write code that will end up running 
in the audio thread, you definitely need to be aware of these concepts and use them 
over the standard **Javascript** options:

> If you read this inside the HISE documentation window, the following code examples 
can be executed to show the performance gains. In this case, just comment out the other 
function and run the script again.

## inline functions

Since the `function` in Javascript isn't realtime safe but we need the flexibility of it 
in other areas, a new function type has been introduced: the **inline function**. 
There are some limitations for the usage of inline functions:

- no constructor (if your function definition is a prototype)
- no recursion 
- no more than 5 parameters

If this is the case (which should actually be with 99% of all functions you write in 
scripts, prepend the function definition with `inline` and it will be faster (and 
more predictable):

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

Inline functions can't be members of Objects, so it might clutter your global scope if 
you overdo it. You can use them inside namespaces though.



If you read the code example above, you might stumble over the `local` keyword. This 
indicates a local variable definition (which can be used in inline functions as well 
as callbacks). Since it preallocates the storage, it will not affect realtime 
performance - however this is obviously only true as long as you use primitive types.

## `const` variables

Prepending `const` to a variable declaration tells the interpreter that this variable 
will not be changed and will throw a compile error if you try to do so:

```javascript
const var v = 2; // declare a constant integer value
v = 7;           // ERROR: will not compile
```

It differs from the `const` keyword in C++ in the way that it doesn't make the variable 
immutable, but just the reference so you can't reassign it to something else.
However this means you can still change properties of objects and pass it to 
functions that change something:

```javascript
const var a = []; // Declares a const reference
a[0] = 12;        // Stores something in the array
```

Beside the advantages regarding maintainability (you don't have to watch out to not
accidently overwrite these variables), using `const` in conjunction with API calls 
yields a huge performance boost. This is because it can resolve the function call on 
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

So to sum it up: there is absolutely no reason to not declare UI widgets, references 
to modules (via `Synth.getModulator()` etc.) not as `const`, so I strongly recommend 
you make this your habit.

And if you use magic numbers in your code, declare them as const variables at the 
beginning, it has literally no performance overhead compared to using literal values:

```javascript
const var MY_MAGIC_NUMBER = 42;


if(MY_MAGIC_NUMBER == 42)
{
    // ...
}
```

## `reg` variables

If you use globally allocated `var` variables inside a realtime function, you won't 
get any problems regarding runtime predictability. However the interpreter has to 
resolve the variable at runtime, which comes with a little performance overhead. The 
solution is to use `reg` instead of `var` when declaring temporary variables which are 
accessed in the MIDI (or audio) callbacks. It tells the interpreter to store this in 
a fixed size container with faster access times:

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

If you have a script with lots of variables, the interpreter must search the entire 
array for every variable access (so the `23 - 40 ms` are depending on how many other 
variables are defined in the script while the access time to `reg` slots stay the same).

> You only have **32** reg storage slots in the global namespace, but it should be 
enough for most tasks. If you need more, you get additional 32 slots inside each 
namespace you declare.


## `Globals.x` variables


## Namespaces

In a ideal world, scripts are little code snippets that fulfill a single purpose and the 
design of HISE tries to enforce this paradigm as much as possible. However this isn't 
always the case, especially interface scripts tend to grow pretty quickly and reach a 
size where you have to think about organizing the structure of your code. A solution 
for this task in C++ are namespaces which can be used to avoid naming conflicts and to 
group things that belong together.

In Javascript there is nothing like a namespace concept. Instead you need to create a 
Object and fill its properties:

```javascript
var MyStuff = {};

MyStuff.property1 =  2;
MyStuff.function1 = function(){ return 2;};

Console.print(MyStuff.property1); // 2
Console.print(MyStuff.function1()); // 2
```

However this has some performance implications (every access needs to resolve the 
Object name first) as well as some limitations: almost every custom enhancement I 
added to the scripting engine of HISE like inline functions or `const` variables 
can't be members of objects and must be cranked into the global namespace.

In my spirit of taking things from C++ that I like and port it to Javascript, I 
decided to add the namespace concept to the scripting engine. It is a valuable 
addition because you get a way of grouping functions and variables without any 
performance penalty like you do when using objects for it (the parser resolves the 
namespaces at compile time):

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


You can see how not having to resolve the object property at runtime affects the 
performance:

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

So far so good. However there are a few things to consider which might seem a bit 
unintuitive if you're familiar with C++ namespaces.

#### Leaking of global namespace

Every namespace is a superset of the global namespace. That means that you can access 
global variables through the namespace prefix even if it is not defined within the 
global namespace:

```javascript
reg property1 = 5;

namespace Empty
{

}

Console.print(Empty.property1); // 5
```

This is a side effect of allowing the access to the variable within its namespace 
with the namespace prefix as well as without (the autocomplete will always spit out 
the full namespace so it would be pretty stupid to autocomplete faulty stuff).

#### No nesting of namespaces

You can't nest namespaces (define namespaces within other namespaces). One level of 
grouping should be enough even for complex scripts.

#### No standard `var` definitions within namespace

Namespaces currently work only for `const var` and `reg` variables (you'll get 
another 32 `reg` slots with every namespace) as well as `inline` functions. The standard
`var` type implementation doesn't allow the namespace concept so for compatibility 
reasons it was removed from the namespace parser:

```javascript
namespace Problem
{
    var property1 = 5;
}

Console.print(Problem.property1); // 5 (is actual a side effect of the leaking described above)
Console.print(property1); // 5 (should be undefined)
```

#### No namespace wrapping of `include()`

A common (but not really recommended) practice in C++ is to wrap `#include` statements 
into a namespace definition (this way you don't need to define the namespace in every 
header file). However this isn't supported in HISE so this won't work:

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

Of course you can use namespaces in external files (it would pretty much defeat the 
purpose of the whole thing if this wasn't possible).

#### No extension of namespace

Every namespace must be defined once. In C++ you can take up existing namespaces and 
add your variables to it, but this isn't supported in **HISE**.