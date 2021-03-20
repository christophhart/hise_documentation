---
keywords: ServerController
summary:  A floating tile for debugging server activity
author:   Christoph Hart
modified: 20.03.2021
---
  

The ServerController floating tile offers a few helpful tools during the development of [Server](/scripting/scripting-api/server) related tasks. It shows a list of all outgoing URL requests, their state / metrics and the parameter and JSON response.  
Also it contains a list of all downloads and some tools to start / stop / resume the downloads and show the target location

## Toolbar

At the top of this floating tile you'll find a few buttons which allow you to show / hide the data tables and control the server state:

- The status LED will indicate the state of the server
- The Play / Pause button will control whether the server thread will be executing the requests. You can use this for stepping through the requests while debugging
- You can delete completed downloads / invalidated URL requests
- Show / Hide the URL Request Table / Download Table

## URL Request Table

The URL request table displays every call to `Server.callWithGET()` / `Server.callWithPOST()` and offers a few tools to help with server development:

| Column | Description |
| - | ----- |
| **LED** | An colour icon that shows the state (grey = not executed, green = OK, red = some error code) |
| **Status** | The HTTP status code for that request |
| **URL** | The exact URL that is called |
| **Timestamp** | The time since the last `Server.setBaseURL()` call (which can be considered as *server uptime*) |
| **Duration** | The exact time that the server took for the response in milliseconds |
| **Parameter** | A button that opens a JSON editor with the parameters that were used in the URL request. You can edit the parameters and then press F5 to change them in the original URL - which might be handy before you resend the request |
| **Response** | If the status code was 200 (OK), you can inspect the JSON response by clicking here. |
| **Resend** | Resends the URL request again (and executes the callback when there is a response). This is the same as calling the script function again. |

> Be aware that if you recompile your script, you will loose the ability of resending an URL request (because the callback is invalidated by the recompilation).

## Download Table

This table will show a list of all downloads and offer some tools to stop / resume the download. If you are implementing your own download display using ScriptPanels, this table will help you validate the functionality.

| Column | Description |
| -- | ------- |
| **LED** | A colour icon with a status indicator |
| **Status** | A descriptive text for the download status |
| **URL** | the source URL of the download |
| **Download Size** | The amount of downloaded data / the download size |
| **Download Speed** | The download speed |
| **Pause** | Allows you to pause / resume the download |
| **Abort** | Cancels the download (and deletes the downloaded file) |
| **ShowFile** | Opens an Explorer / Finder and shows the target file |

Everything that is being displayed in this table can be queried using the `Download`(LINK!) object. In combination with dynamic ScriptPanels using [this method](/scripting/scripting-api/scriptpanel#addchildpanel) you can implement a fully customizable view of the pending downloads.