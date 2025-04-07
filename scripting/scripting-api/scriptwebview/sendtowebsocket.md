This will send some data through the WebSocket connection to the webview. The communication is asynchronous, but not realtime safe.

The function expects two parameters, an `id` and some `data` that you want to send - either a String or a Buffer (or a JSON object that will be converted to a JSON string internally)

The ID will be used to coallascate calls (so subsequent calls with the same ID might only send that last data over to the webview).

> Note that the ID can also be a stringified JSON object, which is a good practice if you want to attach some metadata to a audio buffer that you send over.

