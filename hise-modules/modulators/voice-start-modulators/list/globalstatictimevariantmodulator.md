---
keywords: GlobalStaticTimeVariantModulator
summary:  Grabs the current value of a global [Time Variant Modulator](/hise-modules/modulators/time-variant-modulators).
author:   Christoph Hart
modified: 29.06.2019
parameters:
- UseTable: Can be used to change the incoming value using a [Table](/ui-components/plugin-components/table)
- Inverted: inverts the output value with the formula `1.0 - value` (after it is sent through the table if `UseTable` is enabled).
---

If you have a time variant modulator in the Global Modulator Container, you can connect it to one of these modules or to a [GlobalTimeVariantModulator](/hise-modules/modulators/time-variant-modulators/list/globaltimevariantmodulator).  

This module will take the current value of the source modulator at the time of the voice start and use it as constant value just like any other [Voice Start Modulators](/hise-modules/modulators/voice-start-modulators).

There are a few occasions where you want to use one of those instead of its time variant sibling:

- if you're controlling the dynamics with a CC modulator, this can be used on the release samples to retain the volume at the start of the release phase resulting in a more natural sound.
- some modulation targets do not allow a time varying modulation (eg. the sample start modulation of the sampler), or they sound ugly when modulated (the [`fx.haas`](/scriptnode/list/fx/haas) node is not suppose to change its stereo position after the voice has started).

### Example Patch

```snippet
HiseSnippet 1463.3oc4YsrbaaCEkTxnMtIw1IMS6L8wLZ5zcI0iUSZ5iMQOrThqewQz0Ic5hLvjPRXBI.KInaTW28cU+D5eP+.xGPVzeg9GzEce6E.T7gkhLsFkD6FtfCwE3dwAWbeAPqPtCIJhGZXt7AiBHFlWAYOhIF1dHlxL1ZSCyUP6hiDjvZZRsFEfihHtFllUuujf4xKYnd9660B6gYNjLRFFGxoNjcn9TQFUqFaS875hcIGP8yM56zXKGNqM2iGC3oJZCi.rySvCH6gkCqBxv7s53RE7PaAVPhLLWpE2cj8P9Owzi+PZD8HOhrQcCaPPZxc4dtRDK+1n8Ppmq030cjAHTqLsPUsV3FncotzT5YZi0TcTKii75CyJyBd0Oc3UeJvyHG5VRiN.Db2XOrnHxjaGIcP4E2o1hIHrHpXT9sqy.b2XgC2qgrnBmgSGuUlBdgMpW13MYy+pnN86SbDYfcIT2GMu6zyGTtjFJe.59d7ivdYJPNS.nhDpv0Gmzcsz9qkNf5yvU8OKqqZPocUMqVTiTsb19SwcboWCtiKd662chslnEpG4YH9lYNHuhFxHzNc2OQCBekAx5mNH6FR9wXByYLwm87m+O2SZhrUlEVieswCwGS5yC80SXF66PF.STdJGP7C3PVGm7Vi19btXHkMnng2MZrCmGzggA0fadgXMDGQ1ue+HhHuXZGGI39iwhJIhsfDrIVfML+Azcuy5vS+aJe+0sgW2d+ES6IBVM+9CUJsEmbmLcKStmdNOGfFwo1SW.P7LyZU8MyrV83wBvOcWrHj9THzxdw91PZAGBfDFi3ASDxrhzWT2dCYakKNg4pZ7uvSRm0ksMS5r93NMlLB1kQ1PVNUsppE66oZWS5oW69DH+2jQydomCbeGAL8GDhYQA7nBB1l3SOfyjZ8LheWDQZ72SZIUHnEGGN0tffuvhbp7XiEwgJSxl97X1X723u94+3dmL2bISqTrdxbi+bRR64LEXp+Ryv.xfATogRxIcxQonoyBq5FCY8YDX6AhkH+Lj6ACUnPzJHamPZfnUrP.QVntRRZTjP5XrWbAyJiRHiqh5QfrhEEg1C7ExtsG0EpwTx9pJGZHmYBsSfg0ZTFg.dqfDT33LrHxIf0TBv9IzS.CcvhxnF.IvCEaSFc1UlEWHADh61L9QmT.2ZRMwZIBnM2+HdK9SUh35HacBORJ4xsXxAiqhzwZ5gYCHSrRJ0VxxH6gw866QlkhXIM6Wu.6VvoxUh3Fnwg0x0Q5ZAABxUUm0Ghpe20Se5rI7ZOK30QMadFlqCIdbGH45jyUFxKLe8uYqlPYYaCy2siszsK87cczND1.wvxOaOQNaG9svr8HtktsQ4rHtFJI6mMwCxfyOMq6oJj2GserHHVr.D00P6Z0AB0ENVXYBoRoExpRgzg4NgHVy3bxkZLm4OVUi22F07AaZ2KorP0205vNFLRCHESdrKmwCFxYzBGvoGApWZv.RXdzO0kTSg.L+ZGGdbAquMIN3QSPUO3TJOypglxND.Z4G3CfUbV6OsgRboD9keqgMbzoBUL88OqGXTgyUXS2euQGGNr8Pl0Vv7ezGTIMSfb4pEYMUEZmuOBwJiwpdG47MXuBRYVbQPutJJwf8BghcEThuzEAU6aLm5cNyHfzX4cj0nFR3v7q8czMq08QEyGXgyGTswCotvYXyQXwE+zrzoYALU60eZ17W0Ux+i5iRtGUoaxg3PJlIRW.JreYzdvgSAX.oWOUX2hFv8vgxew.b36CvJHJG6wjPglOEQ88CVAIK0gAlWRch4sl0ss+Mm3ZTWXahFSpS9jDfnW0uPMykPSpVp7+F0xqhqc5Uwb3icB4O1QWRszI3RJJv5lo9smKi1U1tV8zJnQar9FF9TW5icbjw69LHV4z44ymCdt8bvyclCd9h4fm6NG77kyAOe0L4Qd6UMiEbecrRffUGsmgY5Olvrpw+gm0.4C
```

This snippet contains a sine wave synthesiser that runs through an arpeggiator. There's a global LFO that connects to the stereo modulation through either a static or a normal `GlobalTimeVariantModulator`

By default the normal one is activated. If you press a note you will hear something that resembles a monophonic LFO modulation of the stereo positions.  
However if you turn it off and enable the static one instead, you will hear a much more interesting effect: the samples are placed at a fixed stereo position and "remain" there gives them a more distinctive positioning.