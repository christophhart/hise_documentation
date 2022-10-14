Calling this function will attach the broadcaster to a list of components and properties and will notify its listeners everytime that one of the properties change.

- `componentList` can be either a single string (component name), reference to the component (`Content.getComponent(name)` or an array of those values.
- `propertyIds` must be a list of property ids (or a single string if you only want to listen to a single property). Be aware that every component you pass into the first argument needs to have this property, which prevents you from registering eg. a ScriptPanel to a `viewPositionX` property).

After you've defined this method, all functions must have the prototype

``` 
function propertyCallback(component, id, value)
{
	
}
```

where `component` is a reference to the actual script component object that triggered the mouse callback, `id` is the property string and `value` the updated value.