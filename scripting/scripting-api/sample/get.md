|Name			|	Index 	|Description|
|---------------|-----------|-------------------------------------|
|`KeyHigh`		|		4 	|The highest mapped key|
|`KeyLow`			|		5 	|The lowest mapped key|
|`VeloLow`		|		6 	|The lowest mapped velocity|
|`VeloHigh`		|		7 	|The highest mapped velocity|
|`RRGroup`		|		8 	|The group index for round robin / random group start behaviour|
|`Volume`			|		9 	|The gain in decibels.|
|`Pan`			|		10 	|The stereo balance (-100 = left, 100 = right)|
|`Normalized`		|		11 	|enables / disables Autogain to 0dB for all samples.|
|`Pitch`			|		12 	|The pitch factor in cents (+- 100). This is for fine tuning, for anything else, use RootNote.|
|`SampleStar`		|		13 	|The start of the sample.|
|`SampleEnd`		|		14 	|The end sample|
|`SampleStartMod`	|		15 	|The amount of samples that the sample start can be modulated.|
|`LoopStart`		|		16 	|The loop start in samples. This is independent from the sample start / end (so 0 is the SampleStart value and not the beginning of the file , but it checks the bounds.|
|`LoopEnd`		|		17 	|The loop end in samples. This is independent from the sample start / end, but it checks the bounds.|
|`LoopXFade`		|		18 	|The loop crossfade at the end of the loop (using a recalculated buffer)
|`LoopEnabled` 	|  19 	| True if the sample should be looped.|
|`LowerVelocityXFade`	|	20 	|The length of the lower velocity crossfade (0 if there is no crossfade).|
|`UpperVelocityXFade`	|	21 	|The length of the upper velocity crossfade (0 if there is no crossfade).|
|`SampleState`	|		22 	|This property allows to set the state of samples between Normal(0) and Purged (1)|
