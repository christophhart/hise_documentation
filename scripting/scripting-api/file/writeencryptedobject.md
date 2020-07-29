This function will encrypt the JSON object with the given key and write it to the specified file. The key can be up to 72 characters long.  

In order to read the encrypted file, use [`File.loadEncryptedObject()`](/scripting/scripting-api/file#loadencryptedobject) with the same key.