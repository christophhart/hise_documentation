---
keywords: Scriptnode Editor
summary:  The editor for the scriptnode environment
index: 06
---

The editor for scriptnode is trying to use the same principles as the interface designer, with a list on the left, a main canvas and a property editor on the right.

## The Node List

This will show a list of all nodes that are currently used in the network as well as the nodes that have been created but removed from the current processing chain: if you delete nodes, they will be kept around and can be easily reinserted later. If you click on a node, it will fold all other nodes and zoom on the selection (you can select multiple nodes by holding down the command modifier). This might be an effective way of navigating big networks where you need to focus on certain parts.

## The DSP Network graph

The main interface with scriptnode. This will show a two dimensional graph of the network tree with multiple elements:

- nested container nodes which house other nodes
- processing nodes which perform operations on the audio signal
- a visual representation of the audio signal and the channel amount (the cables underneath the nodes)
- a visual representaion of the modulation & parameter connections (the cables that are hanging over the nodes)

You can add / remove nodes, drag them around and change parameters. For a complete reference and description of each node, take a look at the [Scriptnode Node List](/scriptnode/list).

Clicking anywhere in a container will open the node creation popup:

![](/images/custom/create_node.png)

You can either type in the node, or filter the node list using the factory tags, which group the nodes into categories. Once you've selected a node, it will show a screen shot with a description.;

> Pressing the help button (or F1) when you've selected a node will open the browser with the node documenation

### Toolbar

The toolbar contains a selection of various function / helper tools that you will need during the development of scriptnode networks:

| Icon | Shortcut | Description |
| - | -- | ------ |
| ![export](/images/icon_export:32px) | `` | Toggles between the compiled and interpreted version of the network. |
| ![zoom](/images/icon_zoom:32px) | `Ctrl+Backspace` | Shows the entire network graph. |
| Bookmark | `` | Allows to switch between multiple bookmarks (selection of visible nodes). |
| ![foldunselected](/images/icon_foldunselected:32px) | `` | Folds all unselected nodes. Select a few nodes, then click this button and it will hide all other nodes helping you focussing on the selection. |
| ![swap-orientation](/images/icon_swap-orientation:32px) | `` | This will swap the layout dimension of chain nodes. By default chain nodes are displayed vertically, but it might be better for the visual density of the network graph to display child nodes horizontally. |
| ![error](/images/icon_error:32px) | `` | This button will be enabled if there is a runtime error in the DSP graph. Clicking on it will select the faulty node. It will reevaluate the error when you drag or delete nodes. |
| ![cable](/images/icon_cable:32px) | `C` | This will toggle the display of the hanging cables. For complex networks those might be cluttering the visuals so enabling this will clear the view on the underlying modules. |
| ![probe](/images/custom/icon_probe:32px) | `` | This will enter the parameter probe mode which can be used to enter multiple parameter values at once. Enable it, then click on each knob you want to change. Click again and it will open a JSON editor where you can manually enter parameter values for each node when pressing the Apply button. |
| ![signal](/images/icon_signal:32px) | `` | Enables the signal visualisation in the cables. Clicking this will show the amplitude of each channel peak in the network. |
| ![parameters](/images/icon_parameters:32px) | `` | Shows a popup with all DSP network parameters. This mirrors the top row in the network, but if you're working in a big patch, this might not be visible so this is a handy way of controlling the meta parameters at all time. |
| ![wrap](/images/icon_wrap:32px) | `` | Shows a context menu that helps you wrap the node selection into specific container types. |
| ![colour](/images/icon_colour:32px) | `` | Applies a random colour to the node selection. Use this feature to visually group nodes. |
| ![profile](/images/icon_profile:32px) | `` | Toggles the profile mode. If enabled, this will show the CPU usage of each node so you can easily spot CPU hogs. |
| ![undo](/images/icon_undo:32px) | `Ctrl+Z` | Undo the last scriptnode operation (dragging nodes, changing properties, adding parameters, etc). |
| ![undo](/images/icon_undo:32px) | `Ctrl+Y` | Redo the last scriptnode operation (dragging nodes, changing properties, adding parameters, etc). |
| ![save](/images/icon_save:32px) | `` | Saves the current network as XML file. |
| ![eject](/images/icon_eject:32px) | `` | Unloads the current network and shows the scriptnode title screen. |
| ![properties](/images/icon_properties:32px) | `` | Shows the properties popup of the selected node (or the network if nothing is selected). | 

## Node Properties

This will show the properties of the current selection of nodes so you can edit multiple properties at once.

### The Parameter Editor 

One of the most important tasks when developing DSP algorithms is tweaking the parameters and setting appropriate ranges. There are a bunch of helper tools in scriptnode which help you with this. Every slider in scriptnode has a few extra functions worth mentioning:

### Parameter popup

![](/images/custom/editparameters.png)

Right clicking on a slider will open up a popup menu where you can edit the raw properties. This is not the preferred way of setting the ranges as the range editor described below has far more QOL functions, but in some case it gives you the most flexibility.

### The range editor

If you hover over a slider it will show a bidirectional arrow on the top left. Clicking on that arrow will open the range editor.

![](/images/custom/rangeeditor.png)

> There's also a "temporary" mode for the range editor: hovering over a slider while holding down the alt key will show the range editor until the mouse exits the slider.


All parameter ranges in scriptnode are just suggestions - you can change the limits, step size or skew factor any time. This is especially important as the (default) modulation connection will use this range for converting the normalised modulation value. So if you have a parameter that is mapped from 2 to 4 and a normalised value of `0.5` is send to it (either through modulation or another parameter), it will calculate the actual value using that range (so in this case 3). Changing the range of the knob will also change this, so if you change the maximum to 6, it will then set the value to 3.

> Normalised modulation is just the default mode of operation in scriptnode, but there is also another mode which bypasses the target range and sends the raw value. This is called `unscaled` modulation. If you want to read more about this, take a look at the [`control`](/scriptnode/list/control) factory.

Now that we've established how important it is to set the ranges correctly, we can take a look at this interface element. It supports these interactions:

- dragging the edges will change the minimum or maximum (dragging the left or right edge)
- dragging in the middle will change the skew of the range
- shift clicking on the edges will allow you to enter a precise value (and shift clicking in the middle will ask for the mid point to calculate the skew)
- double clicking will close the range editor and go back to the slider display.

Right clicking will open a context menu with more options:


| Item | Description |
| --- | ---- |
| Make sticky | Enabling this will keep the range editor visible after you hovered over it. |
| Load Range preset | This will show a submenu with a selection of available range presets (see below). |
| Save Range preset | You can also save your own range presets which will then show up in the list. |
| Reset range | this will reset the range to the original range. |
| Reset skew | this will remove the skewing making it a linear range. |
| Invert range | this will invert the parameter so that it goes from maximum to minimum. Obviously this is only interesting when the parameter is controlled by another source. |
| Copy range to source | If the parameter is connected to a source, this will make the source range copy the target range. If you have a single connection, this makes sense as it avoids the conversion between source and target range. Note that if you have a single connection with different ranges, it will show a warning sign at the meta parameter and clicking on this will perform the exact same operation as this. |

### The Node Property Popup

