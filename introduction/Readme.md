---
keywords: Introduction
summary:  An introduction to HISE
modified: 25.03.2024
weight: 100
index: 01
---

![HISE Frontend](images/custom/hise_frontend.png:700px)

### What is HISE?

**HISE** is an open source toolkit for building virtual instruments and audio effects.

## Key Features
- A highly performant **Disk-Streaming Engine** that allows you to stream hundreds of samples in parallel. Powerful `.xml` sample-mapping and HLAC-compression-algorithm included. See: [Sampler](/hise-modules/sound-generators/list/streamingsampler)

- A flexible **Module system** that lets you combine Sound Generators, Modulators and Effects in a tree-like architecture for maximum efficiency. See: [Audio Modules](/hise-modules)

- An **Interface Designer** that makes it easy to hook up an interface with customizable [UI Components](/ui-components/plugin-components) and convenient [Floating Tiles](/ui-components/floating-tiles/plugin).

- Connect & control the interactions with your virtual instrument via the powerful **HISE Scripting Language** (based upon javascript) in an IDE-like environment. See: [Scripting](/scripting) 

- A node-based graph editor for building DSP-networks. See [ScriptNode](/scriptnode).  

- Build upon the **HISE** architecture, include external libraries and get the most out of the Engine with [C++ API](/cpp_api).

- [Export and Compile](/working-with-hise/menu-reference/export) your **HISE** instruments and plugins as VSTi, AU and Standalone for all major OS platforms and DAWs. 


## Licensing
- **HISE** is published under the [GPLv3](http://www.gnu.org/licenses/gpl-3.0) open source licence. That means, that every compiled (&derived) plugin or VSTi that was built with **HISE** has to be published and open-sourced under the GPLv3 License, too.

- In case that you want to release a closed source product you have to aquire a [Commercial HISE License](https://hise.dev/#license).
  
- Attention: **HISE** is based on the [JUCE](http://www.juce.com) library which has to be licensed separately for commercial applications: [https://shop.juce.com/get-juce](https://juce.com/get-juce/). 
  
- In the case that you publish an instrument/plugin built with **HISE** you're welcome (not obligatory, but would be cool) to attribute the **HISE** Engine somewhere in your plugin.

## Contribute to HISE

HISE is open source software and you are encouraged to join the development and contribute to the codebase. Before you do so, you will need to sign the Contributors License Agreement before we can accept the pull requests. You will retain the copyright on your submission but grant us a perpetual right to sublicense these modifications along with the rest of the HISE codebase under any license (including the commercial license).

Please download [this PDF](http://hise.audio/download/HISE_CLA.pdf) and send a signed version of it to `info (at) hise.audio`. We'll return a signed version and from then on start accepting pull requests. Be aware that we obviously don't guarantee to accept every pull request and might refactor it beyond recognition to match the rest of the coding style in HISE.


>If you have any questions, want to learn something new, found a bug or want to help in the development of HISE, please join our community at the [HISE Forum](https://forum.hise.audio/). You'll meet a bunch of lovely developers there who can surely help you out. See you!
