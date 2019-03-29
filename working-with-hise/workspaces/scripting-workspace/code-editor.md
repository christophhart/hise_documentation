---
keywords: The Code editor
summary:  A overview of the callback system that powers the HISE scripting engine
index: 01
---

![Code Editor](images/custom/code-editor.png)

The editor is a standard code text editor with Javascript syntax highlighting. In the top row you can connect the Code Editor to different ScriptProcessors and access their callbacks.

It features a few specials to smooth your scripting experience.  

* An **Autocomplete Popup** which contains all referenced variables and available API calls. Simply press `Escape` to open (and close) the popup and select the desired item using either the arrow keys + `Enter` or by clicking on it. If you put a `.` behind an API- or referenced object and then open the Autocomplete Popup, it will filter down to all applicable functions.

* You also have access to **Breakpoints**. Click left of the line numbers to set a breakpoint to the desired line. The breakpoint will get hit when the code line is activated in the script. With this you can check if some signal actually reaches the designated line. 

* A **REPL** Shell on the bottom of the Editor to quickly evaluate snippets. 

There are also some helpful shortcuts which will speed up your development workflow.

| Shortcut | Action |
| -------- | ------ |
| `Escape` | Open Autocomplete Popup |
| `Tab / Shift+Tab` | Increase / Decrease intendation of selection |
| `F5` | Compile script |
| `Shift+Enter` | Put a semicolon at the end of line + jump to new line |
| `Select+d` | Select multiple occurences of the selection. `ESC` to quit. |  

## Console

![Console](images/scripting/console.png)

The Console is your feedback-system when it comes to scripting. It will show you if everything worked out, but also when it did'nt. If there is something wrong with the script it will print an error-message and show a stack-trace of the error. (You can double-click on the red error message to directly jump to the erroneous line). A right-click on the console gives you a little context menu with the possibility to clear the console.

You can also find the console in the Right Hand Panel of the Main Workingspace for direct work in a single ScriptProcessor.

All [Console API](#The-Console-Object) calls print directly to the Console. The most important being the `Console.print()` command, which comes in handy if you want to check the expected values of your scripting. 

```javascript
Console.print()
```

## ScriptWatchTable

But the Console is not the only way in **HISE** to observe what is going on in the scripts. On the right side of the **Code Editor** you can find the **ScriptWatchTable**. It shows an overview of every referenced or activated script item, with their:

`Type` 

![var](images/scripting/var.png) **var** - variables, functions and objects
![const](images/scripting/const.png) **const** - constant variables
![reg](images/scripting/reg.png) **reg** - registered variables 
![globals](images/scripting/globals.png) **Globals.x** - global variables
![namespace](images/scripting/namespace.png) **namespace** - namespace wrapper 
![inline](images/scripting/inline.png) **inline function** - scoped functions 


The `Name` of the declared variable,
the live-updated `Value` of the variable, 
and their respective [`Data Type`](scripting.html#Data-Types).

You can **right-click** on objects, arrays and referenced modules to show their contents in a handy popup.  

