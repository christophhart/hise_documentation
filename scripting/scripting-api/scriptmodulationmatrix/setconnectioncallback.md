This function will be executed whenever a connection was added or removed. It expects a function / callable object with three parameters:

1. the source ID
2. the target ID
3. whether it was added or removed.

Note that this function will be executed for every connection, so if you clear all connection at once it will be executed multiple times. So if you use a broadcaster for the notification callback make sure you enable the queue with [Broadcaster.setEnableQueue()](/scripting/scripting-api/broadcaster#setenablequeue), otherwise it will only fire with the last event.

```javascript
const var m = Engine.createModulationMatrix("Global Modulator Container1");

// setup a connection callback
m.setConnectionCallback(function(source, target, wasAdded)
{
	// dump the event data
	Console.print(trace({
		source: source,
		target: target,
		wasAdded: wasAdded
	}));
});

// connect the LFO to the OSC1 Gain target
// It assumes that you have set this up!
m.connect("LFO", "OSC1 Gain", true);

// Clear the connection again
m.clearAllConnections("");;
```

Output:

```
Interface: {
  "source": "LFO",
  "target": "OSC1 Gain",
  "wasAdded": true
}
Interface: {
  "source": "LFO",
  "target": "OSC1 Gain",
  "wasAdded": false
}
```