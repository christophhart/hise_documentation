When the broadcaster is used asynchronously, it will always just send a message for the latest state, so

```javascript
bc.sendMessage(0, false);
bc.sendMessage(1, false);
```

in this example the message with the value `0` will never reach its listeners. This is the default value in order to avoid unnecessary calls to the listeners, however there are a few occasions where you need to guarantee that **every** message gets sent to the listeners. By enabling the queue, it will keep a list of all pending messages and sends out every value to its listeners.

> If you attach certain event sources to a broadcaster, they will automatically switch to queue mode (eg. complex data events).

You can check the state of this value by the icon on the broadcaster map. If this icon appears:

![](/images/custom/broadcaster/setenablequeue.png)

the broadcaster is running in queued mode.
