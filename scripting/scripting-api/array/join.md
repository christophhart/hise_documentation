This method is useful when you want to change the item list of some UI controls, for example a [Combobox](/ui-components/combobox).

```!!javascript
const var list = ["item1", "item2", "item3"];     // Creates a list of all available samplemaps
const var box = Content.addComboBox("box", 0, 0); // Creates a combobox
box.set("items", list.join("\n"));                // sets the list as items
```

The opposite of this method is [String.split()](/scripting/scripting-api/string#split)