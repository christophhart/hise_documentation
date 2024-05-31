---
keywords: MessageHolder
summary:  A object that holds a HiseEvent for processing
author:   Christoph Hart
modified: 21.06.2019
---
  
This object mirrors the functionality of the [`Message`](/scripting/scripting-api/message) class, but operates on an arbitrary event (while the `Message` class will only work inside a MIDI callback and operates on the current event that caused the callback).

This can be useful for one of these occasions:

- MIDI file processing ([`MidiPlayer.getEventList()`](/scripting/scripting-api/midiplayer#geteventlist) will return an array of objects of this type.
- Storing MIDI messages for later processing using [`Message.store()`](/scripting/scripting-api/message#store)
- Send previously stored messages using [`Synth.addMessageFromHolder()`](/scripting/scripting-api/synth#addmessagefromholder)
- Debugging ([`dump()`](/scripting/scripting-api/messageholder#dump) prints out a nice string that contains useful information)

You can create an object using the API call [`Engine.createMessageHolder()`](/scripting/scripting-api/engine#createmessageholder)