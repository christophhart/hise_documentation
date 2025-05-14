---
keywords: The Code editor
summary:  A overview of the callback system that powers the HISE scripting engine
index: 03
---

![Code Editor](images/custom/code-editor.png)

The Code Editor features three main elements. 
- A basic [Script Editor](/working-with-hise/hise-interface/code-editor#script-editor) with HISE/Javascript syntax highlighting, 
- the [Console](/working-with-hise/hise-interface/code-editor#console) for getting feedback, and the 
- [ScriptWatchTable](/working-with-hise/hise-interface/code-editor#scriptwatchtable) with which you can observe the referenced variables of the connected ScriptProcessor.

## Script Editor

The Script Editor it the central place to edit [Scripts](/scripting) inside HISE. 

The scripts live in the [Module Tree](/hise-modules) in their respective "Script" Modules (like [MIDI: Script Processor](/hise-modules/midi-processors/list/scriptprocessor), [Script Envelope Modulator](/hise-modules/modulators/envelopes/list/scriptenvelopemodulator) or [Script FX](/hise-modules/effects/list/scriptfx)) and can be connected and shown in the **Script Editor** with the little **Open in Code Editor** icon displayed on the module in the Module Tree.

On top of the Script Editor you can see two little drop-down menus. 
- The first shows to which Script Module the Editor is connected to. It can also serve as a shortcut to switch between different script modules. 
- The second drop-down shows the current callback of the script and lists the included (external) files.

The **Callback drop-down** let you select the callbacks that are part of the current script. The `onInit` callback is the main callback that gets executed everytime you hit Compile [F5]. Learn more about the other callbacks types in: [Scripting Callbacks](/hise-modules/midi-processors/list/scriptprocessor#callbacks).

Behind the scenes these callbacks are part of the same `.js` file. You can take a look at the file(s) in your project folder at `Scripts > ScriptPocessors > {your xml save name} >`. They will appear after you saved your project for the first time. 


### REPL
![repl](images/custom/repl.png)
On the bottom of the Code Editor you can see a **Read–eval–print loop** [REPL] to quickly evaluate code. It will display error messages if there should be something wrong with your script, and show a little red icon to directly jump to the error. On the right side you can find a **Compile** Button to compiles the script [F5]. 

### Autocomplete Popup [ESC]
![autocomplete](images/custom/autocomplete.png)
The **Autocomplete Popup** shows all referenced variables and available API calls. Press `Escape` while typing, to open (and close) the popup and select the desired item using either the arrow keys + `Enter` or by clicking on it. If you start typing the desired API-class or referenced object and open the Autocomplete Popup, it will filter down to all applicable objects and functions.

### Code Snippets
There is a way to insert commonly used and user defined code snippets inside the Code Editor. 
Just start typing `for` in the Code Editor and accept the yellow colored `for(...)` with `Enter` to create a for-loop template. You can select all templated variables inside the code snippet with Ctrl-D and bulk change them. Learn more about the [Code Snippet Templates](/glossary/code_snippets) and how to customize them to your needs. 


### Breakpoints
![breakpoint](images/custom/breakpoint.png)
You have access to **Breakpoints** in the Code Editor, too. **Click** left of the individual line numbers to set a breakpoint to the desired line. The breakpoint will get hit when the code line is activated in the script. It will print its feedback to the Console. With this you can check if the script actually reached the designated line and was evaluated. Step through the execution with the `Resume` Button in the REPL and delete the breakpoint with **clicking** on it again.  


### Shortcuts
| Shortcut | Action |
| -- | ------ |
| `F5` | Compile script |
| `Escape` | Open and close Autocomplete Popup |
| `Tab / Shift+Tab` | Increase / Decrease intendation of selection |
| `Shift+Enter` | Put a semicolon at the end of line + jump to new line |
| `Ctrl+d` | Select multiple occurences of the selection. `ESC` to quit. |  


## Console
![Console](images/custom/console.png)
The Console is your feedback-system when it comes to scripting. It will show you if everything worked out, but also when it did'nt. If there is something wrong with the script it will print an error-message and show a stack-trace of the error. (You can double-click on the red error message to directly jump to the erroneous line). A right-click on the console gives you a little context menu with the possibility to clear the console.

All [Console API](/scripting/scripting-api/console) calls print directly to the Console. The most important being the `Console.print()` command, which comes in handy if you want to check the expected values of your scripting. 

```javascript
const var x = ["Hello ", "World!"];
Console.print(x[0] + x[1]); // Hello World!

Console.print(trace(x)); // ["Hello ", "World!"]

```

## ScriptWatchTable
![scriptwatchtable](images/custom/scriptwatchtable.png)
The Console is not the only way in **HISE** to observe what is going on with your script variables. On the right hand side of the **Code Editor** you can find the **ScriptWatchTable** which shows an overview of all referenced script variables and objects in the ScriptProcessor with their **live** values.

In the top you can find a searchbar to filter down the variables. If you **double-click** an item, it will automatically jump to its definition in the Script Editor.

If you have defined a reference to a [HISE Modules](/hise-modules) with a variable you can even **right-click** on the item to open a popup that shows the module directly in the **ScriptWatchTable**. This can also be used to show the content of arrays and (JSON) objects.

### Types 
| Type | Name |
| - | ------ |
| ![var](images/custom/var.png)  | [var](/scripting/scripting-in-hise/javascript#variables) - variables, functions and objects |
| ![const](images/custom/const.png) | [const](/scripting/scripting-in-hise/additions-in-hise#const-variables) - constant variables |
| ![reg](images/custom/reg.png) | [reg](/scripting/scripting-in-hise/additions-in-hise#reg-variables) - registered variables |
| ![globals](images/custom/globals.png) | [Globals.x](/scripting/scripting-in-hise/additions-in-hise#globals.x-variables) - global variables |
| ![namespace](images/custom/namespace.png) | [Namespaces](/scripting/scripting-in-hise/additions-in-hise#namespaces) - namespace wrapper  |
| ![inline](images/custom/inline.png) | [inline functions](/scripting/scripting-in-hise/additions-in-hise#inline-functions) - scoped functions |


## # define

## .profile


