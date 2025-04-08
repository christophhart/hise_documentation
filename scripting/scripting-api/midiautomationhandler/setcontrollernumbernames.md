This can be used to modify the appearance of the context menu. By default it displays the controller types as `"CC #2"`, but if you don't like that, you can customize the strings used for the popup menu as well as the text "Add XXX" / "Remove XXX" for the ultimate UX customization!

`ccName` must be a string and `ccNames` an array with strings. Note that the length of `ccNames` must be either 127 or the exact length of the array you passed into [MidiAutomationHandler.setControllerNumbersInPopup()](/scripting/scripting-api/midiautomationhandler#setcontrollernumbersinpopup)

```javascript
mh.setControllerNumbersInPopup([1, 2, 7]);
mh.setControllerNumberNames("Funky Controller!!!", ["Modwheel", "Breath Controller", "Volume"]);
```

The context menu will then look like this:

![](/images/custom/setcontrollernumbers.png)