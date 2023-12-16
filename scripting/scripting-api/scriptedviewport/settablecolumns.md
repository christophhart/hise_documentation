This method can be used to define the column layout of the table. It expects a single argument with a list of JSON objects for every column you want to add to your table. This function must be called after setting the table metadata and before populating the table with row data.

| Property | Type | Description |
| --- | - | --------- |
| ID | String | A unique ID for each column. |
| Type | String | Defines the UI element for the given column. This can be either `"Text"`, `"Button"`, `"Slider"` or `"ComboBox"`. |
| Label | String | A string that is used for the column header. If this is undefined, the ID property will be used instead. |
| Focus | bool | If MultiColumnMode is enabled, this will control whether a left / right key press will focus this cell. Set to false if you want to skip that column (default is true). |
| Visible | bool | By default all columns are visible, but you can hide a column in order to use the ID as hidden metadata. |
| MinWidth | int | the minimum size of the column. |
| MaxWidth | int | the maximum width of the column. -1 for auto-fit |
| Width | int | the standard width of the column. If undefined, it will use the minimum width. |

#### Sliders

If the column should be a slider you will have these additional properties:

| Property | Type | Description |
| --- | - | --------- |
| MinValue | double | the minimum value. |
| MaxValue | double | the maximum value. |
| SkewFactor | double | the skew factor. |
| StepSize | double | the step size. |

> You can override the default look and feel of the slider with the "drawLinearSlider" method.

#### Buttons

If the column should display a button, you can use these additional properties:

| Property | Type | Description |
| --- | - | --------- |
| Toggle | bool | whether the button is momentary or has a toggle state. |
| Text | String | The text to show on the display. |

> You can override the default look and feel of the button with the "drawToggleButton" method.

#### Comboboxes

If the columns should display a Combobox, you can use these additional properties:

| Property | Type | Description |
| --- | - | --------- |
| items | Array | The list of items you want to show |
| ValueMode | String | defines how the value is supposed to be interpreted. |
| Value | var | defines the default value of the combobox. The format of the value is defined by the ValueMode property |
| Text | String | The text to show when nothing is selected. |

The `ValueMode` property defines how the value is supposed to be interpreted. There are three options:

- "ID" uses a one-based integer (so the first value is 1). This is how the combobox in HISE works and is the default
- "Index" uses a zero-based integer (so the first value is 0). 
- "Text" expects a string as value and searches the items to set it to the respective entry

The properties `Value` and `items` are dynamic, which means that you can pass in a JSON object into setTableRowData() to define different item lists for different rows:

```javascript
const var ModTable = Content.getComponent("Viewport1");

ModTable.setTableMode({
	"MultiColumnMode": false,
	"HeaderHeight": 32,
	"RowHeight": 32,
	"ScrollOnDrag": false
});

ModTable.setTableRowData([
{
	"Source": "Source",
	"Mode": 
	{
		"items": ["Yes", "No", "Maybe"],
		"Value": "No"
	}
},
{
	"Source": "Other Source",
	"Mode": 
	{
		"items": ["Some other item", "Second"],
		"Value": "Second"
	}
}]);

ModTable.setTableColumns([
{
	"ID": "Source",
	"Type": "Text",
	"MinWidth": 150
},
{
	"ID": "Mode",
	"Type": "ComboBox",
	"MinWidth": 80,
	"Toggle": true,
	"Text": "Default",
	"ValueMode": "Text"
}
]);
```


> You can override the default look and feel of the combobox with the "drawComboBox" method.