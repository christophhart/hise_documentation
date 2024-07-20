---
keywords: ScriptMultipageDialog
summary:  The API class to build custom dialogs
author:   Christoph Hart
modified: 24.06.2024
---
  
This is the scripting reference object to a [Multipage Dialog](/ui-components/plugin-components/multipagedialog) UI component and can be used to programmatically build complex dialogs or load prebuilt dialogs made with the multipagecreator tool. The workflow of using this class is somewhat similar to the [Builder](/scripting/scripting-api/builder) class: 
1. Create an instance / reference to the multipage dialog
2. Add pages / elements using [add()](/scripting/scripting-api/scriptmultipagedialog#add) or [addPage()](/scripting/scripting-api/scriptmultipagedialog#addpage) which returns an integer index so that you can reference the element later
3. Modify the elements using the supplied index with [setElementProperty()](/scripting/scripting-api/scriptmultipagedialog#setelementproperty) or [setElementValue()](/scripting/scripting-api/scriptmultipagedialog#setelementvalue)
4. Attach callbacks to "global events" using [setOnFinishCallback()](/scripting/scripting-api/scriptmultipagedialog#setonfinishcallback) or [setOnPageLoad()](/scripting/scripting-api/scriptmultipagedialog#setonpageloadcallback) or specific components using [bindCallback()](/scripting/scripting-api/scriptmultipagedialog#bindcallback)
5. "Flush" the changes and show the dialog using [show()](/scripting/scripting-api/scriptmultipagedialog#show)

> Note that the state of the dialog is not persistent across compilations so you need to rebuild the dialog everytime you compile. If you want to reset the dialog after the onInit callback, you can use the [resetDialog()](/scripting/scripting-api/scriptmultipagedialog#resetdialog) method which will clear all the pages and internal states.

### Hello world example

This code snippet will create a multipage dialog and shows how to use the API to build up a dialog that you can attach HiseScript callbacks to:

```javascript
// Create a multipage dialog component
const var mp = Content.addMultipageDialog("mp", 0, 0);

// the text property is used as title
mp.set("text", "Hello Dialog!");

// I swear this is the "last" time I'll do this...
mp.set("Font", "Comic Sans MS");

// The width / height properties will define what
// area is masked by the dialog
mp.set("height", 600);

// The actual dialog size is set by those properties
mp.set("DialogWidth", 550);
mp.set("DialogHeight", 500);

// Add two pages
const var firstPage = mp.addPage();
const var secondPage = mp.addPage();

// Add a markdown text
mp.add(firstPage, mp.types.MarkdownText, { Text: "This is some markdown  \n> Noice!" });

// This function will be called when you click the button defined below...
inline function hiseCallback(id, value, state)
{
	Console.print("ID: " + id + ", value: " + value);
}

// Add a button to the second page
mp.add(secondPage, mp.types.Button, 
{ 
   ID: "MyButton", 
   Text: "Click me", 
   // You can bind HiseScript callbacks to react on
   // button clicks like this:
   Code: mp.bindCallback("hiseCallback", hiseCallback)
});

// Show the dialog
mp.show(true);
```
