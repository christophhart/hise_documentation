This creates a [Broadcaster](/scripting/scripting-api/broadcaster) object that can listen to value changes. The argument you pass in here define the default parameters and can be one of three things (in ascending order of coolness):

1. A single value (eg `42`)
2. An array of values (eg `[42, false]`)
3. A JSON object with named properties (eg. `{"number": 42, "isFunky": false}`).

The advantage of using a JSON method is that it will display these property IDS in the script watch table (if you use an array or a single value, it will be called `args0`).

> Be aware that every function you pass into `Broadcaster.addListener()` will need to have as many parameters as you define here or it will cause an error message. Also if you are planning to attach the broadcaster to a predefined internal event (eg. component property changes), the numbers must also match the expected argument amount (in this particular case: 3)

