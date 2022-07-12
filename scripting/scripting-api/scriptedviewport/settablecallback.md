You can assign a callback that will be executed whenever there is an user interaction with the table:

- selection changes (using keyboard or mouse clicks)
- click / double click on cells
- deleting a row (pressing delete when one or multiple rows are selected)
- slider drag 
- button click

The parameter you pass in must be a function with a single parameter, which will hold a JSON object with the callback data. It will have these properties:

| Property | Type | Description |
| --- | -- | -------- |
| Type | String | A string indicating the callback type. This can be one of these values: `"Slider"`, `"Button"`, `"Selection"`, `"Click"`, `"DoubleClick"`, `"ReturnKey"`, `"DeleteRow"` |
| rowIndex | int | the (zero-based) row index |
| columnID | String | the ID of the column as defined with the setColumnData function. |
| value | number or object | Depending on the callback type, this is either the value of the UI element (slider or button) or the entire row data for the other event types. |

