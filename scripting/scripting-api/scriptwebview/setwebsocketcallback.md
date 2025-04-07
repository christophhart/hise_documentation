This registers a callback that will be notified whenever you send anything through the established WebSocket connection.

It expects a function with a single parameter which will hold the data coming in from the webview. You can expect three data types:

1. A String when you send a string.
2. A JSON object when you send a JSON object (or Array) that was stringified. Note that you cannot send a JSON object directly, but use `JSON.stringify(myObject)` in Javascript (see below)
3. A Buffer object when you send a `Float32Array` from your webview.

In your webview code, you can use `HiseWebSocketServer.send()` to send the data back to HISE.

```javascript
// webview
HiseWebSocketServer.send("send some string");

// HISE
// data will be a plain string
ScriptWebView.setWebSocketCallback(function(data)
{
	Console.print(data) // "send some string"
});

// webview
const x = { "key1": 12, "key2": "some value"};
HiseWebSocketServer.send(JSON.stringify(x));

// HISE
// data will be a JSON object that you can trace to view
ScriptWebView.setWebSocketCallback(function(data)
{
	Console.print(trace(data)) // { key1: 12, key12: "some value" }
});

// webview
const x = new Float32Array(512);
for(i = 0; i < x.length; i++)
	x[i] = Math.random();
HiseWebSocketServer.send(x);

// HISE
// data will be a Buffer object
ScriptWebView.setWebSocketCallback(function(data)
{
	Console.print(data.length) // 512
});
```

Note that the execution order is guaranteed to be the same as you send the values, so you can send multiple messages at once and expect it to come into HISE in the same order.