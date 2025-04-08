---
keywords: MidiAutomationHandler
summary:  A scripting object for manipulating the MIDI control assignments
author:   Christoph Hart
modified: 17.07.2024
---

This class is a interface for modifying the MIDI control assignments in HISE through scripting.

You can:

- edit / change the list of assignments
- attach a callback (or broadcaster) that listen to changes of MIDI control assignments
- customize the behaviour / appearance of any MIDI assignment related interactions.

A common practice in plugins is the ability to right click on a control and assign it to a MIDI CC controller so that it can be controlled by hardware controllers (or MIDI clips from the host). 

This can be achieved in HISE by setting the `enableMidiLearn` property of any suitable component (slider / button / combobox) to true (or set the `allowMidiAutomation` property in the JSON object that you pass into [UserPresetHandler.setCustomAutomation()](/scripting/scripting-api/userpresethandler#setcustomautomation) if you're using the custom automation model). 

The assignments can be modified using the [MidiLearnPanel](/ui-components/floating-tiles/plugin/midilearnpanel) floating tile which allows you to remove connections, modify the range of how the parameter is mapped and invert the parameter.

However if you need more flexibility you can use this class and implement your own MIDI assignment interface.

> Note that MIDI assignments are stored in the user preset system by default, so you don't need to use this class for data management.


