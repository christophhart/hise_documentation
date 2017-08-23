
The last tutorial will take you through the process of exporting a HISE instrument as VST / AU plugin.  HISE itself does not compile anything itself, but just collects everything, creates the project files and outsources the heavy lifting to the system compilers. However this means you have to install the raw tools and SDKs and setup the paths in HISE so it knows where to look.

> **Disclaimer:** Compiling HISE instruments is regularly used and tested on OS X 10.11 and Windows 7. However it should also work on the newest versions of both operating systems. In case there are some problems, please feel free to contact me so I can work out a solution.

## 1. The raw ingredients

First of all we'll need to gather the required tools. Below is a list of every SDK / application required for building instruments with HISE. They are all free, but some require that you register an account at the company's website. Cross compilation of plugins is not possible, so you have to setup each OS separately, although it's perfectly fine to use Bootcamp on a Macbook so you can compile both targets on one machine - in fact I went some extra miles to make this possible and I am using this method myself, so you can expect it to work.

Tool | Type | Windows | macOS | Explanation
---- | ---- | ------- | ----- | -----------
HISE | Source Code | [Download](https://github.com/christophhart/HISE/archive/master.zip) | <- | The source code which contains the HISE engine. Please use the latest tip from GitHub for this. Extract the .zip and put it wherever you want. 
VST SDK | Source Code | [Steinberg Website](https://www.steinberg.net/en/company/developers.html) | <- | If you want to compile VST plugins, you'll need to download the SDK from Steinberg yourself (for licensing reasons it can't be distributed with HISE). Grab the `VST 3.6.7 Audio Plug-Ins SDK` and extract it. In the extracted folder you'll find a .bat file that you have to execute. The folder `VST3_SDK` has to be renamed to `VST3 SDK` (get rid of that pesky underscore) and be put in your HISE-master Folder `HISE-master > tools > SDK`. 
ASIO SDK | Source Code| [Steinberg Website](https://www.steinberg.net/en/company/developers.html) | <- | If you are building a standalone application on Windows, you might want to support the low latency ASIO driver. Get `ASIO SDK` and put the extracted `ASIOSDK2.3` in `HISE-master > tools > SDK`, too.
IDE | Application | [Visual Studio 2015 Community](https://www.visualstudio.com/de/vs/older-downloads/) | [XCode](http://adcdownload.apple.com/Developer_Tools/Xcode_7.3.1/Xcode_7.3.1.dmg) | The main application for compiling native applications for each platform. They also come shipped with command line compilers, so if everything runs smoothly, you don't need to go into the IDE once. 
Intel IPP | Application | [Website](https://registrationcenter.intel.com/en/forms/?productid=2558&licensetype=2) | <- | If you are using the convolution reverb in HISE, it is strongly recommended to use this library because it will improve the performance drastically. The community edition is free but you'll have to register at Intel to get the download link.

> A nice side effect of having these tools at your hand is that you're able to compile HISE yourself. You can work with the bleeding edge and don't have to wait until the next build release. The project files for the Projucer can be found under `projects/standalone/` and `projects/plugin`. Take a look at the GitHub page for instructions how to build **HISE**.

Download and install the applications and extract the HISE source files (which also include the JUCE source code as well as precompiled binaries of the Projucer, a handy project management tool from the JUCE people.

## 2. Setting up HISE

Now that we have gathered everything we need, we can tell HISE where to find these tools. HISE has three levels of settings:

| Compiler Settings | User Settings | Project Settings |
| ----------------- | ------------- | ---------------- |
| *system wide* | *project specific* | *project specific* |
| SDK paths, IDE versions, ... | Company name, website, ... | Project Name, version, ...

The idea is that you have to set up the compiler settings only once but can use different user and project settings for every project. So let's start with the compiler settings

### Compiler Settings

Open the compiler settings panel (**File -> Settings -> Compiler Settings**) and enter your settings accordingly (it should be pretty self explanatory what to do).

Press **OK** and open the next panel to enter the user credentials (**File -> Settings -> User Settings**)

### User Settings

Here you can enter your company's name, website and a "Company Code" which is used by AU plugins. This needs to be four characters with the first one being uppercase (eg. `Myco`), otherwise the `auval` tool will fail and you won't be able to load your plugin into Logic or Garageband.

The Company name will be used for the application data folder, so it must be a valid folder name.

### Project Settings

Now we can setup the last page (**File -> Settings -> Project Settings**).

1. The Project name will be the plugin name. It will store the user presets under `APP_DATA/Company Name/Plugin Name/` so make sure it's a valid file name.
2. The project version will be embedded into the plugin binary and can be used by installers to check if it needs to be overwritten. It's important to use semantic versioning (eg. 1.0.5) as this will get validated during export.
3. the 4 character code needs to be in the same format as the company code (`Abcd`)
4. If you have loaded impulse responses, you might choose to **Embed Audio files into plugin**. Since we don't have any audio files (samples are treated differently anyway), we don't need to bother about this option.
5. The last two properties can be used to add additional C++ classes, but we'll leave this empty for out beginners tutorial.

## 3. Export to VST / AU

That's it. Now you should be ready to compile the plugin. Open the saved patch and choose **File -> Export -> Export as Instrument (VSTi / AUi)**. If you are on Windows, you can choose, which platforms you want to compile (x86 / x64 / both). Press OK and go get a coffee while the compiler is doing the hard work (it should pop up a terminal window for a few minutes and spit out cryptic stuff that makes you feel like you're in the matrix).

> **IMPORTANT:** The plugins you'll create are automatically licenced under the GPL v3 licence. This means you can't distribute them without releasing the source (which would be the entire project folder). For commercial usage, there is a separate license model available. Please get in touch to discuss further details [here](info@hise.audio).

## 4. Deploy the plugin

Once the digital dust has settled (which will take a few minutes), you'll find your compiled plugins in the subfolder `Binaries/Compiled` of the project.

All sample maps, scripts, images, factory user presets and impulse responses are embedded into the plugins binary. However the samples must be stored separately so that they can be streamed. Also the sample size quickly exceeds a reasonable binary size so it would be impractical anyways. 

Since we converted the musicbox samples to a monolithic file, you also need to distribute the "Musicbox.ch1" file from the projects sample folder (converting a sample set to a monolithic file also prevents using the samples outside of the plugin, because there is no metadata).

### The plugin data folder

Because of this reason, the plugin requires a folder in the users app data directory which contains a link file to the sample location (the user should be able to relocate the samples). On Windows this folder will be at:

`C:/Users/YOURNAME/AppData/Roaming/Company Name/Project Name/`

On OS X you can find it here:

`/Users/YOURNAME/Library/Application Support/Company Name/Project Name/`

The folder will contain these files:

1. The link file for the sample called `LinkOSX` or `LinkWindows` which is a simple text file containing the path to the sample folder (a poor mans symlink)
2. Persistent audio settings for the standalone application called "DeviceSettings.xml"
3. A folder with User Presets. This folder contains ".preset" files (but we don't need presets for our musicbox yet).

On first launch, the plugin will create this folder (if it doesn't exist yet) and asks for the sample location. Then you'll need to reload it (because it only loads the samples once). If you want to increase the UX experience, I'd recommend that you create these files automatically with an installer.
