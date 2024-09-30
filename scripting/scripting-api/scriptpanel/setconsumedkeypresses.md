A key stroke from your computer keyboard can be registered to fire a callback using [ScriptPanel.setKeyPressCallback()](/scripting/scripting-api/scriptpanel#setkeypresscallback). However if you do this, you most likely want this key stroke to be "consumed" (so it won't trigger other actions as it progresses upwards the component tree).

Before this method was introduced, you had to return `true` in the callback for a consumed key press (the JUCE keyboard callbacks work similar to this so I copied the behaviour), but that forced the callback to run synchronously in the message thread which is not ideal - also if you forget to return true (which [everybody](https://github.com/christophhart/HISE/issues/511) did), the callback ended up being fired multiple times which caused some irritations.

So instead this method was introduced that you must call **before**  calling `setKeyPressCallback()` with either a single key press "object" or an array of key presses. A key press object can be either a string description of the key press like it's supplied in the callback argument or a JSON object like the callback parameter. 

> You can also use the special string `"all"` to make the component consume every single key stroke, which is the default behaviour when you don't call this method (so compiled plugins will still work as they don't report compilation errors). 

> There is another special string `"all_nonexclusive"` that you can pass into this function which will fire the script callback for each key press but not consume it so it can be processed further (a use case for this would be to attach additional functionality to a [ScriptLabel](/scripting/scripting-api/scriptlabel))

By using the same format as the callback parameter you can use this procedure for creating the filter list:

1. Call this function with "all".
2. Register a key callback, then dump the parameter JSON object.
3. Hit the key combination(s) that you want to consume.
4. Copy the JSON objects from the console into this function call.
5. Cleanup and paste the objects back into the first function call

So if you use this:

```javascript
const var panel = Content.addPanel("p", 0, 0);

panel.setConsumedKeyPresses("all");

panel.setKeyPressCallback(function(obj)
{
	Console.print(trace(obj));
});
```

then clicking on the panel (to gain focus) and pressing any key will yield something like this output:

```javascript
Interface: {
  "isFocusChange": false,
  "character": "",
  "specialKey": true,
  "isWhitespace": false,
  "isLetter": false,
  "isDigit": false,
  "keyCode": 63238,
  "description": "shift + F3",
  "shift": true,
  "cmd": false,
  "alt": false
}
```

This JSON object is a bit noisy as it provides additional information that we don't really need so we can reduce the number of required properties and paste it back into our first function call:

```javascript
panel.setConsumedKeyPresses({
  "keyCode": 63238,
  "shift": true,
  "cmd": false,
  "alt": false
});
```

So from now on, the function will only react on "Shift + F3 key presses". If you use a single key press this also brings the additional benefit of not having to branch at all so you can just rawdog your logic into the callback without any if checks.

