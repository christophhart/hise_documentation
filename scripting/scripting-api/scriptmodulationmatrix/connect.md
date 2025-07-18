This method allows you to programmatically connect modulators (just like using the UI functions). Calling this method connects / disconnects the given source modulator to the specified target and returns true if a connection was established. If there was already a connection or one of the IDs was invalid, it will return false.

> This action is fully undoable with `Engine.undo()`. Note that this will kill all voices and perform this operation on the scripting thread to avoid audio glitches.
