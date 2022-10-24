This creates a [Broadcaster](/scripting/scripting-api/broadcaster) object that can listen to value changes. The argument you pass in here is a metadata object that describes the properties of the Broadcaster.

```javascript
/** If you start a comment with `/**` it will get attached to the metadata objects as `comment` property. */
const var bc = Engine.createBroadcaster({
	"id": "My Broadcaster",              // give it a meaningful name
	"colour": -1,                        // assign a colour (-1 just creates a random colour from the ID hash)
	"tags": ["audio", "value-handling"], // assign some tags
	"args": ["myValue", "isPlaying"]
});
```

The information from the metadata will vastly help the broadcaster map appearance, so from the example code you'll get this beauty:

![](/images/custom/broadcaster/createbroadcaster.png)

In addition to the usual properties you also need to supply an array of strings called `args` which will define the argument amount and name. They will all be initialised to `undefined` so that the callbacks only start happening when you assign a value to them (or the event source does this for you).

> Be aware that every function you pass into `Broadcaster.addListener()` will need to have as many parameters as you define with the `args` property or it will cause an error message. Also if you are planning to attach the broadcaster to a predefined internal event (eg. component property changes), the numbers must also match the expected argument amount (in this particular case: 3)

