---
keywords: MPE Panel
summary:  Enable MPE and add MPE Modulators in your instrument
author:   Christoph Hart
modified: 18.03.2019
properties: 
- Font: the font to be used for this FloatingTile. Be aware that if you use a custom font you need to load in a script at some time using [`Engine.loadFontAs()`](/scripting/scripting-api/engine#loadfontas) 
- FontSize: the font size of the panel. It will also scale all UI dimensions (table row height etc.) to fit the font.
---

The MPE panel is the main workspace for setting up MPE connections. Unlike every other modulator, the MPE modulators **do not retain their state**, but will be controlled entirely by this panel which are automatically saved in a user preset.
This gives you the possibility to create different MPE mappings in a convenient place plus give the end user the ability to fine tune these configurations to their taste.

![mpe_panel](/images/custom/mpe_panel.png) 

It basically consists of 4 UI elements:

## The Enable Button

By default, MPE is disabled and all MPE modulators are bypassed. If you want to use MPE, you can turn it on by clicking on this button.

> The state of this button (and hence the global MPE state) can be queried using [`Engine.isMpeEnabled()`](/scripting/scripting-api/engine#ismpeenabled).

## The MPE Modulator table

This shows you all active MPE connections (which is just a MPE modulator at a particular location) with a "compressed" version of its UI.

If this table is empty, it means that there is no active MPE modulator, but you can click on Add connection to enable existing MPE modulators.

Below you see a list of all enabled MPE connections. You can set these attributes for each connection:

| Column | Description |
| -- | ----------- |
| **Target**| The modulator name. It will \"uncamelcase\" the modulator ID and remove a trailing \"MPE\", so `SustainGainModMPE` will become `Sustain Gain Mod`. |
| **Meter** | The current modulation value. |
| **Gesture** | The type of gesture that controls this modulator: Slide, Glide, Press, Stroke or Lift |
| **Mode** | By default, the MPE modulation is polyphonic, but you might want to use a monophonic mode (Legato or Retrigger) if the modulation target is not polyphonic itself (eg. when modulating a master effect) or if you want this particular behaviour.|
| **Intensity** | This controls the amount of modulation that is applied to the signal. Normally the range is from 0 to 100%, but when the modulation target is pitch, you can control the pitch amount in semitones. |
| **Curve** | a preview of the modulator's curve that can be edited by clicking on the row. |
| **Smoothing** | this applies a low pass to the modulation signal to smooth out the edges. |
| **Default** | The default value that the modulation value will be set to when the voice is started. |
If you click on a row, it will open a editor for the curve as well as a plotter that shows the last seconds of the modulation signal so you get a visual feedback of how the modulator works. You can right click on the plotter to change the speed / freeze the current state.
You can press Escape to close the editors and delete to remove the current connection.

## The curve editor

If a connection is selected (click on a row to select a connection and press Escape to deselect), you can change its curve using this editor.

## Plot

In order to setup MPE musically it is helpful to see how the incoming data is transformed to a modulation signal. This is where the plotter comes in which gives you a visualisation of the signal over time.