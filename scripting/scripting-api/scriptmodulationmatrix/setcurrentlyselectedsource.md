This method can be used to programatically change the currently selected source. Usually this is done automatically by the [ModulationMatrixController](/ui-components/floating-tiles/plugin/modulationmatrixcontroller), but if you are implementing a custom UI replacement for that UI component, you can use this functionality.

Note that whenever you call this function (or drag a dragger), it will automatically close all hover popups that are currently active.

> This functionality can be disabled with the [ScriptModulationMatrix.setMatrixModulationProperties()](/scripting/scripting-api/scriptmodulationmatrix#setmatrixmodulationproperties) function.

