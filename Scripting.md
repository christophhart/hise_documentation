HISE uses a *modified* version of Javascript. If you don't know Javascript yet, check out this small [tutorial](Javascript.php).

## The Callbacks

The Script Processor is a Midi Processor which can be used with every sound generator (by adding a Script Processor to its Midi Processor Chain). Whenever a midi message is sent to the sound generator, the respective callback gets executed.  

You can use these callbacks to define a customized behaviour using the API that is provided by **HISE**. The possibilities are (almost) endless, but here are some useful purposes for scripts:

- Change parameters of any module (eg. the frequency of the pitch LFO)
- filter midi messages according to a customized logic
- design complex midi processors like arpeggiators or loopers
- write a Pong clone.

> You can use multiple Script Processors on different Sound Generators. In this case, they are processed in a top-down fashion: if the Script Processor of the parent Container eg ignores a midi message, it will not trigger the callback of the Script Processor in the child.


### Main callbacks

There are six main callbacks with a dedicated tab to jump around quickly. If you don't add any code to a callback, it will not be executed, so you will get almost zero performance penalty by adding a empty Script Processor.

#### The `onInit`-Callback

The `onInit` callback gets executed whenever the script is compiled - either if the patch is loaded, or if you press <kbd>Compile</kbd>. You can use it to define the interface and setup some variables that are used in the other callbacks.

> For performance reasons, it is better to define the variables that you will use in the other callbacks up front.

#### The `onNoteOn`-Callback

If you press a key, this callback will be executed. You can use the API functions `Message.getNoteNumber()` and `Message.getVelocity()` to obtain some information about the note on message.

#### The `onNoteOff`-Callback

If you release a key, this callback will be executed.

> Do not rely on the assumption that every noteOff message is preceded by a note on message (for example if you start the playback of your host between a note on and a note off)

#### The `onController`-Callback

If you send a midi controller (eg. the modulation wheel), this callback will be executed.

#### The `onTimer`-Callback

Every sound generator has a (pretty accurate) timer that runs on the audio thread (this enables offline bouncing with the same behaviour). 
By default, the timer is not running, but there are some API functions (`Synth.startTimer()` and `Synth.stopTimer()`) that provide control over the timer. If you start a timer, this callback will be called periodically (depending on the timer frequency).

> The timer frequency is limited to 40ms (this should be enough for almost any case and prevent CPU freezing)

#### The `onControl`-Callback

Whenever you use a script defined UI element, this callback will be executed. It will contain a reference to the control and the current value as function parameters. If you set a UI control by a script, this callback won't get executed (to prevent recursive call-loops). But nothing stops you from calling this callback directly:

```javascript
knob.setValue(0.5);
onControl(knob, knob.getValue());
```

Using this callback is not the only way to add functionality to scripted UI elements. For basic parameter changes, you can simply add a macro control to the control.

## The API

**HISE** provides a API with over 200 functions which allow interaction between the core engine and the script processor. There is a [complete list of all API calls](ScriptingCheatSheet.php), but you can also use the autocomplete feature of the script editor to quickly browse through all available functions.

> Press <kbd>Escape</kbd> to open a popup with all API objects and all script variables. If you press the key after a object (eg. `Content.`<kbd>Escape</kbd>), you will get a list of all API functions that belong to this object.

The API is divided into five sub categories which are grouped into the following objects. You can call every API function by using the scheme `Object.function([parameters])`

### The Synth Object

The `Synth` Object grants access to the sound generator internals. Depenending on the type of the sound generator, there are some function which will not work, because they are limited to a certain sound generator type (You will get a error message if you try to use a illegal API call)

#### Examples

```javascript
Synth.playNote(noteNumber, velocity) // sends a note on to the sound generator and all of its children
Synth.getNumPressedKeys() // returns the number of pressed keys.
```

### The Sampler Object

The sampler object contains methods to access some sampler specific data. Calling it on another Sound Generator does not harm anything but the world will not get better by doing so.

#### Examples

```javascript
Sampler.getNumSelectedSamplerSounds();
```

### The Message Object

If you use one of the MIDI callbacks (`onNoteOn`, `onNoteOff` or `onController`), this object contains method to get / change the message that triggered the callback.

#### Examples:

```javascript
Message.getNoteNumber() // returns the note number in note callbacks
Message.setChannel(newChannel) // changes the channel of the midi message
```

### The Engine Object

The `Engine` object contains functions related to global properties (like sample rate or host tempo)

```javascript
Engine.getSampleRate() // returns the current sample rate
Engine.sendAllNotesOff() // sends a all note off (MIDI Panic) message at the next audio buffer
```

### The Content Object

The `Content` object contains all methods related to interface design.

#### Examples

```javascript
Content.addButton("ButtonName", 0, 0) // adds a button
Content.setHeight(250) // changes the height of the interface
```

### The Console Object

The console object allows to print out any value to the console of **HISE**.

#### Examples

```javascript
Console.print("Hello World " + 3.4); // Prints something to the console
```
## The Script Processor

The Script Processor is a MIDI Processor that can be added onto every sound generator. They are processed top down in the tree order (parents first).

> You can add as many Script Processors as you like. As general design principle I strongly recommend using multiple Script Processors for each task than one monster script that contains every functionality. This results in far cleaner and easier understandable code as well as in a bigger reusability of scripts.

The interface of the Script Processor consists of three elements: the callback bar, the interface content and the actual code editor.

### The Callback Bar

![CallbackBar.png](http://hise.audio/blog/images/CallbackBar.png)

Although the script is saved as one file, the Script Processor divides the script into multiple callback snippets which are shown seperately. This improves readability and the workflow because you don't need to scroll around in big scripts to find the code line you want to change.

> You can jump around the tabs using `Ctrl + Shift + 1-6` or `F2`(left) and `F3`(right)

It has the same appearance as the chain bar of a module with internal chains and shares some of its features:

- if a callback is actually used, the respective callback bar will be highlighted to reflect this.
- if a callback is deferred (= not running on the audio thread), the callback name will have a `(D)` suffix to indicate the threading state.

### The Interface Content

![InterfaceContent.png](http://hise.audio/blog/images/InterfaceContent.png)

The interface content is an area which can be populated with widgets, images to define a user interface for the script or the whole instrument (using the API call `Synth.addToFront(true)`).

### The Editor

![ScriptEditor.png](http://hise.audio/blog/images/ScriptEditor.png)

The editor is a standard code text editor with Javascript syntax highlighting. It also has a Autocomplete popup window which contains all variables and available API calls. Simply press `Escape` to open the popup up and select the desired item using either the arrow keys or by clicking on it.

#### Shortcuts & Key Commands

There are some other shortcuts which will speed up your development workflow.

Shortcut | Action |
-------- | ------ |
`Escape` | Open Autocomplete Popup
`Tab / Shift+Tab` | Increase / Decrease intendation of selection
`F5` | Compile script
`F12` | Open Editor in large overlay window
`Ctrl+Shift+1-6` | Open callback tab.
`Shift+Enter` | Semicolon at end of line + new line

## Performance

Compared to compiled C++ code, the Javascript engine is rather slow. But for occasional event handling like incoming MIDI data or a timer every 50 milliseconds the engine should have enough power to handle usual tasks. However there are some things that have to be taken into account.

The usual suspects of code optimization apply also here, but two things are especially important.

### Declare variables up front

This reminds of a rather old school programming paradigm, but for a script language it is usually better to define variables up front to avoid the allocation during run time:

```javascript
// Not so clever
function onNoteOn()
{
   var noteNumber = Message.getNoteNumber();
   
   if(noteNumber == 64)
   {
       // do something
   }
}

// Faster
var noteNumber = 0;

function onNoteOn()
{
   noteNumber = Message.getNoteNumber();
   
   if(noteNumber == 64)
   {
       // do something
   }
}
```

### Deferring callbacks

All callbacks except for the onInit callback and the onControl callback are executed in the audio thread. The audio thread is a high priority thread that ensures stable real time performance. In a standard plugin setting the host will call a function in a plugin to fill the supplied audio buffer. The size of the buffer determines the time that the plugin has to make its calculations. Whenever the time needed for the calculation exceeds this time, a drop out will occur (because the buffer could not be filled in time).

On the other hand, you can be sure that the timing will always be sample accurate and with no delay regardless if the host is playing normally or rendering.

There are some scenarios where you don't need this accuracy. Complex interfaces that react on MIDI input for example don't need this perfect accuracy so the callbacks can safely deferred to the message thread. The message thread is the thread supplied by the operating system which is used to render the graphical interface and react to user input from mouse or keyboard.

A heavy calculation on this thread does not result in audio drop outs (because it will be yielded to let the higher priority thread do its job). Instead you'll end up with a laggy interface, which is not the nicest thing but definetely the better choice compared to an audio drop out.

```javascript
// You'll need a pretty decent computer to not cause a audio drop out with this code
function onNoteOn()
{
	 for(var i = 0; i < 256; i++)
	 {
	     sliders[i] = Math.sin(Math.rand() * Message.getNoteNumber());
	     label[i].set("text", Engine.getNoteName(Message.getNoteNumber());
	 }
}
```

For these cases, there is the API call `Synth.deferCallbacks(true);`. But be aware that you can't defer only selected callbacks of a script (there's a "all or none"-policy for deferring).


## Debugging Tools

Although it would be possible to write scripts in your favorite external editor and copy & paste the file into the script processor, you would miss some of the benefits of run time information. There are several tools to help script development. 

### Console

The most important tool for debugging is the console. (The `DBG` button on the right panel). It prints out run time error exceptions (if you eg. call a non existent API method it will complain during callback execution and not during compilation time) and your custom messages using `Console.print("string")`.

### Live variable watching

Inspect all variables and their current value by clicking on the `DBG` button on the script processor (the panel with the `{...}` symbol should pop up and show a table with all variables. This works for every variable declared in the root namespace (= in the onInit callback) as well as for global variables. They are updated once a second and if the value changes, they will blink red to indicate the change.

You can of course add some console message printing code, but this is a neater way of checking if the script works as it is supposed to.

> this can also be used to switch the Interface Designer between widgets (see below).

### API reference

This is a complete list of all available API calls. You can right click on them to open a popup with more information (arguments, return type, etc). If you double click on it, it will be added to the current position of the caret (although using the autocomplete popup is more faster when you know what you need).

It also has a fuzzy text search box which limits the displayed API calls to the string matches.

The next debugging tool is so useful it will get its own chapter: 

## The Interface Designer

![InterfaceDesigner.gif](http://hise.audio/blog/images/InterfaceDesigner.gif)

This is a real time saver when it comes to build interfaces. You can select components and edit their properties with suitable controls (eg. colour selectors for colours, sliders for numerical values). The components will get updated on the fly (without having to recompile the script). There are six property types with different controllers:

- Editors for Text values (eg. Displayed Name or Value suffix)
- Sliders for Numerical values (eg. x-Position or alpha value)
- Colourpicker for colours (eg background colour or text colour)
- Toggle buttons for boolean properties (eg. visibility)
- File picker for external references (eg. image files)
- Comboboxes for options (eg. Slider mode or macro control).

In order to edit a component, make sure the editor panel is open (that indicates editing mode), right click a component and choose "Edit in panel". When you are done changing the properties, press `Compile` or `Apply changes` and the script will be updated.  
This allows creating of rather complex interfaces without touching the actual scripting code but on the other hand have the power of scripting to embed the actual functionality.

> You can also turn on the editing mode which allows you to simply click on a component to open it in the Interface Designer. Or you can double click on a widget variable in the Live Variable Watch table. This is especially useful if some widgets are masked by other widget (eg. background images), or even invisible.

There are many properties that can be changed (from common properties like the position or the visibility to component specific properties like the midle position value of the slider). They are named pretty self explanatory and are listed in the Interface Designer table.

### How does it work?

For a code generation system like the Interface Designer it is crucial to keep the possibility of making manual changes to the code it generates without having to overwrite boilerplate code that will be reverted once you switch back to editing. There are systems which append the "metadata" at the end of the file and parse it at compile time (thats how eg. the Introjucer of the JUCE library works). However this leads to duplication of information (in the actual code as well as in the metadata). Also it would be pretty useless if you can't change the properties on the script level anymore, eg. reacting to callbacks and change the appearance of the interface.

The Interface Designer generates a code snippet that will contain a JSON object with every property of the component **that differs from its default value** and inserts it just after the component definition:

```javascript
// All properties of a Knob / Slider

// [JSON Knob]
Content.setPropertiesFromJSON("Knob", {
  "text": "Knob",
  "visible": true,
  "enabled": false,
  "x": 325,
  "y": 42,
  "width": 128,
  "height": 48,
  "min": 0,
  "max": 1,
  "tooltip": "",
  "bgColour": 0,
  "itemColour": 4294967295,
  "itemColour2": 4294967295,
  "textColour": 4294967295,
  "macroControl": -1,
  "zOrder": "Normal order",
  "mode": "Linear",
  "style": "Knob",
  "stepSize": 0.010000000000000000208,
  "middlePosition": 0.5,
  "suffix": "",
  "filmstripImage": "Use default skin",
  "numStrips": 0,
  "isVertical": true
});
// [/JSON Knob]
```

The other way around is pretty simple: you can change the values in the editor and they will be used the next time you open this component in the edit panel. 

### Modifying a JSON defined widget

If you select a widget that was previously edited in the Interface Designer, the script will search for the two metadata lines

```javascript
// [JSON WidgetName]
````

and

```javascript
// [/JSON WidgetName]
```

When it finds these tags, it will select anything between and will update the values as soon as you change any parameters. Some controllers (Colour Selectors, Sliders etc) only send an update when the mouse is released to avoid unnecessary polling. Hitting compile or selecting another widget will deselect the JSON definition.

> Everything between those lines will be merciless overwritten the next time you edit the widget. Unless you remove the metadata tags. In this case a new JSON definition will be created directly after the component definition (and therefore before the old definition). The old definition stays intact and will also overwrite the new JSON definition (because it will be called after the new definition).

The value of each property can be changed with a appropriate component for the specific type (there is eg. a Colour Picker for colours and a text editor for tooltips). Depending on the component type there are different update rates of the interface:

Control Widget | Properties | Update |
 ------------- | ---------- | ------
**Slider** | `min`, `max`, `x`, `y`, ... | visual update when dragging, code update when mouse up
**Combo Box** | `macroControls`, `processorId`, ... | visual + code update when selecting
**Text Editor** | `text`, `suffix` | visual + code update when losing focus
**Colour Picker** | `itemColour1`, `bgColour`, ... | visual update when dragging, code update when discarding the popup
**Button** | `enabled`, `saveInPreset`, ... | visual + code update when clicking
**File Chooser** | `filmStrip`, `image`, ... | visual + code update when clicking *OK*

### Mixing JSON definition and script modification

What if you want to change one of the properties afterwards? There is another API call which allows you to change one property at a time:

```javascript
Knob.set("middlePosition", 0.2);
```

The JSON API call overwrites every property that is defined in its JSON parameter. However, this method can be used to only alter a single property. Also this is a very fast operation, so you can call it from any callback you like with almost no performance penalty.

This example shows how to paint a panel green if the sustain pedal is pressed and red if not:

```javascript
function onController()
{
	if(Message.getControllerNumber() == 64)
	{
	    panel.set("bgColour", Message.getControllerValue() > 64 ? 0xFF00FF00 : 0xFFFF0000);
	}
}
```

Notice how you can use the hexadecimal notation to shed some light onto the rather weird looking colour values from the JSON example.

### Practical hints

There are some hints for ensuring correct functionality of the Interface designer.

#### Make sure that the name for the component and its actual variable name are identical.

This is pretty self explanatory, but make sure you give the component the same name as the variable it is assigned to. This is necessary so that the interface designer can associate the JSON string to the right component.

```javascript
// Works
bgPanel = Content.addPanel("bgPanel", 0, 0);

// Really?
bgPanel = Content.addPanel("pgBanel", 0, 0);
```

#### Use order of declaration to change the z-order of the components

Components are defined from front to back so that the first component definition is the last component in the z-order. 

