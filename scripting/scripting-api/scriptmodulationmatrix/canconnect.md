This method checks whether the source and target IDs are valid (= they exist) and are not connected.

- it returns true if both IDs are valid and there is no connection
- it returns false if one of the IDs are invalid or there is already a connection

Note that you don't need to call this method if you intend to call [connect()](/scripting/scripting-api/scriptmodulationmatrix#connect), as this method performs this check internally too.