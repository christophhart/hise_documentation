---
keywords: Keyboard
summary:  A highly customizable virtual MIDI keyboard. To change the key colours, see [Engine.setKeyColour()](/scripting/scripting-api/engine#setkeycolour).
weight:   50
index:    01
author:   Christoph Hart
properties:
- Font: Set the font type.
- FontSize: Set the font size. 
- KeyWidth: Set the width of the keys.
- LowKey: The lowest visible key as MIDI note number (C2 = 48).
- HighKey: The highest visible key
- MPEKeyboard: If the MPE mode is enabled, this keyboard will show a MPE style keyboard with multi touch support.
- BlackKeyRatio: Change the relative height of the black keys
- UseVectorGraphics: Toggle between the (old) filmstrip and the new vector based keyboard
- UseFlatStyle: If VectorGraphics are activated you can change this value for a flat keyboard 
- DisplayOctaveNumber: Show the OctaveNumbers C-2 - C7 on each C key 
- MPEStartChannel: Set the MPE Start Channel
- MPEEndChannel: Set the MPE End Channel
- CustomGraphics: If true, it looks in the{IMAGE_FOLDER} Images/keyboard/ for keyboard imagefiles called up_0.png ... to up_11.png and down_0.png to down_11.png. The files have to be present to render the whole keyboard.
- DefaultAppearance: Set this to false to use custom graphics
- HiKey: Set the highest key to display - no need to change that actually :)
- MidiChannel: Connect the keyboard to a MidiChannel, defaults to 1
- ToggleMode: Set to true, to let the keys stick down.
---
