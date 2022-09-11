Calling this function will attach the broadcaster to a list of components and properties and will notify its listeners everytime that one of the properties change.

- `componentList` can be either a single string (component name), reference to the component (`Content.getComponent(name)` or an array of those values.

After you've defined this method, all functions must have the prototype

``` 
function valueCallback(component, value)
{
	
}
```

where `component` is a reference to the actual script component object that triggered the mouse callback, and `value` the updated value.

> Note how the function signature is identical to the function parameters you can pass into `setControlCallback()` which makes it super easy to migrate from a normal control callback to a broadcaster based system.