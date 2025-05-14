This function will create and return an anonymous panel and add it to the panel as child component (similar to setting the `parentComponent` property). However there are two important differences:

1. You can call this function any time and **add (and remove)** these panels after the onInit callback.
2. The panels that you create with this method will not be listed in the component list (and therefore can not store / restore their value with user presets et al).

The main use case for this method is to create dynamic components which have a varying amount of sub-elements: tables with modulation connections, effect slots, and basically anything that has a dynamic amount that can be changed in your script.

> Be aware that these panels are not accessible to the interface designer, so you have to set every property using scripting API calls.

You can call this method again on the new panel and create a nested architecture of child panels. In order to delete the panel (and any child panel), use the [`removeFromParent()`](/scripting/scripting-api/scriptpanel#removefromparent) method. 

For an example use case, take a look at the [Horizontal List Recipe](/tutorials/ui#dynamic-list)