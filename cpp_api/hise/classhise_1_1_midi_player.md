---
keywords: MidiPlayer
summary:   C++ API Class reference
author:   Christoph Hart
---

A player for MIDI sequences.  
This module plays MidiFiles when its internal transport is activated. It acts as common core module for multiple "overlays" (MIDI loopers, Piano roll, step sequencer, etc.)   
## Class Hierarchy

### Base Classes

- [`hise::MidiProcessor`](/cpp_api/hise/classhise_1_1_midi_processor)  
- [`hise::TempoListener`](/cpp_api/hise/classhise_1_1_tempo_listener)  

## Public types
### enum SpecialParameters
| Name | Description |
| -- | ------ |
| `CurrentPosition` | the current position within the current MIDI file (non-persistent) |
| `CurrentSequence` | the index of the currently played sequence (not zero based for combobox compatibility) |
| `CurrentTrack` | the index of the currently played track within a sequence. |
| `LoopEnabled` | toggles between oneshot and loop playback |
| `LoopStart` | start of the (loop) playback |
| `LoopEnd` | end of the (loop) playback |

## Class methods

### tempoChanged

```cpp
void tempoChanged(double newTempo) override
```

@ internal   

### clearSequences

```cpp
void clearSequences(NotificationType notifyListeners=sendNotification)
```

Clears all sequences. This also clears the undo history.   

### exportAsValueTree

```cpp
ValueTree exportAsValueTree() const override
```

@ internal   

### restoreFromValueTree

```cpp
void restoreFromValueTree(const ValueTree &v) override
```

@ internal   

### createEditor

```cpp
ProcessorEditorBody * createEditor(ProcessorEditor *parentEditor) override
```

@ internal   

### getAttribute

```cpp
float getAttribute(int index) const
```

@ internal   

### setInternalAttribute

```cpp
void setInternalAttribute(int index, float newAmount) override
```

@ internal   

### loadMidiFile

```cpp
void loadMidiFile(PoolReference reference)
```

Loads the given pooled MIDI file and adds it to the end of the list.   

### isProcessingWholeBuffer

```cpp
bool isProcessingWholeBuffer() const override
```

@ internal   

### prepareToPlay

```cpp
void prepareToPlay(double sampleRate_, int samplesPerBlock_)
```

@ internal   

### preprocessBuffer

```cpp
void preprocessBuffer(HiseEventBuffer &buffer, int numSamples) override
```

@ internal   

### processHiseEvent

```cpp
void processHiseEvent(HiseEvent &m) noexcept override
```

@ internal   

### addSequenceListener

```cpp
void addSequenceListener(SequenceListener *newListener)
```

Adds a sequence listener that will be notified about changes to the sequences.   

### removeSequenceListener

```cpp
void removeSequenceListener(SequenceListener *listenerToRemove)
```

Removes a sequence listener that was registered to this player.   

### getPlayState

```cpp
PlayState getPlayState() const
```

Returns the play state as integer.   

### getNumSequences

```cpp
int getNumSequences() const
```

Returns the number of sequences loaded into this player.   

### getCurrentSequence

```cpp
HiseMidiSequence * getCurrentSequence() const
```

Returns the currently played sequence.   

### getSequenceId

```cpp
Identifier getSequenceId(int index=-1) const
```

Returns the ID used for the given sequence. If -1 is used as index, the current sequence will be used.   

### getPlaybackPosition

```cpp
double getPlaybackPosition() const
```

Returns the current playback position from 0...1.   

### flushEdit

```cpp
void flushEdit(const Array< HiseEvent > &newEvents)
```

Applies the list of events to the currently loaded sequence. This operation is undo-able.  
It locks the sequence just for a very short time so you should be able to use this from any thread without bothering about multi-threading.   

### clearCurrentSequence

```cpp
void clearCurrentSequence()
```

Clears the current sequence and any recorded events.   

### getUndoManager

```cpp
UndoManager * getUndoManager()
```

Returns the undo manager used for all editing operations.  
This differs from the default undo manager for parameter changes because edits might get triggered by UI controls and it would be difficult to deinterleave parameter changes and MIDI edits.   

### setFlushRecordingOnStop

```cpp
void setFlushRecordingOnStop(bool shouldFlushRecording)
```

If set to false, the recording will not be flushed and you can preprocess it.   

### resetCurrentSequence

```cpp
void resetCurrentSequence()
```

Resets the current sequence back to its pooled state. This operation is undo-able.   

### getPoolReference

```cpp
PoolReference getPoolReference(int index=-1)
```

Returns the PoolReference for the given sequence.  
If -1 is passed, the current sequence index will be used.   

### play

```cpp
bool play(int timestampInBuffer=0)
```

Starts playing the sequence from the beginning.  
You can supply a timestamp that delays this operation - this can also be used for sample accurate triggering by passing in the timestamp of the current event within the buffer.   

### stop

```cpp
bool stop(int timestampInBuffer=0)
```

Stops the playback and resets the position.  
You can supply a timestamp that delays this operation - this can also be used for sample accurate triggering by passing in the timestamp of the current event within the buffer.   

### record

```cpp
bool record(int timestampInBuffer=0)
```

Starts recording. If the sequence is already playing, it switches into overdub mode, otherwise it also starts playing.   

### prepareForRecording

```cpp
void prepareForRecording(bool copyExistingEvents=true)
```

This prepares the internal event queue for recording. Can be called on any thread including the audio thread.   

### finishRecording

```cpp
void finishRecording()
```

Finishes the recording. Can be called on any thread including the audio thread.   

### getListOfCurrentlyRecordedEvents

```cpp
HiseMidiSequence::Ptr getListOfCurrentlyRecordedEvents()
```

Creates a temporary sequence containing all the events from the currently recorded event list.   

### getListOfCurrentlyRecordedEventsRaw

```cpp
const Array< HiseEvent > & getListOfCurrentlyRecordedEventsRaw() const
```

Returns the array of HiseEvents without conversion to a HiseMidiSequence.   
