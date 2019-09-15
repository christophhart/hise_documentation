---
keywords: MPE
summary:  Using MIDI Polyphonic Expression in HISE
author:   Christoph Hart
modified: 15.09.2019
weight:   70
---
  
MPE (MIDI Polyphonic Expression) is an extension of the old MIDI standard which allows polyphonic modulation of notes. HISE has a built in support for this standard, however there are a few things that deviate from the usual process.

The main reason for this is that it is

1. an optional feature which the majority of your user base will not use
2. if it is used, the user will most likely have a strong desire for detailed customization

which has the following implications:

1. MPE support can be turned on and off globally
2. The MPE connections can be directly controlled by the user through the [MPE Panel](/ui-components/floating-tiles/plugin/mpepanel). You are obviously free to omit this panel from the user interface, but even then **you** have to setup the MPE configuration through this panel. 

> If you don't use the panel for setting up the MPE connections, they will not be saved properly.

## Summary
If MPE is enabled, the MPE-capable MIDI hardware will assign each note a dedicated MIDI channel cycling from 2-16 (there are other MPE modes called Zones, but they aren't supported in HISE).
It will then transmit this data on the respective MIDI channel:

| Icon | Name | MIDI message | Description |
| - | --- | ---- | ---------- |
| ![](/images/icon_slide) | Slide | Pitchbend | A horizontal movement on the MIDI controller |
| ![](/images/icon_glide) | Glide | CC #74 | A vertical movement on the MIDI controller |
| ![](/images/icon_press) | Press | Aftertouch | the force that is applied to the note |
| ![](/images/icon_stroke) | Stroke | Velocity | the velocity that you hit the note |
| ![](/images/icon_lift) | Lift | Release Velocity | the pressure level when the note is released |

These 5 gesture types are transmitted and can be interpreted by a MPE Modulator, which is an envelope modulator. It will automatically detect the MIDI channel and assign each MIDI message to the respective voices.

## How to use MPE modulators in your instrument

The idea behind the MPE system in HISE is that you add [MPE Modulators](/hise-modules/modulators/envelopes/list/mpemodulator) into every slot that you want to control via MPE. 
Then you use the [MPE Panel](/ui-components/floating-tiles/plugin/mpepanel) to assign and enable each modulator. Don't worry about performance, if the MPE modulators are bypassed, they don't waste (hardly) any CPU cycles. This panel is a floating tile and is supposed to be embedded in your compiled plugin to give the end user the possibility to thorougly tweak and control the MPE mappings. All MPE mappings are stored in a user preset (similar to the MIDI Learn settings) so this can be used as part of the preset design.
>There is a global **MPE Enabled** state which can be used to toggle *all* MPE modulators at once.

## Advanced Tricks
#### Assign UI sliders to MPE modulators
A common practice in plugins is to have a right-click context menu with a MIDI learn / assign to controller function. This can be also used for adding / removing MPE connections using a simple trick:
> If a sliders name (= the `text` property) matches the modulator ID (minus a MPE-suffix), the MPE modulator can be added / removed in the slider's context menu.
So if we have a slider / knob on our interface that has the name `SustainVolume`, all we need to do is to add a MPE modulator in the gain chain and name it `SustainVolumeMPE`. You can of course add this modulator to the cutoff modulation of a filter, but that would be misleading; the only connection they have is this name and it's your responsibility to match their functionality.

#### Use a MPE modulator as additional envelope
By setting the default value to 1.0 and the smoothing to a bigger value, the MPE modulator will have some sort of \"attack\", which can be used as additional envelope.

#### Add MPE support for scripts
The inbuilt script processors in HISE support the MPE protocol, but if you have custom MIDI scripts, changes are big that you have to modify them in order to make them work with MPE enabled.

In 99% of all cases, you just need to store the MIDI channel along with the MIDI note and process that information:

```javascript
// BEFORE
local lastNote = Message.getNoteNumber();
Synth.addNoteOn(1, lastNote, 127, 0);

// AFTER
local lastNote = Message.getNoteNumber();
local lastChannel = Message.getChannel();
Synth.addNoteOn(lastChannel, lastNote, 127, 0);
```

You can use the API call `Engine.isMpeEnabled()` to find out whether you need to bother about this at all. The most recommended way is to branch using this method and put your original code into the `false` branch like this:

```javascript
if(Engine.isMpeEnabled())
{
	local lastNote = Message.getNoteNumber();
	local lastChannel = Message.getChannel();
	Synth.addNoteOn(lastChannel, lastNote, 127, 0);
}
else
{
	local lastNote = Message.getNoteNumber();
	Synth.addNoteOn(1, lastNote, 127, 0);
}
```
