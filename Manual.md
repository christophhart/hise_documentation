# HISE Manual

This is an in depth overview of the backend application of **HISE**.

## The Processor System

Every module in HISE that processes MIDI or Audio (from now on called `Processor` is organized in a <a href="https://en.wikipedia.org/wiki/Tree_structure">tree structure</a> (similar to the file system or XML).

This allows a complex structure of parallel (and completely encapsulated) processing of multiple sound layers as well as serial processing of Processor chains.

There are for main Processor types that you will use in order to create
your virtual instrument:

### Sound Generators
![](images/dia_soundGenerator.png)

`Sound Generators` take MIDI input and produce a polyphonic audio output. There are many different generators
from
simple sine wave generators to full blown disk streaming samplers.
Every sound generator contains slots for the other module types which
allow to build complex patches.

There are also some Sound Generators which do not produce sound, but act as container for other Sound Generators:

- `Container` processes all child synths independantly (think of it as folder in the file structure). 
  There are some limitations to this sound generator (no pitch modulation, no modulators that process MIDI messages) in order to achieve this.
-`Synthesizer Group` renders its voice as sum of all child synth voices (and enabling some neat features like FM synthesis). This can be used to build eg. additive synthesis
generators while saving CPU power (because every otherwise every harmonic sine wave would be a own synthesiser. And you can use all modulators, so can simply drop an envelope on the Synthesiser Group and
it will be applied to all child synths.

Every HISE patch starts with a container that can be filled with other sound generators. All patch settings (the interface, the macro controls, the views) are saved within the root container object.

### Midi Processors
![](images/dia_midiProcessor.png)

`Midi Processors` allow to process incoming MIDI messages and create a customized behaviour of the virtual instrument.

For the most common tasks there are some prebuilt MIDI Processors (Transposer, Channel Filter, Release Trigger), but the most interesting part here would be the ScriptProcessor, which allows you to define a customized behaviour by using JavaScript.

Instead of having a global MIDI processor, each Sound Generator has their own MIDI Processor slot so you can define different behaviour for different synths - or by using the MIDI Processor slot of the parent Container define the behaviour for all child synths. This allows to keep the tasks of every MIDI Processor quite simple.

### Modulators
![](images/dia_modulator.png)

`Modulators` create a sample accurate control signal which is used to modulate some internal parameters of sound generators (gain, playback speed, sample start). There are three types of modulators:

- `Voice Start Modulators` (polyphonic): only calculates a value when a note is pressed
- `Time Variant Modulators` (monophonic): calculate one time varying control signal that is applied to all voices.
- `Envelope Modulators` (polyphonic): calculate as many time varying control signals as the processor has voices.


Modulators can also have modulators to control their parameters, which creates the possibility of quite complex modulation arrangements. The level of the modulation depth is not restricted (however modulating more than three levels is just insane).

### Effects
![](images/dia_effects.png)

Effects process incoming audio and apply their effect. There are many effects, from simple filters to a convolution engine.
Some effects contain modulation slots which allow modulation of dedicated parameters (eg. filter frequency). In order to save CPU cycles while retaining the flexibility, there are three effect types:

- `Master Effects` are simply rendered over the entire audio stream (with no modulation of parameters)
- `Monophonic Effects`are rendered over the entire audio stream and allow modulation of a parameter (thus process MIDI messages)</li>
- `Polyphonic Effects` render each voice of the sound generator seperately. You can think of having one effect instance per voice. This allows polyphonic modulators (`Voice Start Modulators` and `Envelope Modulators` to change each voice seperately to allow eg. envelope modulation of a filter frequency.

## Internal Chains

Every sound generator has at least 4 chains as child processors:

![](images/chains.png)

But there are of course Modulators which have chains for modulating one of its parameters or sound generators who have more than
those 4 chains.

Every Processor that is added to one of those internal chains will be processed serially. It will also inherit the colour of the
chain so that you can see immediately what the processor is doing. 

**Example**

This simple example shows the tree structure of a very simple sound patch, which consists of :

- two sine wave generators
- a constant modulator int the Pitch Modulation Chain on the first sine wave generator
- a velocity modulator in the Gain Modulation Chain on the second sine wave generator
- a reverb effect that is applied to both sound generators

![](images/TreeExample.png)

The Sine Generators are children of the root item (which is also a Sound Generator called Container). The Reverb, the Constant
Modulator and the Velocity Modulator are not direct childs of the Sound Generator but of a subtype called "Chain" which allows serial processing of its siblings. As a matter of fact, a Container is also a "Chain", since its provides the same functionality for Sound Generators.

This structure is also reflected by the interface. However the (two-dimensional) tree structure had to be transformed into a
one-dimensional order to allow a scrollable top-down interface for better workflow. This is the same patch as one-dimensionalized diagram

![](images/TreeExampleTopDown.png)

> Notice how the effect chain was put before the two sine generators. This is because the internal chains are put before other sound generators to keep things tidy (although it contradicts the natural signal flow).

This is the same patch as screenshot from the **HISE** main panel. All
Processors are organized in a vertical top-down list with different
indentation for the tree hierarchy (children get smaller).
You can recognize the same structure as the diagram above. </p>

![](images/TreeExampleScreenshot.PNG)

## Processor interface</h2>

The interfaces of every Processor share some common elements: 

- a header bar
- a (optional) button bar for hiding the internal chains
- the processor body.

![](images/processor.png)

### The Processor Header

The header bar of a modulator
![](images/modulator_header.png)

The header bar of a sound generator
![](images/soundgenerator_header.png)

The header bar has some common elements for all processor types and some special elements for each type (from left to right):

 Icon | Name                     | Function  
 - | ------------- | - 
 ![](images/header_fold.png) | *Fold Button* 	| collapse / uncollapse the body
 ![](images/header_colourIcon.png) | *Processor Icon* | displays the type (or a colour selector for sound generators
 ![](images/header_bypass.png) | *Bypass Button* | bypasses the Processor
 | *Peak meter* | `Sound Generators` have a segmented peak meter in Decibel and `Modulators` have a modulation intensity meter.
 | *Volume / Intensity Slider* | Sound Generators have a volume slider and Modulators have an Intensity slider, which defines the strength of the modulation according to this formula `output = input * INTENSITY` for modulators (nothing for effects and MIDI processors) 
 ![](images/header_debug.png)| *Debug Button* | Midi Processors and Modulators can print useful information to the console if this button is enabled
 ![](images/header_plot.png)| *Plot Button* | You can see the modulation curve for Modulators in the Plotter if this button is enabled
 ![](images/header_delete.png)| *Add Button* | If this Processor can have other Processors as child Processors, this button opens a popup menu
 ![](images/header_add.png)| *Delete button* | This deletes the Processor. Some Processors `Cnternal Chains` and the `Root Container` don't have this button.

### The Chain Button Bar


<p> The chain bar appears only on processors which have at least
one internal chain and allows the hiding of the chains and displays the
number of Processor in each chain. It also allows to hide the body if
desired (the body is always the first button in the row) </p>


### The Processor Body

The body shows the actual interface to the `Processor`.

##Interface elements

**HISE** uses a fixed set of control elements for adjusting the parameters of the sound modules. From simple toggle buttons to draggable waveform displays there is a widget for almost any purpose. Most of the controls can be used without further knowledge, but there are some hidden features, that are not eminent.

### Buttons
![](images/button.png)

The most basic element allows switching between two states. The LED will light if it is on. If a button has the keyboard focus (if you click on it, it gets the keyboard focus), you can toggle the state with the return key.

### Combo Boxes
![](images/Combobox.png)

A combobox opens a popup menu that contains multiple options that can be selected. If a combobox has the keyboard focus, you can also use the up / down arrow keys to switch between the selected option.

### Sliders
![](images/slider.png)

Sliders are used to set a parameter within a given range. You can either drag the knob to adjust the value with the mouse, or enter the value directly by clicking on the displayed value. If the knob also controls a parameter that can be modulated, the ring around the knob will be cyan and shows the actual value (the knob value multiplied by the modulation value).

> If you hold CTRL while dragging, you enter a high-resolution mode which allows fine-tuning of the parameter.

### Value Setter
![](images/ValueSetter.png)

A value setter is only used by the sampler and can change a selection of multiple samples either absolute (by entering the value
directly) or incremental (by clicking the +/- buttons). This is useful if you want to change eg. the root note of a selection
of samples but retain the original values.

If the property is a MIDI note, it will display the actual midi name instead of the midi number (but you can enter the midi note number and it will convert to the name). If multiple samples are selected which have different values, the Value
Setter shows the range of all selected values.

> If you right click on a Value Setter, a big ass slider will appear that also changes the values relatively (this is great for adjusting the sample start) 

### Table
![](images/table.png)

A table allows to define a curve which acts as input->output function, where the output value is the y-value at the input value on the x-axis.
The current x value will always be shown as vertical scanline so you know always what was fed to the table.

This is used for a variety of parameters, from defining velocity curves over customized envelope behaviour to a custom waveform LFO. You can even create your own table controls with scripts and use this widget for any purpose you can imagine.

The usage is quite straight-forward:

Command | Action
- | -
`Left-Click` within the table | create a new table point.
`Drag` a table point | move the position. (press `Shift` while dragging to lock the horizontal value).
`Right-Click` on a table point | deletes the point
`Ctrl + Wheel-Scroll` over a table point | change the gamma value for the section to the table point's left (the `CTRL` key is necessary because the scrolling wheel is reserved for vertical scrolling.)

There are always two table points on the left and right edge, which can't be moved horizontally (since they mark the start and the end of the function).

> The table internally uses a list of values (and interpolates between them) and they will be only recalculated whenever you release the mouse key or scroll the wheel, so while you drag a table point, the internal function will not be updated.
  

> The table domain is linear from 0.0 to 1.0. This allows the most generic usage of the element. However in some cases a logarithmic domain is much more practical (eg. when changing the frequency of a filter). 
> In this case, you can simply lower the gamma curve to simulate a logarithmic scaling.


### Waveform Editor
![](images/waveform.png)

A Waveform Editor displays the content of a audio file and the current playing position.

Command | Action
- | -
`Drag` File | You can drag audio files (currently supported formats are .wav and .aif) onto the waveform to load them.
`Right-Click` | opens a file dialog to open audio files (.aif and .wav are supported).
`Drag` the left / right edge of the bright area | changes the start / end position (for sampler waveforms, there are many more zones like loop-start, crossfade, sample start etc.)
`Drag` the waveform | copies the content to another waveform (you will see a snapshot of the waveform informing you that you are
dragging waveform content.)

> **HISE** uses a global pool of loaded samples. Whenever you add a sample to a waveform it gets loaded into the pool (and reused if you use the sample more than once).

You can view the content of the pool with the debug tools.

### Data Plotter
![](images/plotter.png)

This interface element plots the curve of a modulation value. Normally it resides within the Debugging toolbar, but you can also add a plotter to your script interface and connect it manually to a modulator.


## Building a patch

### Adding / Removing

You can add as many Processors your CPU can handle. Simply click on the '+' icon in the header bar where you want to add the new
module and select the type of module you want to use.

![](images/add_popup.png)


The popup menu for adding new sound generators

Name | Action
- | -
 *Create new Processor* | creates a new Processor of the selected type and adds it to the chain. <br> You can enter a custom name for the Processor (which must be a valid variable name if you want to access it per script). Make sure you never use a name twice (this has unpredictable effects). <br>By default, it generates a unique name using the formula `TypeName+Number`.
 *Add from Clipboard* | creates a Processor from the clipboard content (if there is a valid processor in the clipboard)
 *Add from Preset* | loads a Processor that was saved into a preset file

> Sometimes there are some restrictions on which type of Processor you can add. For example you can't add a 
> LFO to the Modulator Chain which calculates the sample start offset of a sampler, because it only allows Voice Start Modulators.

If you want to delete a processor (and all of its child processors), simply click the 'x' icon of the Processor you want to
delete. 

> If you delete a sound generator it will confirm it, because this can be painful if triggered unintensionally

### Saving

Every Processor can be saved and reused. There are two ways of saving / loading: *Saving as File* or to the *Clipboard*. Both things can be achieved by right-clicking on the header bar and selecting the option.

![](images/header_popup.png)


Name | Description
-|-
Save as Preset | Saves the Processor into the global preset folder (in a subfolder depending of its type). If it already exists, it will be overwritten.
Copy to Clipboard | Copies the Processor to the Clipboard. Whenever a Processor is in the clipboard, you can insert it using the normal "Add new Processor" menu.

> When you save a preset as file, a binary format will be used for faster loading times. If you copy a Processor to the clipboard, it will be copied as XML-Element (because the system clipboard needs human-readable text).
If you know your way around XML and want to get a deeper understanding of the patch structure, feel free to paste this into a text editor of your choice and dig around...

### Load new Root Processor

If you want to save or recall all processors at once, you can
do this by clicking on the symbol in the main tool bar:

![](images/backend_popup.png)


The popup menu for global loading / saving</p>

Name | Description
- | -
Load preset into MainSynthChain | Loads a new root processor (it must be a Container or it won't work)
Save current MainSynthChain | Saves the root processor as preset.
Export package | Exports the package as serialized binary data which can be embedded in a plugin (this is advanced developer stuff)
Recompile scripts | Sometimes, you get stuck notes or some script errors which can only be fixed by resetting the script, so this is a handy feature to recompile all scripts
MIDI Panic | If you have a stuck note (because you cancelled a note off message in a script or something else), you can send an all-notes-off message with this function.

## Macro Control System
![](images/macroBar.PNG)


The macro control system is a powerful and versatile system
that allows mapping of multiple Processor parameters to one of eight
global controllers:

This is useful if you want to hide the complexity
of the patch to the user who simply wants to have a bunch of parameters
that are musically interesting. You can map multiple parameters to a
macro control, and define the range of each parameter (including
inversion of the range).</p>

There is also a Modulator that can be connected to a macro
control which adds further functionality like parameter smoothing and
curve editing.</p>

> If you use **HISE** as audio plugin (either VST or AU), the eight macro controls will show up as plugin parameters that allow host automation.

### Adding a parameter

Adding a parameter to a macro controller is quite straight forward:

1. Enable the macro learn mode by clicking on the pen symbol below the desired macro controller. It will change to red to inform you that the learn mode is active.
2. Click or move any parameter you would like to control via the macro control. Supported control elements are Buttons, Sliders and Combo Boxes.
3. A red label with the number will appear on the control (it will be also disabled, so you can't control it manually anymore.


![](images/controlledSlider.PNG)


This is it. The parameter will be from now on controlled by the macro controller. You can rename a macro controller by simply clicking on its name and give it a more meaningful description. Be aware that you can only add a parameter to one macro control (adding it to another macro control will simply remove it from the old one!).

> Make sure you don't have the learn mode enabled when adding new processors, because&nbsp;all parameters of the newly created
processor will be added to the macro control!


### Removing a parameter</h3>


There are multiple ways to remove a parameter from a macro control:

- you can right click on the controlled (and disabled) control and choose ("Remove from Macro Control")
- you can delete a parameter from the edit panel by selecting the row and pressing `Delete`
- you can delete all parameters of one macro control by right clicking on the macro control and choosing "Clear macro control".

### Using the Macro Modulator

![](images/macroControlModulator.PNG)


You can add a macro modulator to a chain and benefit from
additional features:

**Parameter Smoothing:**

Sometimes when changing a parameter by dragging it with the mouse, there will be artifacts known as the "Zipper Effect" (which
result from the step interval between the changes). In order to get rid of these artifacts, you can use the macro modulator and apply a smoothing filter that smoothes the edges of those steps.

**Define a custom parameter curve**

By default, the macro controller has a linear mapping for every controlled parameter. Sometimes, you need to customize the
behaviour. Let's assume, you have a macro controller connected to the frequency knob of a filter. By default, the mid point of the macro controller (=the position 64) is mapped to the mid point of the frequency range (=10kHz). This results in a very unmusical parameter range, where the interesting range is squashed into the first 10% of the complete range (Normally, you want to have precise control over the 0-2kHz range).

So what you can do is to add a macro controller to the frequency modulation chain and change the curve to a more logarithmic one.

Go to the Module Reference for a detailed explanation of the Macro Control Modulator.

### Changing Macro Control properties

![the macro edit panel](images/macroEditPanel.PNG) 

There is a dedicated panel for editing macro controls in the debugging tools, where you can:

- delete parameters (`Left-Click` on a row and press `Delete`)
- invert the range
- set minimum and maximum values to restrict the controlled parameter range by clicking on the value and enter a new value.

> The macro control edit panel always shows the macro control that is currently in learn mode, so if you want to edit a macro
controller, open the edit panel and enable its learn mode.


## Development Tools

### Script Variable Watch

###Script Interface Editor


### Referenced File Pool Tables</h3>


### Data Plotter</h3>


### Console</h3>


## Improving the Workflow</h2>

As you can imagine, the patches will quickly become quite large and your mouse wheel is going to have a bad time since everything
is vertically stacked. This is why **HISE offers some nice features to improve the workflow:

### Folding and hiding

The most basic workflow enhancement is to simply hide the stuff you don't want to see. This can be achieved by the fold button in
the header bar and the buttons in the chain bar.

### Processor Popup menu

![](images/processorpopup.png)

The main toolbar has a button which opens a list with every processor and some functions (the buttons from left to right):

Icon | Name | Action
- | - | - 
![](images/popup_solo.png) | *Solo Processor* | Adds the processor to the panel on the root level (regardless whether it is already shown or not). <br>This can be used to define a custom list of processors which should be visible together.
![](images/popup_bypass.png)   | *Bypass Processor* | Bypasses the processor. <br> This is the same functionality as the bypass button from the header bar, but it allows you to quickly mute Processors without having to scroll there.
![](images/popup_popup.png)   | *Show temporary popup* | Opens the processor interface in a temporary popup. <br> Use this feature if you want to quickly edit a parameter of a certain processor, but don't want to interrupt your current workflow by scrolling there, making the change and scroll back.
![](images/popup_root.png)   | *Set as Root Processor* | Sets this processor as the root item of the main panel.<br> If you are working on a certain sound generator (or complex modulator archtitecture), you can use this feature to "zoom in" and show the Processor as main root item. The other processors are still working, but you don't get distracted by other sound generator interfaces.

### Restorable View Configurations

When the patches exceed a certain size you don't want to click and hide every unwanted processor anymore. That is why there is a
system of restorable view configurations, which allows storing and recalling any view state (including folding / hiding and everything that can be set with the Processor Popup Menu). This allows building of dedicated views for different purposes.

**Example:**

Let's assume we have a patch where we want to change the bandwidth of a filter with a script. So what we want to see is the
script editor and the filter editor (to check what the script is actually doing). Without any workflow enhancement, we have a patch that shows every processor:


![](images/view_all.png)


What we don't need to see is the envelope interface as well as the sine wave generator interface. This is where the "Restorable View" functionality comes in handy. 

So the first thing we do is to save the current editor state as "Everything" (by right clicking on the View Icon and choosing "Add new view"). This saves the current state and allows us to jump back to seeing everything with one mouse click.<br>

Now we want to hide everything unnecessary. This is achieved by: 

1. Setting the Script Processor as root item (with the Processor Popup Menu)
2. Adding the filter as "Solo Processor" (again with the Processor Popup Menu)

Now we see something like this:

![](images/view_script.png)


Let's save this view as something like "Script & Filter" (again by clicking on the View Icon and choosing "Add new View").
Now we can toggle between the two views by selecting the view from the View Icon drop-down menu.


All views are saved within the current patch, so you can create some useful views (depending on your workflow) and quickly toggle between them. This is incredibly useful for larger patches (with more than 70 processors).