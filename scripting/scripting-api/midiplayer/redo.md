Just like [`undo()`](/scripting/scripting-api/midiplayer#undo), this will not use the 
global undo manager, but a dedicated undo manager for each MIDI player (otherwise the 
actions interfere with changing UI values, which would be very annoying).
