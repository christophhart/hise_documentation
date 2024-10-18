---
keywords: Preset Browser
summary:  A Floating tile used for loading user presets
weight:   50
index:    01
author:   Christoph Hart
icon:     /images/icon_presetbrowser
properties:
- Font: Select a font
- FontSize: Set the fontsize
- ShowFolderButton: Show or hide the "more" button 
- ShowSaveButton: Show or hide the "Save Preset" button
- ShowNotes: Show or hide the Notes Bar
- ShowEditButtons: Show or hide the Add, Rename, Delete buttons
- ShowFavoriteIcon: Show or hide the Star functionality
- NumColumns: Choose the amount of columns 1,2,3 
---

The inbuilt Preset Browser with which you can easily manage (save, load, rename..) user presets.

Learn more about User presets here: [User Presets](/working-with-hise/project-management/user-presets).

The User preset will save and recall all interface elements in which the [Save-in-preset functionality](/ui-components/plugin-components) is set to true. 

If you want full customization of it's appeareance take a look at: [Preset Browser Look and Feel Customizations](/glossary/custom_lookandfeel#presetbrowser)

## CSS Styling

The preset browser and its sub components can also be fully styled using the [CSS](/glossary/css) Renderer. In order to target each component, take a look at this cheat sheet that shows the CSS selector for each part:

**Preset Browser:**

![](/images/custom/preset_css.png)

**Modal Popup:**

![](/images/custom/preset_modal_css.png)

Some remarks:

- most properties related to positioning will not work - there are plenty of tools available to change the layout of the preset browser and the CSS renderer is focused on customizing the graphics of the preset browser. The notable exception to this rule is the `padding` property of the `.modal` class selector that you can use to define the size of the background of the modal popup.
- for a detailed overview of how to style the individual components, you can take a look at the basic UI element CSS reference: [`button`](/ui-components/plugin-components/button), [`label`](/ui-components/plugin-components/label)
- the context menu of the **More** button can be styled just like the context menu of the [ComboBox](/ui-components/plugin-components/combobox)