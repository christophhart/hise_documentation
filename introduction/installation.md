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
| **IDE** | Application | [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) for Windows / [XCode](https://developer.apple.com/xcode/) for macOS  | The main application for compiling native applications for each platform. They come shipped with command-line compilers, so if everything runs smooth you don't need to touch the IDE once. For Windows, select "Desktop development with C++" during installation. |
| **VST SDK** | Source Code | [Steinberg Website](https://www.steinberg.net/en/company/developers.html) | If you want to compile VST plugins, you'll need to download the VST SDK from Steinberg yourself (for licensing reasons it can't be distributed with **HISE**). Grab the `VST 3 Audio Plug-Ins SDK` from their website and extract it. In the extracted folder you'll find a .bat file that you have to execute. The folder `VST3_SDK` has to be renamed to `VST3 SDK` (get rid of that pesky underscore) and be put in your **HISE** source code folder under `HISE > tools > SDK >`. |
| **ASIO SDK** | Source Code| [Steinberg Website](https://www.steinberg.net/en/company/developers.html) | If you are building a standalone application on Windows, you might want to support the low latency ASIO driver. Get `ASIO SDK` from their website and put the extracted `ASIOSDK2.3` in `HISE > tools > SDK >`, too. |
| **Intel IPP** | Application (1.2GB) | [Download](https://www.intel.com/content/www/us/en/developer/tools/oneapi/ipp-download.html) | It's strongly recommended to use this library because it will improve the performance drastically and it's obligatory for the convolution reverb. Install to the default location `C:\Program Files (x86)\Intel\oneAPI\` to avoid path issues.|
| **FAUST** | Application | [Github Releases](https://github.com/grame-cncm/faust/releases) | If you want to create custom DSP nodes, you'll need FAUST. Download the latest Windows installer and install to the default location. |


## Setting up HISE with FAUST and IPP

This section provides step-by-step instructions for setting up HISE compilation on Windows with IPP and FAUST support.

### Installing Visual Studio 2022

1. Download [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) (Community edition is free)
2. During installation, select **"Desktop development with C++"**
3. **Important:** Install to the default location: `C:\Program Files\Microsoft Visual Studio\2022\Community\`

**Non-Default Installation Location:**

If you installed VS2022 to a custom location (e.g., `D:\VS2022`), HISE won't find MSBuild automatically. Create a symbolic link:

1. Open Command Prompt as Administrator
2. Create the parent directory:
   ```
   mkdir "C:\Program Files\Microsoft Visual Studio\2022"```
3. Create the symbolic link (replace `D:\VS2022` with your path):
   ```
   mklink /D "C:\Program Files\Microsoft Visual Studio\2022\Community" "D:\VS2022"```

### Installing Intel IPP

1. Go to the [Intel IPP download page](https://www.intel.com/content/www/us/en/developer/tools/oneapi/ipp-download.html)
2. Select **Windows** -> **Online Installer** (or Offline)
3. Download and run the installer
4. **Important:** Install to the default location: `C:\Program Files (x86)\Intel\oneAPI\`
5. Installation may take 15-30 minutes


### Installing FAUST (Optional)

FAUST is only required if you want to create custom DSP nodes.

1. Go to [FAUST releases](https://github.com/grame-cncm/faust/releases)
2. Download the latest Windows installer (e.g., `Faust-2.XX.XX-win64.exe`)
3. Run the installer
4. Install to default location or remember your custom path

### Setting up the HISE Source Code

**Choosing a Branch:**

HISE has two main branches:
- **master** - Stable releases (e.g., 4.1.0)
- **develop** - Latest features, may have unstable features

For existing projects, match the HISE version they were created with.

**Clone the Repository:**

1. Open Command Prompt or PowerShell
2. Navigate to your preferred location (e.g., `D:\`)
3. Clone HISE:
```
   git clone https://github.com/christophhart/HISE.git HISE
   cd HISE
```

**Extract SDK Files:**

1. Navigate to `HISE\tools\SDK\`
2. Extract `sdk.zip` to the same directory
3. After extraction, verify these folders exist:
   - `HISE\tools\SDK\ASIOSDK2.3\`
   - `HISE\tools\SDK\VST3 SDK\`

**Add FAUST Headers (if using FAUST):**

1. Navigate to your FAUST installation: `[FAUST_PATH]\include\faust\`
2. Copy the **contents** of this `faust` folder
3. Navigate to `HISE\tools\faust\`
4. Paste the files here (merge with existing contents)

This step is required because HISE includes a partial FAUST folder that's missing required headers.


## Compile the latest HISE

A nice side effect of having installed these tools is that you are now able to compile **HISE** yourself! In this way you can work with the bleeding edge [development branch](https://github.com/christophhart/HISE/tree/develop) and don't have to wait for upcoming stable build releases.

**HISE** ships with an adapted version of the [JUCE Projucer](https://docs.juce.com/master/tutorial_new_projucer_project.html) that can be found in the HISE folder @ `HISE/tools/projucer/Projucer`. The Projucer is a user-friendly application that allows you to deploy **HISE** on different platforms in conjunction with your preferred IDE.

![projucr](images/custom/projucer.png)

### Open Project in Projucer

1. Navigate to `HISE\tools\projucer\`
2. Run `Projucer.exe`
3. Select **File -> Open**
4. Open `HISE\projects\standalone\HISE Standalone.jucer`

### Configure IPP and FAUST

1. In Projucer, select **Exporters -> Visual Studio 2022**
2. Find setting: **"Use IPP Library (oneAPI)"**
3. Change from `No` to **`Yes (Default Linking)`**

**If using FAUST with non-default installation:**

4. Open **"Release with Faust"** configuration
5. Update these paths to match your FAUST installation (if Faust is installed to non-default location):
   - **Header Search Paths**: Change `C:\Program Files\Faust\include` to your path (e.g., `D:\Faust\include`)
   - **Extra Library Search Paths**: Change `C:\Program Files\Faust\lib` to your path (e.g., `D:\Faust\lib`)
   - **Post-build Command**: Change `C:\Program Files\Faust\lib\faust.dll` to your path (e.g., `D:\Faust\lib\faust.dll`)
![faust_settings](/images/custom/faust_settings.png) 
### Compile in Visual Studio

1. In Projucer, click **File -> Save Project and Open in IDE**
2. Visual Studio 2022 will open automatically
3. Select configuration: **Release | x64** (or **Release with Faust | x64** if you plan to use it with Faust)
4. Build Solution (`Ctrl + Shift + B`)
5. Wait for compilation (10-30 minutes depending on your CPU)

![build_vs2022](/images/custom/build_vs2022.png) 

1. After compilation completes, find the executable at:
`HISE\projects\standalone\Builds\VisualStudio2022\x64\Release\App\HISE.exe`
2. Or if you installed with Faust:
`HISE\projects\standalone\Builds\VisualStudio2022\x64\Release with Faust\App\HISE.exe`


## Configure the Settings

After compiling HISE, configure it to use the correct paths.

In **HISE** you can access the Settings dialog with **File -> Settings** or click the little gear symbol on the right of the tool-bar. Here you can set the **HISE Path** to the root **HISE**-source-code folder that you downloaded or cloned earlier.

![hise-path](images/custom/hise-path.png)

Scroll to the Compiler Settings section in the HISE Settings. You can insert your path by hand or select the **HISE** source code folder location with the Browse button.

**If using FAUST**, also set the **Faust Path** to your FAUST installation directory (e.g., `D:\Faust\`).

![faust_path](/images/custom/faust_path.png) 

In the Settings you will encounter many other options to adjust your project. Have a look at [HISE Settings](/working-with-hise/settings) to learn more about them.

BTW: There you'll also find the **Audio & MIDI Settings** to adjust and connect your sound-card, drivers and MIDI Equipment.
![audio-settings](images/custom/audio-settings.png)


## Troubleshooting

### Cannot open include file: 'ippcore.h'

**Cause:** Visual Studio can't find the IPP headers.

**Solution:** Ensure IPP is installed to the default location: `C:\Program Files (x86)\Intel\oneAPI\`. HISE expects IPP in the standard Intel path and won't find it elsewhere without manual configuration.

### HISE Setup Wizard Says "Not Detected"

**Cause:** HISE checks the default download location for IPP.

**Solution:** Install IPP to the default location as described above.

### FAUST DLL Compilation Fails

**Cause:** FAUST path not configured or headers missing.

**Solution:**
1. Ensure FAUST path is set in HISE Settings
2. Verify FAUST headers were copied to `HISE\tools\faust\`
3. Check that Projucer has correct FAUST paths configured

### MSBuild Not Found

**Cause:** VS2022 installed to non-default location.

**Solution:** Create a symbolic link as described in the Visual Studio installation section above.


## Additional Notes

### Updating HISE

To update to the latest version of your current branch:

1. Navigate to your HISE folder
2. Run:
   ```git pull```
3. Recompile using the Projucer steps above

**Warning:** Updates may introduce unstable features. Test thoroughly before using on production projects.

### Compiling Plugins vs. Compiling HISE

This guide covers compiling HISE itself. Once HISE is compiled, you'll use it to export your plugins (VST3, AU, etc.).

**Plugin export process:**
1. Open your HISE project (`.xml` file)
2. **File -> Export -> Compile project**
3. HISE will auto-generate C++ code and compile with MSBuild
4. Output: VST3/AU/AAX plugin files

### FAUST DSP Networks

FAUST DSP code needs to be compiled to DLLs before use:
1. **Export -> Compile DSP networks as dll**
2. After compilation, you can replace FAUST scripts with the generated DLLs for improved performance


## Installation FAQ

If you encounter problems installing HISE or face unencountered challenges please post your problem in the [HISE Forum](https://forum.hise.audio) and we'll try to help you.

**Video Tutorial:**

For a visual walkthrough of the Windows setup process, check out [David Healey's video guide](https://www.youtube.com/watch?v=VzS7C1aibn4&feature=youtu.be).

**Note:** David's video assumes default installation locations for VS2022 and FAUST, and also covers FFTW as an alternative to IPP. If you installed to custom locations, refer to the relevant sections above for workarounds.
