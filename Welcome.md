<h1 id="godlike_title">HISE</h1>
#### HART INSTRUMENTS SAMPLER ENGINE

<p class="processor">![](images/welcomeScreenshot.jpg)</p>

#### HISE is a cross-platform *open source audio application* for building virtual instruments.

It emphasizes on sampling, but includes some basic synthesis features for making hybrid instruments. You can create patches, design a custom interface, compile them as plugin and even extend **HISE** with addition modules if you know C++. 

It is available as Standalone application or as VST / AU plugin and can be loaded into other host applications (DAWs).


#### Why does HISE exist?

Two years ago I hit a brickwall when designing my virtual clarinet with the existing samplers so I took a deep breath and dived into C++ and audio application development. **HISE** is the by-product of my efforts and I thought the world needs an open source software like this, so I decided to make it public.

## Features

### Core Features

<p>
<ul class="pgwSlider">
<li><img src="slider/img/sampler.png" alt="The Sampler" data-description="Versatile sampler module"></li>
    <li><img src="slider/img/scripting.png" alt="Scripting Engine" data-description="Add functionality with Javascript"></li>
    <li><img src="slider/img/fm.png" alt="Synthesis Modules" data-description="Add synthesiser modules like FM synthesis"></li>
    <li><img src="slider/img/mod.png" alt="Modulator architecture" data-description="Create a complex and nested modulation system."></li>
     <li><img src="slider/img/pong.png" alt="Pong" data-description="Rewrite your favorite video game with HISE."></li>
     <li><img src="slider/img/eq.png" alt="Parametriq EQ" data-description="Parametriq Equalizer with unlimited bands and FFT analyser."></li>
     <li><img src="slider/img/wysiwyg.png" alt="Interface Designer" data-description="Use the build in WYSIWYG editor to create user interfaces."></li>
</ul>
</p>

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
<small>[more information...](ProcessorReference.php#sound_generators)</small></p>
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
<small>[more information...](ProcessorReference.php#voice_start_modulators)</small>
</p>
</div>

<div id="f5">
<h4>Built in Audio Effects</h4>
<p>
Add some audio effects like filters with **polyphonic modulation** of their frequency, parametriq EQ with unlimited bands and FFT graph display, zero latency convolution reverb and many other effects.  
<small>[more information...](ProcessorReference.php#polyphonic_effects)</small>
</p>
</div>

<div id="f6">
<h4>Make a musical instrument</h4>

<p>
Use the internal **Macro Control System** to expose only some of your internal parameters to the end user and hide the complexity of your patch. Use the WYSIWG editor to build a user interface that controls these parameters.  
<small>[more information...](Manual.php#macro_control_system)</small>
</p>
</div>

### Advanced Features

---

#### Workflow Helpers

- Debugging tools like on screen console and data plotter for modulators. <small>[more information...](Manual.php#development_tools)</small>
- Autocomplete script editor that contains the complete Scripting API and declared variables. <small>[more information...](Javascript.php)</small>
- WYSIWYG editor for designing script interfaces <small>[more information...](Javascript.php)</small>
- Storable "View Configurations" to allow customizable workflow for bigger patches <small>[more information...](Manual.php#restorable_view_configurations)</small>
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

### Selling presets made with HISE

**HISE** is free software. This means you can download it for free, use it as long as you like and create instruments which can be loaded by the (upcoming) free HISE Player software or in **HISE** itself. However, if you start selling presets made with **HISE**, there is a licence fee of **5% of the sale price**.  

This business model is based on fairness and allows small developers to publish their software without huge amounts of up-front payments. I will not persecute developers who won't pay this licence fee. However, it still remains a mandatory licence fee (and not a donation). If you don't want to pay this fee, then don't, but please do not cry about other people pirating your stuff...

There are no rules on how to pay this licence fee. You can pay it monthly, yearly, as soon as someone clicks your "Buy" button, or after the first sale peak when you paid the violinist for playing the same note for five hours. Just drop me an email with your sale price and number of sales and I'll write an invoice with VAT according to your country.

And if you really hate this licence system (because you want to keep the sale number for yourself or don't want to bother writing invoices periodically), contact me and we will work out a custom payment model.

#### Support

The licence fee for commercial developers allows me to keep on developing new features and maintaining the code base. It will not change anything regarding support - it is not a premium vs. free model. If you discover a bug or need a certain feature, drop me a email or file an issue on GitHub and I try to fix / implement it.

### Build your own VST / AU plugin with HISE

**HISE** is licenced under the [GNU GPL Licence Version 3](http://www.gnu.org/licenses/gpl-3.0.en.html). This prevents using **HISE** for closed-source software without publishing the complete source code. However, there is a additional licence for commercial (closed-source) usage: 

There is a inbuilt function in **HISE** which compiles your preset as dedicated plugin (it doesn't include the compiler, so you have to setup XCode or Visual Studio yourself). This gives you the following advantages over simply selling the preset:

- simple copy protection (a licence key file)
- dedicated plugin (you'll have your own VST / AU plugin) with installer.

If you don't know how to do this, but really need this feature, drop me an email and I will compile it for you (for a small service fee).

But you can of course go deeper and build your own software upon the **HISE** engine. I tried to make the code base as extendable as possible (browse the internal API)

In both cases there is a commercial licence which allows to use **HISE** as closed-source project. I didn't decide how much it'll cost, but it will be in the ballbark of 500-1000€.

**HISE** is built upon [JUCE](http://www.juce.com), so you will need also a valid **JUCE** licence if you want to go closed-source.

> If I compile the plugin for you, you will still need a JUCE licence.

Every other code used in **HISE** is MIT or BSD licenced, which means, there is no restrictions for closed-source applications.

#### Included Frameworks

- JUCE
- STK (Synthesis Toolkit for the Delay and some Sound Generators)
- Cockos WDL (fork by Oli Larkin for the convolution reverb)
- mda-VST plugins (adapted for internal module format)
- dywapitchtrack for pitch detection
- some other public domain code (filter graph code, some music-dsp.org algorithms)