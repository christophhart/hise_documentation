This function is particularly helpful when you want to build a custom UI for the MIDI Player's content. 

Once this is called and a ScriptPanel is connected to this reference, It will automatically cause a repaint of the [ScriptPanel](/scripting/scripting-api/scriptpanel) on these events:

- new MIDI content being loaded
- track / sequence being changed 
- MIDI sequence being cleared
- flushing of a MIDI processing
- if [`setRepaintOnPositionChange()`](/scripting/scripting-api/midiplayer#setrepaintonpositionchange) was enabled, whenever the playback position changes.

You can then use the functions [`getNoteRectangleList`](/scripting/scripting-api/midiplayer#getnoterectanglelist) and 
[`getPlaybackPosition()`](/scripting/scripting-api/midiplayer#getplaybackposition) to 
fetch the data and write the UI logic you want.