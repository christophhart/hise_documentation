---
keywords: HISE Command Line Tool
summary:  Use HISE with a command line 
---


Did you know that you can access **HISE** in a command line? 

Open a terminal and type `%hise_path% --help` for all available commands:
(`%hise_path%` stands for the path to your **HISE** executable(standalone).)


```
HISE Command Line Tool
----------------------

Usage: 

HISE COMMAND [FILE] [OPTIONS]

Commands: 

export: builds the project using the default settings

export_ci: builds the project using customized behaviour for automated builds
 - always use VisualStudio 2017 on Windows
 - don't copy the plugins to the plugin folders
 - use a relative path for the project file
Arguments: 
FILE      The path to the project file (either .xml or .hip you want to export).
          In CI mode, this will be the relative path from the current project folder
          In standard mode, it must be an absolute path
-h:{TEXT} sets the HISE path. Use this if you don't have compiler settings set.
-ipp      enables Intel Performance Primitives for fast convolution.
-t:{TEXT} sets the project type ('standalone' | 'instrument' | 'effect')
-p:{TEXT} sets the plugin type ('VST' | 'AU' | 'VST_AU' | 'AAX' | 'ALL')
          (Leave empty for standalone export)
-a:{TEXT} sets the architecture ('x86', 'x64', 'x86x64').
          (Leave empty on OSX for Universal binary.)
--test [PLUGIN_FILE]
Tests the given plugin

set_project_folder -p:PATH
Changes the current project folder.

set_hise_folder -p:PATH
Sets the location for the HISE source code folder.

get_project_folder
Returns the current project folder.

set_version -v:NEW_VERSION_STRING
Sets the project version number to the given string

clean [-p:PATH] [-all]
Cleans the Binaries folder of the given project.
-p:PATH - the path to the project folder.

create-win-installer
Creates a template install script for Inno Setup for the project

```


### Installer (Win)

The windows install script for [InnoSetup](http://www.jrsoftware.org/isinfo.php) can be created using the HISE command line tool:

```
%hise_path% set_project_folder "PROJECT_PATH"

%hise_path% create-win-installer -noaax
```

### Installer (macOS)

For macOS you can use [Whitebox Packages](http://s.sudre.free.fr/Software/Packages/about.html). @d-healey's Sofia Woodwinds has an [installer script](https://github.com/davidhealey/librewave_woodwinds/tree/master/Installer/OSX) for macOS that you might be able to reuse.
