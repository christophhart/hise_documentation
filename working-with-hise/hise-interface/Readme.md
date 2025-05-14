---
keywords: HISE Interface
summary:  HISE Interface Elements
index: 1
---

![Hise Interface 4.1](images/interface/interface_empty_4.png)

[Menu](/working-with-hise/menu-reference) | [Top Bar](/working-with-hise/hise-interface/top-bar) | [Left Panel](/working-with-hise/hise-interface/left-panel) | [Code Editor](/working-with-hise/hise-interface/code-editor) |[Interface Designer](/working-with-hise/hise-interface/interface-designer) | [Sampler Workspace](/working-with-hise/hise-interface/sampler-workspace) | [Scriptnode Editor](/working-with-hise/hise-interface/scriptnode-editor) | [Custom Workspace](/working-with-hise/hise-interface/custom-workspace)


## HISE Interface Architecture

HISE interface is built on a flexible system of modular elements called [floating tiles]().

- [Layout Floating tiles](/ui-components/floating-tiles/layout) - for layouting purposes

- [HISE Floating tiles](/ui-components/floating-tiles/hise) - for various functions and editors

The HISE layout is defined in an JSON file called `editorData.json` which you can find in the HISE app data directory `%APPDATA%`. You can edit this file to change the general layout of HISE. There is a shortcut that leads you to the appdata folder in the menu: **File > Show HISE appdata folder**.

> Make sure to keep a backup of this file as soon as you start making non-trivial changes. 

If you close HISE the latest/current HISE layout will be written into this file, so you have to make sure that HISE is not open while you're editing this file, otherwise your changes will be overwritten when you close HISE. 

Long story short: Close HISE, edit the `editorData.json` and restart HISE to test & try out.

## Customizing the HISE interface

### Finding the right floating tile

The JSON file is huge so navigating to the part that is interesting is not trivial. The best approach is just searching the title of the floating tile you want to adjust in the text editor - most likely this string will show up as `ID` property. If this doesn't help, you might search for neighbour floating tiles or the parent container and start your search mission from there. Once you've found the floating tile you want to change, you can proceed with one of those things:

### Changing the size (absolute vs. relative)

The floating tiles in HISE can either have a fixed size or they can be relative to the width / height of its parent. If you want to change this, take a look at the `Size` property of the `LayoutData` child object. If you want an absolute size that does not resize when the parent size changes, just enter the pixel value as number: 

```javascript
"Size": 400.0
```

If you want it to scale with the parent, you need to pass in a negative number between -1.0 and 0.0, which will translate to the percentage of the parent:

```javascript
"Size": -0.3333333 // 33% width
``` 

> You can also choose to hide the floating tile by setting the `Visible` property to false.

### Changing container types / order of elements

If you want to swap vertical and horizontal layouts, or put all child elements into a tabbed component, you can do so by finding the parent element and change its `Type` property to one of these strings:

- `VerticalTile`
- `HorizontalTile`
- `Tabs`
 
If you want to change the order of floating tiles (eg. put the component list next to the property editor), you can do so by shuffling around the elements in the `Content` array. 

> Be careful that you do this properly or you'll end up with a corrupt JSON!

### Adding shortcuts for folding and key focus

You can also assign key shortcuts to any floating tile which perform one of two functions:

1. Grabbing the keyboard focus
2. Toggling the fold state (the equivalent of pressing the triangular button)

The second function does also grab the keyboard focus and it will ensure that at least one child element is visible (so if you fold the code editor, the interface editor will be made visible and gets the focus).

In order to do so, add either `FoldKeyPress` or `FocusKeyPress` property to the `LayoutData` object of the Floating tile you want to address.

The value must be a string that describes the keypress:

```javascript
"FoldKeyPress": "ctrl + L"
"FocusKeyPress": "F9"
```
 
In order to find the right syntax for describing the key shortcut, you can use this script - the syntax is the same as the `description` property of the function parameter object:

```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setKeyPressCallback(function(key)
{
	if(isDefined(key.description))
		Console.print(key.description);
		
	return true;
});
```

You can obviously only override key presses which are not assigned / consumed by other components, so `ctrl + C` will most likely never reach this point.
