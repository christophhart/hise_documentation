<h1 id="godlike_title">HISE</h1>
#### HART INSTRUMENTS SAMPLER ENGINE

<p class="processor">![](images/welcomeScreenshot.jpg)</p>

#### HISE is a cross-platform *open source audio application* for building virtual instruments.

It emphasizes on sampling (This is what the **S** in **HISE** stands for), but  includes some basic synthesis features for making hybrid instruments. You can create patches, design a custom interface, compile them as plugin and even extend **HISE** with addition modules if you know C++. 

It is available as Standalone application or as VST / AU plugin and can be loaded into other host applications (DAWs).


#### Why does HISE exist?

Two years ago I hit a brickwall when designing my virtual clarinet with the existing samplers so I took a deep breath and dived into C++ and audio application development. **HISE** is the by-product of my efforts and I thought the world needs an open source software like this, so I decided to make it public.

## Features

### Core Features

<div id="f1">
<h4>Sampler Module</h4>
<p>A versatile sampler with **Disk Streaming**, cross fade **looping**, **Sample Start Modulation** and **Round Robin** groups.  
<small>[more information...](Sampler.php)</small></p>
</div>

<div id="f2">
<h4>Polyphonic Synthesizer</h4>
<p>
Combine multiple sound generators which are capable of the most basic types of synthesis:  
additive synthesis, subtractive synthesis, FM synthesis, wavetable synthesis  
<small>[more information...](Processors.php#sound_generators)</small></p>
</div>

<div id="f3">
<h4>Scripting Engine</h4>
<p> Customize the behaviour and take control over internal parameters of **HISE** using the integrated **Javascript** engine, one of the world's most popular scripting language.  
<small>[more information...](Javascript.php)</small></p>
</div>

<div id="f4">
<h4>Versatile modulator system</h4>
<p>
Use **Modulators** like LFOs or Envelopes to change dedicated parameters (Volume, Pitch, etc.) of any Sound Generators. You can even use Modulators to modulate the parameter of another Modulator that modulates another Modulator...  
<small>[more information...](Javascript.php)</small>
</p>
</div>

<div id="f5">
<h4>Built in Audio Effects</h4>
<p>
Add some audio effects like filters with **polyphonic modulation** of their frequency, parametriq EQ with unlimited bands and FFT graph display, zero latency convolution reverb and many other effects.  
<small>[more information...](Javascript.php)</small>
</p>
</div>

<div id="f6">
<h4>Make a musical instrument</h4>

<p>
Use the internal **Macro Control System** to expose only some of your internal parameters to the end user and hide the complexity of your patch. Use the WYSIWG editor to build a user interface that controls these parameters.  
<small>[more information...](Javascript.php)</small>
</p>
</div>

### Advanced Features

---

#### Workflow Helpers

- Debugging tools like on screen console and data plotter for modulators. <small>[more information...](Javascript.php)</small>
- Autocomplete script editor that contains the complete Scripting API and declared variables. <small>[more information...](Javascript.php)</small>
- WYSIWYG editor for designing script interfaces <small>[more information...](Javascript.php)</small>
- Storable "View Configurations" to allow customizable workflow for bigger patches <small>[more information...](Javascript.php)</small>
- Complete Undo / Redo for all sampler editing

---

#### Import / Export

- Import .SFZ files
- save any module within **HISE** as Preset and create building blocks that fit your style.
- "Collect and Save" feature that exports every referenced file into a global **Library Folder**
- Compile your patch as plugin with a licence file copy protection scheme (the least intrusive system I could find)

---

#### CPU friendly

Several performance tweaks and design concepts are applied to limit the CPU requirements for **HISE**.

---


## Licence

**HISE** is licenced under the [GNU GPL Licence Version 3](http://www.gnu.org/licenses/gpl-3.0.en.html), but there is a commercial licence on request.  

Using **HISE** for commercial products is explicitely endorsed - I just want a small piece of the cake. This restriction only comes into effect if you want to compile your patch as own plugin (and benefit from the copy protection). 

---

> That means you can publish and sell any patch that is built with **HISE** and even include the (upcoming) **HISE Preset Player**.

---

**HISE** is built upon [JUCE](http://www.juce.com), so you will need also a valid **JUCE** licence if you want to go closed-source.
