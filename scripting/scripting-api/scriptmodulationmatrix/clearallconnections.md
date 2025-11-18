This clears all connections for the given target ID or all connections if you pass in an empty string. 

> This action is fully undoable with `Engine.undo()`. Note that this will kill all voices and perform this operation on the scripting thread to avoid audio glitches.