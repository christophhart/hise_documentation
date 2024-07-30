---
keywords: Server
summary:  The API class to communicate with a server
author: Christoph Hart
modified: 17.07.2020
---

The `Server` class offers a basic API for communicating with a server using POST and GET requests as well as functions for downloading resources. 

### Server callbacks

Every method in this class will use the asynchronous execution concept: it will return immediately and execute a function when the server has responded.

```javascript
Server.anyFunction(parameters, function(status, response)
{
    if(status == Server.StatusOK)
    {
        Console.print(response);
    }
});
```

The execution of server calls is guaranteed to be serially and consecutively and will be executed on a separate thread that will never stall the audio or UI thread. Nevertheless it should be obvious that you will never call one of these methods in a MIDI callback, right?

The `status` will be an integer containing the [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). The `Server` API class has a few constants that contains the most important codes (OK, 404, etc).

The `response` argument contains an object with the response from the server.

> This means whatever you do on the server-side, you have to return a valid JSON-formatted text.

### GET vs POST

There are two different kind of HTTP requests, GET and POST. There is plenty of information available about this subject, but the gist of it is that you use GET for non-sensitive data and POST for sensitive data.

### About URLs

In 99% of all cases, you will communicate with a single server. In order to save you some typing, the `Server` API class uses a **Base URL** that you need to setup once using [`Server.setBaseURL()`](/scripting/scripting-api/server#setbaseurl).  

> Calling this method will also start the server thread, so unless you explicitely use it, it won't eat up resources.

From then on, every call to the server just needs a sub URL to work - you also don't need to take care about the slashes:

```javascript
Server.setBaseURL("https:forum.hise.audio");
Server.callSomething("api/recent"); 
// => https://forum.hise.audio/api/recent/
```

### Encryption

If you use SSL for the communication and the POST method for passing around parameters, the communication with the server should be safe enough. However if you want to store any kind of data to a file, please use the [`File.writeEncryptedObject()`](/scripting/scripting-api/file#writeencryptedobject) to make sure that there is no sensitive data lurking around on your hard drive.

### Debugging server calls & downloads

The [ServerController](/ui-components/floating-tiles/hise/servercontroller) floating tile offers a few useful tools that will assist you during the development of Server related tasks, so you might want to consider adding this to the scripting workspace while you're working on your server code.