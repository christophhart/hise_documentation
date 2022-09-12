The Global Routing Manager can also be set to send and receive OSC messages by calling this method. It expects two arguments, the first one is a JSON object containing the connection data. The second argument is a function with a single argument that will handle any OSC error messages.

The OSC support of this system is not fully standard compliant to OSC, but is limited to the scope of the Global Routing system:

- only single value OSC messages are allowed (anything else will throw a custom error)
- only bool, integer and float messages are allowed (the integer types are converted automatically)

However if you want to use more complex data types in OSC messages, you can send and receive them using scripting callbacks, which give you almost the full feature set of OSC (minus binary data blobs and colours).

### The connection data

The JSON object that comes in as first argument describes the URLs and ports for receiving / sending OSC messages. There are sensible default values so you don't need to fill in all properties.

| Property | Description | Default |
| --- | -___------ | ------ |
| `Domain` | The "root" URL for your application. Must start with a `/` and must not end with a `/` | `"/hise_osc_receiver"` |
| `SourceURL` | The IP address for the source URL. Can be left empty to use the local host. | "127.0.0.1" |
| `SourcePort` | The port number for listening to incoming OSC messages | 9000 |
| `TargetURL` | The IP address for the target URL. Can be left empty to use the local host. | "127.0.0.1" |
| `TargetPort` | The port number for outgoing OSC messages. If you omit this or set it to -1, it will deactivate OSC output. | -1 |
| `Parameters` | By default, HISE expects all incoming OSC messages to be within the 0...1 range. However if you can't control the output of your OSC source / target, you can provide a list of parameter ranges as a JSON object with the OSC subdomain as key and a JSON object with the scriptnode range properties as value. It will then transform incoming and outgoing values using the range (see the example below).  | `{}` |

> There is a new FloatingTile (the OSCLogger) which logs all incoming messages with filtering and cable based colour coding so make sure you use it during development / prototyping

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
	"TargetPort": 6667,
	"Parameters":
	{
		"/fader1":
		{
			"MinValue": -1.0,
			"MaxValue": 1.0,
			"SkewFactor": 0.25
		}
	}
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

