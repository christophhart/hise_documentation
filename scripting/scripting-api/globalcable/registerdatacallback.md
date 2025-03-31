This will register a callback that receives any data that was transmitted over this cable. It can come from two sources:

1. The scripting method [Global Cable](/scripting/scripting-api/globalcable#senddata)
2. A external C++ node using the [C++ function](/scriptnode/list/routing/global_cable#sending-/-receiving-arbitrary-data-through-a-global-cable-in-c++)

The function expects a callable object with a single parameter that will contain the data that is transmitted.

```javascript

// Create a global routing manager
const var rm = Engine.getGlobalRoutingManager();

// Create the data cable
const var dataCable = rm.getCable("dataCable");


// Register the callback
dataCable.registerDataCallback(function(data)
{
	Console.print("DATA: " + trace(data));
});

// Create some arbitrary data
const var bf = Buffer.create(32);
bf[10] = 90.0;

// Send the data over (this will not fire the callback above
// but other targets)
dataCable.sendData([bf, 100, "a string"]);
```

> The function is always being called synchronously and it creates a deep copy of the entire data for each target so this might be not the best solution in a scenario that requires fast communication (eg. UI updates of buffers etc).
