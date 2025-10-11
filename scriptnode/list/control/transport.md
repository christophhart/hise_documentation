---
keywords: transport
summary:  A node that sends a value whenever the DAW's transport state changes.
author:   Christoph Hart
modified: 30.05.2024
---

This node can be used to watch the playback state of the DAW host. You can connect the modulation output to any target and it will send 1.0 when the host starts playing and 0.0 if the host playback is stopped.

### Similar nodes

There are a few other nodes related to host transport management:

- If you want to receive the PPQ (MIDI tick) position of the host to sync your node to the playback position, you can use the [control.ppq](/scriptnode/list/control/ppq)
- If you just want a ready-to-use clock synced ramp signal that you can plug into an LFO, take a look at the [core.clock_ramp](/scriptnode/list/core/clock_ramp) node.