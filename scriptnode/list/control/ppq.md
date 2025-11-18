---
keywords: ppq
summary:  This node can be used to send out the PPQ position whenever the playback position changes
author:   Christoph Hart
modified: 30.05.2024
parameters:
 - Tempo: Sets the base tempo that will be used to calculate the normalized value
 - Multiplier: can be used to multiply the tempo parameter for longer time values
---

This node will send out a modulation value each time there is one of these events:

1. The host transport is started / stopped
2. The host playback position is changed in a non-continuous way (eg. if the user changes the playback ruler in the DAW or if there is a wrap-aroung of the looped section in the DAW playback setting). Note that this only fires the callback when the DAW is playing - if the user changes the host position while the playback is stopped, the ppq position will be updated the next time the playback is started.

Whenever this occurs, the node will take the playback position and calculate the modulo of the current tempo setting defined by the two parameters so that it results in a value between 0.0 and 1.0, eg.: 

- Tempo is set to **1/4**, Multiplier is **2**. This means that the tempo length to be used is **1/2**. If you now change the playback position to 1:4:0 (first bar, fourth quarter), it will send out the modulation signal 0.5 because it wraps around the half bar and is now in the middle of the supplied range.
- Tempo is set to **1/1**, Multiplier is **8***. This sets the full range to 8 Bars. If you now change the playback position to 19:0:0 (start of the eighteenth bar), it wraps around to 3:0:0 and send out 0.25 as this is a quarter of the 8 bar range.
  
> The best way to learn how to use the node is to hook up a [control.cable_expr](/scriptnode/list/control/cable_expr) node, enable its debug mode (like it's shown on the screenshot above), then use the HISE Controller popup to simulate a DAW position and see how the ppq responds.

### Similar nodes

There are a few other nodes related to host transport management:

- If you just want a "boolean" flag signal for the transport state, take a look at [control.transport](/scriptnode/list/control/transport)
- If you just want a ready-to-use clock synced ramp signal that you can plug into an LFO, take a look at the [core.clock_ramp](/scriptnode/list/core/clock_ramp) node.