This function can be used to attach a callback to be notified when the **currently selected** modulation source is changed. This is caused by one of two events:

1. You click on a dragger from a [ModulationMatrixController](/ui-components/floating-tiles/plugin/modulationmatrixcontroller).
2. You call [ScriptModulationMatrix.setCurrentlySelectedSource()](/scripting/scripting-api/scriptmodulationmatrix#setcurrentlyselectedsource) (most likely because you're reimplementing something like the modulation matrix controller with a ScriptPanel).

This can now be used for different things, eg:

- changing the layout of the hover popup that shows all modulation connections of a given UI knob
- highlighting the modulator module on your UI

The function expects a callable object with a single parameter that will be called with the ID string of the source (= the modulator's ID).

> Take a look at [this snippet](/tutorials/ui#exclusive-matrix-modulation-source) for an example use case (showing only the currently selected modulation connection when you hover over a knob).