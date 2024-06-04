---
keywords: silent_killer
summary: A node that sends a voice reset message when silence is detected.
author: [Your Name]
modified: 30.05.2024
parameters:
  - Threshold: Sets the threshold level (in dB) below which the audio signal is considered silent.
  - Active: A boolean parameter that suspends the silence detection if set to false
---

The most epic `silent_killer` node is designed to manage voices of a HISE sound generator by sending a voice reset message as soon as silence is detected. It continuously monitors the audio signal for each voice and when the signal falls below the specified threshold level (and the `Active` parameter is **enabled**), the node sends a voice reset message that can be picked up by a [Scriptnode Voice Killer](/hise-modules/modulators/envelopes/list/scriptnodevoicekiller) to kill the voice.

### MIDI Processing

If the node is sitting in a MIDI processing context (which it will be by default if used in a scriptnode synthesiser), then it will store an internal state that will be set to `true` as long as the note is being held (so a note off message sets it back to false). The idea is that your voice might encounter short periods of silence (eg. from a LFO modulating the amplitude with a square signal) which should not trigger the silence detection.

### Alternative

Detecting the silence to kill a note can be considered a very brute force way of managing voices and in most cases it might be better to use the [voice_manager](/scriptnode/list/envelope/voice_manager) node which can send a voice reset message on much more predictable events.