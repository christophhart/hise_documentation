#### v0.96 beta

##### New Features:

- new scripting object 'PresetStorage' for storing and recalling different presets
- Modulators that are added to a restrained Chain inherit its rules
- ModulatorChains in Effects inherited the parent constrainer
- added search bar with regular expression support to sampler table 
- added tooltips to file import dialog
- `Synth.noteOff()` works for ModulatorSynthChains
- `Synth.playNote()` works with ModulatorSynthChains (iterates all ChildSynths and plays the note.
- added text input to value slider for pitch modulators
- changed velocity mode for header intensity slider
- added full screen mode for standalone application (double click on editor interface triggers full screen mode)
- virtual keyboard has focus as default (buttons, comboboxes and text inputs still grab the focus)
- added scripting methods for controlling the group start in sampler:  setActiveGroup() && enableRoundRobin()
- added scripting method Synth.getAttribute()
- added About Page with version number

---

##### Fixed:

- Audio Looper crackle when playing files longer than 5 seconds
- Waveform Generator crackle when playing long notes
- Multiple voices in Audio File Looper make playbar jump around
- Ugly default values for Simple Reverb
- change DeviceSettings.xml location to Appdata folder (Windows)
- removed button from root container
- minor graphical fixes
- Settings window is always beyond Main Window (Windows only)
- creating a new Processor unfolds the parent

---
<small>Release Date: 2015/07/28</small>


---