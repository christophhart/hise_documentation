---
keywords: Interface Designer
summary:  The menu reference for the Scripting Canvas in the Interface Editor
icon:     /images/icon_scriptcontent
index: 02
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

![interfacedesigner](images/custom/interface-designer.png)

The Interface Designer is split in three parts:

- The [Canvas](/working-with-hise/workspaces/scripting-workspace/canvas#canvas), a WYSIWYG editor for your plugins GUI. 
- The [Component List](/working-with-hise/workspaces/scripting-workspace/canvas#component-list) which is a value-tree representation of all the UI Components that have been added to the Canvas.
- The [Property Editor](/working-with-hise/workspaces/scripting-workspace/canvas#property-editor), with which you can change the properties of each UI Component, on the fly.

## Canvas

![canvas](images/custom/canvas.png)


The Canvas shows your plugins Graphical User Interface if you connect an Interface ScriptProcessor to it. (If you don't see anything yet, create a new User Interface by clicking the house symbol in the top-bar.)

With the Pen/Lock symbol in the Toolbar you can toggle between the **Edit** and **Play**-Mode. In **Edit Mode** you can **right-click** on the interface to create new UI Components and edit their properties in the Property Editor.

When you lock down the interface into **Play Mode** you can use the UI Components as in a compiled plugin.


### Toolbar

The Toolbar features convenient helpers, like a zoom selector, undo/redo functions and automatic positioners.

{ICON_TABLE}

> Behind the scenes, HISE uses a layer called ScriptComponent that wraps around the data model for each control. It stores a reference to the data and communicates between the actual GUI you see and the script / UI model in the backend. However, in some cases these connections may break and you'll wind up with a somewhat broken interface. This can easily be fixed by deleting all those wrappers and create them new from the UI model. You can do that with the **Rebuild Button**. If you only rebuild the interface, your ScriptProcessor script will not automatically be recompiled, so in order to make a full reset, you need to rebuild the interface first, and then recompile your script.

### Select and position UI Components

You can select components by clicking on them or dragging a lasso around many, for multiple selection. While holding the **Command/Ctrl key** you can add and delete components from the selection. To deselect all components, press the **Escape key**.

You can move the selected Components with **Mouse Dragging** or the **Arrow Keys** on your keyboard. The Modifier Keys change their effect depending on each method: 



| Modifier Key | Arrows Keys | Mouse Dragging |
| --------- | -------------- | ---------------- |
| **Cmd / Ctrl ** | Move the component in a 10px grid |  10px grid |
| **Shift** | Change the width/height of the component | Restrict the movement to horizontal / vertical|
| **Alt** | - | Duplicates the selected component  |
> You have to start a Mouse drag before the Modifier Keys take effect.
> You can combine Modifier Keys. `Shift + Cmd + Right-Key` will increase the selections component width by 10 pixels.

## Component List

![component-list](images/custom/component-list.png)

The [Component List](/ui-components/floating-tiles/hise/scriptcomponentlist) shows a list of all UI Components that have been added to the Interface. You can add new components in here, too.

The Z-order of the components starts on the top (background) and advances to the bottom (front).

You can group components into each other. Create a [Panel](/ui-components/plugin-components/panel) or a [Viewport](/ui-components/plugin-components/viewport) and add or drag other components beneath them in the Component List. This will group components together, which makes it easy to implement page-like logic for complex projects.

The little **green/red dot** indicates if an UIComponent has its `saveinPreset`-property set to true or false. Learn more about this in the [User Presets](/working-with-hise/project-management/user-presets) chapter.  


## Property Editor
![property-editor](images/custom/property-editor.png)

The Property Editor displays a list of all available properties of a selected component. All UI Components have the same core properties like **ID** and **Component Size**, but they may vary widely in their additional properties, depending on their specific use. Have a look at [Plugin Components](/ui-components/plugin-components) for a list of all **Common-, and Component Specific properties**. 

When you select multiple components, the property change will affect all selected components. If the selection has varying property values, it will show an asterisk, indicating that you are editing multiple values.

### Set the ID

The textbox in the top row is used to change the **ID** of the component.
> Bear in mind that the ID is **ridiculously important** for further processing - preset restoring, script referencing, resolving the UI parent hierarchy etc. - Try to pick a name once and stick to it because changing the ID later on will become more and more unpleasant over time.


### Copying selected properties as JSON

On the top-right of the Property Editor you can find two litte icons for copy & pasting properties with a JSON dump. With this functionality you can transfer multiple property values to other UI Components without hustle.   

- Select a component and set its properties to your needs.
- Click on the property name to select it. You'll notice that it lights up. Use the usual modifier keys (Ctrl/Shift) to select multiple properties.
- Hit the **Copy** Button to create a JSON dump in your clipboard containing all selected properties including their values. 
- Select all components that you want to paste the property selection to.
- Click on the **Paste** button to apply the property values for the entire selection.

> If you still have older HISE projects or are interested in the [History](https://github.com/christophhart/hise_documentation/blob/master/NewInterfaceDesigner.md) of the Interface Designer, please have a look at this link that explains the transition to the current Interface Designer concept. 