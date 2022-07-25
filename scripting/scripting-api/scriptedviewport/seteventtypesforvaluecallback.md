If you want the table to store the current selection in its value slot (for saving & restoring), you can supply a list of event types that trigger a call to `setValue()`. The parameter must be a array of strings from this list:

```
["Selection", "SingleClick", "DoubleClick", "ReturnKey" ]
```

The value that is stored is either the row index (starting with 0) or if you're in multi-column mode, an array with the data `[columnIndex, rowIndex]` (again, zero-based).

> Be aware that using this method will also make the table use the undo manager if the `useUndoManager` flag is set.

Note that if you have assigned a callback to the table with [`setTableCallback`](/scripting/scripting-api/scriptedviewport#settablecallback), the JSON object of the callback will have set the type to `SetValue` or `Undo` if you call `setValue()` or `Engine.undo()`, so you should handle those cases gracefully in your callback too.