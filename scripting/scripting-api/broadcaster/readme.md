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

In order to use it, call [`Engine.createBroadcaster`](/scripting/scripting-api/engine#createbroadcaster) with the default values and then use one of its methods to implement the observer pattern.

### Bonus Level: The Broadcaster Controller

![bc](/images/custom/broadcaster_controller.png)

In addition to the quality of live improvements on the coding level, there is a helpful debug component called the Broadcaster Controller available that allows you to:

- navigate to every listener in the code (by clicking the goto button)
- trigger a breakpoint whenever a message is sent (by enabling the breakpoint butto in the top row)
- simulate events by typing the value into the "Current Value" box
- disabling individual listeners during debugging (by clicking on the bypass button of the respective row)
- reset to the default value (by clicking on the reset button in the top row)

In order to show the Broadcaster Controller, just right click on the table row in the script watch table and choose **View in popup**.
