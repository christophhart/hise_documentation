---
keywords: Presets
author:   Christoph Hart
summary:  Explains the HISE Presets Folder
index:    06
---

The presets folder is certainly the most poorly named thing in HISE, but because of lacking alternatives and problems with backwards compatibiltiy we're stuck with this name, so let's get it over quickly.  

It contains files that store a snapshot of your HISE project in a binary file format with the file extension `.hip` - which I once decided to call *preset* in a dubious state of mind, hence the name. 

These files contain the HISE module tree, all embedded scripts, the UI model and the current interface state. This differs from the files in the `XmlPresetBackups` directory because they split the scripts and UI data model into separate files. This makes them totally useless in a workflow that uses a version control system. 

But because they are almost self-contained they are used for the autosave function and you can use them for saving intermediate states of your plugin that shouldn't interfere with your XML files.

> If you export a HISE snippet, it will use the exact same data as a .hip file, but in a different representation (a Base64 encoded String).