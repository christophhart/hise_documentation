---
keywords: UserPresetHandler
summary:  An object for customizing the data model
author:   Christoph Hart
modified: 01.06.2021
---

The `UserPresetHandler` object can be used to customize the data handling of your project. You can attach callbacks to certain events (eg. loading user presets), define a custom data object that will replace the default XML structure of a user preset and add custom automation parameters. In order to use it, create it with [Engine.createUserPresetHandler()](/scripting/scripting-api/engine#createuserpresethandler) and then use one of its methods.


```javascript
const var UserPresetHandler = Engine.createUserPresetHandler();
```

> It's considered best practice to only have one of these objects around.