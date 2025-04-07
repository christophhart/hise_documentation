Calling this function will turn this Viewport into a table with multiple columns and dynamic row data. The function expects a JSON object as single argument which contains some metadata properties that define the appearance and behaviour of the table.

| Property | Type | Description |
| --- | - | --------- |
| MultiColumnMode | bool | If enabled, the table will treat each column as individual data entity (see above for a detailed explanation of this mode). |
| HeaderHeight | int | The height of the column header. If this is 0, it will be hidden. |
| RowHeight | int | the height of each row. |
| Sortable | bool | If this is set, then clicking on the column header will set it to be the sort column, and clicking again will reverse the order. . |
| MultiSelection | bool | if enabled, this allows selection of multiple rows at once. |
| ScrollOnDrag | bool | if enabled, dragging the mouse will scroll the viewport (like on a web browser). If disabled, you'll need to use the scrollbars. |
| SliderRangeIdSet | String | if you're using sliders in a cell, you can define which ID set is used to fetch the range limits. This is useful if you're displaying JSON data with a fixed format (eg. the output of [`Midiautomationhandler.getAutomationDataObject()`](/scripting/scripting-api/midiautomationhandler#getautomationdataobject)). The possible values are `"scriptnode"`, `"ScriptComponent"`, `"MidiAutomation"` and `"MidiAutomationFull"` (check the console output for a list of range ids that is used when you call this method with this property). |
| CallbackOnSliderDrag | bool | This controls whether the sliders in the table will send a update while dragging or just when you lift the mouse button. In some cases, you will need to skip the updates while dragging because it will spawn a heavyweight operation that you only want to perform once (eg. when setting the automation data from the JSON object). |


This function needs to be called before any other function related to tables. Also be aware that calling this function is only possible during the onInit callback.

### Multi-column mode

If you set the `MultiColumnMode` property to true, it will cause repaints whenever you hover over cells. This can be useful if you want to arrange your data in a 2D space (eg. if you're creating a browser that displays multiple files in a row). You can also use `setValue()` with a `[columnIndex, rowIndex]` array to set the active cell programatically (and if the viewport has the `saveInPreset` flag, it will cause a callback when you load user presets). 

In this mode, the viewport will also support horizontal navigation with the left-right arrow keys and it will fire the table callback whenever a cell has changed.

> Please be aware that the default appearance will still highlight the entire row, so you need to customize the `drawTableCell` function with a LAF object. In this callback, the `selected` property will stil be true for the entire row, but you can use the `clicked` and `hover` property to figure out which cell is active / hovered.

