If the user has installed a new expansion, you will need to call this function in order to refresh the list of expansions and initialise new expansions.  
The function will go through all the folders in the expansion root folder and tries to initialise any expansion that isn't loaded yet (either because it is new **or because it couldn't been initialised yet because of missing encryption information**).  
This step is only necessary when you implement a manual installation routine, but it will be called automatically at these events:

1. User enters license credentials (causes a reload of all encrypted expansions with the new user credentials)
2. User encodes a new Expansion with [`Expansionhandler.encodeWithCredentials()`](/scripting/scripting-api/expansionhandler#encodewithcredentials) (will be called automatically afterwards).
3. User installs an expansion from a package with [`Expansionhandler.installExpansionFromPackage()`](/scripting/scripting-api/expansionhandler#installexpansionfrompackage)