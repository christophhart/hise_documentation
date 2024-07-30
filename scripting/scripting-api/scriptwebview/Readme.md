---
keywords: ScriptWebView
summary:  A native embedded browser component
author:   Christoph Hart
modified: 27.05.2023
---
  
The `WebView` component allows you to render parts of your UI with the native browser technology on your OS. The integration into HISE is pretty straightforward and it allows bidirectional communication and resource management.

In order to use the Webview, just create it, set its bounds and then give it a root directory and a initial file to render. 

### Component Properties

There are a few special component properties that can be used to define the behaviour of the WebView

| Property | Description |
| =====    | =========== |
| `rootDirectory` | A folder on your harddrive that will be used as root folder for all URLs |
| `indexFile` | A relative file path from the root directory to the HTML file you want to display initially. |
| `enableCache` | If this is true, then it will not reload the files from disk and cache every resource that you have requested. Usually you want to keep this off during development and then set it to true when you're done (this property needs to be enabled when you want to embed & export the web resources) |
| `enablePersistence` | if true, then every function call and JS code passed into evaluate() will be logged and called when a new webview is created. This allows a persistent state (see below for a more detailed explanation |

In addition to the "trivial" integration of a native webview handle into HISE there are a few quality of life improvements that will make working with a webview in HISE more
straightforward:

### Resource management

During development, the files will be loaded from disk but for a compiled plugin you can embed all the resources into your plugin and load it from memory (so that you won't have to distribute the web files to the end user).

> The embedding of the resources is purely optional and depends on whether the web resource root directory is a child of the HISE project folder - if it is, then we'll assume that the end user will not have your HISE project folder and embed it, but if the web root is somewhere else (eg. the app data folder) then we'll assume that you will prefer installing the web files on the end user's machine.

Also keep in mind that if you want to embed the resources that have to be loaded at the time you export the plugin.

### Automatic scaling 

We're still living in plugin-world where responsiveness is not the status quo and the only thing that people have started to expect is to resize the UI while keeping the aspect ratio the same. The zoom level system of HISE is extended into the webview, which means that whenever you change the scaling factor it will resize the UI handle and change the browser's zoom level to match the scale factor (exactly as if you would use Ctrl+/- in your browser).

### Persistence

The lifetime of the webview is decoupled from the application state so we need to find a way to tell a webview that was created later to be updated to the current app state. For example if you show the value of a slider in the web view you would want it to display the correct slider value if you close and reopen the plugin window. The way that HISE handles this is that it keeps track of all communication between the HISE layer and the webview and then "repeats" every message after a new webview has been created (think of it as a "recap of everything that happened until now").

There are a few things to keep in mind:

1. The WebView should be considered as a pure, stateless UI element that can be destroyed and recreated without interrupting the data model or signal processing of your plugin (since that's how plugins work). Updating the data model will always be the responsibility of HISE.
2. The Webview is a native UI handle that is placed on top of the plugin interface. This means that you can't use any alpha blending or masking and put UI elements behind / infront of it.
3. During development, this might create a few glitches (the scale factor might be off if you're displaying a webview in the Interface designer, or it might overlap   components there.
   
> Make sure to checkout the tutorial project in the [HISE  tutorial](https://github.com/christophhart/hise_tutorial/WebViewExample) repo which contains multiple use cases

