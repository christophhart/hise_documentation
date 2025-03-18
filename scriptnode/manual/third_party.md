---
keywords: Third Party C++ Nodes
summary:  Adding custom C++ nodes to your project
author:   Christoph Hart
modified: 14.06.2022
---
  
If you [compile your scriptnode dsp networks as dll](/working-with-hise/menu-reference/export#compile-dsp-networks-as-dll) it will create a C++ file for each network. HISE will then load this code as dynamic library and allows you to use the C++ version of your networks inside HISE (either as "frozen" DspNetwork inside a network or as [HardcodedFX module](/hise-modules/effects/list/hardcoded-master-fx)) in the module tree. 

When you export your plugin, it will include these files into the C++ compilation so that you don't need to bother about shipping the dynamic library file alongside your plugin / app.

But it doesn't stop there. This system can also be used to add any arbitrary C++ DSP code as node and even lets you run HISE under your IDE's debugger (VS or XCode) while developing the C++ nodes.

In order to do so, you just need to add your files in the subfolder `DspNetworks/ThirdParty`, and then use the same workflow like when you're exporting DspNetworks. When creating your nodes, you need to follow these rules:

- One file per node. The file must have the file extension `.h` and must be named exactly like the node that it represents.
- Any additional source code must be placed in the `src` subfolder of the directory (and then included by the node file).
- If you want to use your nodes inside a DspNetwork that you want to compile, you have to define a `node_properties.json` file that contains information required by the code generator.
- The file must define a class inside the `project` namespace with the same name as the node and the class must be a valid node class.

The API looks very similar to the classes that you use inside a `snex_node`. But the most simplest way to follow these rules is to use the tool function in the file menu **Create Third Party C++ node template**. This will create a file with your desired name and adds a C++ class that compiles as node with all required functions and metadata informations (it will also create the node_properties.json file with some default flags). From there you can start implementing your DSP algorithms (or write the glue code to embed third party algorithms from the `src` subfolder).

> If you're on Windows, you can choose to close HISE after the dll compilation and run the dll in the VS debugger by double clicking on the solution file. On macOS it's a little bit more complicated because you have to select HISE as debug executable in the Xcode scheme editor.

### Attention!

One thing you need to watch out for: when exporting the dll file, HISE will create a copy of all the files in the `ThirdParty` folder and move it to the dll `DspNetwork/Binaries/Source` folder as well as to the  `PROJECT_ROOT/AdditionalSourceCode/nodes` folder (for when you export your main project later on). Depending on your workflow, you might end up editing the copies of the file in these temporary build locations. This will result in data loss if you reexport the DspNetwork because it will then overwrite your edited files with the original ones from the `ThirdParty` folder. In order to avoid this, **make sure to copy your edited files back to the `ThirdParty` folder before reexporting!**