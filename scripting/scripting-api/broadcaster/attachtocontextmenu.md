This function can be used to attach the broadcaster to any component and show a context menu when the user clicks on it with the right button (or double-tap on the trackpad / Ctrl+Click on macOS). It expects these 4 parameters:

1. a single component or list of components (either a String with the component ID or existing script references)
2. An array with Strings containing the popup menu items with a pseudo markdown syntax and the `{DYNAMIC}` wildcard to create dynamic item texts
3. A state function that expects two arguments (`type`, `index`) and allows changing the active state / disable items or use dynamic text values. The first argument is always one of three strings (`text`, `enabled` or `active` and indicates which state it wants to know). Be aware that this function is called synchronously on the UI thread for every item so keep it simple.
4. Optional metadata (either JSON or String).

> This function does not override any existing behaviour for right clicks, so you might want to eg. disable MIDI learn for components that you attach to this broadcaster.

After you've attached the broadcaster to the context menu of a component, right clicking will create a popup menu (using the component's [LookAndFeel Customization](/glossary/custom_lookandfeel#popup-menu)) and then send a message to its registered listeners with the clicked component as argument and the selected index (zero based).

### Example

This example snippet registers a context menu to a button and allows setting the value and toggling the width of the button using two popup menu items.

```javascript
// We'll attach the context menu to this button
const var Button1 = Content.addButton("Button1", 0, 0);
Button1.set("enableMidiLearn", false); // we don't want this to popup too...

/** Let's define a broadcaster with two arguments. */
const var bc = Engine.createBroadcaster({
	"id": "ContextMenu Broadcaster",
	"args": ["component", "selectedIndex"]
});

/** This defines a few items using a markdown-like syntax. */
const var POPUP_MENU_ITEMS = [
  "**Set Value / Properties**", // A header
  "Value is active",			// the first item
  "Set to {DYNAMIC}",			// the second item with a dynamic text
  "___",						// a horizontal separator
  "~~This is always off~~"		// an item that is always disabled
];


inline function popupStateFunction(type, index)
{
	// The this object of this function will always
	// point to the component that was clicked (in our
	// case it's always Button1).
	Console.assertEqual(this, Button1);

	local getEnableState = type == "enabled";
	local getTextValue = type == "text";
	local getActiveState = type == "active";
	
	if(getEnableState) // We don't want to disable any item
		return true; // so let's return true...
		
	if(getTextValue)
	{
		// This function is only called with items
		// that specify the `{DYNAMIC}` wildcard
		// in this case the second item with the index 1
		Console.assertEqual(value, 1);
		
		// Now we can return whatever text we want to show
		// and this is evaluated each time before the popup
		// is shown
		return this.get("width") > 150 ? "small" : "wide";
	}
	
	if(getActiveState)
	{
		// Now we can decide whether the popup menu item
		// should be displayed as active or not

		// the first item checks whether the button is active
		if(index == 0)
			return this.getValue();
			
		// the second item checks whether its wide or not
		if(index == 1)
			return this.get("width") > 150;
	}
};

/** Now we can use the item list and the state function to attach the broadcaster
   to the context menu of the button (you can attach it to multiple components by
   passing in a list. */
bc.attachToContextMenu("Button1", popupStateFunction, POPUP_MENU_ITEMS, "Context Menu");


/** This callback will be executed whenever a popup menu item was selected. */
bc.addListener(Button1, "Menu callback", function(component, index)
{
	// the this object will point to the component
	Console.assertEqual(component, this);

	if(index == 0)
	{
		this.setValue(!component.getValue());
		this.changed();
	}
	if(index == 1)
	{
		this.set("width", component.get("width") > 150 ? 100 : 200);
	}
});
```