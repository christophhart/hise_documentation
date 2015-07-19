# Getting started

## Introduction

**HISE** is a complete IDE for making virtual instruments. It tries to close a gap in todays virtual instrument market, where there is almost no open source software that allows you to design your own plugins.

You can create patches, design a custom interface, load them as plugin, or even extend the core engine with new DSP modules.

**Core Features:**

- versatile modulator system that allows dynamic modulation of different parameters and the usual suspects (envelopes, LFOs...)
- basic waveform generators for synthesing sounds
- Sampler engine with disk streaming, round robin, looping, sample start modulation
- .SFZ import
- Audio effects (delay, polyphonic filters, reverb, convolution, stereo fx)
- Macro control system that can be connected to any parameter / modulator.
- Scripting engine for customizable instrument behaviour.
- WYSIWYG editor for designing script interfaces
- Debugging tools like on screen console and data plotter for modulators.
- Sample editing interface with focus on workflow.
- Storable "View Configurations" to allow customizable workflow for bigger patches

This Getting Started guide will show you the necessary steps to get **HISE** running and contains a basic overview of all features. For detailed information, visit one of the other documentation pages. 

### About this documentation

This documentation has some special layouts to emphasize important information:

> This is a hint which contains important information which is not obvious.

## Installation

**HISE** can be used either as standalone application or as plugin (VST / AU format).

### System Requirements

- Windows 7 / OSX 10.6
- 32bit / 64bit
- a quite modern CPU (like every other audio software, HISE can be quite demanding regarding memory / cpu speed.)
- at least 2GB RAM

**Recommended:**

- a soundcard with a ASIO driver
- a MIDI keyboard
- more RAM

### Running the installer

There are installers for OSX / Windows. Depending on your operation system, the installation process may vary.
