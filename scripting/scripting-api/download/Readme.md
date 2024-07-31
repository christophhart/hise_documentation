---
keywords: Download
summary:  A scripting reference to a download
author:   Christoph Hart
modified: 20.03.2021
---
  
The `Download` object can be used to control / monitor the download of resources. You can create them using [`Server.downloadFile()`](/scripting/scripting-api/server#downloadfile). The callback function you specify there will be executed with a reference of this type as `this` object and you can use the following methods.

During development, you can use the [ServerController](/ui-components/floating-tiles/hise/servercontroller) floating tile to inspect the downloads. 