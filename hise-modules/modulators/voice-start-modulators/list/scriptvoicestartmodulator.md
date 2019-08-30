---
keywords: Script Voice Start Modulator
summary:  Creates a scriptable modulation value at the start of the voice.
icon:     /images/icon_script
---

This module can be used to create a fully customizable **constant modulation value**, if the inbuild Voice start modulators do not offer the desired functionality.

## Callbacks

There are 5 callbacks for this processor, you probably recognize the [`onInit`](/hise-modules/midi-processors/list/scriptprocessor#the-oninit-callback), `onController` and `onControl` callbacks from the MIDI script processor - they do exactly the same. However there are two special callbacks that make this module useful:

## onVoiceStart

This callback will be executed whenever a voice is about to be started. You need to return a value between `0.0` and `1.0` and it will use this as modulation signal.

```javascript
function onVoiceStart(voiceIndex)
{
    // the same functionality as the stock velocity modulator
    return Message.getVelocity() / 127.0;
}
```

The parameter `voiceIndex` can be used to get the index of the voice, which is guaranteed to be between `0` and the number of voices available. However you can't rely on it being chronologically.

## onVoiceStop

This callback will be called when a voice is stopped, that means when the note was released and its gain envelopes have completely tailed off.