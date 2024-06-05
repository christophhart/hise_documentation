---
keywords: sidechain
summary:  Duplicates the channel count and allows side-chained processing
author:   Christoph Hart
modified: 30.05.2024
---

Sidechaining is a very important concept in the audio effect world and allows you to control the behaviour of a given signal processor using another signal than the one that is being processed. 

The most classic example is a pad synth that is being compressed using the kick drum of a track and will cause a pumping dynamics of the otherwise static pad volume.

If you want to implement this concept in a scriptnode network, this container will come in handy. It's base functionality is rather unintuitive, but required for the setup of this processing mode: it duplicates the channel amount and processes the child nodes with twice as many channels as possible.

- if you run it in a stereo FX, it will create two other audio channels, copy the signal over and then process any child node with 4 channels.
- if you run it in a mono channel setup, it will create another channel and then process the child nodes with 2 channels.

It's not super clear how this function will enable sidechain processing, but it will become clearer (we'll stick to the stereo example for the rest of the explanation).  
1. Now the next step is to use a node that processes 4 channels and uses channels 3 / 4 as peak detection signal while processing only the channel 1 / 2. Luckily most dynamic effect nodes in scriptnode follow that logic and have a separate **Sidechain** parameter that will enable this processing mode.
2. So if add eg. a [dynamics.comp](/scriptnode/list/dynamics/comp) node to a `sidechain` container node and enable its **Sidechain** parameter, it will use the channel 3/4 as a input for the compression level and apply that to channel 1/2. Since the signal in the second channel pair is a duplicate, this will not alter the sound at all, so we're still not 100% there.
3. We can now replace the signal in the second channel pair with whatever we want to use as sidechain input. The possibilities are endless and you might want to use some of the `routing` nodes to funnel the signal into these channels.



