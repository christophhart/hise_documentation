---
keywords: specs
summary:  A little analysis tool that provides some information about the current processing context
author:   Christoph Hart
modified: 18.07.2023
---
  
This little helper node will display the audio processing specs of the current location. It shows the sample rate, block size, channel amount as well as whether MIDI messages are processed or if the network is polyphonic. You can use multiple instances at various places to confirm what's happening:

![](/images/scriptnode/specs.png)

> Since this is just a debug tool, this node will be ignored when you compile your network to a C++ class.