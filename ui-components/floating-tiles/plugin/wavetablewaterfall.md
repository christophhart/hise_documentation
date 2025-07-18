---
keywords: WaveTableWaterfall
summary:  A display to show morphing through a wavetable.
author:   Christoph Hart
modified: 30.05.2024
properties:
- Font: Set the font type.
- FontSize: Set the font size. 
- Index: Set to 0 to display the wavetable.
- ProcessorId: The ID of the WaveTable Synthesiser
- Displacement: A `[x, y]` array that defines the perspective displacement. The `y` displacement must be negative or it will look weird. Note that the paths will always be scaled to fit directly into the display, so you might have to play around with this and the `NumDisplayTables` property to find the look that you're after.
- LineThickness: An array with two numbers `[l1, l2]` that define the line thickness of the active / highlighted paths (`l1`) and the inactive ("background") paths (`l2`).
- DownsamplingFactor: A factor that can be used to reduce the points of each path. 1 means one line segment per UI pixel. The downsampling factor can also go below 1 to upsample the path
- NumDisplayTables: The number of paths that the waterfall will create. This is independent of the number of cycles in the currently loaded wavetable and it will interpolate new tables if required.
- IsometricFactor: A value that skews the perspective into a quasi isometric point of view. Try values between 0.5 and 1.0 for the best effect and then play around with the `Displacement` values to make it work.
- AlphaData: A JSON object that contains many parameters related to colour manipulation & transparency effects (see below for an detailed explanation).
- Margin: the margin in pixel between the bounding box and the paths.
---

Every wavetable synthesiser on the market has settled on a particular style to replicate the wavetables and most of them use some variation of a 3D waterfall graph. With this floating tile you can create almost any visualisation of the currently loaded wavetable.

In order to use it, connect to a [Wavetable Synthesiser](/hise-modules/sound-generators/list/wavetablesynth) with the `ProcessorId` and `Index` property (the index is always 0) and display its wavetable. 

## Colours

The default floating tile colours will be assigned to these elements:

- `bgColour` - the background colour
- `itemColour` - the colour of the currently active cycle
- `itemColour2` - the colour of the 3D bounding box of the wavetable
- `itemColour3` - the colour of the inactive paths that are rendered as background image
- `textColour` - the colour of the text as well as the 3D box surrounding the waterfall

In addition, the AlphaData object has two other properties that further define some colours:

- `AlphaData.ActiveGlowColour` - the colour that will be used as glow effect for the active colour
- `AlphaData.HighlightColour` - the colour that will be used to render the emphasised background paths defined by `AlphaData.NumHighlights`

## The AlphaData object

The JSON that defines the floating tile expects a `AlphaData` object which contains detailed properties about how the colours are processed for the paths. Two of the properties are already explained above but there are more properties that you can use to customize the appearance:

| Property | Type | Description |
| --- | - | ------ |
| `NeighbourGlow` | double | This sets the maximum alpha value that is used to render adjacent paths to the currently active path. This can give a nice 3D effect, but might tank the performance because it has to draw all those paths instead of just the active one. |
| `SmoothRange` | `[min, max]` | this is an array that defines the smoothstep range for the neighbour glow. Just try `[0.9, 1.0]` and go from there. |
| `Decay3D` | double | This is the amount of how much the transparency of the background path will be reduced for the paths in the back. Values above 0.0 will slightly darken the waterfall display to the back which gives a pseudo 3D effect. |
| `PeakGain` | double | This is the amount of how much the top of the background paths are rendered brighter than the bottom. Using this property allows you to render the peaks of the waterfall as highlighted which simulates a 3D-lighting effect. |
| `FillGain` | double | This is the amount of how much transparency the fill gradient of the active cycle will have at the outer position. |
| `FillGainCenter` | double | this is the transparency of the fill gradient at the center position. Setting this to zero will render a gradient that is invisible at the center which might or might not look pleasant. Note that the gradient respects the isometric perspective defined with the `IsometricFactor`. |
| `NumHighlights` | int | If you have a huge number of background paths, but still want to emphasise a few cycles within the waterfall, you can use this property to tell the waterfall display to render as much cycles as defined here with the special `HighlightColour` colour. See below (Serum 2) for an example how this looks. |
| `PrerenderBackground` | bool | if this is false, then the waterfall display will always render all paths. Obviously this is a bad idea and will completely tank your UI performance, but you can temporarily turn it on to see how it behaves. |

## Performance considerations

This is a very complex UI element and it applies a few optimisations to keep the repainting performance in check:

1. if the `bgColour` is opaque, then the entire component will be rendered without transparency (which avoids repainting its parent)
2. The "background paths" that make up the waterfall display are rendered once and then drawn onto a cached image which will then be used as backdrop for the waterfall - the currently active waveform will still be rendered as vector path. However whenever the wavetable changes (or the floating tile is resized it will trigger a repaint of all paths which might cause a bit of lag if you overdo it with the drawing complexity).
3. There are a few properties of the FloatingTile which will have a considerable effect on the drawing performance, notably the `AlphaData.NeighbourGlow`, `NumDisplayTables` and `DownsamplingFactor

## File drop support

With the new ability of the wavetable synth of loading audio files as a wavetable, the waterfall display also offers the ability of drag & drop any audio file (just like an [Audio Waveform](/ui-components/plugin-components/audio-waveform)). If you want to deactivate this feature for whatever reason, just set its `enabled` property to false and it should ignore the dropped files.

## Styling Examples

This component is very versatile and can be used to replicate the style of almost any existing wavetable synth. Below are some recreations of the most popular wavetable synths that demonstrate what and how you can achieve different effects.

> Do not just copy & paste these examples, that would be very lazy...

### Serum 2

![](/images/custom/waterfalls/serum2.PNG)

This example shows how to create a 3D landscape by using a thin line and a huge number of paths. The 3D box is rendered with the text colour.

```javascript
const var size = {
  "x": 57.0,
  "y": 75.0,
  "width": 360.0,
  "height": 180.0
};

const var Colours = {
  "bgColour": 4280427042,
  "itemColour": 4292083456,
  "itemColour2": 367388133,
  "textColour": 367388133,
  "itemColour3": 273059181
};

const var contentData = {
  "ProcessorId": "Wavetable Synthesiser1",
  "Index": 0,
  "FollowWorkspace": false,
  "Displacement": [
    0.3,
    -0.8
  ],
  "LineThickness": [
    1.5,
    1.5
  ],
  "DownsamplingFactor": 1,
  "NumDisplayTables": 513,
  "IsometricFactor": 0.5,
  "AlphaData": {
    "NeighbourGlow": 0.0,
    "Decay3D": 0.4,
    "FillGain": 0.3,
    "FillGainCenter": 0.0,
    "ActiveGlowColour": -2133590272,
    "ActiveGlowRadius": 10,
    "PeakGain": 2.0,
    "PrerenderBackground": true,
    "NumHighlights": 6,
    "HighlightColour": -867791507,
    "SmoothRange": [
      0.995,
      1.0
    ]
  }
}
```

### Ableton

![](/images/custom/waterfalls/ableton.PNG)

This example displays the wavetables in a 2D style with a single signal colour. It also employs the highlight feature to render a few steps with a bit more emphasis.

```javascript
const var size = {
  "x": 57.0,
  "y": 75.0,
  "width": 360.0,
  "height": 180.0
};

const var Colours = {
  "itemColour": 4294933248,
  "itemColour2": 385875967,
  "textColour": 385875967,
  "itemColour3": 2589744220
}

const var Data = {
  "ProcessorId": "Wavetable Synthesiser1",
  "Index": 0,
  "FollowWorkspace": false,
  "Displacement": [
    0.0,
    -30.0
  ],
  "LineThickness": [
    2.0,
    2.0
  ],
  "NumDisplayTables": 16,
  "IsometricFactor": 0.0,
  "AlphaData": {
    "GlowScale": 0.0,
    "Decay3D": 0.0,
    "FillGain": 0.0,
    "FillGainCenter": 0.0,
    "PeakGain": 1.0,
    "PrerenderBackground": true,
    "NumHighlights": 4,
    "HighlightColour": 1291845631,
    "SmoothRange": [
      0.0,
      1.0
    ]
  }
}
```

### Pigments

![](/images/custom/waterfalls/pigments.PNG)

This example is similar to the Serum display, but uses a different perspective with almost no isometric effect.

```javascript
const var Size = {
  "x": 28.0,
  "y": 113.0,
  "width": 560.0,
  "height": 190.0
};

const var Colours = {
  "itemColour": 4284791551,
  "itemColour2": 16777215,
  "textColour": 16777215,
  "itemColour3": 325368575
}

{
  "ProcessorId": "Wavetable Synthesiser1",
  "Index": 0,
  "FollowWorkspace": false,
  "Displacement": [
    0.4,
    -0.6
  ],
  "LineThickness": [
    1.0,
    0.4
  ],
  "NumDisplayTables": 512,
  "IsometricFactor": 0.0,
  "AlphaData": {
    "NeighbourGlow": 0.0,
    "Decay3D": 0.6,
    "FillGain": 0.0,
    "FillGainCenter": 0.0,
    "PeakGain": 2.0,
    "PrerenderBackground": true,
    "NumHighlights": 0,
    "HighlightGain": 1.0,
    "SmoothRange": [
      0.0,
      1.0
    ]
  }
}
```

### Vital

![](/images/custom/waterfalls/vital.PNG)

This example uses less paths to make each table line more visible to create a more "grid" like appearance.

```
const var Size = {
  "x": 28.0,
  "y": 113.0,
  "width": 320.0,
  "height": 160.0
};

const var Colours = {
  "itemColour": 4289234941,
  "itemColour2": 16777215,
  "textColour": 16777215,
  "itemColour3": 547915773
};


const var data = {
  "ProcessorId": "Wavetable Synthesiser1",
  "Index": 0,
  "FollowWorkspace": false,
  "Displacement": [
    1.0,
    -3.0
  ],
  "LineThickness": [
    2.0,
    1.7
  ],
  "NumDisplayTables": 64,
  "DownsamplingFactor": 0.1,
  "IsometricFactor": 0.0,
  "AlphaData": {
    "NeighbourGlow": 0.0,
    "Decay3D": 0.6,
    "FillGain": 0.0,
    "ActiveGlowRadius": 10,
    "ActiveGlowColour": 4289234941,
    "FillGainCenter": 0.0,
    "PeakGain": 3.0,
    "PrerenderBackground": true,
    "NumHighlights": 0,
    "HighlightGain": 1.0,
    "SmoothRange": [
      0.95,
      1.0
    ]
  }
}
```

### HIVE

![](/images/custom/waterfalls/hive.PNG)

This example uses no perspective at all so it just shows the current wavetable. It uses the fill colour gradient & some glow effect for eye candy.

```
Position = {
  "y": 88.0,
  "width": 490.0,
  "height": 230.0,
  "x": 77.0
};

Colours = {
  "bgColour": 2236962,
  "itemColour": 4280057521,
  "itemColour2": 503316479,
  "textColour": 503316479,
  "itemColour3": 5131854
};

Data = {
  "ProcessorId": "Wavetable Synthesiser1",
  "Index": 0,
  "FollowWorkspace": false,
  "Displacement": [
    0.0,
    0.0
  ],
  "LineThickness": [
    2.0,
    0.4
  ],
  "DownsamplingFactor": 0.25,
  "NumDisplayTables": 64,
  "IsometricFactor": 0.0,
  "AlphaData": {
    "NeighbourGlow": 0.0,
    "ActiveGlowColour": 4280057521,
    "ActiveGlowRadius": 5,
    "Decay3D": 0.0,
    "FillGain": 0.1,
    "FillGainCenter": 0.0,
    "PeakGain": 1.0,
    "PrerenderBackground": true,
    "NumHighlights": 0,
    "HighlightGain": 1.0,
    "SmoothRange": [
      0.9,
      1.0
    ]
  }
}
```


### Bitwig

![](/images/custom/waterfalls/bitwig.PNG)

This style uses a very distorted perspective in combination with a low path number to create a very "vectorized" appearance.

```javascript
const var Position = {
  "x": 77,
  "y": 119,
  "width": 290.0,
  "height": 260.0
};

const var Colour = {
  "bgColour": 2236962,
  "itemColour": 3758096383,
  "itemColour2": 16777215,
  "textColour": 16777215,
  "itemColour3": 4288322202
};

const var Data = {
  "ProcessorId": "Wavetable Synthesiser1",
  "Index": 0,
  "FollowWorkspace": false,
  "Displacement": [
    5,
    -30
  ],
  "LineThickness": [
    2.0,
    2.0
  ],
  "NumDisplayTables": 32,
  "IsometricFactor": 1.5,
  "AlphaData": {
    "NeighbourGlow": 0.0,
    "ActiveGlowColour": 0,
    "ActiveGlowRadius": 0.0,
    "Decay3D": 0.6,
    "FillGain": 0.0,
    "FillGainCenter": 0.0,
    "PeakGain": 3.0,
    "PrerenderBackground": true,
    "NumHighlights": 0,
    "HighlightColour": 0,
    "SmoothRange": [
      0.0,
      1.0
    ]
  },
  "DownsamplingFactor": 1.0
}
```

### 2D Waveform

![](/images/custom/waterfalls/2d.png)

This style is not stolen from a particular user interface (so you can consider this as an original artwork, copyright 2025 Christoph Hart thank you), but shows how to arrange the waterfall like a traditional waveform as seen in a standard audio editor. It doesn't look as shiny as the rest of the examples, but might make a good display in a techy context (eg. a custom wavetable editor)

> Note that the X-displacement must be exactly equal to the width (minus the margin) of the waterfall display so that the path scaling will turn it into one "seamless" waveform

```javascript
const var Colours = {
  "bgColour": 4289177511,
  "itemColour": 4294967295,
  "itemColour2": 251658240,
  "textColour": 251658240,
  "itemColour3": 1895825408
};

const var Position = {
  "x": 0.0,
  "y": 100.0,
  "width": 600.0,
  "height": 48.0
};

const var Data = {
  "ProcessorId": "Wavetable Synthesiser1",
  "Index": 0,
  "FollowWorkspace": false,
  "Displacement": [
    600,
    0
  ],
  "LineThickness": [
    1.5,
    1.0
  ],
  "NumDisplayTables": 32,
  "IsometricFactor": 0.0,
  "AlphaData": {
    "NeighbourGlow": 0.0,
    "ActiveGlowColour": 0,
    "ActiveGlowRadius": 0.0,
    "Decay3D": 0.0,
    "FillGain": 0.0,
    "FillGainCenter": 0.0,
    "PeakGain": 1.0,
    "PrerenderBackground": true,
    "NumHighlights": 0,
    "HighlightColour": 0,
    "SmoothRange": [
      0.0,
      1.0
    ]
  },
  "DownsamplingFactor": 2.0,
  "GainGamma": 1.0,
  "Margin": 0.0
}
```
