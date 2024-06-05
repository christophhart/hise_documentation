---
keywords: ActivityLED
summary:  Lights up on incoming MIDI messages
author:   Christoph Hart
modified: 18.03.2019
properties:
- Font: Set the font type.
- FontSize: Set the font size. 
- ShowMidiLabe: Set to true if you want to show "MIDI" or not.
- MidiLabel: Select another string. Default "MIDI"
- Base64MidiPath: Set a base64 path for displaying an icon. 
---

## Usage: 

Point the "OffImage" and "OnImage" data property to your respective files. They should be put in the **Images** folder of your project. 


```
{
  "OffImage": "{PROJECT_FOLDER}offLed.png",
  "OnImage": "{PROJECT_FOLDER}onLed.png",
  "ShowMidiLabel": true
}

```