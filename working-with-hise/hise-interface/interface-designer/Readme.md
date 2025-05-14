---
keywords: Interface Designer
summary:  The menu reference for the Scripting Canvas in the Interface Editor
icon:     /images/icon_scriptcontent
index: 04
items:	
- Zoom Fit: Sets the zoom factor so that the entire interface is displayed.
- Edit: Toggles the canvas between play mode(where you can actually use the Components) and edit mode where you can edit them and drag them around.
- Editoff: Toggles the canvas between play mode(where you can actually use the Components) and edit mode where you can edit them and drag them around.
- Cancel: Deselects all items
- Lock: You can lock the current component selection so that it will not be included when you drag the lasso for selecting components. This is helpful for background panels, etc. which you don't want to select but their child elements.
- Move: Enabling this will prevent the mouse dragging of selected elements to move their position. This avoids screwing up your interface layout accidentally.
- Undo: Undo the last property change. This is using the global undo manager, so it also undoes drag operations in the Component List or property changes in the Property Editor. 
- Redo:  Same as undo says Captain Obvious. 
- Rebuild: Refreshes the UI model. 
- Suspend: This simulates the suspension of the UI timers just as if the user would close your plugin window. You can use this to check if any vital functionality is depending on the UI timers being active.
- Learn: This enables the connection learn mode. Click this to enable the learn mode for the current selection, then move any other knob or UI element of another processor (or a meta parameter of a DSP network). It will then assign the processor connection and update the range of the Knob to match the target.
- Vertical Align: Align the selection vertically on the left edge. 
- Horizontal Align: Align the selection horizontally on the top edge. 
- Vertical Distribute: Distribute the selection vertically with equal space. 
- Debug Css: If enabled you can hover over an element that has a CSS stylesheet attached to inspect the CSS properties (and variables) that are applied to the component.
- Horizontal Distribute: Distribute the selection horizontally with equal space. 
- Edit JSON: This will open a popup with the JSON properties of the currently selected elements. It allows you to manually change the properties and do batch processing. Note that this is a very risky operation so it's possible to mess up the entire component tree so proceed with caution!
---

![interfacedesigner](images/interface/interface-designer.png)

The Interface Designer is split into three parts:


- The [Canvas](/working-with-hise/hise-interface/interface-designer#canvas), a WYSIWYG editor of your plugins GUI. 
- The [Component List](/working-with-hise/hise-interface/interface-designer#component-list) which is a value-tree representation of all the UI Components that have been added to the Canvas.
- The [Property Editor](/working-with-hise/hise-interface/interface-designer#property-editor), with which you can change the properties of each UI Component on the fly.

## Canvas

![canvas](images/interface/canvas.png)

On the Canvas you can build your plugins Graphical User Interface. Here you can add [UI Components](/ui-components) to the interface with **right-clicking** on the canvas and selecting a component from the dropdown list.

With the Pen/Lock symbol in the Toolbar you can toggle between the **Edit** and **Play**-Mode [F4].

When you lock the interface into **Play Mode** you can use the UI Components as in a compiled plugin, test the sliders and the general layout. This is the same behaviour as the Interface Preview (house symbol) in the top-bar.

Behind the scenes the Interface consists of two parts: 
- The architecture of the components with their position, ID/names and properties is saved in a value-tree structure in a `.hip` or `.xml` file. You can take a look at the XML code when you save your project with `File > Save as XML`. The file then shows up in your projects XmlPresetBackups folder: **XmlPresetBackups > ..UIData > ..Desktop.xml**. 

- A `.js` script that lives in a [ScriptProcessor](/hise-modules/midi-processors/list/scriptprocessor) in which you can set the interface size `Content.makeFrontInterface(600, 600);`, customize the behaviour of the GUI, change its looks and script advanced interactions. It is saved in the Scripts folder: **Scripts > ScriptPocessors > {your xml save name} > ScriptProcessorName.js**

> The default **File > New** (Preset) file (`HISE Preset`, not to be confused with [UserPresets](/working-with-hise/project-management/user-presets)) already features a setup with a ScriptProcessor named **Interface** in the MIDIProcessor Tab of the Master Chain that is already connected to the Interface Designer.


### Toolbar

![canvas_toolbar](images/interface/canvas-topbar.png)

The Toolbar features convenient helpers in building your interface.

- **Zoom to Fit** - Zooms the interface to fill the whole canvas.
- **Zoom size** - from 50% - 200 %. Use [CTRL + MouseWheel] to zoom even further. 

----

- **Toggle between Edit and Presentation Mode [F4]** - Toggles the canvas between play mode(where you can actually use the Components) and edit mode where you can edit them and drag them around.
- **Automatic parameter assignment mode** - Select a UI component and click the **Connection Assigment Button**. HISE is now in connection mode. If you now open an [Audio Module](/hise-modules) in the the **Module Tree** you can directly connect the UI Component to the module parameter. It will automatically copy the correct parameters to the component to match the module. This also works with meta parameters of a DSP network.
- **Deselect** - Deselects the current items [ESC].
- **Rebuild Interface [F5]** - Behind the scenes, HISE uses a layer called ScriptComponent that wraps around the data model for each control. It stores a reference to the data and communicates between the actual GUI you see and the script / UI model in the backend. However, in some cases these connections may break and you'll wind up with a somewhat broken interface. This can easily be fixed by deleting all those wrappers and create them new from the UI model. You can do that with the **Rebuild Button**. If you only rebuild the interface, your ScriptProcessor script will not automatically be recompiled, so in order to make a full reset, you need to rebuild the interface first, and then recompile your script.

----

- **Undo** - Undo the last property change. This is using the global undo manager, so it also undoes drag operations in the Component List or property changes in the Property Editor. 
- **Redo** - Same as undo says Captain Obvious. 

----

- **Lock** - You can lock the current component selection so that it will not be included when you drag the lasso for selecting components. This is helpful for background panels, etc. which you don't want to select but their child elements.
- **Move** - Enabling this will prevent the mouse dragging of selected elements to move their position. This avoids screwing up your interface layout accidentally.
- **Suspension Simulator** - This simulates the suspension of the UI timers just as if the user would close your plugin window. You can use this to check if any vital functionality is depending on the UI timers being active.

----

- **Vertical Align** - Align the selection vertically on the left edge. 
- **Horizontal Align** - Align the selection horizontally on the top edge. 
- **Vertical Distribute** - Distribute the selection vertically with equal space. 
- **Horizontal Distribute** - Distribute the selection horizontally with equal space.

----

- **Edit JSON [J]** - This will open a popup with the JSON properties of the currently selected elements. It allows you to manually change the properties and do batch processing. Note that this is a very risky operation so it's possible to mess up the entire component tree so proceed with caution!
- **Debug CSS** - If enabled you can hover over an element that has a CSS stylesheet attached to inspect the CSS properties (and variables) that are applied to the component.
- **Overlay Selector** - Select an image to display it as design template over the Canvas. You can use this for pixel perfect UI positioning.  
- **Overlay Fader** - Fades the Alpha channel of the Overlay Image. You can also invert the image, which in some cases helps when the outlines might not be visible enough.


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

![component-list](images/interface/component-list.png)

The [Component List](/ui-components/floating-tiles/hise/scriptcomponentlist) shows a list of all UI Components that have been added to the Interface. You can add new components in here, too.

The Z-order of the components starts on the top (background) and advances to the bottom (front).

You can group components into each other. Create a [Panel](/ui-components/plugin-components/panel) or a [Viewport](/ui-components/plugin-components/viewport) and add or drag other components beneath them in the Component List. This will group components together, which makes it easy to implement page-like logic for complex projects.

The little star icon indicates if an UIComponent has its `saveinPreset`-property set to true or false. This indicates if the value of the component should be saved in UserPreset or not. Learn more about this in the [User Presets](/working-with-hise/project-management/user-presets) chapter.  


## Property Editor
![property-editor](images/custom/property-editor.png)

The Property Editor displays a list of all available properties of a selected component. All UI Components have the same core properties like **ID** and **Component Size**, but they may vary widely in their additional properties, depending on their specific use. Have a look at [Plugin Components](/ui-components/plugin-components) for a list of all **Common-, and Component Specific properties**. 

When you select multiple components, the property change will affect all selected components. If the selection has varying property values, it will show an asterisk, indicating that you are editing multiple values.

### Set the ID

The textbox in the top row is used to change the **ID** of the component. After changing the **ID** make sure to accept the change with [ENTER].

> Bear in mind that the ID is **ridiculously important** for further processing - preset restoring, script referencing, resolving the UI parent hierarchy etc. - Try to pick a name once and stick to it because changing the ID later on will become more and more unpleasant over time.

### Copying selected properties as JSON

On the top-right of the Property Editor you can find two litte icons for copy & pasting properties with a JSON dump. With this functionality you can transfer multiple property values to other UI Components without hustle.   

- Select a component and set its properties to your needs.
- Click on the property name to select it. You'll notice that it lights up. Use the usual modifier keys (Ctrl/Shift) to select multiple properties.
- Hit the **Copy** Button to create a JSON dump in your clipboard containing all selected properties including their values. 
- Select all components that you want to paste the property selection to.
- Click on the **Paste** button to apply the property values for the entire selection.
