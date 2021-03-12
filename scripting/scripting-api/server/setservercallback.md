You can use this function to implement some kind of notification to the user that there is something waiting for a response of the server and there is some internet activity.

For a real world use case you might to show some element spinning and then hide it when ready, but in this example, we'll just log to the Console:

```javascript
Server.setBaseURL("https://forum.hise.audio/api");
Server.setServerCallback(function(isWaiting)
{
    Console.print(isWaiting ? "SERVER IS BUSY" : "DONE");
});

function printName(status, obj)
{
    if(status == 200)
        Console.print(" " + obj.username);
};

// Now hammer the queue with the top 5 Posters
Server.callWithGET("user/d-healey", {}, printName);
Server.callWithGET("user/christoph-hart", {}, printName);
Server.callWithGET("user/ustk", {}, printName);
Server.callWithGET("user/Lindon", {}, printName);
Server.callWithGET("user/hisefilo", {}, printName);
```

The output:

```
Interface: SERVER IS BUSY
Interface:  d.healey
Interface:  Christoph Hart
Interface:  ustk
Interface:  Lindon
Interface:  hisefilo
Interface: DONE
```

As you can see the start / end callback is only called once. Be aware that this callback is not used when there is a download in progress as this has it's own notification tools.