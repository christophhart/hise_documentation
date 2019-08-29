The `AdditionalSourceCode` directory in the project folder of a HISE project is reserved for C++ files which will be compiled on plugin export.  
In an expansion pack, this directory can be used for any arbtitrary kind of text content, however the most useful recommended format to use for this is JSON.

This method (and it's friend [`Expansion.writeDataFile()`](/scripting/scripting-api/expansion#writedatafile) can be used to fetch (and write) data to this directory.