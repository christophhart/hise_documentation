---
keywords: GlobalRoutingManager, OSC
summary:  A HISE-wide message system for sending / receiving normalized float numbers
author:   Christoph Hart
modified: 11.09.2022
---
  
There are many concepts in HISE that allow you to control parameters and send values between different HISE modules:

1. the plain ol' parameter system using Attribute IDs (eg. SimpleEnvelope.Attack)
2. the macro control system that allows 8 controllers to control different modules with customizable ranges
3. grabbing references to scriptnode parameters and call `setValue()` using the scriptnode API
4. Using the `global` variable keyword (not the most recommended way to do things, but that's a comprehensive list right here...)

Depending on your project architecture and development preferences, one of the 4 ways usually get the job done. However there is another system that allows a rather enjoyable workflow with a unique feature set: The Global Routing system. It offers the following features:

- using named pipes that are unique for each HISE project and can send / receive values from / to scriptnode or other sources.
- tools for converting between ranges
- integrated IDE helpers (all global cables show up in the module tree with the possibility of navigating to each connection in the drop down menu).
- send audio signals between nodes (this is rather experimental and quickly leads to issues so use it carefully).
- OSC support

In order to use the global routing system, just use one of the global routing nodes (eg. `routing.global_cable`) and / or call `Engine.getGlobalRoutingManager()` to register scripted functions as callback when a value is sent through the cable.

The nodes can be either used as source by setting their `Value` parameter, or can be used as target by connecting their modulation output to any other parameter in scriptnode.

The communication is supposed to work through normalised (double precision) float numbers (so 0...1), but the scripting API has builtin features to automatically scale, skew or step the incoming value (just like you can edit a parameter range in scriptnode).

As an additional feature, the Global Routing system can also be used to send and receive OSC messages using the `connectToOSC()` method.
