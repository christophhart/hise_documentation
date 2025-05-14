---
keywords: Scriptnode Editor
summary:  The editor for the scriptnode environment
index: 06
---

![scriptnode-editor](/images/interface/scriptnode-editor.png)

After adding a [Scriptnode](/scriptnode) module to the [Module Tree](/working-with-hise/hise-interface/left-panel/module-tree) you can edit its DSP network the ScriptNode Editor. Click the little `Open in..` icon on the audio module to connect and display it's network in the Scriptnode Editor.   

# The Scriptnode canvas

![scriptnode-canvas](/images/interface/scriptnode-canvas.png)
In the middle of the interface you can see the Scriptnode Canvas. It is a zoomable map of the DSP network tree. You can use **[Ctrl + Mousewheel]** to zoom in/out, and move the view on the empty sides or with **[clicked Mousewheel]** anywhere in the map.

It features: 
- the audio modules main container node for adding [Script nodes](/scriptnode/list) 
- a visual representation of the **audio signal** and the channel amount (the cables underneath the nodes)
- a visual representation of the **modulation & parameter** connections (the cables that are hanging over the nodes)
- a [toolbar](/working-with-hise/hise-interface/scriptnode-editor#toolbar) with useful tools that help in designing DSP networks

You can add new nodes by clicking inside the container node and selecting a new node from the [Add node popup](/working-with-hise/hise-interface/scriptnode-editor#add-node-popup). You can drag them around, mute them, fold them with [double-click], change their individual parameter values, unhide their parameters (in case of containers), and delete them with the little X or [DEL]. For a complete reference and description of each node, please take a look at the [Scriptnode Node List](/scriptnode/list).

If you want to take a look at some examples check out the [Scriptnode Snippets](/tutorials/scriptnode) in the [Snippet Browser](/tutorials#the-snippet-browser).

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

- **Show the node properties** - Shows the properties popup of the selected node and the **DSP Network properties** 
![node-list](/images/interface/node-property-popup.png)

# The Node List

![mode-list](/images/interface/node-list.png)

On the left side of the editor you can see a list of all nodes and parameters of the network:

**Parameters**

This is shortcut to quickly create new Parameters in the outermost container node. Next to the value changer is a little modulation icon with which you can quickly connect their parameter value to node parameters in the map.

**Used Nodes**

A list of all nodes that are currently used in the network. If you click on a node, it will focus the selection (you can select multiple nodes by holding down the command modifier). This can be an effective way of navigating big networks where you need to focus on certain parts.

**Unused Nodes**

This is a list of nodes that have been created but removed from the current processing chain. If you delete nodes, they will be kept around and can be easily reinserted later. You can delete the nodes permanently in the [Add node popup](/working-with-hise/hise-interface/scriptnode-editor#add-node-popup)


# Node Properties

![node-list](/images/interface/node-properties.png)

On the right panel of the Scriptnode Editor you can see the **Node Properties**. It shows the properties of the currently selected node. If you have selected multiple nodes it will show all properties in a list, so that you can edit multiple properties at once.


# Parameter Editing 

One of the most important tasks when developing DSP algorithms is to be able to quickly tweak parameters sliders and set appropriate ranges. There are a bunch of helper tools in Scriptnode that will help you with this. Every parameter slider in scriptnode has a few extra functions worth mentioning:

- **[Click] or [Shiftclick]** on the sliders value to type in a value with keyboard. Accept with [Enter] or clicking into empty space.
- **[Double Click]** a slider to remove a modulation parameter (cable).

## Parameter popup

![](/images/custom/editparameters.png)

**[Right clicking]** on a slider will open up a popup menu where you can edit its raw slider properties. This gives you full flexibility and precision in setting values but the range editor (see below) features a few QOL (quality-of-live) functions that may ease the process. 

## The Range editor

If you hover over a slider it will show a **bidirectional arrow icon** on the top left. Clicking on that arrow will open the range editor.

![](/images/custom/rangeeditor.png)

> Hold [ALT] to preview and edit the range view when hovering over different sliders.

You can change the sliders properties with:

- **Dragging the edges (left and right)** to change the minimum or maximum value
- **Dragging in the middle (up and down)** will change the skew value of the range
- **Shift click on the edges (left and right)** to enter a value with keyboard (shift clicking in the middle to change the mid point to calculate the skew) (accept with [ENTER])
- **Double click** to close the range editor and go back to the slider display.

This range will be used to convert incoming parameter values (cables). An example: If you have a parameter that is mapped from 2 to 4 sent in to a normalised value of `0.5` (either through modulation or another parameter), it will calculate the actual value using that range (so in this case 3). Changing the range of the knob will also change this, so if you change the maximum to 6, it will then set the value to 3.

> Normalised modulation is just the default mode of operation in scriptnode, but there is also another mode which bypasses the target range and sends the raw value. This is called `unscaled` modulation. If you want to read more about this, take a look at the [`control`](/scriptnode/list/control) factory.


Right clicking on a range editor will open a context menu with options to:

| Item | Description |
| --- | ---- |
| Make sticky | Enabling this will keep the range editor visible after you hovered over it. |
| Load Range preset | This will show a submenu with a selection of available range presets (see below). |
| Save Range preset | You can also save your own range presets which will then show up in the list. |
| Reset range | this will reset the range to the original range. |
| Reset skew | this will remove the skewing making it a linear range. |
| Invert range | this will invert the parameter so that it goes from maximum to minimum. Obviously this is only interesting when the parameter is controlled by another source. |
| Copy range to source | If the parameter is connected to a source, this will make the source range copy the target range. If you have a single connection, this makes sense as it avoids the conversion between source and target range. Note that if you have a single connection with different ranges, it will show a warning sign at the meta parameter and clicking on this will perform the exact same operation as this. |


# Script driven nodes

Scriptnode features nodes that evaluate a script to produce or manipulate audio: After creating a new file, you can click on the little `Open in..` symbol on the nodes surface to open its script in the [Code Editor](/working-with-hise/hise-interface/code-editor).

- The [Snex node](/scriptnode/list/core/snex_node) in which you can use HISEs own jit compilable [SNEX](/scriptnode/manual/snex) language. 

- The [Faust node](/scriptnode/list/core/faust) in which you can use the [Faust](https://faust.grame.fr/)(Functional Audio Stream) language and process it in HISE.



