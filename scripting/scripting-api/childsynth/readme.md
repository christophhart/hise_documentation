With the `ChildSynth` object you can refer to any [Sound Generator](/hise-modules/sound-generators) in the HISE audio hierarchy and modify its properties.

As in:

```javascript

// Right click the top bar of a module and click "Create generic script reference" to auto-generate this line.
const var SineWaveGenerator1 = Synth.getChildSynth("Sine Wave Generator1");

```


