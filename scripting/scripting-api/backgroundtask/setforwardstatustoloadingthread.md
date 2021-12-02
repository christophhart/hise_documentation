There is another background thread in HISE that is used for preset / sample loading as well as for other heavyweight tasks. This offers a convenient notification system that you might already use in your project. In this case you can call this method with `true` and it will forward any status changes of this task. This includes:

- [ScriptPanel.setLoadingCallback()](/scripting/scripting-api/scriptpanel#setloadingcallback): will be called when the task starts / stops
- [Engine.getPreloadMessage()](/scripting/scripting-api/engine#getpreloadmessage): will return the message passed in with `setStatusMessage()`
- [Engine.getPreloadProgress()](/scripting/scripting-api/engine#getpreloadprogress): will return the task's progress

> Be aware that this only captures the notification system for the time the task is active but does not lock the real loading thread so if you spawn a task on the main loading thread (eg. loading a samplemap) while your custom task is active, it might create glitches and inconsistent notifications.