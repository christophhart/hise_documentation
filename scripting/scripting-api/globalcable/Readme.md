---
keywords: Global Cable
summary:  A script reference to a cable object of the Global Routing System
author:   Christoph Hart
modified: 11.09.2022
---
  
`Global Cables` can be used in order to send values across HISE projects and even from / to OSC sources. If want to attach scripting callbacks to value changes of a global cable or send values from a script, this object will come in handy.

In order to use it, just create a reference to the global routing manager using `Engine.getGlobalRoutingManager()`, then call `GlobalRoutingManager.getCable(id)` with a unique ID for the given cable. Then you can send values through it, attach synchronous and asynchronous callbacks, add some range conversion tools etc.

### Using a cable as OSC address

If you want to use a cable as OSC address that can send and receive values from external applications, you just need to prepend `/` before the id, so any cable that has an ID like this:

```
/some_osc_id
```

will automatically be used as OSC address as soon as you start using the global routing system as OSC server.


### External C++ communication

The global cable is the preferred way of communicating values back from your C++ node. Take a look [here](/scriptnode/list/routing/global_cable) for a description on how to use it.