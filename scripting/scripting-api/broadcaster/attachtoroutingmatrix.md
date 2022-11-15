This function attaches the broadcaster to a routing matrix of one or more processors to be notified whenever the routing changes (so either the channel configuration or the amount of channels). In order to use this function, the broadcaster must have two arguments, the first will be the processor ID and the second one a [Routingmatrix](/scripting/scripting-api/routingmatrix) object that you can query in your callback.

> Be aware that you must not call any functions in a listener callback that itself causes the routing matrix to change or you will end up with an infinite loop!

```javascript
const var bc = Engine.createBroadcaster({
	"id": "router",
	"args": ["id", "matrix"]
});

bc.attachToRoutingMatrix("Sine Wave Generator1", "script matrix");

bc.addListener("", "dudel", function(id, matrix)
{
	// this just prints out where the sine wave generator is mapped
	Console.print(trace(matrix.getDestinationChannelForSource([0, 1])));
});
```