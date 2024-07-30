---
keywords: TransportHandler
summary:  A class that manages callbacks for host playback events
author:   Christoph Hart
modified: 29.04.2021
---
  
The `TransportHandler` class can be used to register callbacks that react on host transport events. As of now, these events are supported:

- Tempo changes
- Time signature changes
- Transport state changes (only playback)
- Beat changes
- Grid events (a synched timer with a customizable frequency)

In order to use it, just create an object with [`Engine.createTransportHandler()`](/scripting/scripting-api/engine#createtransporthandler)
and then use the functions to register callbacks.

```javascript
const var TransportHandler = Engine.createTransportHandler();

```

### Execution modes

There are two execution modes for the callbacks: **synchronous** and **asynchronous**. Synchronous means that the callback will be executed directly in the audio thread as soon as a state change is detected. 
This should be used for any logic regarding playback (eg. for implementing custom arpeggiators).  
However if you want your UI to react on the host transport state, you must use the asynchronous mode.

> You can specify the mode when you pass in the callbacks into the register functions. Be aware that each transport handler has two slots, so you can register two different callbacks for the synchronous and asynchronous execution.

This example will demonstrate all features of this class by implementing a simple metronome that should react to your host.

```
HiseSnippet 1721.3oc4WstaaTDEd23rkFWLzhpP7yQQHUGvjZW5MABUGmKsVzjXEmVnRHUMd2isG5tyXlc1jZphD+jGi9XvO4QoOB8MnblYu3cC1oFKZ.AVIVdly4Ly27ctLmoiT3BggBok8JGNdDXY+9NcGyUC2bHkwsZukk8G5bnjxCGIjpCgPkUqwinggfmksco6qUxdkksLed88ZQ8obWXxTVVOVvbgGxBXpIy1o42x782g5AGxBxo8Ma11Uv2T3KhP.Uxot0Hp6ynCf8nZ0Vxwx9Ba6wTBYWEUAgV1K2R3Mt6Pww7X8eLKj0yGzCZX0EWn3o2Q36oQrdVqMGx785jdvCsrrc5LgFJESCW0YWlGKa9IzwkMBHSrHOeXuzYAuF4gW84Gd14f2xwv6JNcckrQpIRzX6RNs4JP1mhtf7vJVWqk9sK3ro.0fqVOf9LXGINHyhp2td8ZjaUu9ZeckxUJe8qSNbHKjf+oFBjvwb2gn9hHbbZ7.YHk64CRxwCYtCIGiNUxHe5XiEAfRqe.P3BjLpTFcsgJxQTIJl7Mjs4CXbXcWIfbUVH1ChWwpYfX2Hznd.gxILtOZAoeD2UwDbbVWZTHPXp3sVFo0wr4zHOl.+Et3dUJeZCE7V3lVsG9UM7.tGbbKpbMRkxunRYB9wW3R8ILODkljg0odd6gGh84UaTib25jOOyJxmQZbiZ3+2oFwvbZ6iMRer2ue+s.jQ.uVi29Hj3a6Uk4oWCixmjbHa2mLVDQbQ9b.f7aD9kfzm5imtgfDpU3LRy4L7GSphldMTDteXpFILpmxGsGS43CH+HSg9WyljRWZ94QsSHGhm.B4WSQFDQQefBPtiDpnXTJYDHYBu0pTFOLgfZeCqsoAiU0XrVBQl4q1ATXX.t9ADeZOvufS+PHXj.YzzHvAfZSANEGGTcUizU0qzDK1SDLS8QYmR6s.9YnuQ5orniHbl5ixVM6bsm3Xxwflikv.VHRnX3n.OmRBxKDQ+rPqPz4Tv+PvHI+dXUrPsGMZjGFrm3AzKdJyZN9ITqwsWKaIqxgiMhWKK9zLTaX0UUvyUqVijpCFYtJoUmcQrW9jX7mtEcYC3TUjDl01HBpQ7zzzjMBY4haCJLIF2PnEDFaa19l6vklbOiclE1ASQvn0IaLR+wqcuAwWGrpNQMQMx8HwSFt9.I.bxWkMVBd4Q.561Bn3tbTLsyh8GDVw7sBUqxpRf9KccmbNSyBVUHyxFEGARIyyTBJjg27oWKInKZJ3XpIFLULZHzWnldB0oIkbEmlBsno7bDCpTNRAqFim1IjROeL9K0uUXIPi6YRfQAHqkq.YR4t0J+hxqT9jxjSKpe+oJSmLIE9lJ3SQr95d4YYXUdTPOPVCyO8ifLEw68JdwpyruXM+89tw414TTvayYp8GA7YccqURAA7WOp8VTEUeCbxbndXQQESCA6sfiv5sw2GuhyVP3yThQHRyphXYWVYjVI415GpKJZwv6jeOGS5p0ymz7ySZNdxf1M6i6XbaO50tOMxWYomqK6my0wzFMOl4oFNYBVyg.avvbMa8fl.RcTC6XWR600K4MZTWWmPeZe6n0wAKDjCqMi9aAqOYJXMFeN15Ixiaq4iUMUkxgzKex+nH8RylQw7vb3726kCmur2BhyWN9Lv4uZWDmoUVQcuf0uX8l3Ny+ScZh86J7h7ophMAq67OQ.l.WnaScGk7PlZb9WF7Noy34EtWwoCC6LY53coofWLk+cMdSdmQEms62GbUS.6xN678myOpvIFKkc1fS8GGBoulHcXiB3oUDhXYwHwW0riDKGhcgDWNLY5K1ztTQvWZ9JbOEt6.QjBu7eWpRxvDGm8hB5hgutl9Y3Xyl5f7kz0uiGWWOVCht.2yL3M3mDgMzisSD1HUXd+yGDeRtjSW7oClF5MjxGaFS9N5Q.49.Gj5HsFy5QwM+A1ql2GEOZteT79tJb6S5pJrvB2EBXGhEeByO4iBwm5A+zA5P+7yuofJmpnWeucvC4TsoqtERSNzFAhHtpPNSo4NP8uviyW9e0ON+7qhYo4CtukT8URwXWVvHeXa9QfO1SiAieT5UMoyVLtdWrE1QCEbladm9AXiyrAC.YdrO0CzFJE1G5jYtZyC.eflO.9Sa9PLviJQdBVPtnw7yEmk+5SbhgKQmLR9uwMck9e4McmKWbbdrGATWo3otwOTRGKeQyL34lmzo3t5wjFVlGOoaxr950sBvJhO00US2eAxOS2lar.17kKfM2bAr4VKfM2dAr4NKfM28LsQeYzFQJQPbpHNQmsMunz1dattObSTu0e.zpy6sH
```

## The HISE master clock

This object will also grant you access to the master clock of HISE, which itself can be either free-running or synched to the host clock. This lets you control most time-synched modules in a very flexible way, including:

- MIDI Players
- Arpeggiators
- LFOs

In order to use the master clock with modules, you need to

1. enable the grid callback
2. set the synchronisation mode to one of the four available modes
3. turn on clock synching for every module that should be synched to the master clock.
4. start / stop the internal clock manually (or let the host do that for you when synching externally).

When the synchronisation is active, the following modules will change their behaviour:

### MIDI Players

Starting and stopping the MIDI player will be ignored. Instead if the clock playback state changes, it will seek to the current position and start the playback on the next grid callback (this means that it you can start the DAW playback at the middle of a bar and it will jump to the correct position).

The grid callback will determine the resolution of when the MIDI player is started, so you can choose the time resolution that works best for you.

### Arpeggiator (not implemented yet)

Pressing a note will not start the arpeggiator playback, but just add the list to the notes to play. If the clock is running, it will start the arpeggiator on the next grid event. If the playback is stopped, the arpeggiator will turn off.

### LFO

The LFO will not move unless the clock is running. It will also be resynched on every audio callback to match the playback position.






