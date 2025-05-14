---
keywords: UI Components
summary:  An overview of all clickable things in HISE.
weight:   50
index:    04
---

![ui components](images/custom/ui-components.png:560px)

**UI Components** cover all clickable User Interface elements of **HISE**. 

- [Plugin Components](/ui-components/plugin-components) are basic UI Components that you can add to the plugins interface with the [Interface Designer](/working-with-hise/hise-interface/interface-designer#canvas). ([Slider](/ui-components/plugin-components/knob), [Button](/ui-components/plugin-components/button), [ComboBox](/ui-components/plugin-components/combobox), etc..). You can customize their colors or exchange their graphics with filmstrips. 

Two of these are somewhat special: 
- The [Panel](/ui-components/plugin-components/panel) is a generic Scripting Panel, that can be fully customized with scriptable [Paint Routine](/ui-components/plugin-components/panel#the-paint-routine), [MouseEvent-](/ui-components/plugin-components/panel#the-mouseevent-callback) and [Timer Callbacks](/ui-components/plugin-components/panel#the-timer-callback).  

- [Plugin Floating Tiles](/ui-components/floating-tiles/plugin) are hard-coded interface elements with which you can add predefined functionalities to your plugin. ([Keyboard](/ui-components/floating-tiles/plugin/keyboard), [CustomSettings](/ui-components/floating-tiles/plugin/customsettings), [PresetBrowser](/ui-components/floating-tiles/plugin/presetbrowser), etc..)

If you want more control over the the appearance of the UI Components make sure to take a look at the [Look and Feel](/glossary/custom_lookandfeel) functionality.