This function can be used to create a [ScriptModulationMatrix](/scripting/scripting-api/scriptmodulationmatrix) object that encapsulates the management of dynamic modulation systems found in complex synths.

It expects a single argument with the ID of the Global Modulator Container that should be used as modulation source. It will then create and return an object that you can use to define your modulation system and it automatically creates a global cable for each global modulator that will (asynchronously) receive its modulation value.

