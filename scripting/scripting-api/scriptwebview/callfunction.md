You can use this method in order to (asynchronously) call a JS function that is visible to the global scope (=attached to the global windows). This function should not be called on the audio thread as it involves string allocation and JSON parsing, so make sure you defer the call if you want to react on a MIDI input (or signal cable).

#### HiseScript

```javascript
wv.callFunction("someFunction", {"value": Math.random()});
```

#### Javascript in your webview:

You will need to define a JS function in your webview code somewhere like this:

```javascript
// I'm not a web guy, but tucking it to the window object raises the chances of it being
// resolved correctly...
window.someFunction = function(args)
{
	console.log(args.value); // something between 0 and 1...
};
```

> Note that there is no return value (because it can't be guaranteed that there is a webview present and if it is the function will be executed asynchronously on the message thread.

