Saves the current HISE presets module structure as a `.xml` file in the [XmlPresetBackups Folder](/working-with-hise/project-management/projects-folders/xml-preset-backups). 

Another Interface `.xml` is automatically generated in respectively named **UIData** subfolder.

When you save a HISE Preset with this method, the scripts of your ScriptProcessors will also be saved. They will show up in the [Scripts](/working-with-hise/project-management/projects-folders/scripts) **> ScriptProcessors > (your PresetName) >** Folder and combine all the ScriptProcessors Callbacks into one file.    

This comes in handy if you want to save your project in a version control system and track your changes. 
