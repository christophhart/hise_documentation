---
keywords: minmax
summary:  Calculates the output value using a dynamic range
author:   Christoph Hart
modified: 03.07.2022
---
  
Scriptnode parameters are usually defined by their target range - unless they are unscaled, then they just send out or forward the value defined by the input. So if you want to convert a normalized modulation input to a range, all you need to do is to hook it up to a target and it will be automatically converted. 

So on the first look this node seems to be redundant, however you need to be aware that the target range of a parameter is supposed to be static (and yes while you can change the range using scripting calls, in a exported node this will not be possible). So if you need to dynamically change the range of a parameter (for example make a pitch detune "coarse" with +-12 semitones or "fine" (with +-100 cents)), this node can be used to change the ranges.

Obviously that means that the modulation output of this node is unscaled - because if you went through the trouble of defining a modulation range like this you don't care about the static target range anymore. So another way of looking at this node would be a scaled-to-unscaled converter

> Be aware that the [normaliser](/scriptnode/list/control/normaliser) is the exact counterpart to this node (it takes an unscaled parameter and turns it into a normalised scaled parameter).