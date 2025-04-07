This function will enable a bidirectional communication over a [Websocket](https://en.wikipedia.org/wiki/WebSocket) connection between HISE and any webview that is shown on the screen. After a connection is established, you can use [`ScriptWebView.sendToWebsocket()`](/scripting/scripting-api/scriptwebview#sendtowebsocket) to send messages and add a callback that listens to data coming back from the WebView with [ScriptWebView.setWebSocketCallback()](/scripting/scripting-api/scriptwebview#setwebsocketcallback)

#### WebSocket vs direct communication

A websocket is an alternative option to the direct using the [ScriptWebView.bindCallback()](/scripting/scripting-api/scriptwebview#bindcallback) and [ScriptWebView.callFunction()](/scripting/scripting-api/scriptwebview#callfunction) functions. Here is a overview of the advantages of each concept:

| Topic | WebSocket | Direct communication |
| - | --- | --- |
| **Data** | large data blobs (eg. audio streams / images) | simple data (text, small JSONs) |
| **Development** | possible to develop the entire webview in a separate browser | more tightly coupled to HISE (can't communicate with "external" webviews). |
| **Setup** | more complicated setup, requires additional code in the webview | just bind & call the functions you want. |


#### Client side (Webview Javascript)

In order to streamline the implementation of the websocket communication with HISE, there is a minimal framework that contains a `HiseWebSocketServer` class that handles all the communication.

In order to load the framework, just need to include this script in your HTML header:

```xml
<head>
<script src="hisewebsocket-min.js"></script>
</head>
```

> Note that you don't need to provide the actual `hisewebsocket-min.js` file as it's embedded in the webview wrapper and will automatically be loaded. However if you want to develop your webview through an external IDE, you will have to manually provide that file. Just copy this minified JS beauty into the root directory where your `index.html` file resides:

```javascript
class HiseWebSocketServer{constructor(e){this.port=e,this.eventListeners=[],this.initQueue=[],window.addEventListener("load",this.initialise),window.addEventListener("beforeunload",this.onUnload)}onUnload=()=>{this.socket.close()};onReader=e=>{let t=new Uint8Array(e.target.result),s=this.parseWebSocketMessage(t);for(let i=0;i<this.eventListeners.length;i++)this.eventListeners[i](s.id,s.data)};onMessage=e=>{let t=new FileReader;t.onload=this.onReader,t.readAsArrayBuffer(e.data)};initialise=()=>{console.log("PORT: "+this.port),this.socket=new WebSocket("ws://localhost:"+this.port),this.socket.onmessage=this.onMessage,this.socket.onopen=this.sendInitMessages};sendInitMessages=()=>{for(let e=0;e<this.initQueue.length;e++)console.log("send init message"+this.initQueue[e]),this.send(this.initQueue[e]);this.initQueue=[]};parseWebSocketMessage(e){let t=0,s=1==new DataView(e.buffer,t,1).getUint8(0,!0);t++;let i=new DataView(e.buffer,t,2).getUint16(0,!0);t+=2;let n=new TextDecoder().decode(e.slice(t,t+i-1));t+=i;let o=new DataView(e.buffer,t,4).getUint32(0,!0);t+=4;let r;return r=s?new TextDecoder().decode(e.buffer.slice(t,t+o)):new Float32Array(e.buffer.slice(t,t+o)),{id:n,data:r}}addEventListener(e){this.eventListeners.push(e)}send(e){this.socket?this.socket.send(e):this.initQueue.push(e)}}
```

Now you can use the framework to create a HiseWebSocketServer object. It's recommended to put the initialisation code into a separate function and then call this from HISE to initialise the websocket server after everything has been loaded:

```javascript
<script>
var server;
// this function will be called from HISE when everything is loaded
window.initWebSocket = function(port)
{
	
	// create a new instance of the WebSocket server that connects to HISE
    server = new HiseWebSocketServer(port);

	// Adds a function that receives the id and data that you send to the webview
    server.addEventListener(function(id, data)
    {
		console.log(id, data);
    });
}
</script>
```

Now in HISE you can initialise the websocket like this:

```javascript
const var wv = Content.addWebView("wv", 0, 0);

// just pick a random port and hope that there will be no collisions...
const var PORT = parseInt(Math.random() * 65536);
wv.setEnableWebSocket(PORT);

// we pass in the random port number to the initialisation function that opens
// the server connection on the webview
wv.callFunction("initWebSocket", PORT);
```

> Note that choosing a random port number allows multiple plugin instances to communicate with their interface (while living with the 1/65536 chance of a collision, but that's life). However using a static / constant port number can also be used to implement a cross-instance communication across all plugin instances!

#### Data Types

The `data` parameter that is passed to any callback that you register with `HiseWebSocketServer.addEventListener()` contains the data and is one of two possible data types:

1. A `string` if the data sent from HISE was a [String](/scripting/scripting-api/string). 
2. A [`Float32Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array) if the data sent from HISE was a [Buffer](/scripting/scripting-api/buffer) object.

Note that the second data type is specifically added for transferring audio buffers between the webview and HISE to implement custom waveforms / oscilloscopes etc. If you want to send a JSON object (or a Array), you will need to convert and parse it yourself:

```javascript
// on the HISE side
ScriptWebview.sendToWebsocket("myobject", trace(obj));

// on the Webview side
function onWebSocketMessage(id, data)
{
	let obj = JSON.parse(data);
}
```
