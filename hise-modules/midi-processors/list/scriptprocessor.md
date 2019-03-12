---
keywords: Script Processor
summary:  MIDI Processor that allows scripting.
icon:     /images/icon_script
---

The Script processor is most likely the most important MIDI processor.

## Callbacks

## onInit

The onInit callback is executed whenever the script is compiled - that will happen at least once if your plugin is loaded, but might also be called when a script processor is added on the fly during a preset load.
It will be executed on a background thread while the audio thread is suspended.

> There is a compile time out that will abort the execution of this callback to prevent endless loops. You can adjust this value using the [Compile Timeout](/working-with-hise/settings/development#compile-timeout) setting.

