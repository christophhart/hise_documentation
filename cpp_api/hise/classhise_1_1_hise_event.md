---
keywords: HiseEvent
summary:   C++ API Class reference
author:   Christoph Hart
---

The event type of HISE.  
This is an enhancement of the MIDI Standard and is used for all internal events in the audio path of HISE.  
The MIDI standard (and its implementation of JUCE) have a few limitations and misses some convenient data. Therefore, a new event type was introduced, with the following additions:  
- fixed size. The MIDI message has to have a dynamic size for handling SysEx messages, which is not used in 99,9999% of all cases. The HiseEvent simply ignores SysEx (there are better ways to communicate bigger chunks of data anyways) and uses a fixed size of 128bit per message. This makes copying / clearing the [HiseEventBuffer](/cpp_api/hise/classhise_1_1_hise_event_buffer) trivially fast (just a memset / memcpy)  
- note-on / note-off messages will be associated with a unique index (the EventID), which can be used to alter all voices that are started by the event.  
- more types for internal actions like timer events, pitch / volume fades  
- a timestamp that is baked into the message.  
- 128 channels instead of 16 MIDI channels. 16 is a pretty low number and if you use the channel information to route the signals to certain Processors, you might hit this limitation pretty easily.  
- a transpose amount that will be added on top of the actual note number. This heavily simplifies any MIDI processing that changes the note number because the note off event does not need to be transposed to match the note on in order to prevent stuck notes  
- a few flags that describe the state and origin of the note (whether the message should be processed at all or if it was created internally).  
  
Most of its methods aim to be fully compatible to the juce::MidiMessage class, so if you're used to this class, you will find your way around this class pretty quickly.   

## Public types
### enum Type
| Name | Description |
| -- | ------ |
| `Empty` | an empty event (as created by the default constructor) |
| `NoteOn` | a note on event (which will get a unique EventID upon creation). |
| `NoteOff` | a note-off event (with the same EventID as its corresponding note-on) |
| `Controller` | a MIDI CC message |
| `PitchBend` | a 14-bit pitch-bend message |
| `Aftertouch` | an aftertouch message (both channel aftertouch and polyphonic aftertouch) |
| `AllNotesOff` | an all notes off message. |
| `SongPosition` | the position of the DAW transport |
| `MidiStart` | indicated the start of the playback in the DAW |
| `MidiStop` | indicates the stop of the DAW playback |
| `VolumeFade` | a volume fade that is applied to all voices started with the given EventID |
| `PitchFade` | a pitch fade that is applied to all voices started with the given EventID |
| `TimerEvent` | this event will fire the onTimer callback of MIDI Processors. |
| `ProgramChange` | the MIDI ProgramChange message. |

## Class methods

### HiseEvent

```cpp
 HiseEvent()
```

Creates an empty HiseEvent.   

### HiseEvent

```cpp
 HiseEvent(const MidiMessage &message)
```

Creates a HiseEvent from a MIDI message.   

### HiseEvent

```cpp
 HiseEvent(Type type_, uint8 number_, uint8 value_, uint8 channel_=1)
```

Creates a HiseEvent with the given data.   

### HiseEvent

```cpp
 HiseEvent(const HiseEvent &other) noexcept
```

Creates a bit-wise copy of another event.   

### toMidiMesage

```cpp
MidiMessage toMidiMesage() const
```

Converts the HiseEvent back to a MidiMessage. This isn't lossless obviously.   

### operator bool

```cpp
 operator bool() const noexcept
```

Allows using the empty check in a scoped if-condition.   

### operator==

```cpp
bool operator==(const HiseEvent &other) const
```

checks whether the event is equal to another. This checks for bit-equality.   

### swapWith

```cpp
void swapWith(HiseEvent &other)
```

Swaps the event with another.   

### getType

```cpp
Type getType() const noexcept
```

Returns the Type of the HiseEvent.   

### getTypeAsString

```cpp
String getTypeAsString() const noexcept
```

Returns a String representation of the type.   

### setType

```cpp
void setType(Type t) noexcept
```

Changes the type. Don't use this unless you know why.   

### isIgnored

```cpp
bool isIgnored() const noexcept
```

Checks if the message was marked as ignored (by a script).   

### ignoreEvent

```cpp
void ignoreEvent(bool shouldBeIgnored) noexcept
```

Ignores the event. Ignored events will not be processed, but remain in the buffer (they are not cleared).   

### getEventId

```cpp
uint16 getEventId() const noexcept
```

Returns the event ID of the message. The event IDs will be automatically created by HISE when it is processing the incoming MIDI messages and associates sequentially increasing IDS for each note-on and its corresponding note-off event.  
Be aware the the event ID is stored as unsigned 16 bit integer, so it will wrap around- It's highly unlikely that you will hit any collisions, but you can't expect that older notes have a higher event ID.   
  

### setEventId

```cpp
void setEventId(uint16 newEventId) noexcept
```

Sets the event ID of the HiseEvent. Normally you don't need to do this because HISE will automatically assign this to note-on / note-off messages, but for all the types that alter an existing event (like volume-fades), this can be used for setting the target event.   

### setArtificial

```cpp
void setArtificial() noexcept
```

If the event was created artificially by a MIDI [Processor](/cpp_api/hise/classhise_1_1_processor), it will call this method. You don't need to use this yourself.   

### isArtificial

```cpp
bool isArtificial() const noexcept
```

Returns true if this method was created artificially.  
Events that come in as MIDI message (no matter if their origin is in an actual key press or if there was a previous MIDI processor (like an arpeggiator) that created it, will be flagged as "non-artificial". Events that are created within HISE are flagged as "artificial".  
This information can be useful sometimes in order to prevent endless recursive loops. Also, the HiseEventBuffer::Iterator class can be told to skip artificial events.   

### setTransposeAmount

```cpp
void setTransposeAmount(int newTransposeValue) noexcept
```

Sets the transpose amount of the given event ID.  
Unlike changing the note-number directly, this method will keep the original note number so that you don't have to process the note-off number to match the note-on.  
This is the recommended way of handling all note-number processing in HISE.   

### getTransposeAmount

```cpp
int getTransposeAmount() const noexcept
```

Returns the transpose amount. Be aware that you need to take this into account when you need the actual note-number of an HiseEvent.   

### setCoarseDetune

```cpp
void setCoarseDetune(int semiToneDetune) noexcept
```

Sets the coarse detune amount in semitones.   

### getCoarseDetune

```cpp
int getCoarseDetune() const noexcept
```

Returns the coarse detune amount in semitones.   

### setFineDetune

```cpp
void setFineDetune(int newCents) noexcept
```

Sets the fine detune amount in cents.   

### getFineDetune

```cpp
int getFineDetune() const noexcept
```

Returns the fine detune amount int cents.   

### getPitchFactorForEvent

```cpp
double getPitchFactorForEvent() const
```

Returns a ready to use pitch factor (from 0.5 ... 2.0)   

### getFrequency

```cpp
double getFrequency() const
```

Returns the frequency in hertz. Uses all event properties.   

### setGain

```cpp
void setGain(int decibels) noexcept
```

Sets the gain in decibels for this note.   

### getGain

```cpp
int getGain() const noexcept
```

returns the gain in decibels.   

### getGainFactor

```cpp
float getGainFactor() const noexcept
```

Returns the gain factor (from 0...1) for the given event.   

### isVolumeFade

```cpp
bool isVolumeFade() const noexcept
```

Returns true if the event is a volume fade.   

### isPitchFade

```cpp
bool isPitchFade() const noexcept
```

Returns true if the event is a pitch fade.   

### getFadeTime

```cpp
int getFadeTime() const noexcept
```

Returns the fade time for both pitch and volume fades.   

### isTimerEvent

```cpp
bool isTimerEvent() const noexcept
```

Returns true if the event is a timer event.   

### getTimerIndex

```cpp
int getTimerIndex() const noexcept
```

Returns the index of the timer slot.   

### getTimeStamp

```cpp
int getTimeStamp() const noexcept
```

Returns the timestamp of the message. The timestamp is the offset from the current buffer start. If the timestamp is bigger than the current buffer size, the message will be delayed until the buffer range contains the time stamp.   

### setTimeStamp

```cpp
void setTimeStamp(int newTimestamp) noexcept
```

Sets the timestamp to a sample offset in the future.   

### addToTimeStamp

```cpp
void addToTimeStamp(int delta) noexcept
```

Adds the delta value to the timestamp.   

### getChannel

```cpp
int getChannel() const noexcept
```

Returns the MIDI channel.   

### setChannel

```cpp
void setChannel(int newChannelNumber) noexcept
```

Sets the MIDI channel. Note that in HISE you have 256 MIDI channels.   

### isNoteOn

```cpp
bool isNoteOn(bool returnTrueForVelocity0=false) const noexcept
```

Copied from MidiMessage.   

### isNoteOff

```cpp
bool isNoteOff() const noexcept
```

Copied from MidiMessage.   

### isNoteOnOrOff

```cpp
bool isNoteOnOrOff() const noexcept
```

Copied from MidiMessage.   

### getNoteNumber

```cpp
int getNoteNumber() const noexcept
```

Copied from MidiMessage.   

### setNoteNumber

```cpp
void setNoteNumber(int newNoteNumber) noexcept
```

Copied from MidiMessage.   

### getVelocity

```cpp
uint8 getVelocity() const noexcept
```

Copied from MidiMessage.   

### getFloatVelocity

```cpp
float getFloatVelocity() const noexcept
```

Copied from MidiMessage.   

### setVelocity

```cpp
void setVelocity(uint8 newVelocity) noexcept
```

Copied from MidiMessage.   

### isPitchWheel

```cpp
bool isPitchWheel() const noexcept
```

Copied from MidiMessage.   

### getPitchWheelValue

```cpp
int getPitchWheelValue() const noexcept
```

Copied from MidiMessage.   

### setPitchWheelValue

```cpp
void setPitchWheelValue(int position) noexcept
```

Copied from MidiMessage.   

### setFadeTime

```cpp
void setFadeTime(int fadeTime) noexcept
```

Sets the fade time for the event type. Only valid for VolumeFade and PitchFade types.   

### setStartOffset

```cpp
void setStartOffset(uint16 startOffset) noexcept
```

Adds a offset to the event. Unlike the timestamp, this will not delay the event to the future, but tell the sound generator to skip the given amount when the voice starts. This can be used for eg. skipping the attack phase of samples.   

### getStartOffset

```cpp
uint16 getStartOffset() const noexcept
```

Returns the start offset of the event.   

### isChannelPressure

```cpp
bool isChannelPressure() const noexcept
```

Copied from MidiMessage.   

### getChannelPressureValue

```cpp
int getChannelPressureValue() const noexcept
```

Copied from MidiMessage.   

### setChannelPressureValue

```cpp
void setChannelPressureValue(int pressure) noexcept
```

Copied from MidiMessage.   

### isAftertouch

```cpp
bool isAftertouch() const noexcept
```

Copied from MidiMessage.   

### getAfterTouchValue

```cpp
int getAfterTouchValue() const noexcept
```

Copied from MidiMessage.   

### setAfterTouchValue

```cpp
void setAfterTouchValue(int noteNumber, int aftertouchAmount) noexcept
```

Copied from MidiMessage.   

### isController

```cpp
bool isController() const noexcept
```

Copied from MidiMessage.   

### isControllerOfType

```cpp
bool isControllerOfType(int controllerType) const noexcept
```

Copied from MidiMessage.   

### getControllerNumber

```cpp
int getControllerNumber() const noexcept
```

Copied from MidiMessage.   

### getControllerValue

```cpp
int getControllerValue() const noexcept
```

Copied from MidiMessage.   

### setControllerNumber

```cpp
void setControllerNumber(int controllerNumber) noexcept
```

Copied from MidiMessage.   

### setControllerValue

```cpp
void setControllerValue(int controllerValue) noexcept
```

Copied from MidiMessage.   

### isProgramChange

```cpp
bool isProgramChange() const noexcept
```

Copied from MidiMessage.   

### getProgramChangeNumber

```cpp
int getProgramChangeNumber() const noexcept
```

Copied from MidiMessage.   

### isEmpty

```cpp
bool isEmpty() const noexcept
```

Returns true if the HiseEvent is empty.   

### isAllNotesOff

```cpp
bool isAllNotesOff() const noexcept
```

Copied from MidiMessage.   

### isMidiStart

```cpp
bool isMidiStart() const noexcept
```

Copied from MidiMessage.   

### isMidiStop

```cpp
bool isMidiStop() const noexcept
```

Copied from MidiMessage.   

### isSongPositionPointer

```cpp
bool isSongPositionPointer() const noexcept
```

Copied from MidiMessage.   

### getSongPositionPointerMidiBeat

```cpp
int getSongPositionPointerMidiBeat() const noexcept
```

Copied from MidiMessage.   

### setSongPositionValue

```cpp
void setSongPositionValue(int positionInMidiBeats)
```

Copied from MidiMessage.   

### toDebugString

```cpp
String toDebugString() const
```

Returns a string for debugging purposes.   
