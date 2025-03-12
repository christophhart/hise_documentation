---
keywords: Scriptnode Editor
summary:  The editor for the scriptnode environment
index: 06
---

![scriptnode-editor](/images/interface/scriptnode-editor.png)

After you added a [Scriptnode](/scriptnode) module to the [Module Tree](/introduction/hise-interface/left-panel/module-tree) you can edit its DSP network in the ScriptNode Editor. Click the little `Open in..` icon on the audio module to connect and display it's network in the Scriptnode Editor.   

# The Scriptnode canvas

![scriptnode-canvas](/images/interface/scriptnode-canvas.png)
The main Scriptnode interface. It will show a map of the DSP network tree.

It features: 
- a container node for adding [nodes](/scriptnode/list)
- a visual representation of the **audio signal** and the channel amount (the cables underneath the nodes)
- a visual representation of the **modulation & parameter** connections (the cables that are hanging over the nodes)
- a [toolbar](/introduction/hise-interface/scriptnode-editor#toolbar) with useful tools that help in designing DSP networks

You can add new nodes by clicking inside the container node and selecting a node from the [Add node popup](/introduction/hise-interface/scriptnode-editor#add-node-popup). You can drag them around, mute them, fold them with [double-click], change their individual parameter values, unhide their parameters (in case of containers), and delete them with the little x or [DEL]. For a complete reference and description of each node, please take a look at the [Scriptnode Node List](/scriptnode/list).

Take a look at the [Scriptnode Snippets](/tutorials/scriptnode) in the [Snippet Browser](/tutorials#the-snippet-browser) to take a look at some examples.

## Add Node Popup

![](/images/custom/create_node.png)

Select a node from the list to display its details on the right side of the popup. You can also type its name in the search bar or filter the node list using tags, which group the nodes into categories. Add them to the network with [double-click] or [Enter]. 

> Pressing the help button (or [F1]) with a selected node will open the nodes documentation in the web browser. If you have already added a node to your network you can open its HISE inhouse documentation with [F1].


## Toolbar
![](/images/interface/script-canvas-topbar.png)

The toolbar contains a selection of various function / helper tools that you will need during the development of scriptnode networks:


- **Reset Zoom** - Resets the window and displays the whole network.
- **Add Bookmark** - Add "zoom" bookmarks to save a graph view, and take shortcuts to display specific sections of the graph. 

- **Fold all unselected nodes** - Use this to single out a container or node and fold all other nodes
- **Swap the oprientation of the selected containers** - Swaps from vertical to horizontal view

- **Select nodes with error** - Select nods with error
- **Show / Hide cables [C]** - Shows and hides the parameter cables
- **Enable parameter list selection** - 1. Step: Activate and select multiple node parameters with the little "ingredient bottle" icon. 2. Step: Opens a popup with the selected parameters in JSON format, for quick changes

- **Display the signal flow in the cables** - Toggle on to display if a signal is moving through the cable
- **Show all parameters in a popup** - Shows the main containers parameters in a popup for quick access.

- **Show / hide comments** - Displays the comments inside the graph if you have added some.
- **Open the wrap context menu** - Opens a context menu with wrapping options. Use this to quickly wrap different types of containers around the selection. Undo with [CTRL+Z].

- **Randomize color for selection** - Applies a random colour to the node selection. Use this feature to visually group nodes.
- **Activate CPU Profiling**

- **Lock the current container**

- **Undo** - Undo the latest action [Ctrl+Z]
- **Redo** - Redo the latest action [Ctrl+Y]

- **Save the DSP Network** - Saves the current network as XML file.
- **Unload this network** - Unloads the current network and shows the scriptnode title screen.

- **Show the node properties** - Shows the properties popup of the selected node (or the network if nothing is selected).


# The Node List

![mode-list](/images/interface/node-list.png)

This will show a list of all nodes that are currently used in the network as well as the nodes that have been created but removed from the current processing chain: if you delete nodes, they will be kept around and can be easily reinserted later. If you click on a node, it will fold all other nodes and zoom on the selection (you can select multiple nodes by holding down the command modifier). This might be an effective way of navigating big networks where you need to focus on certain parts.


# Node Properties

![node-list](/images/interface/node-list.png)

This will show the properties of the current selection of nodes so you can edit multiple properties at once.


## The Parameter Editor 

One of the most important tasks when developing DSP algorithms is tweaking the parameters and setting appropriate ranges. There are a bunch of helper tools in scriptnode which help you with this. Every slider in scriptnode has a few extra functions worth mentioning:

## Parameter popup

![](/images/custom/editparameters.png)

Right clicking on a slider will open up a popup menu where you can edit the raw properties. This is not the preferred way of setting the ranges as the range editor described below has far more QOL functions, but in some case it gives you the most flexibility.

## The range editor

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


