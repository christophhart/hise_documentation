This function can be used to send any kind of arbitrary data to the global cable targets. This can be used for safe communication between different scripts and even external C++ nodes. In order to use this method, just call it with any kind of data and it will be send to all targets that are registered to this cable.

```javascript
const var rm = Engine.getGlobalRoutingManager();
const var c = rm.getCable("myDataCable");
c.sendData({ someJson: 1234, also: "strings are supported" });
c.sendData([ 1, 2, 3, 4, 5, 6]);
c.sendData(Buffer.create(128));
```

Note that there is not a data queue for the sender side of this protocol, which means that if you register a target after the data has been sent, it will not be "initialised" with the previously sent value. However if you're using the C++ API in your external node, it will queue the data that is about to be sent if the cable is not connected yet. 

Also it will skip its own callbacks, so if you register a callback using [Global Cable.registerDataCallback()](/scripting/scripting-api/globalcable#registerdatacallback), it will not be executed:

```javascript
const var rm = Engine.getGlobalRoutingManager();

// Create a instance of a cable
const var c1 = rm.getCable("myDataCable");

// Create a duplicate instance
const var c2 = rm.getCable("myDataCable");

// Register two callbacks to both objects
c1.registerDataCallback(x => Console.print("C1 executed: " + trace(x)));
c2.registerDataCallback(x => Console.print("C2 executed: " + trace(x)));

Console.print("Send through cable 1");
c1.sendData("some data");

Console.print("Send through cable 2");
c2.sendData("some data");

// Output:
// Interface: Send through cable 1
// Interface: C2 executed: "some data"
// Interface: Send through cable 2
// Interface: C1 executed: "some data"
```

As you can see if you send a value through the first cable object it will skip the C1 callback and vice versa. This behaviour is also the same on the C++ side.

