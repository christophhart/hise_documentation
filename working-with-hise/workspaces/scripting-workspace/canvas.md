---
keywords: Canvas
summary:  The menu reference for the Scripting Canvas in the Interface Editor
icon:     /images/icon_scriptcontent
items:	
- Edit: Toggles the canvas between play mode(where you can actually use the Components) and edit mode where you can edit them and drag them around.
- Editoff: Toggles the canvas between play mode(where you can actually use the Components) and edit mode where you can edit them and drag them around.
- Cancel: Deselects all items
- Undo: Undo the last property change. This is using the global undo manager, so it also undoes drag operations in the Component List or property changes in the Property Editor. 
- Redo:  Same as undo says Captain Obvious. 
- Rebuild: Refreshes the UI model. 
- Vertical Align: Align the selection vertically on the left edge. 
- Horizontal Align: Align the selection horizontally on the top edge. 
- Vertical Distribute: Distribute the selection vertically with equal space. 
- Horizontal Distribute: Distribute the selection horizontally with equal space. 
---


In the middle of the window is the Canvas, which is a preview of the interface that can be edited graphically.
## Toolbar
At the top of the canvas you'll find a toolbar that contains a few important tools for the entire Interface designer.

{ICON_TABLE}

> Basically HISE uses an additional layer called ScriptComponent, which are wrappers around the data model for each control.  
	They store a reference to the data and communicate between the actual GUI you see and the script / UI model.
	However, in some cases, their connections breaks up and you wind up with a broken interface which looks pretty bad, but can easily be solved by simply deleting all of those wrappers and recreating them from the UI model, which is precisely what the Rebuild Button is doing.
	If you rebuild the interface, the script will not automatically be recompiled, so in order to make a full reset, you need to rebuild the interface first, then hit recompile.

## Selecting elements
You can select an element either by directly clicking on it or drag a lasso around all controls you want to modify.  
If you hold down the Command key while clicking on an element, it will add it to the selection. In order to deselect all elements, just press the Escape key.

> If you click on an already selected item, it will not be deselected. Instead it will grab the keyboard focus so that you can use the arrow keys to nudge it around (see below).

## Changing the position / size
You can change the position and size of the currently selected items by either just dragging them around or resizing them although resizing doesn't work here with multiple elements.
> If you need to resize multiple elements at once, you'll need the property panel or the arrow keys
When the canvas has the keyboard focus, you can use the arrow keys for nudging them around. The modifier keys can be used here to change the action. Their effect is similar for both keyboard and mouse interaction, but here is a detailed overview :

| Modifier Key | Effect with Keystroke | Effect when dragging |
| ------------ | -------------------- - | -------------------- |
| **Cmd / Ctrl ** | Use a 10px raster | Use a 10px raster |
| **Shift** | Change the size instead of the position | Restrict the movement to horizontal / vertical only |
| **Alt** | nothing | Duplicating the current control |

> These modifier keys can be combined, so eg. pressing `Shift + Cmd + Right-Key` will increase the width by 10 pixel.
The changes you make with the arrow keys are completely relative(so you can move / resize a selection without messing up their relation), which makes it the go - to solution for changing the position of multiple elements at once.

