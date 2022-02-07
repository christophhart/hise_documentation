This method takes the credentials object that was passed into [`Expansionhandler.setCredentials()`](/scripting/scripting-api/expansionhandler#setcredentials) and embeds it into the given .hxi file, then copies this file as `info.hxp` to the expansion folder.

The most basic example for how to use it would be to show a browser to the user,
let it select a downloaded hxi file and then call this function in the file callback:

```javascript

// Create a wrapper object around the expansion handler
const var expHandler = Engine.createExpansionHandler();

function installExp(hxiFile)
{
    expHandler.encodeWithCredentials(hxiFile);
};

FileSystem.browse(FileSystem.Documents, 
                  false,   // read
                  "*.hxi", // hxi
                  installExp); // callback
```

But you can of course implement a more complex system using the Server download API.