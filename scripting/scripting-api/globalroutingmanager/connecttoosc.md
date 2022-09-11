The Global Routing Manager can also be set to send and receive OSC messages by calling this method. It expects two arguments, the first one is a JSON object containing the connection data. The second argument is a function with a single argument that will handle any OSC error messages.

The OSC support with this system is not fully standard compliant to OSC, but is limited to the scope of the Global Routing system:

- only single value OSC messages are allowed (anything else will throw a custom error)
- only bool, integer and float messages are allowed (the integer types are converted automatically)

### The connection data

The JSON object that comes in as first argument describes the URLs and ports for receiving / sending OSC messages. There are sensible default values so you don't need to fill in all properties.

| Property | Description | Default |
| --- | -___------ | ------ |
| `Domain` | The "root" URL for your application. Must start with a `/` and must not end with a `/` | `"/hise_osc_receiver"` |
| `SourceURL` | The IP address for the source URL. Can be left empty to use the local host. | "127.0.0.1" |
| `SourcePort` | The port number for listening to incoming OSC messages | 9000 |
| `TargetURL` | The IP address for the target URL. Can be left empty to use the local host. | "127.0.0.1" |
| `TargetPort` | The port number for outgoing OSC messages. If you omit this or set it to -1, it will deactivate OSC output. | -1 |

### Example

```javascript
const var rm = Engine.getGlobalRoutingManager();

inline function printError(message)
{
	Console.print(error);
};

rm.connectToOSC({
	"Domain": "/myDomain",
	"SourcePort": 6666,
	"TargetPort": 6667
}, printError);

// Create a cable with a OSC subdomain
const var testCable = rm.getCable("/fader1");

// register an async callback that just prints the value
testCable.registerCallback(function(newValue)
{
	Console.print(newValue);
}, false);

// Now you can start sending OSC messages with the domain "/myDomain/fader1" to the port 6666 and
// it should show up in the HISE console...

// Let's add a knob and send its value through the cable
const var Knob1 = Content.addKnob("Knob1", 0, 0);

inline function onKnob1Control(component, value)
{
	// Changing the knob should now update your source OSC app
	// (if the port is set to 6667)
	testCable.setValue(value);
};

Knob1.setControlCallback(onKnob1Control);
```

