This registers the broadcaster to a list of components that will send out a message whenever the mouse callback is being triggered.

- `componentList` can be either a single string (component name), reference to the component (`Content.getComponent(name)` or an array of those values.
- `callbackLevel` must be one of the strings known from the `ScriptPanel` property `allowCallbacks`.

After you've defined this method, all functions must have the prototype

``` 
function mouseCallback(component, event)
{
	
}
```

where `component` is a reference to the actual script component object that triggered the mouse callback and `event` is a JSON object that is identical to the one you know and love from `ScriptPanel.setMouseCallback()`.

