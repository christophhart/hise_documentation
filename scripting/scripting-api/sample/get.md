|Name					|Description|
|---------------		|-------------------------------------|
|`KeyHigh`				|The highest mapped key|
|`KeyLow`				|The lowest mapped key|
|`VeloLow`				|The lowest mapped velocity|
|`VeloHigh`				|The highest mapped velocity|
|`RRGroup`				|The group index for round robin / random group start behaviour|
|`Volume`				|The gain in decibels.|
|`Pan`					|The stereo balance (-100 = left, 100 = right)|
|`Normalized`			|enables / disables Autogain to 0dB for all samples.|
|`Pitch`				|The pitch factor in cents (+- 100). This is for fine tuning, for anything else, use RootNote.|
|`SampleStar`			|The start of the sample.|
|`SampleEnd`			|The end sample|
|`SampleStartMod`		|The amount of samples that the sample start can be modulated.|
|`LoopStart`			|The loop start in samples. This is independent from the sample start / end (so 0 is the SampleStart value and not the beginning of the file , but it checks the bounds.|
|`LoopEnd`				|The loop end in samples. This is independent from the sample start / end, but it checks the bounds.|
|`LoopXFade`			|The loop crossfade at the end of the loop (using a recalculated buffer)
|`LoopEnabled` 			|True if the sample should be looped.|
|`LowerVelocityXFade`	|The length of the lower velocity crossfade (0 if there is no crossfade).|
|`UpperVelocityXFade`	|The length of the upper velocity crossfade (0 if there is no crossfade).|
|`SampleState`			|This property allows to set the state of samples between Normal(0) and Purged (1)|



Example to print the `SampleEnd` of all samples:


```
const selection = Synth.getChildSynth("Sampler1").asSampler().createSelection("^.*")` //Array of `Sample` objects.
`for (sample in selection){
  Console.print(sample.get(Sampler.FileName));
}
```
Note that attribute names belong to the `Sampler` class, not `Sample`

trace() does not work on `Sample` objects.
