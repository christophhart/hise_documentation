This attaches a script callback to an automation parameter that was previously registered using  [`Userpresethandler.setCustomAutomation()`](/scripting/scripting-api/userpresethandler#setcustomautomation).

The `automationId` argument must match the `ID` property of one of the existing automation parameters. The function you pass in as `updateFunction` must have a single parameter that will contain the parameter value when the parameter is changed. You can decide whether the execution of the parameter should be done synchronously (in the audio thread) or deferred on the UI thread depenending on your use case.

> Unlike the `setControlCallback()` function, registering an additional callback will **not** override the connections defined with the `connections` property so it can be used to perform additional tasks.

Use `clearAttachedCallbacks()` in order to remove previously registered functions.