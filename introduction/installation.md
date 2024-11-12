---
keywords: Installation
summary:  Setting up HISE for plugin compilation
index:    01
weight:   50
Author:   Dominik Mayer
---

## Get HISE

If you haven't installed HISE already, grab the latest [stable release](https://github.com/christophhart/HISE/releases/) and come on board! If you want to compile on Linux please take a look at the [readme](https://github.com/christophhart/HISE?tab=readme-ov-file#how-to-compile-hise).


### System Requirements
- Minimum Windows 7 / OSX 10.6 /  
- 32bit / 64bit
- a quite modern CPU (like every other audio software, HISE can be quite demanding regarding memory / cpu speed.)
- at least 2GB RAM

**Recommended:**
- a soundcard with a ASIO driver
- a MIDI keyboard
- more RAM


After installing you should be able to start HISE either as a Standalone or as plugin inside your DAW. With the stable release you should be ready to go and be able to prototype your first instrument and check out HISE. A crucial part is still missing, though: 

## Setting up VSTi/plugin compilation

If you want to be able to export a plugin or VSTI by yourself you first have to setup additional software. **HISE** is not able compile anything by itself, but mainly packages your HISE-project's scripts and files and outsources the heavy lifting to your system compilers. This is why you have to install a suitable **IDE** (Integrated Development Environment) on your OS environment and some additional Software development kits (SDKs).

Let's get started: Below is a list of every application required for compiling & exporting virtual instruments with **HISE**.

| Tool | Type | Link |  Explanation |
| ---- | ---- | ----- | ----------- |
| **HISE** | Source Code | [Github](https://github.com/christophhart/HISE) | The source code that contains the HISE engine.|
| **IDE** | Application | [Visual Studio 2017](https://www.visualstudio.com/vs/older-downloads/) for Windows / [XCode <= 10.3](https://download.developer.apple.com/Developer_Tools/Xcode_10.3/Xcode_10.3.xip) for macOS  | The main application for compiling native applications for each platform. They come shipped with command-line compilers, so if everything runs smooth you don't need to touch the IDE once.  |
| **VST SDK** | Source Code | [Steinberg Website](https://www.steinberg.net/en/company/developers.html) | If you want to compile VST plugins, you'll need to download the VST SDK from Steinberg yourself (for licensing reasons it can't be distributed with **HISE**). Grab the `VST 3 Audio Plug-Ins SDK` from their website and extract it. In the extracted folder you'll find a .bat file that you have to execute. The folder `VST3_SDK` has to be renamed to `VST3 SDK` (get rid of that pesky underscore) and be put in your **HISE** source code folder under `HISE > tools > SDK >`. |
| **ASIO SDK** | Source Code| [Steinberg Website](https://www.steinberg.net/en/company/developers.html) | If you are building a standalone application on Windows, you might want to support the low latency ASIO driver. Get `ASIO SDK` from their website and put the extracted `ASIOSDK2.3` in `HISE > tools > SDK >`, too. |
| **Intel IPP** | Application (1.2GB) | [Download](https://registrationcenter-download.intel.com/akdlm/IRC_NAS/5b53016a-9182-4ac3-8aff-5a605825d090/w_ipp_oneapi_p_2021.8.0.46353_offline.exe) | It's strongly recommended to use this library because it will improve the performance drastically and it's obligatory for the convolution reverb.|


After installing these programs we're almost ready for compiling plugins with **HISE**. In a last step we have to point your **HISE** instance to the HISE source-code via the **HISE Path** Setting.


### Configure the Settings

In **HISE** you can access the Settings dialog with **File -> Settings** or click the little gear symbol on the right of the tool-bar. Here you can set the **HISE Path** to the root **HISE**-source-code folder that you downloaded or cloned earlier.

![hise-path](images/custom/hise-path.png)

Scroll to the Compiler Settings section in the HISE Settings. You can insert your path by hand or select the **HISE** source code folder location with the Browse button.

In the Settings you will encounter many other options to adjust your project. Have a look at [HISE Settings](/working-with-hise/settings) to learn more about them.

BTW: There you'll also find the **Audio & MIDI Settings** to adjust and connect your sound-card, drivers and MIDI Equipment.
![audio-settings](images/custom/audio-settings.png)


## Compile the latest HISE 

A nice side effect of having installed these tools is that you are now able to compile **HISE** yourself! In this way you can work with the bleeding edge [development branch](https://github.com/christophhart/HISE/tree/develop) and don't have to wait for upcoming stable build releases.  

**HISE** ships with an adapted version of the [JUCE Projucer](https://docs.juce.com/master/tutorial_new_projucer_project.html) that can be found in the HISE folder @ `HISE/tools/projucer/Projucer`. The Projucer is a user-friendly application that allows you to deploy **HISE** on different platforms in conjunction with your preferred IDE.

![projucr](images/custom/projucer.png)

To compile HISE open the **Projucer** and select (**File > Open**) the 'HISE Standalone.jucer' file that you can find in the `HISE/projects/standalone/` folder. It will present you with compile (debug/release) options for MacOS, Windows and Linux.

Select the Release Version for your applicable IDE and select **File > Save Project and Open in IDE**. This will open the latest HISE source code in your IDE (VS, XCode etc..). Hit the **Compile**-Button in your IDE (something with a play-arrow) and let the compiler proceed. 

A few seconds (and compiler warnings) later a brand-new version of **HISE** should jump up. You can find the newly compiled executable in `HISE\projects\standalone\Builds\VisualStudio2022\x64\Release\App\`.

## Installation FAQ
If you encounter problems installing HISE or face unencountered challenges please post your problem in the [HISE Forum](https://forum.hise.audio) and we'll try to help you. 
