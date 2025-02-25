---
keywords: MatrixPeakMeter
summary:  Displays the volume of a Sound generator.
author:   Dominik Mayer
modified: 30.05.2024
properties:
- Font: Set the font type.
- FontSize: Set the font size.
- ProcessorId: The ID (name) of any module with a meter (sound generator, effect, container, matrix, etc)
- SegmentLedSize: Segment the bar into parts to give it a LED like look.
- UpDecayTime: Smoothes the way up in milliseconds.
- DownDecayTime: Smoothes the way down, in milliseconds.
- UseSourceChannels: Set to true to use the source channels.
- SkewFactor: Skew the value to the top (0.1), or down (1-2). 
- PaddingSize: Set the padding between and around the bars in px.
- ShowMaxPeak: Shows a small bar at the latest peak. 
- ChannelIndexes: Array of channel indexes. Set to `[0,1]` for stereo.
---

The panel displays all gain channels of the Routing Matrix of a given sound generator.
