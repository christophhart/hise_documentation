I removed everything that isn't useful for our purpose and added some notes if there is something special you have to know when using Javascript in **HISE**.

Because the Javascript Engine of **HISE** is not fully standard compliant, I had to change some examples to make them work in the ScriptProcessor.

## Overview

JavaScript is an object oriented dynamic language with types and operators, standard built-in objects, and methods. Its syntax comes from the Java and C languages, so many structures from those languages apply to JavaScript as well. One of the key differences is that JavaScript does not have classes; instead, the class functionality is accomplished by object prototypes. The other main difference is that functions are objects, giving functions the capacity to hold executable code and be passed around like any other object.

> In **HISE** the callbacks are functions and there are some objects which contain static methods (the API objects) as well as runtime objects of existing Processors.

## Data Types

Let's start off by looking at the building block of any language: the types. JavaScript programs manipulate values, and those values all belong to a type. JavaScript's types are:

- Number
- String
- Boolean
- Function
- Object

... oh, and `undefined` and `null`, which are... slightly odd. And `Array`, which are a special kind of object. And to be technically accurate, `functions` are just a special type of object. 

### Numbers

Numbers in JavaScript are "double-precision 64-bit format IEEE 754 values", according to the spec. This has some interesting consequences. There's no such thing as an integer in JavaScript, so you have to be a little careful with your arithmetic if you're used to math in C or Java. Watch out for stuff like:

```javascript
0.1 + 0.2 == 0.30000000000000004
```

In practice, integer values are treated as 32-bit ints (and are stored that way in some browser implementations), which can be important for bit-wise operations.

The standard arithmetic operators are supported, including addition, subtraction, modulus (or remainder) arithmetic and so forth. There's also a built-in object that I forgot to mention earlier called Math if you want to perform more advanced mathematical functions and constants:

```javascript
Math.sin(3.5);
var circumference = Math.PI * (r + r);
```

You can convert a string to an integer using the built-in parseInt() function. This takes the base for the conversion as an optional second argument, which you should always provide:

```javascript
parseInt("123", 10); // 123
parseInt("010", 10); // 10
```

If you don't provide the base, you can get surprising results:

```javascript
parseInt("010"); // 8
```

That happened because the parseInt() function decided to treat the string as octal due to the leading 0.

JavaScript has the special values Infinity and -Infinity:

```javascript
1 / 0; //  Infinity
-1 / 0; // -Infinity
```

> The parseInt() and parseFloat() functions parse a string until they reach a character that isn't valid for the specified number format, then return the number parsed up to that point. However the "+" operator simply converts the string to NaN if there is any invalid character in it. Just try parsing the string "10.2abc" with each method by yourself in the console and you'll understand the differences better.

### Strings

Strings in JavaScript are sequences of characters. More accurately, they are sequences of Unicode characters, with each character represented by a 16-bit number. This should be welcome news to anyone who has had to deal with internationalization.

If you want to represent a single character, you just use a string of length 1.

To find the length of a string, access its length property:

```javascript
"hello".length; // 5
```

There's our first brush with JavaScript objects! Did I mention that you can use strings like objects too? They have methods as well that allow you to manipulate the string and access information about the string:

```javascript
"hello".charAt(0); // "h"
"hello, world".replace("hello", "goodbye"); // "goodbye, world"
"hello".toUpperCase(); // "HELLO"
```

### Other types

JavaScript distinguishes between `null`, which is a value that indicates a deliberate non-value (and is only accessible through the null keyword), and `undefined`, which is a value of type 'undefined' that indicates an uninitialized value — that is, a value hasn't even been assigned yet. We'll talk about variables later, but in JavaScript it is possible to declare a variable without assigning a value to it. If you do this, the variable's type is undefined. undefined is actually a constant.

JavaScript has a boolean type, with possible values `true` and `false` (both of which are keywords). Any value can be converted to a boolean according to the following rules:

`false`, `0`, the empty string `("")`, `NaN`, `null`, and undefined all become `false`.
all other values become `true`.
You can perform this conversion explicitly using the Boolean() function:

```javascript
Boolean("");  // false
Boolean(234); // true
```

However, this is rarely necessary, as JavaScript will silently perform this conversion when it expects a boolean, such as in an if statement (see below). For this reason, we sometimes speak simply of "true values" and "false values," meaning values that become true and false, respectively, when converted to booleans. Alternatively, such values can be called "truthy" and "falsy", respectively.

Boolean operations such as `&&` (logical and), `||` (logical or), and `!` (logical not) are supported; see below.

## Variables

New variables in JavaScript are declared using the var keyword:

```javascript
var a;
var name = "simon";
```

If you declare a variable without assigning any value to it, its type is undefined.

An important difference from other languages like Java is that in JavaScript, blocks do not have scope; only functions have scope. So if a variable is defined using var in a compound statement (for example inside an if control structure), it will be visible to the entire function. However, starting with ECMAScript Edition 6, let and const declarations allow you to create block-scoped variables.

> **IMPORTANT:** Do not declare variables in one of the callbacks that are triggered from a MIDI message, since it will result in unpredictable performance with drop outs & stuff. Normally you declare all variables in the `onInit()` callback and assign values to the variable in the other callbacks.

## Operators

JavaScript's numeric operators are +, -, *, / and % - which is the remainder operator. Values are assigned using =, and there are also compound assignment statements such as += and -=. These extend out to x = x operator y.

```javascript
x += 5
x = x + 5
```

You can use ++ and -- to increment and decrement respectively. These can be used as prefix or postfix operators.

The + operator also does string concatenation:

```javascript
"hello" + " world"; // "hello world"
```

If you add a string to a number (or other value) everything is converted in to a string first. This might catch you up:

```javascript
"3" + 4 + 5;  // "345"
 3 + 4 + "5"; // "75"
```

Adding an empty string to something is a useful way of converting it.

Comparisons in JavaScript can be made using <, >, <= and >=. These work for both strings and numbers. Equality is a little less straightforward. The double-equals operator performs type coercion if you give it different types, with sometimes interesting results:

```javascript
"dog" == "dog"; // true
1 == true; // true
```

To avoid type coercion, use the triple-equals operator:

```javascript
1 === true;    // false
true === true; // true
```

There are also != and !== operators.

JavaScript also has bitwise operations. If you want to use them, they're there.

## Control structures
JavaScript has a similar set of control structures to other languages in the C family. Conditional statements are supported by if and else; you can chain them together if you like:

```javascript
var name = "kittens";
if (name == "puppies") {
  name += "!";
} else if (name == "kittens") {
  name += "!!";
} else {
  name = "!" + name;
}
name == "kittens!!"
```

JavaScript has while loops and do-while loops. The first is good for basic looping; the second for loops where you wish to ensure that the body of the loop is executed at least once:

```javascript
while (true) {
  // an infinite loop!
}

var input;
do {
  input = get_input();
} while (inputIsNotValid(input))
```

JavaScript's for loop is the same as that in C and Java: it lets you provide the control information for your loop on a single line.

```javascript
for (var i = 0; i < 5; i++) {
  // Will execute 5 times
}
```

> **IMPORTANT:** Go easy on the loops in the MIDI callbacks.


The `&&` and `||` operators use short-circuit logic, which means whether they will execute their second operand is dependent on the first. This is useful for checking for null objects before accessing their attributes:

```javascript
var name = o && o.getName();
```

Or for setting default values:

```javascript
var name = otherName || "default";
```

JavaScript has a ternary operator for conditional expressions:

```javascript
var allowed = (age > 18) ? "yes" : "no";
```

The switch statement can be used for multiple branches based on a number or string:

```javascript
switch(action) {
  case 'draw':
    drawIt();
    break;
  case 'eat':
    eatIt();
    break;
  default:
    doNothing();
}
```

If you don't add a break statement, execution will "fall through" to the next level. This is very rarely what you want — in fact it's worth specifically labeling deliberate fallthrough with a comment if you really meant it to aid debugging:

```javascript
switch(a) {
  case 1: // fallthrough
  case 2:
    eatIt();
    break;
  default:
    doNothing();
}
```

The default clause is optional. You can have expressions in both the switch part and the cases if you like; comparisons take place between the two using the === operator:

```javascript
switch(1 + 3) {
  case 2 + 2:
    yay();
    break;
  default:
    neverhappens();
}
```

## Objects
JavaScript objects can be thought of as simple collections of name-value pairs. As such, they are similar to:

- Dictionaries in Python
- Hashes in Perl and Ruby
- Hash tables in C and C++
- HashMaps in Java
- Associative arrays in PHP

The fact that this data structure is so widely used is a testament to its versatility. Since everything (bar core types) in JavaScript is an object, any JavaScript program naturally involves a great deal of hash table lookups. It's a good thing they're so fast!

The "name" part is a JavaScript string, while the value can be any JavaScript value — including more objects. This allows you to build data structures of arbitrary complexity.

There are two basic ways to create an empty object:

```javascript
var obj = new Object();
```

And:

```javascript
var obj = {};
```

These are semantically equivalent; the second is called object literal syntax, and is more convenient. This syntax is also the core of `JSON` format and should be preferred at all times.

Object literal syntax can be used to initialize an object in its entirety:

```javascript
var obj = {
  name: "Carrot",
  "for": "Max",
  details: {
    color: "orange",
    size: 12
  }
};
```

Attribute access can be chained together:

```javascript
obj.details.color; // orange
obj["details"]["size"]; // 12
```

> The second line doesn't work in **HISE**

The following example creates an object prototype, Person, and instance of that prototype, You.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Define an object
var You = new Person("You", 24); 
// We are creating a new person named "You" 
// (that was the first parameter, and the age..)
```

Once created, an object's properties can again be accessed in one of two ways:

```javascript
obj.name = "Simon";
var name = obj.name;
And...

obj["name"] = "Simon";
var name = obj["name"];
```

These are also semantically equivalent. The second method has the advantage that the name of the property is provided as a string, which means it can be calculated at run-time though using this method prevents some JavaScript engine and minifier optimizations being applied. It can also be used to set and get properties with names that are reserved words:

## Arrays

Arrays in JavaScript are actually a special type of object. They work very much like regular objects (numerical properties can naturally be accessed only using [] syntax) but they have one magic property called 'length'. This is always one more than the highest index in the array.

One way of creating arrays is as follows:

```javascript
var a = [];
a[0] = "dog";
a[1] = "cat";
a[2] = "hen";
a.length; // 3
```

> **HISE** does not support the `var a = new Array()` definition style.

A more convenient notation is to use an array literal:

```javascript
var a = ["dog", "cat", "hen"];
a.length; // 3
```

Note that array.length isn't necessarily the number of items in the array. Consider the following:

```javascript
var a = ["dog", "cat", "hen"];
a[100] = "fox";
a.length; // 101
```

Remember — the length of the array is one more than the highest index.

If you query a non-existent array index, you get `undefined`:

```javascript
typeof a[90]; // undefined
```

If you take the above into account, you can iterate over an array using the following:

```javascript
for (var i = 0; i < a.length; i++) {
  // Do something with a[i]
}
```

This is slightly inefficient as you are looking up the length property once every loop. An improvement is this:

```javascript
for (var i = 0, len = a.length; i < len; i++) {
  // Do something with a[i]
}
```

A nicer-looking but limited idiom is:

```javascript
for (var i = 0, item; item = a[i++];) {
  // Do something with item
}
```

Here we are setting up two variables. The assignment in the middle part of the for loop is also tested for truthfulness — if it succeeds, the loop continues. Since i is incremented each time, items from the array will be assigned to item in sequential order. The loop stops when a "falsy" item is found (such as undefined).

This trick should only be used for arrays which you know do not contain "falsy" values (arrays of objects or DOM nodes for example). If you are iterating over numeric data that might include a 0 or string data that might include the empty string you should use the i, len idiom instead.

You can iterate over an array using a for...in loop. Note that if someone added new properties to Array.prototype, they will also be iterated over by this loop.  Therefore this method is "not" recommended.

Another way of iterating over an array that was added with ECMAScript 5 is forEach():

```javascript
["dog", "cat", "hen"].forEach(function(currentValue, index, array) {
  // Do something with currentValue or array[index]
});
```

If you want to append an item to an array simply do it like this:

```javascript
a.push(item);
```

Arrays come with a number of methods. See also the full documentation for array methods.

Method name	| Description
----------- | -----------
`a.toString()` | 	Returns a string with the toString() of each element separated by commas.
`a.toLocaleString()` |	Returns a string with the toLocaleString()` of each element separated by commas.
`a.concat(item1[, item2[, ...[, itemN]]])` |	Returns a new array with the items added on to it.
`a.join(sep)` |	Converts the array to a string - values delimited by the sep param
`a.pop()`	| Removes and returns the last item.
`a.push(item1, ..., itemN)` |	Push adds one or more items to the end.
`a.reverse()`	| Reverse the array.
`a.shift()` |	Removes and returns the first item.
`a.slice(start, end)` |	Returns a sub-array.
`a.sort([cmpfn])`	| Takes an optional comparison function.
`a.splice(start, delcount[, item1[, ...[, itemN]]])` |	Lets you modify an array by deleting a section and replacing it with more items.
`a.unshift([item])` |	Prepends items to the start of the array.

## Functions

Along with objects, functions are the core component in understanding JavaScript. The most basic function couldn't be much simpler:

```javascript
function add(x, y) {
  var total = x + y;
  return total;
}
```

This demonstrates a basic function. A JavaScript function can take 0 or more named parameters. The function body can contain as many statements as you like, and can declare its own variables which are local to that function. The return statement can be used to return a value at any time, terminating the function. If no return statement is used (or an empty return with no value), JavaScript returns undefined.

The named parameters turn out to be more like guidelines than anything else. You can call a function without passing the parameters it expects, in which case they will be set to undefined.

```javascript
add(); // NaN 
// You can't perform addition on undefined
```

You can also pass in more arguments than the function is expecting:

```javascript
add(2, 3, 4); // 5 
// added the first two; 4 was ignored
```

That may seem a little silly, but functions have access to an additional variable inside their body called arguments, which is an array-like object holding all of the values passed to the function. Let's re-write the add function to 
take as many values as we want:

```javascript
function add() {
  var sum = 0;
  for (var i = 0, j = arguments.length; i < j; i++) {
    sum += arguments[i];
  }
  return sum;
}

add(2, 3, 4, 5); // 14
```

That's really not any more useful than writing 2 + 3 + 4 + 5 though. Let's create an averaging function:

```javascript
function avg() {
  var sum = 0;
  for (var i = 0, j = arguments.length; i < j; i++) {
    sum += arguments[i];
  }
  return sum / arguments.length;
}

avg(2, 3, 4, 5); // 3.5
```

This is pretty useful, but introduces a new problem. The avg() function takes a comma separated list of arguments — but what if you want to find the average of an array? You could just rewrite the function as follows:

```javascript
function avgArray(arr) {
  var sum = 0;
  for (var i = 0, j = arr.length; i < j; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

avgArray([2, 3, 4, 5]); // 3.5
```

But it would be nice to be able to reuse the function that we've already created. Luckily, JavaScript lets you call a function and call it with an arbitrary array of arguments, using the apply() method of any function object.

```javascript
avg.apply(null, [2, 3, 4, 5]); // 3.5
```

The second argument to apply() is the array to use as arguments; the first will be discussed later on. This emphasizes the fact that functions are objects too.

JavaScript lets you create anonymous functions.

```javascript
var avg = function() {
  var sum = 0;
  for (var i = 0, j = arguments.length; i < j; i++) {
    sum += arguments[i];
  }
  return sum / arguments.length;
};
```

This is semantically equivalent to the function avg() form. It's extremely powerful, as it lets you put a full function definition anywhere that you would normally put an expression. This enables all sorts of clever tricks. Here's a way of "hiding" some local variables — like block scope in C:

```javascript
var a = 1;
var b = 2;

(function() {
  var b = 3;
  a += b;
})();

a; // 4
b; // 2
```

JavaScript allows you to call functions recursively. This is particularly useful for dealing with tree structures, such as you get in the browser DOM.

```javascript
function countChars(elm) {
  if (elm.nodeType == 3) { // TEXT_NODE
    return elm.nodeValue.length;
  }
  var count = 0;
  for (var i = 0, child; child = elm.childNodes[i]; i++) {
    count += countChars(child);
  }
  return count;
}
```

This highlights a potential problem with anonymous functions: how do you call them recursively if they don't have a name? JavaScript lets you name function expressions for this. You can use named IIFEs (Immediately Invoked Function Expressions) as below:

```javascript
var charsInBody = (function counter(elm) {
  if (elm.nodeType == 3) { // TEXT_NODE
    return elm.nodeValue.length;
  }
  var count = 0;
  for (var i = 0, child; child = elm.childNodes[i]; i++) {
    count += counter(child);
  }
  return count;
})(document.body);
```

The name provided to a function expression as above is only available to the function's own scope. This both allows more optimizations to be done by the engine and a more readable code. The name also shows up in the debugger and some stack traces which can save you time.

Note that JavaScript functions are themselves objects and you can add or change properties on them just like on objects we've seen in the Objects section.
