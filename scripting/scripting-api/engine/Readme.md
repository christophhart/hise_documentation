---
keywords: Engine
summary:  An API class for accessing global properties.
---

The `Engine` object contains a lot of functions related to global properties (like sample rate or host tempo) and object creation.


```javascript
Engine.getSampleRate() // returns the current sample rate
Engine.sendAllNotesOff() // sends a all note off (MIDI Panic) message at the next audio buffer
```
