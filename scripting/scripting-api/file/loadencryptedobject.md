This function will load a JSON object from a file that has been written with [`File.writeEncryptedObject()`](/scripting/scripting-api/file#writeencryptedobject)

> The encryption uses Blowfish encryption, so it should be able to encrypt / decrypt pretty fast.

You can use these functions to create an authentification scheme that stores the license key in a file in order to bypass online activation.