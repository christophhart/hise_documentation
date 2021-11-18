---
keywords: Chapter 3: Dry / Wet FX
summary:  A introduction to the split container and how to setup a dry/wet signal routing
author:   Matt_SF
modified: 18.11.2021
---
  
Ok now, let's take a look at the [`container.split`](/scriptnode/list/container/split) node which creates parallel signal chains.

Let's build a little reverb wit a Dry/Wet control : 

Add a `container.split` node to the graph and add 2 `container.chain` nodes. These will contain our stuff : 

![83dd2341-b9a1-4575-a683-b08494f2978f-image.png](https://i.imgur.com/JEGr9Dt.png) 

> See the signal cables ? You can see that the whole signal is send to both the DRY and WET containers and not split into left and right as in the previous example.

Now add the required nodes like this : 1 gainNode for the DRY channel and a reverbNode +  a gainNode fot the WET channel (type "reverb" in the serach bar to find it) : 

![58076801-193f-4834-aa22-f5a30be985b9-image.png](https://i.imgur.com/io2R6Xv.png) 

Now will be a good time to introduce you to another type of containers : the `container.modchain`. This one is here for you to put all your modulation nodes in. It can contain oscillators for LFO purposes, envelopes and more. 
Here we'll just use it to handle the Dry and Wet levels and for this, we'll use a nice and handy node that Christoph's provided : the Xfader node.

Add a DryWet control at the top, a `container.modchain` + a `control.xfader` to the graph : 

![b86ae466-b4da-4598-be8d-bf7679b31944-image.png](https://i.imgur.com/FPn4mLG.png) 

In the Xfader menu, select "RMS" and connect everything like this : 

![88ec8fae-c9df-4562-80cf-64e6edb44670-image.png](https://i.imgur.com/f9Dme5W.png) 

Done ! How simple is that ? Now if you want to build you own reverb and manipulate it via your interface, just create parameter controls and connect everything : 

![1c3d197d-c264-4fe2-9306-f17c48267373-image.png](https://i.imgur.com/5KJwNyV.png) 

Keep in mind though to take care of the control's ranges, depending on whether you're controlling linear values, levels, frequencies, etc...

That's all for today, have fun !
