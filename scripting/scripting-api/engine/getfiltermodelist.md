You can use this object to create a list of filter modes you would like to add to your plugin.

#### Example Code:

```!!javascript
// Create a filter effect
const var effect = Synth.addEffect("PolyphonicFilter", "filter", 0);

// Create a filter graph
const var display = Content.addFloatingTile("tile", 0, 0);
display.set("width", 200);
display.set("height", 50);
display.setContentData({"Type": "FilterDisplay", 
                        "ProcessorId": "filter"});

// Create a knob for the frequency
const var filterKnob = Content.addKnob("filterKnob", 250, 0);
filterKnob.set("mode", "Frequency");
inline function f(component, value){ effect.setAttribute(effect.Frequency, value); };
filterKnob.setControlCallback(f);

const var modeSelector = Content.addComboBox("modeSelector", 400, 10);

// Create the filter mode list object
const var filterList = Engine.getFilterModeList();

// Pick some values from the object and store it in an array
const var filterModes = [ filterList.StateVariableNotch, 
                          filterList.StateVariableLP ];
                          
// Create an array with a name for each mode
const var filterNames = [ "Notch",
                          "SVF Lowpass"];

// Use the filterNames list as combobox items
modeSelector.set("items", filterNames.join("\n"));


inline function modeCallback(component, value)
{
    // combobox values are starting with 1
    local index = value-1;
    
    if(index >= 0)
    {
        // use the index to get the actual number from the filterModes array.
        effect.setAttribute(effect.Mode, filterModes[index]);
    }
}

modeSelector.setControlCallback(modeCallback);

```

