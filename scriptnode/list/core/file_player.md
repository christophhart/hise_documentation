---
keywords: file_player
summary: A polyphonic file player that supports multiple playback modes
author: [Your Name]
modified: 30.05.2024
parameters: 
  - PlaybackMode: Determines the playback mode. Options: Static, Signal Input, MIDI Frequency.
  - Gate: Controls the playback gate, allowing to start and stop the playback.
  - RootFrequency: Sets the root frequency for MIDI frequency mode. 
  - FreqRatio: Sets the frequency ratio for playback. 
---

The `file_player` node provides polyphonic playback of audio files with three distinct playback modes. This flexibility allows it to be used in various audio processing scenarios, from simple file playback to more complex signal-driven and MIDI-controlled applications. It supports three playback modes:

1. **Static Mode**: The file plays at a constant rate and can be modified with the freq ratio parameter
2. **Signal Input Mode**: An external control signal determines the playback position within the file, allowing for creative manipulation based on signal input. The input signal is mapped to the playback position, so if you want it to play normally, use a [ramp](/scriptnode/list/core/ramp) generator that generates a signal from 0 to 1 with the period time of the sample length that will map to a default playback of the sample as it would be in Static mode. Of course this is just the easiest application and you can do all kinds of funky things (scratchy, scratchy) going from there.
3. **MIDI Frequency Mode**: Playback speed is controlled by incoming MIDI note events, enabling pitch-based file playback. If you use this note, the **RootFrequency** parameter decides the pitch ratio.

> Be aware that while this covers a few use cases, it might be more efficient to just write your own file player from scratch with the exact feature set you need. An starting point for this can be found in the Snippet Browser (SNEX One Shot Player).