# Getting started

![Interface](http://hise.audio/images/tutorial/tutorialPlugin.png)

This tutorial will guide you through the process of building a simple sample library and export it as VST / AU plugin. The following topics are covered:

- **Part 1: Application overview and Project setup**
- **Part 2: Sample Mapping**
- **Part 3: Adding effects and modulators & Add some custom MIDI processing scripts**
- **Part 4: Design the interface using scripting**
- **Part 5: Export the patch as plugin**

The sample library will have these features:

- small sample set of a music box (
- a basic reverb with additional predelay parameter
- A synthesised mallet click sound that can be added to the samples.
- modwheel controlled decay time
- release samples
- a custom interface that controls some selected parameters.

The interface and the samples are kindly provided by [Wavesfactory](http://wavesfactory.com)

Before we start, let's take a look at the interface of HISE.

## Start up HISE 

Download the HISE installer and follow the instructions. For actual development I recommend using the standalone application. HISE changes its appearance according to the window size, so if you want all controls, set it to fullscreen (or a minimal width of 1300px). The window is divided into four sections:

![HISE Interface](http://hise.audio/images/tutorial/HiseInterface.png)

### Main Topbar

The main topbar can switch between the workspaces and contains statistics and the tooltip popup.

### Custom Panel

This area can be arranged and populated with any kind of panel. This (and how to use the Custom Workspace) will be covered in a seperate tutorial, so you might ignore this area for starters.

### The Main Area

The main area contains a vertically arranged list of all modules in the current patch. Everything in HISE is a [tree](http://hise.audio/manual/Manual.php#theprocessorsystem). The root item is called master chain (and has the module type "Container"). You can add submodules by clicking on the `+` icon and select the desired module.

Above the area there are three other elements:

1. A tooltip bar which displays some help when hovering over certain elements
2. A real time statistics panel that shows the current voice count / CPU usage etc.
3. A toolbar that toggles additional views (the most important being the house icon which shows a preview of the compiled plugin)

### Auto Popup Panel

the right panel is not customizable, but contains some development tools that automatically popup when needed.

Icon | Description
---- | -----------
![](http://hise.audio/images/tutorial/MacroProperties.png) | A panel to set the macro controls settings
![](http://hise.audio/images/tutorial/ScriptWatchProperties.png) | 2. a live variable watch table for debugging scripts
![](http://hise.audio/images/tutorial/InterfaceDesigner.png) | 3. the interface designer which allows WYSIWYG editing of script interfaces
![](http://hise.audio/images/tutorial/PlotterProperties.png) | 4. a modulator plotter that is able to plot modulation signals of time variant modulators and envelopes.
![](http://hise.audio/images/tutorial/Console.png) | 5. the debugging console

## Project setup

Now let's build this sample library. The first thing we have to deal with is some boring stuff: project management.

HISE has a internal project system that allows you to easily share and switch between different projects and it's crucial to understand how it works before everything else.

A project in HISE is a folder which contains all files (samples / scripts / images) as well as some specific setting (Project name, version etc). So the first thing you should do after loading up HISE is to create a new project by choosing **File -> Create New Project Folder**.

Select a directory and press OK. It will create all necessary sub folders within this directory. You can now copy all external files into the correct subfolder and access it within HISE as relative path so you can simply transfer the project on another computer. When you compile the plugin, all files (except for the actual samples) will be embedded into the plugin binary so it is crucial that you put everything that belongs to the project in this folder.

Now you are ready to get started with the sampler.
