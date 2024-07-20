This method will take a string and parse it as [CSS ](/glossary/css) code that will be applied to whatever component is registered to this LookAndFeel object.

```javascript
const var b1 = Content.addButton("b1", 0, 0);
const var laf = Content.createLocalLookAndFeel();

b1.setLocalLookAndFeel(laf);

/** Set the inline style sheet that just colours the button. */
laf.setInlineStyleSheet("button{
	background-color: red;
}");
```

This method is for quick and dirty use cases, for more complex style sheets it's recommended to use [setStyleSheet](/scripting/scripting-api/scriptlookandfeel#setstylesheet) with a file reference so you can edit the CSS in a specific code editor tab with proper CSS syntax highlighting & autocomplete.