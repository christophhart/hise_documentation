By default you can assign a single MIDI controller to multiple UI controls so if you want to eg. control the volume of multiple channels with your modwheel this can be achieved by assigning it to those controls.

However this might be an unwanted behaviour for your project so if you want to ensure that there is only a single connection for each MIDI control present, call this function with `true` and it will change the behaviour of the context menu:

1. It will grey out MIDI assignments that are already connected to another MIDI controller.
2. When you enable MIDI learn and then assign a controller to a knob, it will remove any existing connection to other controls for this particular MIDI controller. Note that if you are using `HISE_USE_MIDI_CHANNELS_FOR_AUTOMATION=1` to support different assignments for MIDI channels, it will retain connections from different MIDI channels, but remove "Omni" connections as well as connections with the same channel.

> Note that this logic will not be used to check the data you pass into [MidiAutomationHandler.setAutomationDataFromObject()](/scripting/scripting-api/midiautomationhandler#setautomationdatafromobject) so you must take care of avoiding duplicates in there yourself.