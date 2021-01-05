# HISE Script Coding Standards

## Introduction

The goal of this document is to provide a set of rules that can be followed to produce clean and readable HISE script. Through the use of such a framework developers can share code and have a high level of confidence that others will be able to read, understand, modify, and maintain it without too much difficulty. Although some elements of this guide aim to encourage better coding practices, following these guidelines will not guarantee that your code is bug free or efficient, but it will be readable.

HISE script is born from a mixture of Javascript and C++; This guide tries to follow pre-existing conventions for those language with particular inspiration taken from the [JUCE Coding Standards](https://juce.com/discover/stories/coding-standards), [LLVM Coding Standards](http://llvm.org/docs/CodingStandards.html), and the [Airbnb Javascript style guide](https://github.com/airbnb/javascript). Other elements, unique to HISE, are based upon Christoph's blogs, documentation, and forum posts, and the default behaviour of the HISE script editor when possible.

## General Formatting

### Source Headers

At the top of every source file there should be a header section that includes a copyright notice and the license under which the source code is published. This is especially important when using a free license such as the GNU GPL or MIT.

```javascript
/*
* --------------------------------------------------------------------------
* 
* Copyright <YEAR> <COPYRIGHT HOLDER>

* Permission is hereby granted, free of charge, to any person obtaining a copy of
* this software and associated documentation files (the "Software"), to deal in
* the Software without restriction, including without limitation the rights to
* use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
* of the Software, and to permit persons to whom the Software is furnished to do
* so, subject to the following conditions...
*
* -------------------------------------------------------------------------- 
*/
```

### Comments

-   Source code should generally be self documenting through the use of meaningful variable and function names. However it can be helpful to include comments to improve readability and maintainability. Use comments to describe what a section of code does rather than how it does it.

-   Comments up to a few lines in length should use `//` rather than `/**/`. This makes it easier to comment out larger blocks when debugging.

-   For large sections of comment you should use `/**/`

-   Multiline comments should be vertically aligned to the left.

    ```javascript
    // Bad
    /*
     */

    // Good
    /*
    */
    ```

-   Always leave a space before the text of a comment, e.g. `// Foobar`

-   Code that is commented out during development and testing should be uncommented or removed before release.

-   Using comments like `// FIXME:` or `// TODO:` to indicate problems or needed revisions is fine, but it's better to fix the problem or implement the revision instead.

### Line length

-   The usual practice is to limit lines to 80 columns, however this is unnecessarily restrictive on modern large screens. Keep lines as short as possible but, for the sake of readability, favour a longer line over a single command spanning multiple lines. If the line is really long it might be better to break it up into multiple shorter lines.


-   When splitting expressions containing operators across multiple lines each new line should begin with the operator symbol.

    ```javascript
    const var x = 1 + 12
              * 100 - 50;
    ```

### White space

-   Use 4 spaces rather than tab characters.

    > If you're using the HISE code editor then this is the default behaviour when you hit the tab key.

-   Remove trailing white space from the ends of lines.

-   Never put a space before a comma.

-   Always put a space after a comma in single line statements.

-   Leave a blank line before if statements, loops, and function declarations.

-   Leave a blank line between blocks.

-   Don't pad blocks with unnecessary blank lines.

    ```javascript
    //Bad 
    inline function doSomething()
    {
      
      Console.print("FooBar");
      
    }

    //Good
    inline function doSomething()
    {  
      Console.print("FooBar");  
    }
    ```

-   Put a space before the open parentheses of control flow statements (if, for, switch, etc.).

    ```javascript
    // Bad
    if(x == 1)

    // Good
    if (x == 1)
    ```

-   Don't add extra spaces inside parentheses, braces, or brackets.

    ```javascript
    // Bad 
    const var fish = [ "Shark", "Gold", "Trout", "Salmon" ];

    // Good
    const var fish = ["Shark", "Gold", "Trout", "Salmon"];
    ```

## Statements

-   Curly braces should use [Allman style](https://en.wikipedia.org/wiki/Indentation_style#Allman_style) indentation.

    ```javascript
    function myFunction()
    {
    }
    ```

-   Omit curly braces for if statements and loops, that only contain one line.

    ```javascript
    // Bad
    if (x == 1)
    {
      doSomething();
    }

    // Good
    if (x == 1)
      doSomething();
    ```

### If

-   In an if-else statement where there is more than one branch, all branches should be formatted the same way.

    > Either all of them use braces, or none of them use braces.

-   Do not write if statements all-on-one-line, unless you have a set of consecutive if statements which are similar, and by aligning them it makes it clear to see the pattern of similarities and differences.

    ```javascript
    if (x == 1) return “one”;
    if (x == 2) return “two”;
    if (x == 3) return “three”
    ```

### Ternary

-   Ternaries should not be nested and should be written on a single line.

    > If it spreads over multiple lines use an `if-else` instead.

-   Avoid unneeded ternary statements.

    ```javascript
    // Bad
    const var foo = a ? false : true;

    // Good
    const var foo = !a;
    ```

### Switch

-   `break` statements should be indented one level greater than their `case` statement, e.g.

    ```javascript
    switch (value)
    {
      case 0:
        doSomething();
        break;
    }
    ```

### Loops

-   Prefer `for ... in` over regular `for` loops.

    > Use `for` loops when you need access to the current iteration, e.g. `i`.

-   Inline functions that contain `for` loops, and will be called by other `for` loops, should have their iterators declared as `local`.

    > This is because by default iterators exists in the global scope, declaring the function's iterator as `local` prevents it conflicting with the global version.

    ```javascript
    for (i = 0; i < 10; i++)
        Console.print(i + getSecondValue());
        
    inline function getSecondValue()
    {
        local i;

        for (i = 10; i < 20; i++)
            return i;
    }
    ```

-   With `for...in` loops use either `x` or the first letter of the object as the variable name.

    > When using nested `for...in` loops use appropriate variable names based on the names of the objects being looped, following the rule above when possible.

    ```javascript
    for (x in modulators)
      return x.get("id");

    // Or
    for (m in modulators)
      return m.get("id");
    ```

## Variables

-   All constant references (components, modules, etc.) should be declared upfront in the `on init` callback before they are used in other parts of the script.

-   If you're declaring and initializing a group of related variables you can wrap them inside an inline function.

    > This improves readibility and makes the root scope cleaner.

    ```javascript
    inline function initPageButtons()
    {
        local p = [];
        for(i = 0; i < 16; i++)
        {
            p.push(Content.getComponent("PageButton" + i));
        }

        return p;
    };
    ```

-   Declare multiple short variables on the same line when they are related. e.g. `reg a = 0, b = 1, c = 2;`.
    > When there are many variables or they have longer names it is better to use a namespace or object.

### Naming

-   Variable names should be written in [camel-case](https://techterms.com/definition/camelcase), e.g. `theCamelsHump`

-   Variable names should be meaningful and will generally be nouns.

    ```javascript
    // Bad
    const var j = "Luke";

    // Good
    const var jedi = "Luke";
    ```

-   It's okay to use single char variables as loop variables/iterators or as arguments to simple functions.

    ```javascript
    function divider(a, b)
    {
      return a / b;
    }
    ```

-   Variable names should not include the type of value the variable contains (aka [Hungarian Notation](https://en.wikipedia.org/wiki/Hungarian_notation)).

    ```javascript
    // Bad
    var boolIsActive = true;

    // Good
    var isActive = true;
    ```

-   Acronyms and initialisms should always be all uppercased or all lowercased.

    ```javascript
    // Bad 
    const var HttpRequests = [];
    const var SmsContainer = {};

    // Good 
    const var HTTPRequests = [];
    const var smsContainer = {};
    ```

-   Global variable names should be prefixed with `g_`.

    ```javascript
    // Bad
    global myVariable = 1;
    global myGlobalVariable = 2;

    // Good 
    global g_myVariable = 1;
    ```

-   There is a Javascript convention of prefixing private variables with an underscore but this should be avoided.

    > This is because there is no such thing as private variables in Javascript or HISE script and indicating that these fully public variables are private could mislead a developer into thinking a change won't affect another part of the program.

    ```javascript
    // Bad
    namespace Clown
    {
        const var _Bozo = "Twister";
        const var _balloonAnimals = ["Cat", "Dingo", "Robert Frost"];
    }
    ```

-   With the exception of global variables, variable names should not include underscores.

### Types

#### var

-   Declare variables as `var` within paint routines, mouse callbacks, regular functions, and custom timer callbacks. 
    > These are the only places you should ever need to use `var`.

#### const var

-   Declare variables as `const var` for all fixed values in the `on init` callback.

-   Always use `const var` for MIDI lists.

#### reg

-   Use `reg` when declaring temporary variables which are accessed in the audio callbacks.

-   `reg` variables should only be used for numbers, booleans, and strings.

-   Don't declare `reg` variables inside inline functions.

#### local

-   Declare variables as `local` within inline functions and callbacks.

#### global

-   Try to avoid using global variables as much as possible.

    > They impact portability, complicate maintenance, obscure program flow, and reduce readability.

-   Global variables should be declared using the `global` keyword rather than as direct properties of the `Globals` object.

    > This is because the HISE editor will highlight the `global` keyword, improving readability.

    ```javascript
    // Bad
    Globals.g_myGlobalVariable = 50;

    // Good
    global g_myGlobalVariable = 50;
    ```

-   For larger projects it's a good idea to declare all global variables in an external script file called `Globals.js` and include it at the top of your interface script.

## Data Types

When working with simple data types (numbers, strings, bools, etc.) you are working directly on the variable's value. With complex data types (arrays, objects) you are working on a reference to the value.

### Numbers

-   Floating point numbers should have at least one digit before and after the dot.

    ```javascript
    // Bad 
    const var foo = .1;
      
    // Good
    const var foo = 0.1;
    ```

-   Hexedecimal numbers should be lowercase, e.g. `0xff45abcd`.

-   Prefer defined constants over hex values when possible.

    > You can use built-in constants, define const vars, or use an enum.

    ```javascript
    // Bad 
    g.fillAll(0xffff0000);

    // Good
    g.fillAll(Colours.red);
    ```

### Strings

-   Use double quotes around string values.

-   Avoid dynamic string manipulations in the audio callbacks.

### Objects and Arrays

-   Never declare objects or arrays inside the audio callbacks.

-   Prefer namespaces to objects when appropriate.

-   Prefer `Array.push()` over direct assignment to an index.

-   Place the opening brace on the same line as the object name.

    ```javascript
    const var myObject = {a: 1, b: 2, c: 3};
    const var myArray = [
      1,
      2,
      3,
      4
    ];
    ```

-   Place a space after the colon between an object's property and its value.

    ```javascript
     const var theFellowship = {
       Wizard: "Gandalf",
       Dwarf: "Gimli",
       Elf: "Legolas",
       Hobbit: "Frodo"
     };
    ```

-   Short declarations can be written on a single line, e.g.

    ```javascript
    const var animals = {dog: "woof", cat: "meow", fox: "?"};
    const var notes = ["a", "a#", "b", "c", "c#", "d", "d#"];
    ```

-   Longer declarations should be spread over multiple lines, e.g.

    ```javascript
    const var dogs = {
      Larry: "Mr White",
      Freddy: "Mr Orange",
      Vic: "Mr Blonde",
      Quentin: "Mr Brown",
      Chris: "Eddie"
    };
    ```

-   For multiline declarations place the closing bracket at the start of a new line.

-   Use dot notation to access properties, e.g. `myObject.property;`

-   When accessing properties using variables or invalid identifiers use brackets `[]`, e.g.
    `myObject["foo-bar"];`

-   Only quote properties that are invalid identifiers, e.g.

    ```javascript
    const var myObject = {
      property1: "value1",
      property2: 123,
      "foo-bar": "Hello World"
    };
    ```

-   Always end object and array definitions with a semi-colon.

-   Do not add a comma after an object's last property/value pair.

-   Prefer MIDI Lists over arrays when possible, especially for storing polyphonic data.

## UI Components

-   Component references will usually be defined as a section of code grouping the reference variable, property assignments, paint routines, mouse callbacks, custom callback functions, and callback assignments, etc. Place a comment containing the name of the component above such sections.

    > If components are defined by themselves in a namespace, init, or factory function then such a comment may not be necessary.

    ```javascript
    // btnEQBypass - EQ bypass toggle button
    const var btnEQBypass = Content.getComponent("btnEQBypass");
    btnEQBypass.set("saveInPreset", false);
    btnEQBypass.set("text", "EQ Bypass");
    btnEQBypass.setControlCallback(onbtnEQBypassControl);

    inline function onbtnEQBypassControl(component, value)
    {
      doSomething();
    }
    ```

-   Always use `const var` for component references.

-   Component references should be prefixed with a lowercase abbreviation of the component type. Since knobs and sliders are both represented by the same component type stick with one abbreviation for all of them regardless of their appearance; either `knb` or `sli`.

    > It's not necessary to use the abbreviation in the name of the component as the component type is shown in the component list, however it can be helpful to do so.

    ```javascript
    // Bad
    const var expression = Content.addKnob("Expression");
    const var expressionKnob = Content.addKnob("Expression");

    // Good
    const var knbExpression = Content.addKnob("Expression");
    const var knbExpression = Content.addKnob("knbExpression");
    ```

-   It is a good idea to store component references in an array when they share a common control callback function or properties.

    > This makes it possible to manipulate multiple components at once using loops.

    ```javascript
    const var knbADSR = [];
    knbADSR[0] = Content.getComponent("knbAttack");
    knbADSR[1] = Content.getComponent("knbRelease");

    for (x in knbADSR)
      x.setControlCallback(onknbADSRControl);
    ```

-   Use HISE's default callback declaration/assignment format when a component requires a custom callback function but a reference to the component is not required elsewhere in the script.

    > This is provided by right-clicking a component in the component list and selecting "Create custom callback definition".

    ```javascript
    // pnlMain - Main content panel
    inline function onpnlMainControl(component, value)
    {
    	//Add your custom logic here...
    };

    Content.getComponent("pnlMain").setControlCallback(onpnlMainControl);
    ```

-   If a component requires a custom callback, and a reference to the component is needed elsewhere in the script, you should store a reference to the component, followed by property assignments, then the assignment of the callback function, and finally declare the callback function. e.g.

    ```javascript
    // pnlMain - Main contents panel
    const var pnlMain = Content.getComponent("pnlMain");
    pnlMain.set("saveInPreset", false);
    pnlMain.setControlCallback(onpnlMainControl);

    inline function onpnlMainControl(component, value)
    {      
    }
    ```

-   Custom callback names should be in the following format: on[*component name*]Control.

    > This follows the default HISE naming convention.

    ```javascript
    inline function onbtnEQBypassControl(component, value)
    {
    }
    ```

-   Single use Paint Routines and Mouse Callbacks should be declared when they are assigned.

    ```javascript
    pnlMain.setPaintRoutine(function(g)
    {
    });
    ```

-   If a Paint Routine or Mouse Callback is to be used by multiple panels they should be declared as `const var` before they are assigned. The functions should be given a meaningful name followed by either `PaintRoutine` or `MouseCallback` as appropriate.

    ```javascript
    const var tabbarPaintRoutine = function(g)
    {
      g.fillAll(Colours.red);
    }

    pnlTab1.setPaintRoutine(tabbarPaintRoutine);
    pnlTab2.setPaintRoutine(tabbarPaintRoutine);
    ```

-   Other than in the main interface script it is often better to declare UI components and their properties in code rather than using the interface designer.

    > This makes the script more shareable with other people and projects as both the UI layout and logic will be contained within a single file.

    ```javascript
    // Bad
    const var btnPresetBrowser = Content.getComponent("btnPresetBrowser");

    // Good
    const var btnPresetBrowser = Content.addButton("btnPresetBrowser", 0, 10);
    ```

## Operators

-   When mixing operators, enclose them in parentheses. The only exception is the `+` and `-` operators since their precedence is broadly understood.

    > This improves readability and clarifies the developer’s intention.

    ```javascript
    // Bad
    const var bar = a + b / c * d;

    // Good
    const bar = a + (b / c) * d;
    ```

-   Always put a space before and after operators.

    ```javascript
    // Bad
    const var x = 1+y - 2*(z / 3);

    // Good
    const var x = 1 + y - 2 * (z / 3);
    ```

## Functions

-   Function names should concisely explain what the function does.

    ```javascript
    function addNumbers(a, b)
    {
      return a + b;
    }
    ```

-   Function names should be in [camel-case](https://techterms.com/definition/camelcase).

-   Aim to have each function perform a single task.

-   Favour inline functions whenever possible.

-   Function arguments should be passed individually rather than as a single object. 

-   Never put an else statement after a return.

    ```javascript
    // Bad
    if (x == 1)
      return "foo";
    else
      myFunction();

    // Good
    if (x == 1)
      return "foo";

    myFunction();
    ```

-   Don't reassign parameters. Create a local copy inside the function instead.

-   Don't call regular functions from the audio callbacks, use inline functions instead.

-   With the exception of getters/setters, functions should never be written on a single line.

## Namespaces

-   There is no performance penalty for using namespaces.

-   Namespaces should be written in [Pascal case](https://techterms.com/definition/pascalcase).

-   If the namespace resides in a dedicated external file the file should have the same name as the namespace, e.g. `PageHandler.js`.

-   Namespaces cannot be nested.

-   `var` variables cannot be declared inside a namespace.

-   Each namespace can contain up to 32 `reg` variables

## Enumeration

-   Don't use "magic numbers" to refer to module parameters. Use the pre-defined enums listed in the module browser.

-   For custom attributes you can leverage namespaces to create your own enums. Enum variables should always be `const var` and written in [Pascal case](https://techterms.com/definition/pascalcase).

    ```javascript
      namespace Articulations
      {
        const var Sustain = 0;
        const var Staccato = 1;
        const var Spiccato = 2;
        const var FastAttack = 3;
      }
    ```

## Custom HISE Additions

-   If your project makes use of custom additions to the HISE codebase these should be clearly indicated with a comment when they are referenced. If possible the comment should provide a link to a public git repository along with a commit hash of the addition in question. If the project can function without the additional feature this should also be noted in the comment and if possible the feature should be placed in a separate script to ease decoupling.
