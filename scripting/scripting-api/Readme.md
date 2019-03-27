---
keywords: Scripting API
summary:  The API reference for the scripting language in HISE.
icon:     /images/icon_apicollection
weight:   90
index:    02
author:   Christoph Hart
---


## Scripting API

**HISE** provides a API with over 200 functions which allow interaction between the core engine and the script processor. There is a [complete list of all API calls], but you can also use the autocomplete feature of the script editor to quickly browse through all available functions.

> <kbd>Escape</kbd> opens a popup with all available API objects and script variables for an object. If you press <kbd>Escape</kbd> after an object followed by a dot (eg. `Content.`<kbd>Escape</kbd>), you will get a list of all API functions that belong to this object. Hit ESC again, and the popup will disappear. 

The API is divided into five sub categories which are grouped into the following objects. You can call every API function by using the scheme `Object.function([parameters])`


### The Synth Object

The `Synth` Object grants access to the sound generator internals. Depenending on the type of the sound generator, there are some function which will not work, because they are limited to a certain sound generator type (You will get a error message if you try to use a illegal API call)


``` js
Synth.playNote(noteNumber, velocity) // sends a note on to the sound generator and all of its children
Synth.getNumPressedKeys() // returns the number of pressed keys.
```

### The Sampler Object

The sampler object contains methods to access some sampler specific data. Calling it on another Sound Generator does not harm anything but the world will not get better by doing so.


``` js
Sampler.getNumSelectedSamplerSounds();
```

### The Message Object

If you use one of the MIDI callbacks (`onNoteOn`, `onNoteOff` or `onController`), this object contains method to get / change the message that triggered the callback.


``` js
Message.getNoteNumber() // returns the note number in note callbacks
Message.setChannel(newChannel) // changes the channel of the midi message
```

### The Engine Object

The `Engine` object contains functions related to global properties (like sample rate or host tempo)

``` js
Engine.getSampleRate() // returns the current sample rate
Engine.sendAllNotesOff() // sends a all note off (MIDI Panic) message at the next audio buffer
```

### The Content Object

The `Content` object contains all methods related to interface design.


``` js
Content.addButton("ButtonName", 0, 0) // adds a button
Content.setHeight(250) // changes the height of the interface
```

### The Console Object
The console object allows you to print any value to the console of **HISE**.

``` js
Console.print("Hello World " + 3.4); // Prints "Hello World + 3.4 to the console.

Console.assertEqual(x, y); // You could write assertion tests to check your code. 

Console.start(); // You can benchmark your scripts Compile-time with:
Console.stop(); // wrapping these two Console commands around your code.
```


### The Globals Object

The Globals object does not contain any methods but acts as preset wide value container for cross-script communication.

``` js
// In Script Processor 1
Globals.x = 5.72; // Define this in one script

// In Script Processor 2
Console.print(Globals.x) // 5.72
```














The scripting API in HISE can be used to customize the behaviour.

## Using references to objects in HISE

Most of the time you will find yourself changing existing objects in HISE - either UI Components or HISE modules. The usual workflow for this task is to grab a reference with the desired target type and then call one of its methods:

```javascript
const var knob = Content.getComponent("My Knob"); // Create a reference to a knob
knob.setValue(125);                               // Call a method.
```

  
> In a real world project, you will most likely use multiple references. In this case consider storing them in an [Array](/scripting/scripting-api/array) and iterate over it


## HISE module reference types

The HISE module architecture is based on a strong hierarchy of inheritance with a few interface types. This means that every HISE module has exactly one base class but can have multiple interface classes that add additional functionality.  
For example the **VelocityModulator** has the base class [Modulator](/scripting/scripting-api/modulator), because it creates a signal that can be used to control paramaters of other modules.  
However, it can also be connected to a [`Table`](/scripting/scripting-api/scripttable) that can be used to change the velocity curve. Therefore, it has the additional interface type [TableProcessor](/scripting/scripting-api/tableprocessor).

> Depending on what functionality you want, you need to create a reference of the desired base class type or interface.

```javascript
const var v = Synth.getModulator("VeloMod"); // create a base class reference
v.setAttribute(v.UseTable, 1);               // enable the table
v.setIntensity(0.5);                         // change the intensity to 50%


const var v_t = Synth.getTableProcessor();   // create a interface class reference
v_t.addTablePoint(0, 0.5, 0.25);             // create a table point in the centre.
```



```javascript
// short cut - create a temporary interface reference
v.asTableProcessor().addTablePoint(0, 0.5, 0.25);
```

### List of base class references:

- [`AudioSampleProcessor`](/scripting/scripting-api/audiosampleprocessor)  
- [`TableProcessor`](/scripting/scripting-api/tableprocessor)  
- [`SlotFX`](/scripting/scripting-api/slotfx)