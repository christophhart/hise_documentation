This function can be used to modify the behaviour / properties of the entire matrix modulation system. Currently you can:

- Enable / Disable the [exclusive source selection](/scripting/scripting-api/scriptmodulationmatrix#setcurrentlyselectedsource) feature.
- Change the default intensity values and modulation mode for each target that are used when adding a new connection
- Change the range properties of every matrix modulator (this can also be achieved with [Modulator.setMatrixProperties()](/scripting/scripting-api/modulator#setmatrixproperties)), however this function allows you to set all ranges in one go without having to fetch references to each modulator.

> The best way to go about this is to fetch the current state with [ScriptModulationMatrix.getModulationProperties()](/scripting/scripting-api/scriptmodulationmatrix#getmatrixmodulationproperties), modify that object and then call this method to ensure that the object layout is valid.

The JSON object will expect these properties:

| Key | Type | Description |
| == | = | ======= |
| `SelectableSources` | bool | Defines whether to use the exclusive source feature. If this is true, then the callbacks that will fire when switching the currently selected source are disabled. |
| `DefaultInitValues` | JSON | Defines the initial intensity and modulation mode values for new connections for each target. This must be a JSON object with the target ID as key for each target you want to customize. (see below for a detailed description). |
| `RangeProperties` | JSON | Defines the range properties for each modulation target. This must be a JSON object with the target IDs as keys for each target you want to customize. Look [here](/scripting/scripting-api/modulator#setmatrixproperties) for a description of all properties of each item. |

### DefaultInitValues items

If the user adds a new connection from a modulation to a target source there is a sensible default for each target type:

- if the modulation target is Gain modulation, it will pick the `"Scale"` mode with 100% intensity.
- otherwise it will use 0% intensity and `"Bipolar"` modulation as default.

You can override this behaviour - eg. if you want to add a little bit of intensity so that there is an immediate effect when adding a modulation connection. In order to do so, just pass in a JSON object as `DefaultInitValues` key that defines a JSON object for each target. The properties you need to define here are:

| Key | Type | Description |
| == | = | ========= |
| `Intensity` | double | The intensity value that should be initialised. The value domain of this is defined by the `IsNormalized` property explained below. |
| `Mode` | String | One of the following strings that define the mode: `["Scale", "Unipolar", "Bipolar"]`. |
| `IsNormalized` | bool | Whether to convert the `Intensity` value from the input range of the target modulator. So eg. if you have a pitch modulator set to +-12 semitones and want to set the initial modulation intensity to 3 semitones, you would set this property to `false` and `Intensity` to `3.0`. By default this is deactivated so it will pickup the "raw" intensity value that will be applied to the modulation connection. |
