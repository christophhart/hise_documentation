---
keywords: Sampler
summary:  The sampler module of HISE
---

One of the key highlights of HISE is to build sample based VSTis. The main module for that task is the [Sampler](/hise-modules/sound-generators/list/streamingsampler).  

The Sampler is a disk streaming sampler which leverages the full power of the **HISE** Engine. It is optimized to play a lot of voices in parallel and allows to map samples in SampleMaps up to an individual SampleMap-size of 4GB. 

The samples can be arranged in a three-dimensional map to account for Note number(x), Velocity(y) and Round Robin Groups(z) and a lot of tools are provided to map and edit your samples quick and efficiently. 

![](/images/custom/samplemapaxis.svg:400px)

**General Workflow**:

- Put your samples in the projects [Samples](/working-with-hise/project-management/projects-folders/samples) Folder.
- Create a Sampler and map and save your samples into a `.xml` SampleMap with its [Map Editor](/ui-components/floating-tiles/hise/samplemapeditor). The saved SampleMaps will show up in the projects [SampleMaps](/working-with-hise/project-management/projects-folders/sample-maps) Folder. 
- Collect an compress all samples in a SampleMap with the [HISE Lossless Audio Codec](sampler.html#Export-to-HLAC-Monolith) (`.ch1`) into a single monolith file. 
- When the development of the plugin is ready, all HLAC monolith files can be bundled in a [HISE Resource](/hise-modules/sound-generators/list/streamingsampler#hise-resources-archive-file) (`.hr1`) Archive File, that can be distributed to the user. 


## Sampler Tabs

The Sampler features four special edit tabs:

- [Sampler Settings](/working-with-hise/workspaces/sampler-workspace/sample-settings)
- [Sample Editor](/working-with-hise/workspaces/sampler-workspace/sample-editor)
- [Map Editor](/working-with-hise/workspaces/sampler-workspace/sample-map-editor)
- [Table View](/working-with-hise/workspaces/sampler-workspace/sample-table)

Additional to the default chains, it features two extra [Modulation Chains](/hise-modules/sound-generators/list/streamingsampler#chains-) to modulate the **Sample Start** of samples and the **Group Fade** between different RRGroups.

## Sample Maps

You can load and save **SampleMaps** independently from the Sampler as human-readable `.xml` files, which makes it an own sampler file format. It saves all the individual sample-settings that you give your samples in the Map- and Sample-Editor.

```
<?xml version="1.0" encoding="UTF-8"?>

<samplemap ID="" RRGroupAmount="2" MicPositions=";">
  <sample Root="62" LoKey="62" HiKey="63" LoVel="0" HiVel="127" RRGroup="2"
          FileName="{PROJECT_FOLDER}Folk Harp/EWHarp_Normal_A#1_v2_RR1.wav"
          Duplicate="1" Pan="5" Pitch="4" Volume="-10" SampleStart="515"
          LoopStart="3934" LoopXFade="216" SampleStartMod="10036" LoopEnabled="1"/>
  <sample Root="62" LoKey="62" HiKey="63" LoVel="0" HiVel="127" RRGroup="1"
          FileName="{PROJECT_FOLDER}Folk Harp/EWHarp_Normal_A#1_v2_RR2.wav"
          Duplicate="1" Normalized="1" NormalizedPeak="42.6667" LoopEnabled="1"
          SampleStart="50803" SampleEnd="304376" SampleStartMod="51418"
          Pitch="1" Pan="-8" Volume="2"/>
</samplemap>
```

## Timestretching

Starting with HISE 3.5.1 the sampler module has an inbuilt timestretching mode that allows you to independently control pitch and time of your samplemaps.

It's using the (slightly modified) timestretching algorithm from [signalsmith](https://github.com/Signalsmith-Audio/signalsmith-stretch) which is a pretty new library with a reasonably good performance / sound quality ratio. It's licensed permissively which means that the library can be embedded into the HISE codebase and used in proprietary projects.

In order to use the timestretching mode, just switch the mode in the Sampler Settings and adjust the stretch ratio using either the slider on the Sampler Settings (if applicable) or the scripting API call [Sampler.setTimestretchRatio()](/scripting/scripting-api/sampler#settimestretchratio). There are four modes which define how this stretch ratio is applied to the samples:

| Mode | Description |
| - | ----- |
| `Disabled` | The default state with timestretching disabled. There's almost no CPU overhead if this is disabled to ensure that the CPU performance of most projects will stay the same. |
| `VoiceStart` | This mode will use the current stretch ratio and apply it statically to new voices. This allows you to define different stretch ratios for different voices. |
| `TimeVariant` | This mode will apply the current stretch ratio to all voices. This allows you to define a dynamic stretch ratio, but all voices will have the same ratio. |
| `TempoSynced` | This mode will ignore the manual stretch ratio and automatically sync the stretch ratio to the BPM of the master clock. By default it tries to detect the musical length of a sample using the current tempo, but that automatic detection can be overriden by supplying a `NumQuarters` property to the timestretching options. |

Be aware that if the timestretch mode is anything else than `Disabled`, it will process the sample using the timestretching library, even if the time and pitch ratio are 1.

> If the timestretching is enabled, any pitch modulation (using the modulation or root note detune) will not change the pitch using resampling but with the pitch transposition of the timestretch algorithm which retains the duration of the sample.

### Timestretching Options

In addition to the timestretching mode, there are several other options which allow you to customize the timestretching:

| Property | Type | Default | Description |
| -- | - | -- | -------- |
| `Mode` | `String` | `"Disabled"` | the timestretching mode (as described above). Changing this mode will kill all voices and refresh the voice states on the background thread. |
| `SkipLatency` | `bool` | `false` | If true, starting a new voice will skip the inherent latency of the timestretching algorithm. This vastly improves the timing of the voice, however it comes with a pretty steep CPU overhead because it has to (silently) calculate the timestretched signal for the duration of the latency (about 50ms). |
| `NumQuarters` | `double` | `0.0` | if this is not 0.0, it will skip the automatic detection of the sample length when in tempo-synced mode and use this value to determine the BPM of the source sample (so you will need to set this to the value of your loop lengths). |
| `Tonality` | `double` | `0.0` | This value allows you to [retain the timbre](https://signalsmith-audio.co.uk/code/stretch/#how-to-use-pitch-shifting) when using pitch transposition. |


Be aware that there is no UI interface for these properties in HISE (except for the mode). Instead, you will have to use the scripting API calls that query and set these properties from a JSON object.

```javascript
// fetch the current state
const var obj = Sampler.getTimestretchOptions();

// print out all properties
Console.print(trace(obj));

// Apply your changed
obj.SkipLatency = true;

// Update the options
Sampler.setTimestretchOptions(obj);
```

## Release Start

![](/images/custom/releasestart.png)

This is a new feature in HISE 4.1.0 and allows you to use the natural trail of a sustain sample as release sample without having to chop the sample and setup a second sampler with the release trigger logic. You can enable this by setting the **ReleaseStart** value to a non-zero value. If that is the case, then the sample will be played normally, but as soon as you release the key, it will seek to the position you specified and play it back until the end. This works with disk-streaming, HLAC multimics & loops so it can be used in any configuration that you run the sampler with. Note that for performance reasons, HISE tries to deactivate the entire logic until at least a single sample of a samplemap uses this feature, then it assumes that all samples use this feature. Also the memory usage will be increased as it requires another preload buffer for each sample at the release position.

> If you use that feature make sure to use a gain envelope with a long release time as the envelope release will fade out the release trail otherwise.

The native implementation of this features direct into the streaming engine allows special modes that improve the smoothness of the fade between sustain part & release trail. You can specify the length of the fade, the gamma curve as well as whether it should apply gain matching to reduce the volume bump.

### Release Start Options

The interface to setting the release start options is the same as the time stretching algorithm: There is no UI, instead you need to query and set a JSON object that define the settings using the [scripting API](/scripting/scripting-api/sampler#setreleasestartoptions).

| Property | Type | Default | Description |
| ---- | - | -- | -------- |
| `ReleaseFadeTime` | `int` | `4096` | The fade time in samples. The sample rate is derived from the sample not the audio processing rate. |
| `FadeGamma` | `float` | `1.0` | The gamma curve for the fade. `1.0` means linear and other values will create a curve using the `output = Math.pow(input, gamma)` formula. The values for the gamma curve must lie between `0.125` and `4.0` |
| `UseAscendingZeroCrossing` | `bool` | `false` | if true, then the start of the fade will wait until the sample goes through the next positive zero crossing (from negative to positive). If you set the release start position correctly (also a positive zero crossing), then it makes sure that the start of the fade is phase-aligned. |
| `GainMatchingMode` | `String` | `None` | This setting will define how the sample tries to blend the fade between sustain and release phase. These options are available: `["None", "Volume", "Offset"]`. **Volume** will monitor the peaks of the sample while playing back, and then apply a constant gain factor to the release tail to match the current volume. **Offset** will jump into the release tail to skip the louder part if the current gain is low (coming soon). |
| `PeakSmoothing` | `float` | `0.96` | The filter coefficient for smoothing the volume detection of the currently playing sample. This **must** be a number below 1.0 and the higher the number the slower the max peak will change. |

Do you remember when I told you that there is no UI? I was lying. There is in fact a popup window that allows you to change the values of the setting properties on the fly (in the sample editor, next to the loop improve icon):

![](/images/custom/releasestartpopup.png)

This allows you to check different options quicker during development, but remember that in order to make persistent setting changes, you will still have to use the API call (but there's a quick shortcut that creates the script lines for you in the popup).

## Compress and Export

### Export to HLAC (Monolith)

![convert-to-monolith](/images/icon_convert-to-monolith:32px)

A freshly mapped SampleMap plays the samples directly from the Samples folder. This is not the most efficient way to play samples, though, especially if you have a lot of mapped samples. 

Here the HLAC (HISE Lossless Audio Codec) comes in to compress all the SampleMaps samples into one big "monolith" chunk. **Export to HLAC** will render your samples in a single compressed file, to have faster access to the audio material. This shrinks the overall filesize + speeds up general file access. The `.ch1` monolith files will end up in the root directory of the [Samples Folder](/working-with-hise/project-management/projects-folders/samples).

> Read this Forum entry of Christoph if you want to understand how it works behind the hood: [HISE Lossless Audio Codec is ready](https://forum.hise.audio/topic/236/hise-lossless-audio-codec-is-ready) 

There are three modes in which the HLAC (.ch1) file can be processed: 

#### No Normalization

**No Normalization** just takes the samples and compresses them into the monolith file.

#### Normalise every sample

This **normalises every sample** individually and compressed them together. 

#### Full Dynamics

**Full Dynamics** is a mode that leverages the higher resolution of 24bit samples. 

Behind the scenes **Full Dynamics** still uses 16bit, but normalises the samples internally in chunks of 1024 samples so that decaying samples still use the full available bit depth.

This way you get the advantages of a 16bit signal path (half memory usage for all the streaming buffers) but the quantisation noise at the end of a sample is not audible anymore (which can happen if you heavily compress or distort the sound).

During the extraction process of the samples the user can decide for herself if she favors disk usage or sound quality. But with Full Dynamics enabled, the .hr1 archive file uses 24bit FLAC encoding, otherwise the normalisation would be pointless.


> If your material is 16bit from the start, you won‘t get any benefits from using Full Dynamics. Just disable it at exporting and the end user will not have this option.


### Hise Resources Archive File

If you want to distribute the samples to the enduser you have the option to compress 
the monoliths (lossless) further for delivery. [Export > Export Samples for installer](/working-with-hise/menu-reference/export#export-samples-for-installer).

The HLAC codec is optimized for maximal decoding performance so a standard lossless algorithm like FLAC 
can provide you with a 10%-20% better compression ratio. 

The Hise Resource is a file archive that uses the FLAC codec and splits up the files into customizable chunks of 500MB - 1GB. 
So if you compress a 3.7GB library and choose 1GB file size, you will get these files:

```
Samples.hr1 // 1GB
Samples.hr2 // 1GB
Samples.hr3 // 1GB
Samples.hr4 // 700MB
```

When the user runs the plugin for the 
first time they will be asked to locate the HR files that were shipped with the 
instrument/plugin. The monoliths will be extracted to their chosen location, after 
which the user can opt-in to delete the HR files.

A thorough explanation of this process can be found on the excellent user manual of David Healey's [Sofia Woodwinds](https://librewave.com/knowledge-base/sample-library-installation-guide/?v=3a52f3c22ed6#Installing_the_samples):