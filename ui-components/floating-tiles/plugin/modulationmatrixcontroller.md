---
keywords: ModulationMatrixController
summary:  A UI component that can be used to manage matrix modulation connections
author:   Christoph Hart
modified: 18.07.2025
properties:
- Font: unused
- FontSize: unused
- ProcessorId: This should be set to the ID of the Global Modulator Container you are using with the matrix modulation system.
- Index: unused
- FollowWorkspace: unused
---
  
A common UI workflow when working with synthesiser plugins is to drag a modulation source to a target in order to establish a connection. This can be achieved with this UI component which adds a draggable element for every modulation source that can be dropped on any [Knob](/ui-components/plugin-components/knob) that is associated with a modulation target.

In order to use this floating tile, you have to:

1. Create a global modulator container and add multiple modulation sources
2. Add various modulation targets and connect them to UI knobs by setting their `matrixTargetId` property to the respective target ID.
3. Add this floating tile, set its `ProcessorId` property to the ID of the global modulator container
4. Start dragging the modulation source objects to the knobs to add connections.

Note that this is using some internals to streamline the process: as soon as you start dragging the UI elements, it will repaint all modulated knobs and update the `modulationDragState` property that you can pick up in your LAF methods to show the draggability.

> A example snippet that shows how to use this floating tile is available [here](/tutorials/scripting#modulation-matrix-tutorial).

### Bonus level: connection management buttons

In addition to the draggable elements, you also get three buttons in this component which perform (undoable) common operations related to connection management:

1. Add a (empty) connection that you can assign in a [ModulationMatrix](/ui-components/floating-tiles/plugin/modulationmatrix) component.
2. Remove the last connection
3. Clear all connections.

Note that this functionality is not exclusive to these buttons: all of those operations are also accessible through the [ScriptModulationMatrix](/scripting/scripting-api/scriptmodulationmatrix) scripting object and if you want to hide them, you can easily do so with the CSS magic spell `.control-button{display:none;}` in the CSS style sheet that is applied to this UI component. But if you want a quick and convenient way to handle the modulation connections you can use these buttons for exactly that.

### Styling

Just like with the [ModulationMatrix](/ui-components/floating-tiles/plugin/modulationmatrix) I've settled on a **CSS-only** approach for styling the draggable elements (the buttons can be styled with a scripting LAF if you absolutely need to). The reason, again, is that there is a lot of positioning customization required so the power of the CSS flex box can be used to precisely control how the positioning / spacing of the draggers should occur.

The CSS selectors available are:

- `#controller` for rendering the background of the entire component and setting the flex-box properties of the container - eg. `flex-direction: row-reverse;` will reverse the order of the child elements
- `.dragger` for every drag element.

The dragger elements support all pseudo-classes:

- `:hover` when you hover the element
- `:active` when you drag the element. This state is also used to render the static image that is dragged around the screen
- `:checked` when the element is corresponding to the current modulation source connection. This is automatically engaged when you click on a dragger, but can also be changed [programmatically](/scripting/scripting-api/scriptmodulationmatrix#setcurrentlyselectedsource).

There is also a predefined default icon (the draggable +) supplied as `dragPath` variable, but you can of course replace that with any other icon.

The default appearance of this UI component will not win any design award, but here is a example style sheet that covers all features and can be used as a starting point for your customization:

```css
#controller
{
	background: #968;
	padding: 10px;
	border-radius: 50%;
	border: 1px solid #888;
	gap: 0px;
}

.control-button { display: none; }

.dragger
{
	background: #999;
	color: #222;
	border-radius: 50%;
	padding-left: 30px;
	padding-right: 10px;
	margin: 10px;
	height: 45px;
	
	box-shadow: 0px 2px 5px black;
	cursor: grabbing;
}

.dragger::before
{
	content: '';
	background-image: var(--dragPath);
	width: 100vh;
	position: absolute;
	background-color: #555;
	margin: 15px;
}

/** this will be enabled if the dragger is corresponding to the currently selected modulation source. */
.dragger:checked
{
	background: #aaa;
}

.dragger:active
{
	transform: scale(95%);
}

.dragger::before:hover
{
	background-color: white;
};
```




