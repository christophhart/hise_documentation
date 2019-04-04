---
keywords: UI Components
summary:  An overview of all clickable things in HISE.
weight:   50
index:    04
---

**UI Components** cover all clickable User Interface elements of **HISE**. 

[Plugin Components](/ui-components/plugin-components) are basic UI Components that you can add to the plugins interface with the [Interface Designer](/working-with-hise/workspaces/scripting-workspace/canvas). ([Slider](/ui-components/plugin-components/knob), [Button](/ui-components/plugin-components/button), [ComboBox](/ui-components/plugin-components/combobox), etc..)

Two of these are somewhat special: 
- The [Panel](/ui-components/plugin-components/panel) is a generic Scripting Panel, that can be fully customized with scriptable [Paint Routine](/ui-components/plugin-components/panel#the-paint-routine), [MouseEvent-](/ui-components/plugin-components/panel#the-mouseevent-callback) and [Timer Callbacks](/ui-components/plugin-components/panel#the-timer-callback). 

- [Plugin Floating Tiles](/ui-components/floating-tiles/plugin) are hard-coded interface elements with which you can add predefined functionalities to your plugin. ([Keyboard](/ui-components/floating-tiles/plugin/keyboard), [CustomSettings](/ui-components/floating-tiles/plugin/customsettings), [PresetBrowser](/ui-components/floating-tiles/plugin/presetbrowser), etc..)

Because the **HISE** interface itself is built with Floating Tiles, you're able to access all its elements in [HISE Floating Tiles](/ui-components/floating-tiles/hise). In connection with the [Layout Floating Tiles](/ui-components/floating-tiles/layout) you can adapt your version of **HISE** to your needs. Like in the Main Workspaces [Left Panel](/working-with-hise/workspaces/main-workspace/left-panel) or the [Custom Workspace]link. (See: [Enable Layout Mode](/working-with-hise/menu-reference/view#enable-layout-mode))  