---
keywords: Message
summary:  Manipulate MIDI Messages
author:   Christoph Hart
modified: 04.06.2019
---
  
If you use one of the MIDI callbacks (`onNoteOn`, `onNoteOff` or `onController`), this object contains methods to get / change the message that triggered the callback.


```javascript
Message.getNoteNumber() // returns the note number in note callbacks
Message.setChannel(newChannel) // changes the channel of the midi message
```