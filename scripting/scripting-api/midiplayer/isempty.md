This doesn't check whether the current sequence contains any notes, but checks whether there is any sequence loaded at all: If you load up the MIDI Player, it will not have a sequence loaded until you either load a MIDI file, or call [`Midiplayer.create`](/scripting/scripting-api/midiplayer#create).

If you want to check whether the sequence is empty, you can use this:

```javascript
// Do not call this in the audio thread obviously...
inline function sequenceHasNoEvents(player)
{
    return player.getEventList().length == 0;
}
```