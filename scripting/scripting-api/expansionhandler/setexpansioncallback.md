Whenever an expansion is switched, this function will be called so you can react on the event. This happens at these opportunities:

1. A preset from an expansion is loaded
2. [`Expansionhandler.setCurrentExpansion()`](/scripting/scripting-api/expansionhandler#setcurrentexpansion) was called
3. An expansion was selected in the dropdown list in the HISE Expansion Edit bar

Be aware that the expansion callback is owned by the wrapper object not the global expansion manager (so it goes out of scope as soon as the wrapper object is destructed).