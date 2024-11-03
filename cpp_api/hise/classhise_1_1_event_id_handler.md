---
keywords: EventIdHandler
summary:   C++ API Class reference
author:   Christoph Hart
---

This class will iterate over incoming MIDI messages, and transform them into HiseEvents with a succesive index for note-on / note-off messages.  
Normally, you won't use this class, but rather benefit from it in the MIDI processing world using Message.getEventId(), but there are a few methods that can access these things directly.   

## Class methods

### handleEventIds

```cpp
void handleEventIds()
```

Fills note on / note off messages with the event id and returns the current value for external storage.   

### getEventIdForNoteOff

```cpp
uint16 getEventIdForNoteOff(const HiseEvent &noteOffEvent)
```

Removes the matching noteOn event for the given noteOff event.   

### pushArtificialNoteOn

```cpp
void pushArtificialNoteOn(HiseEvent &noteOnEvent) noexcept
```

Adds the artificial event to the internal stack array.   

### popNoteOnFromEventId

```cpp
HiseEvent popNoteOnFromEventId(uint16 eventId)
```

Searches all active note on events and returns the one with the given event id.   
