---
keywords: granulator
summary: A granular synthesizer that creates complex textures by processing small audio segments called grains.
author: Christoph Hart
modified: 30.05.2024
parameters: 
  - Position: Sets the playback position within the audio file. 
  - Pitch: Adjusts the pitch ratio for grain playback. 
  - GrainSize: Determines the size of each grain in milliseconds. 
  - Density: Adjusts the density of grains, controlling the time interval between the start of each grain. Higher values result in more frequent grain generation.
  - Spread: Sets the stereo spread of grains.
  - Detune: Introduces slight pitch variations between grains, adding a detuned effect. 
---

The `granulator` node is a granular synthesizer that generates complex and evolving soundscapes by processing small segments of audio called grains. It supports a range of parameters for controlling the characteristics of the grains. It can create rich, textured soundscapes and effects by overlapping and modulating the grains.

### Polyphony

The granulator does not support polyphony in the sense that it can be used in a polyphonic context with individual voices. Instead, it will process multiple MIDI notes by equally distributing the grain pitches to the pressed keys:

- if you press a single key, each grain will use that pitch. 
- if you press a second key, every other grain will use the second pitch
- if you press a third key, the grains will cycling through the three notes and are repitched to match all pressed keys.

The best way to understand this procedure is to use a low density and then press keys which are far apart from each other. This will result in an "arpeggiator like" effect, but once you up the density or play notes which are more tightly voiced, it will merge into one sound scape

This leads to an equal "density" of grains no matter how many keys you pressed which is a desirable quality in the granular synthesiser.

> In order for that to work, the granulator must be put into a [midichain](/scriptnode/list/container/midichain) so that it can process the incoming MIDI messages.