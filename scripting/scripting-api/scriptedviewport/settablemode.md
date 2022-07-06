Calling this function will turn this Viewport into a table with multiple columns and dynamic row data. The function expects a JSON object as single argument which contains some metadata properties that define the appearance and behaviour of the table.

| Property | Type | Description |
| --- | - | --------- |
| MultiColumnMode | bool | If enabled, the table will treat each column as individual data entity (eg. if you're creating a browser that displays multiple files in a row). This will cause repaints whenever you hover over cells. |
| HeaderHeight | int | The height of the column header. If this is 0, it will be hidden. |
| RowHeight | int | the height of each row. |
| MultiSelection | bool | if enabled, this allows selection of multiple rows at once. |
| ScrollOnDrag | bool | if enabled, dragging the mouse will scroll the viewport (like on a web browser). If disabled, you'll need to use the scrollbars. |

This function needs to be called before any other function related to tables. Also be aware that calling this function is only possible during the onInit callback.
