If you want the broadcaster to listen to a list of buttons that are grouped into a exclusive radio group, you can use this method. The `radioGroupIndex` must be the integer value that you've assigned as `radioGroup` property to the buttons.

It will automatically scan all components and find the ones that are using this group index and then send out a message to all listeners when one of the buttons is clicked.

In order for this to work, the Broadcaster needs to have a single argument defined as `args` property which will contain the index of the clicked button. 

```javascript
const var bc = Engine.createBroadcaster({
	"id": "My Radio Watcher",
	"colour": -1,
	"args": ["buttonIndex"]
});
```

Be aware that this index is using the same order as the component list shows.

> Also this attached mode is the only mode that is using a "bidirectional" communication. This means that if you send a broadcaster message using `sendMessage()` or the assignment operator, it will also change the currently active button in the radio group.

### Example: Page Handling

One of the most practical use cases for this function is the page handling logic which will show and hide panels when you click on the corresponding buttons

![](/images/custom/broadcaster/attachtoradiogroup.png)

Please note how the entire logic and functionality is represented in the broadcaster map from the state of the buttons to the `visible` property of the panels.

```javascript
const var bc = Engine.createBroadcaster({
	"id": "My Page Handler",
	"colour": -1,
	"comment": "This broadcaster will handle the page logic",
	"args": ["pageIndex"]
});

// Just a dummy function that 
inline function addRadioButton(i)
{
	local b = Content.addButton("RadioButton " + (i+1), 0, i * 30);
	b.set("radioGroup", 90);
	b.set("saveInPreset", false);
	
	local p = Content.addPanel("Page" + (i+1), 150 + i* 100, 0);
	p.set("visible", false);
	return p;
}

// This array will hold 4 panels
const var Pages = [];

// Create 4 radio buttons and 4 panels
for(i = 0; i < 4; i++)
	Pages.push(addRadioButton(i));

bc.attachToRadioGroup(90, "Button Group");

const var PageList = []; //

bc.addComponentPropertyListener(Pages, "visible", "Show Panels", function(indexInList, buttonIndex)
{
	return indexInList == buttonIndex;
});

// Show the first page
bc.pageIndex = 0;
```