If you encrypt Expansions for your project, you most likely want to avoid that the user can just load in unencrypted expansions. In order to prevent this, you can specify the types that can be loaded using this method.

> During development / debugging you will need to have all types enabled, but don't forget to change that before release.

The argument must be an array with numbers for the type that are available as constants of the ExpansionHandler class:

```javascript
ExpansionHandler.FileBased
ExpansionHandler.Intermediate
ExpansionHandler.Encrypted
```

