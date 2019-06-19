---
keywords: User Presets
summary:  The system used for restoring states of your project.
author:   Christoph Hart
modified: 19.06.2019
---

# The User Preset System

Loading and restoring the state of your plugin / app is a vital feature and is used on different occassions:

- **Initialisation**: which values are used when you load up a fresh instance, but also what happens if you recompile your script during development.
- **Factory Presets**: inbuilt presets that are shipped with the plugin.
- **User presets**: restorable states that can be created by the user.
- **Loading DAW projects**: if you save eg. a Ableton session, your plugin needs to restore to the exact same state.

All of these are handled by the User Preset system in HISE.

## Definition

A user preset is **a collection of interface values from all restorable UI controls that you have defined in your main interface**. Let's tear apart that definition for further explanation:

- **Main Interface** The script processor that you use for creating the main interface. By adding controls to this interface, you are building up a data model that is used for the user preset system. This tight coupling also lets you write the logic for reacting on UI events at the same place.

- **Restorable UI control**. In your interface you will have a few controls that contain actual information about the plugin's state, but also many elements that should not be part of this data model. The prime example for this type of control are navigation buttons, page handling functionality and buttons that load another user preset. These have to be excluded from the restoring process, which is done using the `saveInPreset` functionality.

- **Interface values**. The value of the UI control. It is a Javascript `var` and the type depends on the control (sliders / knobs will use a double precision floating point value, buttons a boolean value and comboboxes have a integer number for the selected index starting with 1). Since it's a `var`, it can even hold objects and arrays which is a backdoor for implementing a custom user preset system if you are not satisfied with the possibilities of the stock system.

An important aspect of this definition is that it does **NOT** save the state of the other modules. So if you:

1. Add a sampler
2. Load a samplemap (from the samplemap editor) and save the user preset
3. Load another samplemap (from the samplemap editor) and save another preset

Both user presets will not contain any data about which sample map is stored **UNTIL** you hook up the loading of the samplemap to a UI control on your main interface. In 99% of the use cases you will need that UI control anyway and for the 1% of data that should be really an internal property that you don't want to show to the user, just add a control and set its visiblity to `false`, so it won't be shown on your UI.

## Data Layout

A User preset is a XML representation of this data model. Let's take a look at a basic project with a slider called "Volume" and a Button called "Bypass":

```snippet
HiseSnippet 699.3ocsUttaSCCEG2tqdZsbQLId.5G2jFnTXafDRvn2PUv1pHiI91jmi6p0bribbFqBw6FOR7F.GmjtjBoiEjne6b4u6O6ykLwnY73XsAgacx7HNBeeh+bkcV+YTgBMd.3mL7ZZXjji5MOhFGyCPX7ZuyEF2pIJ82OdSOpjpX7BWHzoZAi+AQnvV3cxAuWHkinA7SDgkxd2CFyzp9ZoNAPYMhGJhxtjdA+HpKsFDDd8gABq13aoVdLjSOcvb+Y5unxx+TQr3b.RvnKxGNnL2n9yDxfIKtlwHDt4jhK8ZYW5GSNTDHtwewk+QoA5Tnn7a.twxH0bIj5tJjFokAtCXE3gKgWyL71j3yLhHaQDGa2iLVY4loT1xklrbQ3uS5qgDT1mFRujOx.F2HXq8871oyddda+poIJlUnUczpizV9wps1t8Wa2p82Z242CMcZkwb+MFsTxMUF1UoM2lvsTIgmyM6z4JpLgeShv0e4220uauurracoD0pwJg83HdtcQEnaEU.T9yFTKZjSHjpMsR7v7JguTDvMHAbHaPNUKSftzT5KO.fVk5dIVqVkqNqzsPMAmp7SiGPsTW2PNL.fQbiU3dGvC3WAiVY8FsHC3wWZ0QozFFoUNzwM+67dc4wu4kMPq9fpB8RGjn7A85CP+YuLLQoCRjT6xiYt8I4Afdik5mcMspXgcd48M0X1yqxYuJq72Qb2jLQXYypl2FUvqqU5+Lu4axd.Y3zobls.1ljQe9ecsUMP4i5DqPcwgTqQ.MDjiRB8gk4LNPhRwkwtd6FtghLauE859bUPpwOge4A65rw4A6tHHJjxL5yXYSUtckaj5AXRk9YhVjCc1c5tXZxwcHr.+LFy8P7Df7pU7rZq340Vwt0Vwd0Vw90VwKpshWdKJbes7sIVcX1XA3XxvzMYX7PEE5pR6.Q+RfIlyu
```

If you create a User preset, you will get a XML file that looks like this:

```xml
<Preset>
    <Control type="ScriptSlider" id="Volume" value="0.125"/>
    <Control type="ScriptButton" id="Bypass" value="0"/>
</Preset>
```

Loading the user preset will go through this list and for each Control, the value is loaded and the respective event callback is executed: 

1. Controls which are connected to a Processor parameter just set the parameter of the Module as if you would have interacted with the Control via mouse / keyboard.
2. Controls which have a scripted callback will execute this callback asynchronously.

Note how it is serialised using the order of definition. There are a few edge cases where you need to be aware of that order. For example if you have a slider that controls the sample start offset and a combobox that stores the sample map index, the slider must be placed behind the sample map selector so that the restoring process will be executed in this order:

1. Load new samples
2. Apply the sample start modulation value to the new sample set.

If the order is wrong, you will end up changing the sample start offset of the old samples, then load the sample map which resets the start offset to the original values so the slider will not have any effect.

## File Management

These files are saved in the **UserPresets** folder, which is either the subfolder of your project folder during development, or a subfolder in your app data directory when you are using the compiled plugin. The User Preset Browser just mirrors the file structure found in this directory. By default it uses a three level hierarchy (Banks -> Categories -> Presets), but you can change it to a 2-level or even flat list hierarchy if that is not apprpriate for your project (simple FX plugins usually have just one level of hierarchy).

## User presets in compiled plugins

If you export a project it will embedd all user presets found in the projects directory into the plugin. After the user has installed your plugin and loads it up the first time (or more precisely, if there are no existing user presets in the expected directory), it will extract the user presets as factory content into the predefined location found at:

**Windows**:

```
%APPDATA%/Roaming/Company/Product/User Presets
```

**macOS**:

```
~/Library/Application Support/Company/Product/User Presets
```

This process will only take place if this directory either doesn't exist yet or is empty. If you ship an update with new user presets you will have to make sure that people can add them manually. Also be aware that on the end user side it's called `User Presets` (instead of the nerdy `UserPresets`).

## The Init Preset

Every project has an initial state which will be the state when the user instantiates your plugin or loads the app. If you don't put any thought into this fact, it will be the exact state your project has in HISE when you click export. This is subideal because:

- It deprives the user to reset the plugin to the vanilla state
- It will be unpredictable (you might end up changing values accidently before exporting which changes the default state)
- The Scripting call `Engine.getUserPresetName()` will return an empty string.
- If you are using Git, it will create a lot of noise in the commit because the control values will be all over the place.

The solution to all these problems is to create a user preset that contains the exact state how you want your project to load up. During development, everytime before you save the project (or every time you want to save it and commit it to Git) just load this user preset before saving. This will make sure that the control values are always the same reducing the Git noise and the unpredictability. The user can load the init state to reset your plugin to default values, and even if the scripting function will still return an empty string, you can just hardcode it to show the initial name on startup:

```javascript
const var presetLabel = Content.getComponent("PresetLabel");
presetLabel.set("text", "Init"); // or whatever you call your init preset
```

> Speaking of default values, make sure that the `defaultValue` property of each control will match the value in the onInit callback. Some hosts (ProTools AFAIK) will override the init preset with the default values for all plugin parameters so if these values differ, you will end up with two versions of your plugin's initial state.
