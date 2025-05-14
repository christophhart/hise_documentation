---
keywords: Expansions
author:   Christoph Hart
summary:  A overview of the Expansion system in HISE
index:    02
---

The expansion system in HISE allows you to ship additional content as expansions.

## Features

- includes Samples, MidiFiles, Images, UserPresets and any arbitrary JSON data.
- monolithic file format for all metadatas (=everything except for the sample files) for distribution
- ability to use different expansion types: from default folder-based expansions to custom C++ expansions depending on your security needs
- inbuilt encryption functions including machine-ID based user identification
- rebuild the expansion list on the fly
- feature complete scripting API to access / control the way your project handles expansion

## Introduction

As you might know by now, a HISE project is based on a [project folder](/working-with-hise/project-management#project-folders) that stores the project data in dedicated subfolders. On compilation, these data types will be either embedded into the binary, compiled or shipped alongside the product (eg. samples). 

> For this introduction we will refer to the data embedded on compilation as **Factory Content**.  

Until now there was no or little possibility to extend the feature set / content of an existing (=compiled) project, however there is a legitimate reason for a project to be extendable. Therefore the expansion system has been introduced which offers exactly this functionality in a most generic way that is designed to match as much use cases as possible.

### Structure

Basically an expansion is a **Mini Project Folder** that shares some of the known subdirectories with the main project folder:

- **SampleMaps**
- **Samples** 
- **Images**
- **MidiFiles**
- **UserPresets**
- **AdditionalSourceCode**

> You can find a detailed explanation about the (subtle) differences between these folders and their counterpart in the main project folder here.

These expansions are subfolders of a folder inside the project folder called `Expansions`. Any reference to content inside an expansion pack will use a specific wildcard. You can query the list of available expansions (plus many other things) using scripting API calls. In a compiled plugin, this expansion folder will be a subfolder of the **AppData** directory and in order to extend your plugin, all you need to do is to **copy the expansion folders in there**.  
If you don't want the end user to see the actual files that have been used for creating the expansion, you can encode the expansion before distribution: 

### Expansion Types

While you are using the folders to add content to an expansion, you are working on the first level of the expansion system: the **File Based** expansion type. There is a metadata file called `expansion_info.xml` which can be used to edit the metadata of the expansion.

Once an expansion is completed, you can encode it into one monolithic file that contains all the data that normally gets embedded into the plugin, namely anything except for the samples. This file format is called **Intermediate** and the file is `info.hxi`. Because it is encrypted using a key you provide, it prevents people from accessing the samplemaps as human-readable files or extract the image data. Beside this, the entire expansion is included in one file which makes it much more convenient to distribute.

However if you have an authorization system that uses the machine ID to prevent people passing around their content and you want to restrict the possibility of loading an expansion for users that haven't bought it, you can go ahead and add any kind of credentials to an expansion. This is called an **Encrypted** expansion and the file will be `info.hxp`. This process is a bit more complicated and needs to be done in the compiled plugin, but there is a tutorial available that will show how to do this.

> To sum it up: use **FileBased** expansions during development, encode them to **Intermediates** for distribution or take further actions for a more strict licensing scheme by adding license credentials to the **Encrypted** expansion type.

One important thing to know is that the expansion system automatically picks the "highest" level of expansion: if there is an `info.hxp` file in the folder, it will be loaded as encrypted expansion, even if the file structure of the original folders and the intermediate `info.hxi` file are still in there. That also means that you can convert an expansion back to a lower level by simply **deleting** the `.hxi` or `.hxp` file.  
If you do this, you might have to restart HISE so it can rebuild the expansions on startup. If you're using a version control system like Git it's also recommended to ignore the `hxi` and `hxp` file extension because they don't contain any non-redundant data.



### Active Expansion

Thanks to the unique wildcard for each expansion, you can load content from multiple expansions simultaneously and even combine it with data from the **Factory Content**. However HISE has a concept of an **active** expansion, which can be used to do different stuff like

- change the skin depending on the active expansion
- change the list of instruments in a combobox to show the instruments available in a specific expansion.

You can select an expansion to be active by either:

1. Load a user preset from an expansion
2. Manually call `setCurrentExpansion()` with the name of the expansion you want to select.

If you want to use that feature, you can set a Javascript function that will be called whenever one of these events happen.

> The concept of the active expansion is also important during development: for example the list of available samplemaps in the HISE sampler module is using the active expansion. You can change the active expansion in HISE using the [ExpansionEditBar](/ui-components/floating-tiles/hise/expansioneditbar), which is part of the [Sampler Workspace](/working-with-hise/hise-interface/sampler-workspace)



### Samples

If you encode a samplemap to an HLAC monolith, the samples will not be loaded using the references in the map, but by looking up the samplemap ID and trying to find the matching .chx file. If you load a samplemap from an expansion you can use both the expansion's subfolder as well as the main sample folder for storing the HLAC monolith files, however it's highly recommended to put them into the main sample folder so that the user can choose the location.


### UserPresets

Handling user presets that are included in expansions is pretty easy, but requires some adjustment. By default, the [Preset Browser](/ui-components/floating-tiles/plugin/presetbrowser) is using the main user preset directory to find and load display files (so in the end it's just a "glorified" file browser).  
If you want to browse user presets in expansions, you will need to set the `showExpansions` property to true. In this case, it will add another column to the left that will select the expansion. If you click on a selection, the preset browser will switch to the user preset folder of the expansion. If you want to go back to the **Factory Content** user presets, you have to click on the expansion again to deselect it.

> If you're using one of the encoded expansion types, the user presets will be extracted automatically on startup **if the UserPresets directory of the expansion is empty**. 