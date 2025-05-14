---
keywords: Top Bar
summary:  The HISE top bar
index: 01
---

![top-bar](images/interface\top-bar.png)


## Show Custom Popup

With the **Show Custom Popup** menu you can quickly set up your own custom popup and populate it with [HISE floating tile](/ui-components/floating-tiles/hise) development tools.

When you select **Create new Popup** you will see a popup window with an "Empty" Layout floating tile. You can toggle between [Layout](/ui-components/floating-tiles/layout) and [HISE](/ui-components/floating-tiles/hise) floating tiles with the little green pencil.

In **Layout mode** you can **right-click** the empty tile to add different layout windows (horizontal or vertical splits), and add them with the little plus sign to build the popups layout. When you switch over into **HISE floating tile mode** you can add various HISE panels, tools and editors with a **right-click** and setup your custom popup. 

When you are happy, save your popup, give it a name and it will be available in the **Show Custom Popup** menu. 


## Macro Controls

![macros](images\interface\macro-controls.png)
The **Macro Control** popup gives you quick access to the Macro functionality in HISE. 

If you click the little arrow the macro gets "armed" and you can connect it to any opened [Audio Module control](/hise-modules) (also multiple), that you have created in the [Module Tree](/working-with-hise/hise-interface/left-panel/module-tree). The macro from now on overwrites the control. It scales the connected value to its MIDI range: 0 - 127.

In a [Sliders](/ui-components/plugin-components/knob) properties you can quickly assign the slider to a Macro control with the parameter `MacroControl`. If you want to connect the slider directly to a single Audio module you can do so with the parameters `processorId` and `parameterId`.

If you want to use the inbuilt [Macro Table editor](/ui-components/floating-tiles/hise/macrotable) you first have to activate the Macros for the frontend with: [Engine.setFrontendMacros(namelist)](/scripting/scripting-api/engine#setfrontendmacros).

## Interface Preview

When you click on the house icon in the middle of the **Top Bar** HISE will open a preview of the plugins interface that you built in the [Interface Designer](/working-with-hise/hise-interface/interface-designer). It will behave in the same way as a the interface on the [Canvas](/working-with-hise/hise-interface/interface-designer#canvas) in **presentation mode**.

## Preset Browser
![preset-browser](images\interface\preset-browser.png)
The star icon will open HISEs default **Preset Browser**. With it you can save, rename, deleta and sort snapshots of your plugins current values.

The default browser is split in three sections in which you can add "bank" and "category" (two nested directories) in which the user presets are created. After setting up these folders you can already see them in your projects [UserPresets](/working-with-hise/project-management/projects-folders/user-presets) folder. 

![save-in-preset](images/interface/save-in-preset.png)

A `.preset` file is basically a simple .XML file that saves the current value of all [interface components](/ui-components/plugin-components) and can be quickly recovered. That a components value is saved in the preset system is indicated by a **little green star icon** in the [Component list](/ui-components/floating-tiles/hise/scriptcomponentlist). You can turn this on or off with the `saveInPreset` property of each interface element. 

> Learn more about the presets in the [User Presets](/working-with-hise/project-management/user-presets) article. 

The Preset Browser can also be placed inside your plugin with the [Preset Browser floating tile](/ui-components/floating-tiles/plugin/presetbrowser) which also shows the saved `.presets` in your projects `UserPresets` folder.


## HISE Controller 
![hise-controller](images\interface\hise-controller.png)

With the **HISE Controller**, which opens when you click the keyboard icon, you get an Input device popup whith which you can play MIDI notes on a keyboard, playback Audio and MIDI files and simulate general DAW transport events. (See: [TransportHandler](/scripting/scripting-api/transporthandler))

In the top-right corner you can see a display with the CPU, RAM and Voices usage of your plugin.

On the left side you can find a **MIDI Panic Button** (the exclamation mark) to reset all Midi Notes and a `Ped`al Icon to toggle MIDI Sustain/Hold on and off.

> Did you know that with a focussed **HISE Controller** you can play MIDI notes in HISE (from C3 up) with the computer keys: `awsed ftgyhuj kol` like on a piano keyboard.

### Quickplay Note

Next to the **HISE Controller** you can see a little **quarter note icon**. It is a shortcut to quickly play a MIDI note (C3) with a single mouse-click. This helps with quickly testing audio output. 

When you right-click the note you get access to the **Quickplay settings** in which you can configure the behaviour of the quickplay note (Midi Note, Transport playback, Sustain Mode and select Midi Note).


## Audio Analyser
![audio-analyser](images\interface\audio-analyser.png)

When you click on the Master peak meter the **Audio Analyser** will show up.

In it you can switch between different tabs to analyse different aspects of the audio signal. On the bottom you can freeze the Audio Analysers output in its current state for exact measurements and scroll between `pre` and `post` output signals. 

#### Spectral
The **Spectral mode** shows a 4 second spectrogram of HISE recent audio output. The **three dots menu** on the top right, opens the Spectral Settings in which you can adjust the FFTSize, the Window Type (Rectangle, Triangle, Hamming, Hann, Blackman Harris, Kaiser and FlatTop) the Oversampling and the Gamma values.  

#### Osc
The **OSC mode** shows an fixed 4ms Oscilloscope window of the current signal.

#### Gain
The **Gain mode** presents a stereo Gain envelope follower which shows the recent gain swings.  

#### FFT
The **FFT mode** shows a 20-20k Hz FFT window. The **three dots menu** gives you access to change the BufferLength, WindowType, Overlap, UsePeakDecay(on/off) and Decay settings of the FFT display.
 
#### Pitch
In the **Pitch mode** the recent audio signal is analysed regarding its pitch data and printed out on a C2 to C4 scale. 

#### Stereo
The **Stereo mode** shows a Goniometer and a Correlation and Stereo meter in which you get a representation of the stereo field of the audio signal.    

#### CPU
The **CPU mode** shows a realtime cpu workload graph. You can use it to find and analyse the CPU bottlenecks in your plugins architecture. 


## Settings
![settings](images\interface\settings.png)

The cogwheel icon on the top-right of the Top-Bar opens the [HISE Settings](/working-with-hise/settings). 


