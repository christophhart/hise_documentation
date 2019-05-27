---
keywords: Keyboard
summary:  A highly customizable virtual MIDI keyboard.
weight:   50
index:    01
author:   Christoph Hart
properties:
- KeyWidth:     set the width of the keys
- LowKey:      the lowest visible key as MIDI note number (C2 = 48).
- HighKey:      the highest visible key
- MPEKeyboard: if the MPE mode is enabled, this keyboard will show a MPE style keyboard with multi touch support.
- BlackKeyRatio: change the relative height of the black keys
- UseVectorGraphics: Toggle between the (old) filmstrip and the new vector based keyboard
- UseFlatStyle: If VectorGraphics are activated you can change this value for a flat keyboard 
- DisplayOctaveNumber: Show the OctaveNumbers C-2 - C7 on each C key 
- MPEStartChannel: Set the MPE Start Channel
- MPEEndChannel: Set the MPE End Channel
- CustomGraphics: if true, it looks in {IMAGE_FOLDER}/keyboard for files called up_0.png ... to up_11.png and down_0.png to down_11.png. The files have to be present to render the whole keyboard.
- DefaultAppearance: set this to false to use custom graphics
- HiKey: set the highest key to display - no need to change that actually :)
- MidiChannel: Connect the keyboard to a MidiChannel, defaults to 1
---

