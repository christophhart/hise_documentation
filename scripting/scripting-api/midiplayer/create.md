The nominator and denominator will define the time signature, so for a `3/4` time signature and 7 bars, use `MidiPlayer.create(3, 4, 7)`

Be aware that this adds a new sequence to the player add the end of the list, so you probably want to check `isEmpty()` if you just want to write a [bunch of notes](/tutorials/midi#play-chords-from-single-notes)