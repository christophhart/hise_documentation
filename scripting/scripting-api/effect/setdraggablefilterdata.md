Until HISE 5.0, the only way to use the [DraggableFilterPanel](/ui-components/floating-tiles/plugin/draggablefilterpanel) was by connecting it to a [Parametric EQ](/hise-modules/effects/list/curveeq) module. 

This has changed now and the panel now supports connections to these types:

- [Parametric EQ](/hise-modules/effects/list/curveeq)
- [Filter](/hise-modules/effects/list/polyphonicfilter)
- [Hardcoded Master FX](/hise-modules/effects/list/hardcoded-master-fx)
- [HardcodedPolyphonicFX](/hise-modules/effects/list/hardcodedpolyphonicfx)
- [Script FX](/hise-modules/effects/list/scriptfx)
- [Polyphonic Script FX](/hise-modules/effects/list/polyscriptfx)

However, these new connection types cannot deduce the parameter indexes for each filter band parameter automatically, so if you start dragging around the filter drag handles, HISE has no way of knowing whether to change the parameter index 5 or 17 or 2 accordingly - with the parametric EQ it can simply be calculated with the formula:

```
parameterIndex = 0 + bandIndex * BandOffset + bandParameterIndex
P			   = O + I         * N          + B
```

(we'll refer to the variable names `P, O, I, N and B` down below). So for all the other module types, you will need to provide additional information about the properties of the filter module that will be picked up by the draggable filter panel to adjust it's behaviour.

> Note that these properties are not persistently stored in the module tree, so you have to call this function in the onInit callback for each module.

These properties are available:

| Property | Type | Default | Description |
| == | = | = | ===== |
| NumFilterBands | int | 1 | The fixed amount of filter bands of this module. Note that this is a hard limitation and the only module that allows a dynamic amount of filter bands remains the Parametric EQ. |
| FilterDataSlot | int | 0 | the slot of the filter coefficients. This defaults to zero and you can assign all your filter nodes to the same coefficient object, but if you have a more complex node where the filter is only a part of the signal chain, you can define which filter coefficient slot it should use for the draggable display. |
| FirstBandOffset | int | 0 | the parameterOffset for the first band (`O` in the formula above). This can be used if your filter module has parameters that come before the range of filter parameters and will be used as constant offset in the formula that calculates the filter band parameter (see below). |
| TypeList | Array | see below | This is a list of strings that define the type names as they will show up in the context menu when you right click on a filter drag handle. |
| ParameterOrder | Array | see below | This is a list of (predefined) string that will define in what order the filter parameters are defined. The length of this list will be `N` in the formula above and it will calculate the bandParameterIndex `B` from the index of the parameter name within that list. |
| FFTDisplayBufferIndex | int | -1 | This is the index of the display buffer that will be used to show the spectrum analyser. If you set this to anything other than -1, it must point to a external display buffer that is connected to a [analyse.fft](/scriptnode/list/analyse/fft) node. |
| DragActions | Array | see below | This is a list of predefined strings that define the mouse behaviour and what parameter you want to control. Eg, by default the y-axis is assigned to the gain parameter, but in a synth filter context you might want to reroute this to the resonance of the filter and this is the place to do so. |

If you define this JSON object and pass it to this method, HISE has all information it needs to calculate the band parameter index from the attribute index of the module parameter:

```javascript
O = FirstBandOffset
N = TypeList.length
B = TypeList.indexOf(BAND_PARAMETER)

parameterIndex = FirstBandOffset + bandIndex * TypeList.length + TypeList.indexOf(BAND_PARAMETER)
```

Here is a list of all default values as JSON (that is also returned by [Effect.getDraggableFilterData()](/scripting/scripting-api/effect#getdraggablefilterdata))

```javascript
{
  NumFilterBands: 1, 
  FilterDataSlot: 0, 
  FirstBandOffset: 0, 
  TypeList: [
    "Low Pass", 
    "High Pass",
    "Low Shelf",
    "High Shelf",
    "Peak"
  ],
  ParameterOrder: [
    "Gain",
    "Freq",
    "Q",
    "Enabled",
    "Type"
  ],
  FFTDisplayBufferIndex: -1, 
  DragActions: {
    DragX: "Freq",
    DragY: "Gain", 
    ShiftDrag: "Q", 
    DoubleClick: "Enabled",
    RightClick: ""
  }
};
```