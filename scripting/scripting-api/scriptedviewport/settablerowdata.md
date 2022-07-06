If you have setup this Viewport as a table, you can use this method in order to populate the rows of the table.

The argument must be a list of JSON objects, which must define a value for every column ID:

- Button columns must be true or false
- Slider columns must be a number
- Text columns must be a string

> The data you pass in will not be copied, so if you modify the data, it will update the table content.

Also dragging the slider or clicking the button in a column will update the values in this object (so you don't have to do this manually in the table callback).
