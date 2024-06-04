---
keywords: Scriptnode Voice Killer
summary:  A helper tool that will forward a voice-reset message from a DSP network to the HISE voice allocation system
author:   Christoph Hart
modified: 18.03.2019
---

One special task of an envelope (that is put in the gain modulation chain) is to detect when the envelope has fully decayed and then tell the voice system to stop rendering that voice (because it will be silent from now on).  

The inbuilt HISE envelope modulators will monitor their signal output and tell the voice management system to stop the note (eg. when the release phase is over and the envelope is idle at zero).

If you are designing your own synthesiser using scriptnode, you can still use the HISE envelopes to kill idle voices. However there are two issues that arise from this:

1. The end of the release phase of the gain envelope is not the only reason for stopping a voice. The most obvious other example is when you play a non-looped sample and it reaches the end of the sample. If the envelope has a sustain phase, it will cause the voices to keep playing (even if there is silence coming from after the end of the sample). Of course the HISE sound generators that are playing sample content (the Looper and the Sampler) will send a voice reset message once the end of the sample is reached, but if you're rolling your own sample player in scriptnode, you need to somehow send this information back from the scriptnode network to the HISE voice manager.
2. If you implement the entire voice DSP inside scriptnode including the envelopes, you will also want to send out a voice reset message once the envelopes within the network finished their release phase. If you don't do this, then the voices will stack up and consume LOTs of CPU.

In order to solve these two issues, you need to add this module into the gain modulation of your scriptnode synthesiser then add one of the voice management nodes in your network to tell this module to kill the voice.

### Example

Take a look at this very basic scriptnode synthesiser:

```
HiseSnippet 1160.3oc4X0saaTDEdV6rN0g.pUBIDbkuLUJJxtzVPhKhyO1EKvIVYCQbWzzcONdj2clkYlMIFDRHwM7Jz630f63E.Ij3EouAvY1Y2301ot1llVjvVxZmyOy4aN+Nq6IE9fRIjDmpmNJFHNa55MhqGbv.JiS5bHw4Cb6RUZPVyRZ+QwTkBBHNNkelgfS00Hoed4t6SCobeXLIB4LAyG9ZVDSOlZuleEKLrMM.NkEUP5G2riufefHTjf3oracRL0eH8B3HpQrRtDmJsBXZgzSS0fBkYeQvHuAhq3V4OioXOODLKZP7vMxRlbv.VXPu7yphPbb6M9jW1dx+P2tr.1MzG6AteJiZi0nnOvoz7fTik.RNEfzZVH8.WOeIKVOliAOumaGNFP5SQWcQnXkk376tGHPA35chnCg1RbwMJr0SqWe6Z3OO7K5mv80LAulfejPCGy25ga7CaTciebiZSype+akmwLRQXHHuU1lnqbdJtEOI54fb6ZWRCSfaDDO9S5SqrX9Te6otffBdGNSebLjstsHLv3qLOOaDfj41vm9lNGR0TSPIiFJWLH0LCbbNDtDypsgnptGBpgZQLlWOS7CybDAIgT8joSl5lLFn+XhXnIPwUL8nh0UKQNV84lisnP7At8XZ+A2NFKcKXD8T2EXLqx78ca0uO3qGCv0ba+sqZY3ha9p4l2VYk1XL07ebFEtH.pkRFTLEHaLm1i+4h1dLdgaOlWvus6xTbMUOz0VrhqIyYKH+szIqx6flquYR7eGVaNQ++JVL9QExyRSULYFfcJvmTLGLkYMK2ISB6J3h3ABNyuXd2IfVxt3BPVj3+1yWi69dOk+eSum44htmaqq0RZi+CN4HCZO5sIzNQjnY7K5Rwb5qwq1cTRjG1izGPXw4PHt4tNkLy2sqqaVa.gGvCRW723mLlMLqcxX1HmYgqFbDnuRHGlVwl8LwYc6TA0MUjmqJNUXuvPwUGHhhYYoznSIkVOQ3n7pSmRVIxg8dQhDzhYX+KopSorPiXdIJ7FMAGy8PgSGn3T9LPpR230cquC9EqINBgApcapO5kG0ihytvhKykjvfEH2w+lf1qF3Eihl8Ke5i0+g3Mx3TRuZd4BWQx1LyrBC4kLlXS2NpyLb8ogjyLSjLmDhYOsdRKXshJT9XmLShEYFzKgcJvdUwmgUbHbc9s7NjohCoi1OAq0sMimfh4PvCfqySGZgSVCvaRlpddJROpDeOEMjMBLeE9bWFO6HOtmUW50SQ69M8zPrG66ghkIdCgqrNghTM9oJl5OfLyNSluoebyYL8u7WSa5e8Eu32l0zM+4n+XW6afzVBeWBl7MZJ6+SCa9Zr+K2c1id8k7nuYp8qchoXhLy9SVdeOZrkz2+Lrq0clowtOuRSutauAT0xG2eSX6JoWOZdGaSs09BwvHZZKxU6EodazPOh5KEm6auqroh8doTv9D7z+sgptcMqq0fb4z9wH7Bqm66O4VMihOZUU7SWUEe7pp3SVUEe5pp3mspJ94udEMuOwdIZQjcTKl22qksQsSKNEuRQ5zBx+.bjgVjB
```

There is a scriptnode voice killer envelope in the gain modulation and the DSP network of the synthesiser just has a single oscillator producing a sine wave generator. Note how the notes will never stop playing and stack up. This is because nothing is telling the scriptnode voice killer to do its job.

So what we need to do in the DSP network is:

1. Add an envelope
2. Connect that envelope to a node that sends a voice reset message

We'll pick the [simple_ar](/scriptnode/list/envelope/simple_ar) and the [voice_manager](/scriptnode/list/envelope/voice_manager) node, then connect the Gate output of the envelope to the voice manager (they are a match made in heaven, the gate parameter goes to zero once the release phase is done and the voice manager sends a reset message when its value is set to zero):

![](/images/custom/scriptnode/voicemanager.png)

Now you can see that the voices are properly killed when the envelope is done. If you remove that connection from the GATE output to the voice manager, you'll see that the voices are still being silenced, but keep on rendering (watch the voice counter).

```
HiseSnippet 1332.3oc4X8zaaTDEeV6LN0ooPqnGfa9.GRkhhrKgBRbHNw+oXANwJaHhdJLc2wwi7tyrL6rNwfPBItvMN2abgu.8F23K.RH0uH8aP4M6t1dWuNt1VIAP3HEsyady79Mu262ad61QJrn99BIxn3IC8nHiMwlC4pd05QXbTq5Hi2A2l3qnxRQhNXnGw2mZiLLx+Ts.ihqgB+858Nf3P3VzIhPnSELK5WxbYpIR6T8KXNNMI1zSXtIzd2psrD7ZBGQ.fm73xHOhUex4zCIZ0xgQFEZXyTBoohnn9fNGHrGZ1SbAOR+SY9rm6P0CpfLgMJRLpVOlicmQmUeDx.2YxIOezI+g31La1X4S7.2ObhRSVQRefQt4AoJKAjLR.o0hfzCvlVRlmZxLZ7bWbKNDP5R.WcRnDoKx3Ov0DfBb0Ntj9zlRXv3Er0SJWd6Rv+dzm0MfaoXBdIA+PghdDeqGsw2uQwM9gMJM8Tc6Ny4zlQJbbnxYNsN5Jm2B2hG39bpb6RCHNAzwJBG+z9zBKlO0J5TmPQAuEmoNxiFOtovwV6qzOmMBfhcavSeUq5DEQGThkA54QkJlFNF0oCfr5nPTQbcpeekvCxqyD+fLGgcfCQkNcRyahm.7Gohg5.E2moFljWsD4XkmaN1hBwGf6vTV8lMFyMCLBdpaBLFyLuGtQ2tTK0D.tFt4WupzvE27EGY9HlUXgwPy+AwR3BaZoPwTelOUVYNkG+qEs7n2BWdbDgea7xPtlpF5ZKF4JcNaB8mQkrB+CTb85Iw++5by7+ugaNOWzcvMtTIIU9WXzKFZO91DZGKBTL94sIJI6Rn0mCCbMgZHVT.VbN0A1brQN88eQiKqGqAgIkaGN3Mvu3IqnGaDOYkQSl3pyCopKDx9gczD+LxX8npl9iqZdlexpl663Htnlv0iEmRCNkPYcDNC85I3LK8EOQZLB166JB.KFi8Om3eBg4nUyLvGtw29HtInbXAWi7mRk9ga753x6.+AbhCAX.qtIwB7xC6PfZ6.4R2DADrnxcrFGztZfmLJp2uQUmi7e.dc0NkvVWymnEhnl8zifPdNsI1D2x+T8rVDGzo5J15SBRumZ0yGC1HUE9VvMD5DKTFzKo6jX5qBeEK7L2W9l4iQ8TdNzKG0ITclumCY3AA.eOpg0TRzGDtM8xQoDMfaergtsBW9nzjNDIzKuhFeMwnQvysY73i8j5VsIWNkr6W0TQ8LYeGMIUwrO8hHGQRoZeUAMGjhxryn4a5cqlwz+7ql1z+5Kdwum0zU+I2+buntzaJoea.j.NbJ6+i8q9Vr+q2K6Qu7Rdz2Lz9kNVSnPY1ezx66Aisj99mBUttwLMTA5JM853N8H9Keb+5v1EBagXFG6DT36h8YZt0YjoXvODS4CnN.IbmIZb0j3W9reKKIFO2BMuqt7eBZXLNiJhhLuP2awID44Tkd04RJH90g3zvNM8mR8LylbXb41V1Z.LP2z6YtDN7p8xIQD8jah089VJrs3q2BPfmIc0m0V5Tgp+xhUB3adu5uZunK62WoHV8mNY3Cqht4MdQ7wTG5LXAqh0ulH+2JDv6E60qEHGLKDLoy4w44I4lSmelhe99S3mo0ZI4n4RcQap7RiDdn0uYBNoXYY1q8CTBWH3E9t9ovF5.gnuKIr4tU6SjbazJpKwRJNyJ5sf0dz6DJA5tgG9cDKhaqGWpBZvztVW3UQOyxJ8VkYgOdUW3GspKb2Ucge7ptvmrpK7SV0E9ou8Ep+RAwYm56T.pPmFQU2MZvIvKCER+P+MvDbKQs
```

### Silent Synth

Note that if you are using the silent synth generator with polyphonic hardcoded FX, then you don't need a Scriptnode Voice Killer because **its functionality is already embedded into the Silent Synth!**. You still need to send the voice reset messages from the network though.