#Scripting Documentation

The Scripting Engine of **HISE** is a powerful tool for creating virtual instruments. There are two reasons for writing a script: you can change the behaviour of your instrument by writing a custom MIDI processing logic or design a frontend interface with some control elements for your preset.  
Both things can be achieved with the same module: the Script Processor.

> The Script Processor uses Javascript. If you don't know Javascript yet, check out this small [tutorial](Javascript.php).

## The Callbacks

The Script Processor is a Midi Processor which can be used with every sound generator (by adding a Script Processor to its Midi Processor Chain). Whenever a midi message is sent to the sound generator, the respective callback gets executed.  

You can use these callbacks to define a customized behaviour using the API that is provided by **HISE**. The possibilities are (almost) endless, but here are some useful purposes for scripts:

- Change parameters of any module (eg. the frequency of the pitch LFO)
- filter midi messages according to a customized logic
- design complex midi processors like arpeggiators or loopers
- write a Pong clone.

> You can use multiple Script Processors on different Sound Generators. In this case, they are processed in a top-down fashion: if the Script Processor of the parent Container eg ignores a midi message, it will not trigger the callback of the Script Processor in the child.

There are six callbacks. If you don't add any code to a callback, it will not be executed, so you will get almost zero performance penalty by adding a empty Script Processor.

### The `onInit`-Callback

The `onInit` callback gets executed whenever the script is compiled - either if the patch is loaded, or if you press <kbd>Compile</kbd>. You can use it to define the interface and setup some variables that are used in the other callbacks.

> For performance reasons, it is better to define the variables that you will use in the other callbacks up front.

### The `onNoteOn`-Callback

If you press a key, this callback will be executed. You can use the API functions `Message.getNoteNumber()` and `Message.getVelocity()` to obtain some information about the note on message.

### The `onNoteOff`-Callback

If you release a key, this callback will be executed.

> Do not rely on the assumption that every noteOff message is preceded by a note on message (for example if you start the playback of your host between a note on and a note off)

### The `onController`-Callback

If you send a midi controller (eg. the modulation wheel), this callback will be executed.

### The `onTimer`-Callback

Every sound generator has a (pretty accurate) timer that runs on the audio thread (this enables offline bouncing with the same behaviour). 
By default, the timer is not running, but there are some API functions (`Synth.startTimer()` and `Synth.stopTimer()`) that provide control over the timer. If you start a timer, this callback will be called periodically (depending on the timer frequency).

> The timer frequency is limited to 40ms (this should be enough for almost any case and prevent CPU freezing)

### The `onControl`-Callback

Whenever you use a script defined UI element, this callback will be executed. It will contain a reference to the control and the current value as function parameters. If you set a UI control by a script, this callback won't get executed (to prevent recursive call-loops). But nothing stops you from calling this callback directly:

```Javascript
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

```Javascript
Synth.playNote(noteNumber, velocity) // sends a note on to the sound generator and all of its children
Synth.getNumPressedKeys() // returns the number of pressed keys.
```

### The Message Object

If you use one of the MIDI callbacks (`onNoteOn`, `onNoteOff` or `onController`), this object contains method to get / change the message that triggered the callback.

#### Examples:

```Javascript
Message.getNoteNumber() // returns the note number in note callbacks
Message.setChannel(newChannel) // changes the channel of the midi message
```

### The Engine Object

The `Engine` object contains functions related to global properties (like sample rate or host tempo)

```Javascript
Engine.getSampleRate() // returns the current sample rate
Engine.sendAllNotesOff() // sends a all note off (MIDI Panic) message at the next audio buffer
```

### The Content Object

The `Content` object contains all methods related to interface design.

#### Examples

```Javascript
Content.addButton("ButtonName", 0, 0) // adds a button
Content.setHeight(250) // changes the height of the interface
```

### The Console Object

The console object allows to print out any value to the console of **HISE**.

#### Examples

```Javascript
Console.print("Hello World " + 3.4); // Prints something to the console
```



## The Script Processor


### The Interface

#### The Callback Bar

#### The Interface Content

#### The Editor



## Using the Script Processor as MIDI FX

## Using the Script Processor as Interface Designer