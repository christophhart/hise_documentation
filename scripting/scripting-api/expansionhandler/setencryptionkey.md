Call this function if you want to use the encrypted Expansion type in order to protect your expansions against unauthorized usage. The key you pass in must be a valid Blowfish key, so any String up to 72 characters is fine.

> Be aware that you need to pass in the exact same key you specified in the Project Settings' **Expansion Key** property.

As soon as you call this method, the expansion handler will reinitialise the expansions that are encrypted and try to decrypt them with the new key.
