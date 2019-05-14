---
keywords: The Code editor
summary:  A overview of the callback system that powers the HISE scripting engine
index: 01
---

![Code Editor](images/custom/code-editor.png)

The Code Editor features three elements. A basic [Script Editor](/working-with-hise/workspaces/scripting-workspace/code-editor#script-editor) with HISE/Javascript syntax highlighting, the [Console](/working-with-hise/workspaces/scripting-workspace/code-editor#console) for getting feedback, and the [ScriptWatchTable](/working-with-hise/workspaces/scripting-workspace/code-editor#scriptwatchtable) with which you can observe the referenced variables of the connected ScriptProcessor.

## Script Editor

In the top row you can connect the [Code Editor](/ui-components/floating-tiles/hise/scripteditor) to any created [Scripting Modules](/scripting/scripting-in-hise/scripting-modules) and switch to its different callbacks.

It features a few specials to smooth your scripting experience.  

##### Autocomplete Popup [ESC]
![autocomplete](images/custom/autocomplete.png)
The **Autocomplete Popup** contains all referenced variables and available API calls. Press `Escape` while typing, to open (and close) the popup and select the desired item using either the arrow keys + `Enter` or by clicking on it. If you start typing the desired API-class or referenced object and open the Autocomplete Popup, it will filter down to all applicable objects and functions.

##### Breakpoints
![breakpoint](images/custom/breakpoint.png)
You have access to **Breakpoints**, too. **Ctrl-Click** left of the line numbers to set a breakpoint to the desired line. The breakpoint will get hit when the code line is activated in the script. It will print its feedback to the Console. With this you can check if the script actually reached the designated line and was evaluated. Delete the breakpoint with **Ctrl-clicking** on it again.  

##### REPL
![repl](images/custom/repl.png)
A **Read–eval–print loop** shell on the bottom of the Editor to quickly evaluate code. 

##### Shortcuts
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

You can also find the console in the Right Hand Panel of the Main Workingspace if you work with a  ScriptProcessor in the Module Panel.

All [Console API](/scripting/scripting-api/console) calls print directly to the Console. The most important being the `Console.print()` command, which comes in handy if you want to check the expected values of your scripting. 

```!javascript
const var x = ["Hello ", "World!"];
Console.print(x[0] + x[1]);
```

## ScriptWatchTable
![scriptwatchtable](images/custom/scriptwatchtable.png)
The Console is not the only way in **HISE** to observe what is going on with your script variables. On the right hand side of the **Code Editor** you can find the **ScriptWatchTable** which shows an overview of all referenced script variables and objects in the ScriptProcessor with their **live** values.

In the top you can find a searchbar with a fuzzy search to filter down the variables. If you **double-click** on an item, it will automatically jump to its definition in the Script Editor.

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
