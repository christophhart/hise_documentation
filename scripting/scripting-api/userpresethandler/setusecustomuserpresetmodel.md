This function can be used to bypass the default HISE data model (one value per UI element) and roll your own data model with dedicated callbacks for loading and saving the state of your projects (eg. in user presets, DAW save files, init state, etc).

In order to use this function, you need to supply two methods for loading and saving with these signatures:

```javascript
const var uph = Engine.createUserPresetHandler();



inline function onPresetLoad(var obj)
{
	// do something with `obj`
}

inline function onPresetSave()
{
	return { "MyObject": someContent };
}

uph.setUseCustomUserPresetModel(onPresetLoad, onPresetSave, false);
```

The load function contains a single parameter with a JSON object describing your plugin state. What the content of this object is is defined by your save function, which expects you to return a object that fully describes your plugin state.

> Usually this means that you have one big JSON object that you return in your save function and restore in your load function.

During development, the `usePersistentObject` flag might be helpful - if this is true, it will call the save function before recompiling and call the load function with the previous object after compiling, so that the values of your data object to not reset each time you compile. However this might overwrite the object you define, so at the beginning, you must use this function at least once without this flag. In the compiled project it won't make much of a difference as the recompilation does not happen after the plugin was instantiated.

Also be aware that if you want to use the custom automation model, you will need to enable this mode too.