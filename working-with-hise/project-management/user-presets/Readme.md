---
keywords: User Presets
summary:  The system used for restoring states of your project.
author:   Christoph Hart
modified: 19.06.2019
---

Loading and restoring the state of your plugin / app is a vital feature that's used in different occasions:

- When you load up your plugin / app on **Initialisation**: This sets your initial values when starting up a fresh instance, or if you recompile your plugins ScriptProcessor script during development.
- When you select a **User preset**: A User preset can be either shipped with the plugin as **Factory Preset** or created by the user (eg. with the [PresetBrowser](/ui-components/floating-tiles/plugin/presetbrowser)). 
- When you re-load the plugin / app in a **DAW Session**: If you save a session in your DAW, your plugin needs to restore the saved state.

All of these are handled by the User Preset system in HISE.

## Definition

> A User preset is "a save-state of **Interface values** from all **Restorable UI controls** that you have defined in your **Main interface**". 
 
It will be saved in your projects [UserPresets](/working-with-hise/project-management/projects-folders/user-presets) Folder. Let's tear apart that definition for further explanation:

- **Main Interface**  The Script Processor that you use for creating the main interface. By adding controls to this interface, you are building up a data model that is used for the User preset system.

- **Restorable UI control**  You'll certainly want to (re-)store some UI Components with a User Preset, while excluding other components from the UserPreset system (Navigation buttons, page handlers and buttons that load other user presets). You can do this with setting the `saveInPreset` property of each [Plugin Component](/ui-components/plugin-components) to enabled or disabled.
  
- **Interface values**  The current value of the UI Component. Behind the scenes this value is a `var` variable with its Data type depending on the kind of UI Component you use (Sliders will use a double precision floating point value, Buttons a boolean value and Comboboxes an integer number for the selected index starting with 1).  Since it's a `var`, it can even hold objects and arrays which is a backdoor for implementing a custom user preset system if you are not satisfied with the possibilities of HISE [Presetbrowser](/ui-components/floating-tiles/plugin/presetbrowser).

An important aspect of this definition is that it does **NOT** save the state of any other HISE Module. So if you:

1. Add a sampler
2. Load a samplemap (in the samplemap editor) and save the user preset
3. Load another samplemap and save another preset

both user presets will not contain any data about which sample map is stored **UNTIL** you hook up the loading of the samplemap to a UI control on your main interface. In 99% of the use cases you will need that UI control anyway and for the 1% of data that should be really an internal property that you don't want to show to the user. If thats the case just add a control and set its `visiblity` to `false`, so it won't be shown on your UI.

## Data Layout

A User preset is saved in the `.xml` format. Let's take a look at a basic example with a Slider called "Volume" and a Button called "Bypass":

```snippet
HiseSnippet 699.3ocsUttaSCCEG2tqdZsbQLId.5G2jFnTXafDRvn2PUv1pHiI91jmi6p0bribbFqBw6FOR7F.GmjtjBoiEjne6b4u6O6ykLwnY73XsAgacx7HNBeeh+bkcV+YTgBMd.3mL7ZZXjji5MOhFGyCPX7ZuyEF2pIJ82OdSOpjpX7BWHzoZAi+AQnvV3cxAuWHkinA7SDgkxd2CFyzp9ZoNAPYMhGJhxtjdA+HpKsFDDd8gABq13aoVdLjSOcvb+Y5unxx+TQr3b.RvnKxGNnL2n9yDxfIKtlwHDt4jhK8ZYW5GSNTDHtwewk+QoA5Tnn7a.twxH0bIj5tJjFokAtCXE3gKgWyL71j3yLhHaQDGa2iLVY4loT1xklrbQ3uS5qgDT1mFRujOx.F2HXq8871oyddda+poIJlUnUczpizV9wps1t8Wa2p82Z242CMcZkwb+MFsTxMUF1UoM2lvsTIgmyM6z4JpLgeShv0e4220uauurracoD0pwJg83HdtcQEnaEU.T9yFTKZjSHjpMsR7v7JguTDvMHAbHaPNUKSftzT5KO.fVk5dIVqVkqNqzsPMAmp7SiGPsTW2PNL.fQbiU3dGvC3WAiVY8FsHC3wWZ0QozFFoUNzwM+67dc4wu4kMPq9fpB8RGjn7A85CP+YuLLQoCRjT6xiYt8I4Afdik5mcMspXgcd48M0X1yqxYuJq72Qb2jLQXYypl2FUvqqU5+Lu4axd.Y3zobls.1ljQe9ecsUMP4i5DqPcwgTqQ.MDjiRB8gk4LNPhRwkwtd6FtghLauE859bUPpwOge4A65rw4A6tHHJjxL5yXYSUtckaj5AXRk9YhVjCc1c5tXZxwcHr.+LFy8P7Df7pU7rZq340Vwt0Vwd0Vw90VwKpshWdKJbes7sIVcX1XA3XxvzMYX7PEE5pR6.Q+RfIlyu
```

If you create a User preset, you will get a `.xml` file that looks like this:

```
<Preset>
    <Control type="ScriptSlider" id="Volume" value="0.125"/>
    <Control type="ScriptButton" id="Bypass" value="0"/>
</Preset>
```

Loading the user preset will go through this list and set the value for each Control (UI Component) or execute its respective callback.

1. Controls which are connected to a Processor parameter just set the parameter of the Module as if you would have interacted with the Control via mouse / keyboard.
2. Controls which have a scripted callback will execute their callbacks asynchronously.

The values are set according to this files top-down flow. There are a few edge cases in which you need to be aware of this: If you have a Slider that controls the [Sample Start offset](/hise-modules/sound-generators/list/streamingsampler#chains) of a [Sampler](/hise-modules/sound-generators/list/streamingsampler) and a Combobox that selects the different [SampleMap indexes](/tutorials/modules#minimal-sampler-example), the Slider must be placed after the ComboBox to set the values in this order:

1. Load the new SampleMap including samples
2. Apply the sample start offset modulation value to the new sample set.

If the order is wrong, you will end up changing the sample start offset of the old samples, and then load the SampleMap which resets the start offset to the original values. In this case the Slider will not have any effect.

## File Management

These files are saved in the [UserPresets](/working-with-hise/project-management/projects-folders/user-presets) folder, which is either the subfolder of your project folder during development, or a subfolder in your **app data** directory when you are using the compiled plugin. The [Preset Browser](/ui-components/floating-tiles/plugin/presetbrowser) mirrors the file structure found in this directory. By default it uses a three level hierarchy (Banks -> Categories -> Presets), but you can change it to a 2-level or even flat list hierarchy if that is not apprpriate for your project (simple FX plugins usually need only one level of hierarchy).

## User presets in compiled plugins

If you export a project it will embed all .presets found in the projects UserPresets directory into the plugin. After the user has installed the plugin and loads it up for the first time (or more precisely, if there are no existing user presets in the expected directory), it will extract the user presets as factory content into the predefined location found in:

**Windows**:

```
%APPDATA%/Roaming/<Company>/<Product>/User Presets
```

**macOS**:

```
~/Library/Application Support/<Company>/<Product>/User Presets
```

This process will take place if this directory is empty doesn't exist yet. If you want to ship an update with new user presets you will have to make sure that people can add them manually. Also be aware that on the end user side the folder is called `User Presets` (instead of the nerdy `UserPresets`).

## The Init Preset

Every project has an initial state which will be the state when the user for the first time instantiates the plugin or loads the app. It will be the exact state of your project when you exported it in HISE. In some cases this may be subideal because:

- It may deprive the user of the funtctionality to reset the plugin to a vanilla state
- It may be messy (you might end up changing values accidently before exporting which would change the default state)
- The Scripting call `Engine.getCurrentUserPresetName()` will return an empty string.
- If you are using Git, it will create a lot of noise in a commit because the control values will be all over the place.

The solution to all these problems is to create a **Init user preset** that contains the exact state how you want your project to load up. During development, everytime before you (.xml) save the project (or every time you want to save it and commit it to Git) just load the Init preset before saving. This will make sure that the control values are always the same reducing Git noise and general unpredictability. The user can load the init state to reset your plugin to default values, and even if `Engine.getCurrentUserPresetName()` still returns an empty string, you can hardcode a preset Label to show the initial name on startup:

```javascript
const var presetLabel = Content.getComponent("PresetLabel");
presetLabel.set("text", "Init"); // or whatever you call your init preset
```

> Speaking of default values.. Please make sure that the `defaultValue` property of each [UI Component](/ui-components/plugin-components) will match the value in the `onInit` callback. Some hosts (ProTools AFAIK) will override the init preset with the default values for all plugin parameters so if these values differ, you may end up with two versions of your plugin's initial state.


## Scripting Access to User Presets

The [Engine](/scripting/scripting-api/engine) Scripting API holds the methods to access the User Preset system with scripting:

```javascript
// Returns the current UserPresets name
Engine.getCurrentUserPresetName(); 

// Returns an Array with Strings of all UserPreset derived from the UserPresets folder
const var x = Engine.getUserPresetList(); 
for (i in x)
    Console.print(i);

// Loads a User preset with a string (relative path to the .preset file without the file ending) 
Engine.loadUserPreset("New Directory/test");

// Loads the next/previous UserPreset, with a boolean to stay in the same directory
Engine.loadNextUserPreset(1);
Engine.loadPreviousUserPreset(1);

// Saves the current plugin state as new User Preset
Engine.saveUserPreset("test2");
```
