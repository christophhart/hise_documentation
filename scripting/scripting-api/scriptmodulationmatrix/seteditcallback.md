This function can be used to supply additional functions in the context menu of a modulatable UI component.

This method expects two arguments:

1. A single string or an array of strings for each menu item
2. a function or callable object with two parameters that will be executed when you click on said context menu item with the zero based index of the clicked item and the associated target ID of the UI component.

> If you want to find out the component that was clicked just pass that into the [ScriptModulationMatrix.getComponent()](/scripting/scripting-api/scriptmodulationmatrix#getcomponent) method.

```javascript
const var m = Engine.createModulationMatrix("Global Modulator Container1");

m.setEditCallback(["funky", "noice"], function(idx, targetId)
{
	Console.print(idx); // 0 if you click funky, 1 if you click on noice...

	Console.print("TARGET: " + targetId);
	Console.print("COMPONENT: " + this.getComponent(targetId).get("id"));
});
```

The use cases for this method are pretty diverse:

- you can use it to "edit the connections" by showing a matrix component with all connections of the target
- you can use it to add a "clear all connections" function for the given component (or other data management functions like custom save / restore)
- you can use it to reset the intensity values