---
keywords: Control
summary:  A node factory containing utility nodes for modulation connection manipulation
author:   Christoph Hart
modified: 03.07.2022
---
  
The control factroy has nodes that allow you to modify the values sent through the modulation and parameter connections. Most of the nodes in this factory do not process the audio signal (so the placement in the network does not matter). Instead they have a modulation source and a "Value" parameter that is supposed to be modulated so that you can inject the node into a cable selection like this:

![](/images/scriptnode/inject_control_node.png)

So instead of connecting the Parameter directly to the add node, the [bipolar](/scriptnode/list/control/bipolar) node is injected into the cable flow and will modify the target value.

> Be aware that the modulation update rate is being determined by the container that contains **all** nodes of a cable connection. If you enable CPU profiling, it will also show you the modulation update rate of each cable so you can spot irregularities.

### Scaled and Unscaled

By default, the parameter modulation in scriptnode is using the target parameter's range to find out which value it should send (and if the source parameter is not normalized it will normalize the value first before converting it to the target range).  
An example: The filter frequency goes from 20 to 20000 and is skewed with a mid point of 1000. Now if we connect a modulation source to the frequency parameter, it will use this exact range in order to figure out the value to send: a modulation value of 0.0 would send out 20, a modulation value of 0.5 would send out 1000.0 and 1.0 would send out 20000.0. This is nice because we don't need to bother about converting between different ranges.

> If you change the parameter range of a modulated parameter, it will update the modulation range too, so eg. moving the max frequency down to 4 kHz would result in a mod value of 1.0 to send out 4000.0

If you browse the list of available nodes, you might find that there are a few nodes which have a "unscaled" prefix (along with other nodes which are implicitely unscaled). An unscaled node will completely ignore the target's parameter range and just sends out the value it wants to send. A valid use case for this behaviour would be the [tempo_sync](/scriptnode/list/control/tempo_sync) node: if the tempo changes it needs to update the time according to its parameters and send out exactly that value (as milliseconds) to its connected targets. What range the target parameters are using should not affect the time value. 

> Be aware that the parameter range is not even used for clipping the value, so if the value is outside of the range of the parameter, it will just display the max value but the value outside of the bounds is send to the internal callback.

There are a few other unscaled nodes which can be used to build up a chain of unscaled connections, because a single scaled node in such a chain would "poison" the value range so you would end up with garbage values at the end. You can identify which nodes are unscaled either by looking at the node ID (if it has unscaled in its name, it's most probably unscaled), or if the value parameter has a small *U* icon next to it, it means that this value is being forwarded without any scaling (but you are of course free to change the range of this parameter in order to display it correctly).

> Be aware that even if a node has an unscaled value parameter, it can have other parameters which are still scaled - the [Smoothed_parameter_unscaled](/scriptnode/list/control/smoothed_parameter_unscaled) node for example has a scaled parameter for the smoothing time 