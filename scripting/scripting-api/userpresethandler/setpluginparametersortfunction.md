This function is used if you need to maintain backwards compatibility with older versions: the order how plugin parameters are registered at the host might affect old DAW projects so if you change that order between updates, there is the chance of breaking user projects.

In order to prevent that problem, you can use this function to ensure that all plugin parameters that you've added in your update are put at the end of the list so that the old plugin parameters retain their index.

> If you are free of the burden of backwards-compatibility, you can still use this function to prettify your plugin parameter list, which otherwise is created in a default sorting logic that may or may not align with your expected order.

By default the plugin parameters are sorted by type, and then within that type in order of definition. The type order is:

1. All dynamic plugin parameters (if `HISE_MACROS_ARE_PLUGIN_PARAMETERS=1`) in ascending order
2. All custom automation parameters defined with [UserPresetHandler.setCustomAutomation()](/scripting/scripting-api/userpresethandler#setcustomautomation)
3. All script components that have the `isPluginParameter` flag set.

So if you have 3 macros, 2 custom automation slots and 4 script controls, the order would be:

```
Macro 1
Macro 2
Macro 3
Custom 1
Custom 2
Component 1
Component 2
Component 3
Component 4
```

If you need to change that default order, just pass in a function into this method. This function will be executed whenever the plugin parameters are rebuilt (so in HISE itself after each compilation and in your compiled plugin once at initialisation). It expects two parameters `p1` and `p2` which will be filled with two JSON objects with the following properties:;

| Property | Description |
| -- | ------- |
| `type` | the plugin parameter type. This is a magic number and will be `0` for macro controls, `1` for custom automation slots and `2` for UI components |
| `parameterIndex` | This is the index in the default sorting order. |
| `typeIndex` | This is the index within the type. So for the first custom automation slot it will be 0, no matter how many other parameters of a different type come before that. |
| `group` | If you have assigned this parameter to a group, it will contain the string with the group name, otherwise it will be an empty string. |
| `name` | the plugin parameter name as it will be shown in the host. |

Using the example list above, this would be the JSON object for two of the elements:

```javascript
{
	"Macro 2": {
		type: 0,  // type is macro
		parameterIndex: 1, // index in full list
		typeIndex: 1 // second macro
		group: "", // no group
		name: "Macro 2" // macro name
	},
	"Component 1": {
		type: 2, // type is UI component
		parameterIndex: 5, // index in full list
		typeIndex: 0, // first UI component
		group: "", // no parameterGroupName set
		name: "Component 1" // pluginParameterName property
	}
}

```

You will now have to implement the sorting logic by writing a function that compares the two objects and returns one of the given values:

- `-1` if the first parameter should come before the second
- `1` if the second parameter should come before the first
- `0` if the parameters are supposed to be equal
- `undefined` if you want to resort to the default sorting logic between the two parameters.

> Note that if you use parameter groups it will override this sorting mechanism and always put parameters without a group ID first followed by all parameters of a group (as this is how it's required by the hosts), so be cautious when adding parameter group IDs to an existing project.

### Examples

Here is an example function that will keep the normal sorting logic but move all custom automation data slots at the beginning of the list.

You would use this function if you have added the ability of assigning dynamic plugin parameters in an update and want to ensure that the original order of the custom automation slots are not changed (because by default the macro parameters would be put at the beginning of the list).

```javascript
const var CUSTOM_TYPE = 1;

// This function moves all custom automation parameters at the beginning (so they appear before the macros)
uph.setPluginParameterSortFunction(function(p1, p2)
{
	// If one of the parameters is a custom type, put it before
	// the other element.
	
	if(p1.type == CUSTOM_TYPE && p2.type != CUSTOM_TYPE)
		return -1;
	else if (p2.type == CUSTOM_TYPE && p1.type != CUSTOM_TYPE)
		return 1;
	
	// otherwise return undefined which uses the default sorting
	return undefined;
});
```

> You can always check the order of the parameters in the [Plugin Parameter Simulator](/ui-components/floating-tiles/hise/pluginparametersimulator) which will be rebuilt after each compilation and takes the sorting mechanism into account.

Another example that will put the plugin parameters from a given name list at the end can be used if your update contains new controls that you want to be put at the end of the list:

```javascript
// These are the new controls in your update that you want to put at the end:
const var NEW_CONTROLS = [ "Close 2", "Far 1"];

// This function moves all custom automation parameters at the beginning (so they appear before the macros)
uph.setPluginParameterSortFunction(function(p1, p2)
{
	var c1 = NEW_CONTROLS.contains(p1.name);
	var c2 = NEW_CONTROLS.contains(p2.name);

	if(c1 && !c2) // p1 is a new control and p2 isn't
		return 1;
	else if (c2 && !c1) // p2 is a new control and p1 isn't
		return -1;
	
	// otherwise return undefined which uses the default sorting
	return undefined;
});
```