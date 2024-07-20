---
keywords: Audio Waveform
summary:  A UI element that connects to a [`AudioSampleProcessor`](/scripting/scripting-api/audiosampleprocessor) and shows / modifies its content.
index:    01
author:   Christoph Hart
---

The audio waveform can be used to display an audio file that was loaded into a HISE module that supports the `AudioSampleProcessor` Interface (eg. the [Looper](/hise-modules/sound-generators/list/audiolooper) or the [Convolution Reverb](/hise-modules/effects/list/convolution). Connect it to on of these two with the property: "`processorID`"

### CSS Styling

You can use mulltiple selectors to style different parts of the audio waveform:

- the generic background & the waveform path can be styled with the `.scriptaudiowaveform` class selector (or a `#AudioWaveform1` tag selector). In order to draw the actual waveform you need to reference the path with the `var(--waveformPath` CSS variable.
- the inactive zones are rendered using the `:disabled` pseudo state.
- the playback position can be styled with the `.playhead` class selector, which makes it consistent with the [Table](/ui-components/plugin-components/table) component.
- the draggable edges of the waveform range can be styled with the `.waveformedge` class selector. In order to differentiate between left and right edge, you can use the additional `:first-child` / `:last-child` pseudo states. They support the usual pseudo states `:hover` and `:active` for mouse interaction.
- the textbox with the filename can be styled using the `label` HTML tag selector.

### Stylesheet Example

```javascript
const var AudioWaveform1 = Content.getComponent("AudioWaveform1");
const var laf = Content.createLocalLookAndFeel();

laf.setInlineStyleSheet("
/** Draw the background of the audio waveform. */
.scriptaudiowaveform
{
	background: #929;	
	box-shadow: inset 0px 4px 3px rgba(0, 0, 0, 0.3);
	border-radius: 5px;
}

/** Draw the inactive range of the audio waveform. */
.scriptaudiowaveform:disabled
{
	background: yellow;
}

/** Draw the actual waveform. */
.scriptaudiowaveform::before
{
	content: '';
	background-image: var(--waveformPath);
	background-color: red;
	border: 1px solid white;
	box-shadow: 0px 1px 2px black;
}

/** Draw the inactive part of the waveform. */
.scriptaudiowaveform::before:disabled
{
	content: '';
	background-image: var(--waveformPath);
	background-color: orange;
	border: 0px solid white;
	box-shadow: none;
}

/** Draw the edges of the sample range. */
.waveformedge
{
	border-color: rgba(255,255,255, 0.3);
}

.waveformedge:hover
{
	background: rgba(255, 255, 255, 0.5);
	border-color: white;
}

/** Draw the left edge. */
.waveformedge:first-child { border-left: 1px; }

/** Draw the right edge. */
.waveformedge:last-child { border-right: 1px; }


/** Draw the text label with the filename. */
label
{
	color: white;
	background-color: color-mix(in rgb, orange 20%, black);
	margin: 2px;
	padding: 2px 5px;
	font-size: 0.9em;
	text-align: right;
	vertical-align: top;
	border-radius: 3px;
}

/** Draw the playhead pt. 1. */
.playhead::before
{
	content: '';	
	background: rgba(0, 0, 0, 0.5);
	width: 10px;
	left: calc(calc(100% * var(--playhead)) - 4px);
}

/** Draw the playhead pt. 2. */
.playhead::after
{
	content: '';	
	background: red;
	width: 2px;
	left: calc(100% * var(--playhead));
}
");

AudioWaveform1.setLocalLookAndFeel(laf);
```