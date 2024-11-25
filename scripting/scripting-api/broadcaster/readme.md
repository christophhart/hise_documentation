---
keywords: Broadcaster
summary:  An object for implementing the Observer software pattern
author:   Christoph Hart
modified: 24.07.2022
---
  
The [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) is a very common software pattern and is used throughout most of the codebase in JUCE and HISE. It allows you to register objects that will be notified when anything changes and is super helpful for organising bigger projects.

### Definition

In HiseScript you can implement the pattern manually by having an array that stores functions like this:

```javascript
// Internal: 
var registeredFunctions = [];
var currentValue = 0;

// register a function with a single argument
function addListener(lf)
{
	registeredFunctions.push(lf);
	
	// We call it once at registration, so it's up to date...
	lf(currentValue);
}

function sendMessage(value)
{
	// We only call the listener if the value has actually changed
	if(value != currentValue)
	{
		currentValue = value;

		for(f in registeredFunctions)
			f(value);
	}
}

// Usage:
addListener(function(newValue)
{
	Console.print(newValue);
});

sendMessage(90);
```

## Use cases of the Observer pattern

This pattern is mostly useful in GUI logic coding, eg. page-handling or displaying any information at multiple places (eg. which user preset is loaded). The advantage of this is that you can implement localised tasks at very narrow scope which are then automatically executed when the global state changes. Let's take a look at the previously mentioned example: page handling. Without the observer pattern, you would normally do it like this:

```javascript
const var buttons = [Content.getComponent("Page1Button"),
                     Content.getComponent("Page2Button"),
                     Content.getComponent("Page3Button")];

const var pages =   [Content.getComponent("Page1"),
                     Content.getComponent("Page2"),
                     Content.getComponent("Page3")];

inline function onPageButton(button, value)
{
	local idx = buttons.indexOf(button);
	
	for(p in pages)
		p.set("visible", pages.indexOf(p) == idx);
}

for(b in buttons)
	b.setControlCallback(onPageButton);         
```

which is super slick and concise in this minimal example, but it quickly gets messy in real world projects, where you want additional tasks being performed when the page changes, eg:

- changing colours of other elements
- updating some UI elements
- hiding popup panels from that page that would otherwise leak into the other page

All these functionality has to be tucked into the poor little button callback which now gets super convoluted. With the observer pattern, the example looks like this:

```javascript
// here is the observer code from the definition above...
var registeredFunctions = [];
var currentValue = [];
function addListener(f) { ... }
function sendMessage(value) { ... };

const var buttons = [Content.getComponent("Page1Button"),
                     Content.getComponent("Page2Button"),
                     Content.getComponent("Page3Button")];

const var pages =   [Content.getComponent("Page1"),
                     Content.getComponent("Page2"),
                     Content.getComponent("Page3")];

inline function onPageButton(button, value)
{
	local idx = buttons.indexOf(button);
	sendMessage(idx);
}

for(b in buttons)
	b.setControlCallback(onPageButton);         
	
addListener(function(idx)
{
	for(p in pages)
		p.set("visible", pages.indexOf(p) == idx);
});
```

On first sight it looks more verbose than the previous example (and if it's as simple as that then it's a good example of overengineering), but this solution scales much better in real world projects, because now you can attach new listeners whenever you implement something at the very location you want:

```javascript
// ... deep in some other namespace

// Now if you want to perform more tasks, you can leave the button callback alone and
// add it at the very scope you're working on.
addListener(function(idx)
{
	local colours = [Colours.red, Colours.blue, Colours.green];
	doSomethingWithColours(colours[idx]);
})
```

However, with the stock HiseScript solutions there are a few disadvantages:

- too much boilerplate. You have to write these logic functions (addListener, sendMessage) for every observer you need and keep the function array and the currentValue variable around
- hard to debug, easy to lose track of what calls what and what reacts to it.
- no support for async callback handling (would be possible to implement using a timer, but then it will be even more boilerplate)
- easy to mess up the argument amount of the registered functions

The Broadcaster object tries to address these issues by giving you (basically) the same functionality as shown in the script above, but with a clean interface, async callback support.

In order to use it, call [`Engine.createBroadcaster`](/scripting/scripting-api/engine#createbroadcaster) with the default values and then use one of its methods to implement the observer pattern:

```javascript
// If you pass in a JSON object into the constructor, you can
// access the properties later using the standard dot operator.
const var bc = Engine.createBroadcaster({"myProperty": 12});

bc.addListener("testFunction", function(index)
{
	Console.print(index);
});

// Access the property as if the broadcaster would be a generic JSON object:
Console.print(bc.myProperty);


// Setting the property sends a (synchronous) message to the listeners
bc.myProperty = 90;

// This line does the same as the one above...
bc.sendMessage([90], false);
```

However, calling `sendMessage()` or assigning properties manually from your code is just one of the ways that this class can be used: you can also register it to any callback or even attach it to internal event sources that weren't accessible before.

### Compatibility with callback slots

In HiseScript, there are many callback slots that can be registered with a function (or inline function), eg:

- [`ErrorHandler.setErrorCallback()`](/scripting/scripting-api/errorhandler#seterrorcallback)
- [`MIDIPlayer.setPlaybackCallback()](/scripting/scripting-api/midiplayer#setplaybackcallback)
- [`ScriptPanel.setFileDropCallback()`](/scripting/scripting-api/scriptpanel#setfiledropcallback)

However instead of a reference to a function, you can also pass in a `Broadcaster` object, and it will then call its listeners (asynchronously) everytime the callback happens.

> Be aware that in this case the parameter amount defined by the argument in `Engine.createBroadcaster()` must match the expected argument amount.

### Attachable Event Sources 

Another feature that vastly increases the usefulness of this object is the ability to register it to internal event types that were not accessible in HISE before:

#### Value changes 

On the first look this doesn't sound particularly interesting because the value callback was already accessible through `setControlCallback()`, however if you're using `processorId` / `parameterId` properties it will not fire so this gives you the chance to add additional, "non-exclusive" callbacks for UI things

See: [`attachToComponentValue()`](/scripting/scripting-api/broadcaster#attachtocomponentvalue)

#### Property changes 

This is super helpful if you want to react on changing properties (eg. the `visible` flag) of certain components.

See: [`attachToComponentProperties()`](/scripting/scripting-api/broadcaster#attachtocomponentproperties)

#### Mouse events

This gives you the ability to attach custom mouse callbacks to **ANY** component using the same interface as [`ScriptPanel.setMouseCallback()`](/scripting/scripting-in-hise/scriptpanel#the-mouseevent-callback) This will not override the default mouse behaviour but rather give you the option to customize the user interface and eg. show certain things while a slider is being dragged.

See: [`attachToComponentMouseEvents()`](/scripting/scripting-api/broadcaster#attachtocomponentmouseevents)

## Metadata

There is another concept of the broadcaster system which is tightly coupled with the visualisation of the broadcaster connections and this is the **Metadata**. Almost all methods which will generate an item on the BroadcasterMap (so the broadcaster itself but also all listeners and event sources) have a metadata parameter in their function signature that needs to be populated with a description of what this item is doing. This enforces self-documenting code on the coding level, which is fine but also heavily increases the usability of the broadcaster map which will help tremendously at keeping the overview over large projects.

A metadata object can be a simple string that only contains a description of the item, but for more information you can use a JSON object containing these properties:

| Property | Type | Description |
| -- | -- | ------ |
| `id` | String | a (unique) String that is used as name for the item. This doesn't need to be a variable name so you can use any human-readable title here. If you don't supply a JSON object but a simple string, this string will be used as `id` (making this the only non-optional property in this list). |
| `comment` | String | A markdown formatted string which will be shown on the broadcaster map. There is one little magic trick applied here and that is that if you comment the function call or object definition with a `/**` comment (instead of the default `/*` one), it will parse the comment from the code and write it into the metadata as `comment` property. |
| `colour` | int | A colour value that is used for the item drawing. You can supply a colour value using the `0xAARRGGBB` notation, or just enter `-1`, then it will create a random colour from the ID hash, which is a quick way to colour an item. |
| `tags` | Array of strings | You can attach tags to any item and then filter the broadcaster map to only display the items you want. This helps navigating around big projects. |
| `priority` | int | This property is only valid when used with a listener item and defines the order of how the listeners are called. By default they are called by the order of the `addListener` call, but if that is not what you want, you can shuffle around the listeners by supplying a priority (higher priority values means that the items are moved up the list and the default value is `0`). |
| `args` | Array of strings | This is only valid for [broadcaster definitions](/scripting/scripting-api/engine#createbroadcaster) and contains a list of strings describing the arguments of this broadcaster. |


For an example usage take a look at the various API calls.

## Queuing

By default, messages from broadcasters are not queued; if they take too long, they are cancelled. To engage a system-wide queue (ensuring all messages are delivered), call `setEnableQueue()`.
