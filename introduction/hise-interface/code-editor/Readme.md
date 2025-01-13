---
keywords: The Code editor
summary:  A overview of the callback system that powers the HISE scripting engine
index: 03
---

![Code Editor](images/custom/code-editor.png)

The Code Editor features three elements. A basic [Script Editor](/working-with-hise/workspaces/scripting-workspace/code-editor#script-editor) with HISE/Javascript syntax highlighting, the [Console](/working-with-hise/workspaces/scripting-workspace/code-editor#console) for getting feedback, and the [ScriptWatchTable](/working-with-hise/workspaces/scripting-workspace/code-editor#scriptwatchtable) with which you can observe the referenced variables of the connected ScriptProcessor.

## Script Editor

The Script Editor it the central place to edit [Scripts](/scripting) inside HISE. You can add [Audio Modules](/hise-modules) with scripting capabilities (Indicated by the name "Script" like in: **Script Processor**, **Script Voice Start Modulator** or **Polyphonic Script FX**) all over the [Module Tree](/introduction/hise-interface/left-panel/module-tree) and they'll get executed in place. In this way you can create parts of your plugin in a modular and encapsulated manner. 

Right next to each of these script modules you can find a **Open in Code Editor** icon with which you can connect the Script Module to the Code Editor, and display its content (Like the one next to the main **Interface** Processor in the Master MIDI Chain). In the left drop-down menu on top of the Code Editor you can see to which Script Processor the Editor is currenly connected.

### Callback drop-down

Next to the Connection drop-down you can find the **Callback drop-down menu**. It lets you select the callbacks that are part of the current script. The `onInit` callback is the main callback that gets executed everytime you hit Compile [F5]. Learn more about the other callbacks types in: [Scripting Callbacks](/hise-modules/midi-processors/list/scriptprocessor#callbacks).

Behind the scenes these callbacks are part of the same `.js` file. You can take a look at the file(s) in your project folder at `Scripts > ScriptPocessors > save >`. They will appear after you saved your project for the first time. 


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
