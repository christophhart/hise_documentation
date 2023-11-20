---
keywords: Perfetto WebViewer
summary:  An embedded webbrowser that allows to record and display tracing information using the Perfetto SDK
author:   Christoph Hart
modified: 20.11.2023
---
  
The Perfetto tracing SDK is a super awesome profiling toolkit which enables you to track down issues or performance problems with very extensive and precise information. So whenever you see **AWESOME!** in this text, it's because there was a particular awesome feature that deserves special acknowledgement...

Load up this snippet: 

```
HiseSnippet 1064.3ocsVstiZbCE1CKSUf1D0H0G.K90rRHDzljVknp.KWpPcYCJPi5+VYlwL3hGazLlMAEEo7n0Go9Fzdr8bicmMIB0vOPx9b9Nmu4b0yik9zjDYLxowxC6nHmuycwAgZyvMDl.McDx4QtyHIJZL1d0EG1QRRnAHGmy9M8ENMpiL+9mWdAgSD9zhqPn2HY9zKYQLUwsy6+6LNeBIftjEUR6mzepuTLTxk6A9blaWzNh+VRH8JhVsZtHmuYb.SIiWnHJZBxo9ExfCK1Heqvp+aXIrUbp9POzBvP1qmH4AZFquEMbCiGLO66NAAVYdQT3LaT3GbmwBX42WDM9di.bAhxwCmZGSuyNhd8JSutknWETxoDkpaozicW3Gy1oJjn4y25NU.Im0DHrWlJVcQ0NT2cnDzPn5DQ1RmDCGxQ38rtcaig+N+EMaBg9DE9FRLdNQP48v+JNCYHUMTFsSJfCdsrhaowvDblfhWuW3qXRAVJtXuRIE8zHikbO+LXsAKy2SOu46a1niJV67VSld0H7rwOGmpMdHgyWAobss+.X9p8epKZcdmD88FnYH8tMCzrrokwZ00Ebw4JmwaupokQ4iHUC0FVRmX5NnbP4oYo19YlWQhsNvq2SukemqA7Z4dEDtJbaX090.Ca7AN1hw37vNqg9lAbtmsGQyj.s.KMJRfqLgfKGLoTNzOlBEkWJ8I7KkxsCDASnTt9anYt5f8BY5d8IYLrUPL4sKkggbpMt1pMtf9swxU+08jR2mnjQXvnoT2jqzr1CvzwTLfeoFeGlhFYE0C+byMqBsmK9neM0WY.RfOipLnh9NUYPZdOfyBEzfkfnbcLT1Xk13V9PfABgsxRjeA0a2I.lG7zFHuQXCkbygIelxKRxVniAykj.lHDq1.rxRllMWZNjzYK7walgl.NTWJ5cjoO+Ek58tRpnuJ0afMv2Vz50UJKsSgC0sUI1VQ+I.5I1GshFWtCWqHL353ogt2+zvxCq8sIgRJJESEL0q1QE22HbTZlSO4LkUfpJybyGkN2zlFQLX7XC2zbJxP4x6qP+wzQDEIyPfMA+riFqX5OAmQzafbgcfbC2QzjsJ4NX0Td4B7Uac6CyFWqalMd8At14An2k6v+959GxO7wY8Q20NeR5WXoORKaIdezcWf.qtjA64D0w6yzKwSE.o0iVhnWTHRXpCkWx++1RtuTJ9X24Lk+lp4XsJ3Hj79ZvwzmF7P2wqWCiiJHXc2I+4Wm2AfrqLBmQTwLHY6d09nEvLNeJ3cATLoaqbpoa.rm6pOqi.Knh.yg+E9kJrm9rSpvdYBQQD+X40911F8iOdf4FfSBy6tZ.O.DNiqnaIBdKz099Gap6.7GOUf+zoB7ImJvmdp.e1oB7mOUf+xmGn9opC1C6gssMHzr4iMS2bbFKHPEnoZE8eXHU9Y.
```

It includes most of the important use cases where callbacks are executed on different threads and injects a custom message to the profiler so we can find the events in the timeline more easily. In order to record a profiling timeline, do the following steps:

- add a **Perfetto Viewer** floating tile (best place would be the scripting editor tab)
- start profiling by smashing that power button
- recompile the script a few times, play some notes on your keyboard and click on the button on the scripting UI to make sure that all events are happening. 
- after a few seconds of recording, you can deactivate the profiler by clicking on the power button again
- drag the object on the top right into the browser window (this is necessary because the Perfetto viewer runs in an embedded browser that can only handle file input using a UI interaction for security reasons).

Now you should see a timeline of all events. This is very intimitating and overwhelming at first, so let's break it down together and try to extract useful information.

> Be aware that the Perfetto integration in HISE is very fresh so it's super likely that when you read this the screenshots will be somewhat different from what you're seeing (because I changed the tracing categories or reorganised the thread IDs). The main information will most likely be still there.

Since we've annotated all tracing events with the `FIND ME: xxx` string, we can quickly find the events by just typing the string into the search bar at the top - **AWESOME!** - and then click on the item that is highlighted to show the detail section. Let's start with the control callback by typing in `Control Callback` in the search bar.

> If it doesn't appear, make sure you have clicked on the button of your UI while recording the profile - it will only record events that happen.

### The control callback

If you found an item, you should see something like this:

![](/images/perfetto/controlcallback.png)

If it's too small, you can zoom in and navigate using the WASD keys - **AWESOME!**. There are a few important bits of information that we can extract from this screenshot:

1. The control callback is being executed on the **Scripting Thread** (because it shows up in the Scripting Thread row of the timeline)
2. It takes 5 microseconds to complete (see the *Duration* field in the detailed section). This is rather irrelevant now, but being able to see how long something takes is maybe the most important information when profiling performance issues.
3. There is a custom property called `debug.location` which allows you to directly jump to the relevant code section in HISE script - **AWESOME!**. Just double click the `goto @180` statement, copy it and paste it into the REPL console of your code editor (where it says "Compiled OK"). Press enter and it will jump directly to the control callback function.
4. The multicoloured rectangles show the callstack within the thread - **AWESOME!**. As you can see, the control callback is being executed in the "high priority queue". This is an important concept of the scripting thread: it has three different tiers of queues which are prioritized to ensure that high priority events (control callbacks) are not delayed by low priority events (eg. panel repaints or timer events).

Now let's take a look at the next event: the timer callback. Enter "Timer Callback" into the search bar and press enter.

### The timer callback

Here are two screenshots. The first shows two timer callbacks and their interval, which is more or less what we expect (15ms aka 60Hz).

![](/images/perfetto/timercallback1.png)

> You can view durations by dragging the mouse in the timeline which creates a timespan that you can inspect - **AWESOME!**.

Now let's zoom into one of the events:

![](/images/perfetto/timercallback2.png)

These are the interesting bits:

1. The timer callback is executed on the scripting thread again (not the UI thread as you might assume)
2. It's executed in the low priority queue which makes sure that any control callback or compilation which might invalidate the timer callback will be excecuted before)
3. The `repaint Panel1` call is "part of" the timer callback which means that it's being executed inside the callback. 

The last bit is a very important information - if you call something that would be executed with the same priority from within a function, it will be executed immediately, otherwise it will be deferred to its appropriate queue. So if we would change the button callback to call `Panel1.repaint()` the control callback would show this graph:

![](/images/perfetto/timercallback3.png)

As you can see the control callback in the high priority queue triggers a repaint, which is executed later down the line when the low priority queue is executed (unlike with the timer callback which calls the repaint function directly). Events that have a causal dependency will show up with an arrow going from the cause to the effect which is so **AWESOME!** that it deserves two **AWESOME!** **AWESOME!** statements.

Before we move on to the next event, let's take a zoomed out look at all the scripting thread events:

![](/images/perfetto/timercallback4.png)

I've marked one timespan to indicate the 15ms timer frequency and also included the audio thread callback timeline. There are two interesting take aways:

1. The audio thread callback timeline is super stable. That's expected as it will be called by your audio device on a hardware interrupt. If it doesn't look like this you're having a problem.
2. The scripting thread timeline is much more wobbly with periods of stability but some events that will mess up the timing and occur randomly. These events are control callbacks which will happen as fast as possible after the event occurs and possibly changing the timer interval for better or worse. If you've worked a bit with HISE already you might have realised that you can't rely on the timer frequency for precise intervals and this is the reason.

Alright, onto the next one. Type in "MIDI" and then we'll leave the scripting thread behind and take a look at the **Audio Thread**.

### Custom MIDI callback

Before we zoom in, we'll look at the audio thread timeline:

![](/images/perfetto/midicallback1.png)

You can see there are two blobs of things that are 11.5ms apart. This interval matches my current audio device settings (512 samples @ 44.1kHz = 11.6ms). The ratio of the width of the topmost rectangle (the greenish) vs the width of the specifed range is exactly what you will see as CPU usage in the DAW - it will measure how long you took to calculate the required amount of samples in the given timeframe. If the green rectangle start to take longer than 11.5ms then you'll be hitting the 100% CPU mark and audio drop outs will occur (because you weren't able to provide enough samples in the provided timeframe).

Alright, let's zoom in and look at one of the audio callbacks with a `FIND ME: Custom MIDI` event

![](/images/perfetto/midicallback2.png)

The most important thing here is the actual callstack. In our example it's trivial because our module tree only consists of a single interface script, but in a real project this will get you valuable information about which module will consume the most time.


## To be continued...


