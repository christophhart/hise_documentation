If something goes wrong with the initialisation of an expansion, you can specify a function that is called with an error message that you can show to the user somehow.

The function you pass as `newErrorFunction` must have two parameters:

1. the error message
2. a flag indicating a critical error (a critical error will stop the plugin).

This function will be called by the expansion logic inside HISE, however you can also call it manually using the  [`Expansionhandler.setErrorMessage()`](/scripting/scripting-api/expansionhandler#seterrormessage) function

Be aware that the error function is owned by the wrapper object not the global expansion manager (so it goes out of scope as soon as the wrapper object is destructed).