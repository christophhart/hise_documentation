---
keywords: Code snippet templates
summary:  Use code snippet templates in the script editor
author:   Christoph Hart
modified: 10.09.2024
---
  
This is a new feature of HISE 4.0.1 and gives you the ability to quickly insert commonly used code snippets. There are a few predefined snippets but you can also write your own definitions that suit your workflow / coding style using an easy JSON formatted list.

## How to use the code snippets

Code snippets will show up in the autocomplete popup next to all other available items and when you select it, it will paste in the code and preselect the region selections defined by the snippet so you can quickly enter the values by cycling through the selection using the tab button.

In order to check out the feature, just type in `inlin`, then select the `inline3 (...)` template and press enter. It will create this code for you:

```javascript
inline function functionName(args1, args2, args3)
{
	// body
};
```

This particular template is setup so that it highlights the function name and the three argument IDs (just like the normal API method items will highlight the parameters). Enter the function name, press `TAB`, then the first argument, then `TAB` again, etc.

Another nice workflow of using templates is to select multiple occurences of the same variable name to customize more complex templates. As an example to this, check out the `for (...)` template. If you select it, it will paste in this code:

```javascript
for(LOOP_VAR = 0; LOOP_VAR < 10; LOOP_VAR++)
{
	// loop body
}
```

and preselect all `LOOP_VAR` occurrences (as well as the `// loop body` comment). Now if you press `Ctrl+D` two times it will select all `LOOP_VAR` occurrences so you can replace it with something else (maybe `i`?) . As last step cycle through the selections until you selected the loop body and type away the code that belongs in that loop.

## How to write your own code snippets

Using the factory snippets that come with HISE are only 50% of the awesomeness of this new feature so let's take a look at how to define your own snippets. HISE will dynamically load two JSON files from its app data directory:

1. `hiseCodeSnippets.json` - contain the factory snippets. This file is overriden each time that the autocomplete menu is being built so **DO NOT MAKE ANY CHANGES HERE!**.
2. `userCodeSnippets.json` - is the list of "persistent" snippets defined by the user that you can use for your own snippets.

So in order to add your snippets, load and edit the `userCodeSnippets.json` file in a text editor, then save and rebuild the autocomplete menu. If you misspell anything or make a JSON formatting error, it will print out the error in the Console.

> The most robust way of triggering a autocomplete rebuild is to click on the **Goto Workspace** button in the Module Tree as this will rebuild the editor window.

### JSON Format

The JSON file is a list of objects that define a single template item. Each template item needs to define these properties:

| Property | Type | Description |
| === | == | ========= |
| `name` | String | The name as it will appear in the autocomplete list. Good practice is to append ` (...)` to it so you know that this is a snippet. |
| `code` | String | The code that will be inserted into the code editor when you press enter. See below for further details. |
| `priority` | int | a number that lets you move the template to the top (big number) or to the bottom (small number) of the list. |
| `language` | String | A language ID that will be used by HISE to determine whether to use that item in the particular context (so you can filter templates by the language of the editor). Must be one of the predefined items: `"HiseScript"`, `"SNEX"`, `"GLSL"` or `"Faust"`.  Omit this property (or use an empty string to use the template in all contexts). |
| `description` | String | A markdown formatted string that will show up as explanation when you select the item in the autocomplete list. |

### Code format

Now for the `code` property that defines what will be inserted into the code editor there are a few rules:

#### Use escaped strings so that everything goes into one line

If you want to paste in complex snippets, use the escape character for special characters (whitespaces and quotes). Eg. this snippet:

```javascript
function()
{
	something("MyValue");
};
```
would be

```javascript
{
  "code": "function()\n{\n\tsomething(\"MyValue\");\n};\n"	
}
```

#### Use the `$` character to define preselected regions

In order to make the most out of your snippets, you will need to define regions that the code editor will preselect after the insertion. In order to do so, just use the `$` character to define the start and end of the preselected region.

```javascript
function myFunction($args1$, $args2$)
                     -----    -----
```

When parsing the template, HISE will then remove the `$` parser and create the selection regions.

> Obviously this means that there must be an even number of `$` characters in the code string.





