---
keywords: Engine
summary:  An API class for accessing global properties.
---

The `Engine` object contains functions related to global properties (like sample rate or host tempo).


```javascript
Engine.getSampleRate() // returns the current sample rate
Engine.sendAllNotesOff() // sends a all note off (MIDI Panic) message at the next audio buffer
```
