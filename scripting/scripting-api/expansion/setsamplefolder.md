Be aware that this function will not move any samples to the new location, so the user has to do this step manually.  
The most recommended way to choose a sample folder is during the installation from a package using the [`ExpansionHandler.installFromPackage()`](/scripting/scripting-api/expansionhandler#installexpansionfrompackage) call.  
However this function let's you offer the user a way to fix a false sample path without having to hack around with a text editor.

It's also recommended to hint to the user that he might want to restart the plugin after changing this location in order to remove any chances that the old sample path is still being cached somewhere.