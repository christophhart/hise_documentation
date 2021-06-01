---
keywords: DisplayBuffer
summary:  A reference to a ringbuffer inside scriptnode
author:   Christoph Hart
modified: 01.06.2021
---
  
There are a lot of nodes in scriptnode which offer some kind of visualisation data:

- oscillators have a waveform display
- peak modules have a modulation plotter
- envelopes have a envelope curve
- fft analysers have the frequency spectrum

By default, they are only visible inside the scriptnode editor, but you can choose to expose certain data sources to your UI. 

### How to connect a DisplayBuffer

1. Make sure to expose the display buffer of the node you want to visualise by assigning an **External Data slot** to it (click on the plot icon next to the display on the node editor and choose a free slot in the popup menu). Be aware that this system is using a single-writer rule, so you can't assign multiple nodes to the same external slot!
2. Generate a (typed) reference to a [DisplayBufferSource](/scripting/scripting-api/displaybuffersource) by passing in the ID of the script module that hosts the network.
3. Call [DisplayBufferSource.getDisplayBuffer()](/scripting/scripting-api/displaybuffersource#getdisplaybuffer) with the index of the data slot that you assigned in step 1

