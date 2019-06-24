---
keywords: PerformanceLabel
summary:  Shows the plugins CPU, RAM and Voices Use.
author:   Christoph Hart
modified: 18.03.2019
discussion: https://forum.hise.audio/topic/1548/cpu-usage-again
properties: 
- Font: Select a Font
- FontSize: Change the Fonts size
---

## CPU

The **CPU** value returns the percentage of time that the CPU needs to calculate the content of the current audio buffer.

E.g.: 30% means that if you have to fill 512 samples that will produce 10ms of audio at 44,1kHz, it might take up to 3 ms to calculate it. 

[Discussion in the Forum](https://forum.hise.audio/topic/1548/cpu-usage-again)


## Scripting calls

You can get access to the PerformanceLabels individual values with these Scripting methods:

[Engine.getCpuUsage()](/scripting/scripting-api/engine#getcpuusage)

[Engine.getMemoryUsage()](/scripting/scripting-api/engine#getmemoryusage)

[Engine.getNumVoices()](/scripting/scripting-api/engine#getnumvoices)


```javascript
Console.print(Engine.getCpuUsage());

Console.print(Engine.getMemoryUsage());

Console.print(Engine.getNumVoices());
```


