---
keywords: Development Recipes
summary:  A repository for development and workflow recipes. Short, concise, bullet point.
author: Lindon, Dominik Mayer, Christoph Hart, 
modified: 13.11.2024
---
A collection of development and workflow recipes.

## Move your Faust code from Windows to MacOS

When you copy your Windows Project structure and open it in the Mac version of HISE you will find that you need to build the dynlib on Mac (the Mac version of a DLL) which might sometimes fail.

Here's how to fix it:

Move the entire project to a MacOS hard drive or use [git](/glossary/git) to check out the project on the Mac system.

Delete all the files in these folders:

`{Project}/AdditionalSourceCode/nodes` <-- this will be C++ headers or .cpp files
`{Project}/DspNetworks/Binaries` <— everything from here 
`{Project}/DspNetworks/ThirdParty` <-- again C++ code in here (be careful about user generated scripts)

At this point you can load your project, open a scriptnode and compile your MacOS DLL/dynlib.
