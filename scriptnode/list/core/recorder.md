---
keywords: recorder
summary: A node that records the signal input into an audio file slot.
author: [Your Name]
modified: 30.05.2024
parameters: 
  - `State`: Sets the recording state. When set to "On" (1.0), the node begins recording. When set to "Off" (0.0), the node stops recording. The recording will automatically stop if the buffer is full.
  - `RecordingLength`: Sets the length of the recording buffer in milliseconds. Range: 0.0 to 2000.0 ms.
---

The `recorder` node captures audio signals and records them into an audio buffer. It supports configurable recording length and state management, ensuring precise control over the recording process.

The node writes the incoming audio signals into an internal buffer. which is allocated and managed based on the specified recording length. It ensures the buffer is resized appropriately when the recording length changes.

It will then write the buffer into an audio file slot which can be picked up by other nodes using the same slot or shown on the UI / used in HiseScript using the [DisplayBufferSource](/scripting/scripting-api/displaybuffersource) API class.
