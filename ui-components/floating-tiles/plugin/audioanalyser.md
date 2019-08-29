---
keywords: Audio Analyser
summary:  A floating tile that connects to an Analyser Module and visualizes the audio signal
weight:   50
index:    01
author:   Christoph Hart
properties:
- ProcessorId: the [Analyser](/hise-modules/effects/list/analyser) module that collects the data for the visualisation
- Index: The visualisation type.
---

You can connect the AudioAnalyser Floating Tile to the Analyser Module with the property "ProcessorId". Just put in the Analysers Processor ID to connect them. 

```javascript
{
  "ProcessorId": "Analyser1",
  "Index": 0
}
``` 
## Goniometer

`"Index": 0`

## Oscilloscope

`"Index": 1`

## Spectral Analyser

`"Index": 2`