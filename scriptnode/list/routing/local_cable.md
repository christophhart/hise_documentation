---
keywords: local_cable
summary:  A node for replacing cable connections within a network
author:   Christoph Hart
modified: 07.10.2024
---
  
The functionality of this node is similar to the [global_cable](/scriptnode/list/routing/global_cable) node but the connections are scoped to the network only (hence the name **local**). You can use it in complex patches to improve the clarity of the network which might look convoluted with lots of cable connections.

Here's a (pretty random) network with lots of connections:

![](/images/custom/scriptnode/local_cable_dirty.png)

If we now send every root parameter into a dedicated local_cable and then add connections by adding matching local_cable nodes in the vicinity of the targets, we get a much cleaner looking network:

![](/images/custom/scriptnode/local_cable_clean.png)

### UX Helpers

There are a few functions that will improve the workflow when using local cables. The first thing you'll notice is that there is a list of all local cables:

![](/images/custom/scriptnode/local_cable_list.png)

- the dot will show the current value as LED indicator giving you a quick overview over the current value of each cable
- Clicking on one of them will highlight all occurence of local_cable nodes that use that ID (and unfolding its parents if they are hidden). 
- Right click and select "Replace local cable with direct connections" will remove all nodes and replace the connections with a plain ol' cable. This is fully undoable.

The inverse operation (turning cables into connections through a local_cable) can be achieved from the connections editor. Right click on any modulation source (either draggers or sliders) to see a list of connections:

![](/images/custom/scriptnode/local_cable_connections.png)

Click on the second icon to the left to replace the connection with a local cable. You will be asked to supply a ID for the connection for further customization. Also undoable.

> Note that this function will detect whether to create a `local_cable` node or its unscaled brother, the `local_cable_unscaled` node based on the connection type that it should replace.

With these two functions you should be able to reorganize your networks to yield a nice clean looking appearance. Note that if you compile the networks, it will internally remove all local_cables and replace it with the normal connections (so basically the step that you perform with the right click option in the list).